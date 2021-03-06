import React, { useState, useRef, useEffect } from 'react';
import "./App.css"
import imgDefault from "./images/imgDefault.jpg"
import uploadBigArrow from "./images/uploadBigArrow.png"
import logoPNG from "./images/logopng.png"
import { Copyright } from './misc/Copyright'
import { SocialMediaLinks } from './misc/SocialMediaLinks'
import axios from "axios"
import swal from 'sweetalert';
import {
  ChakraProvider,
  Box,
  Heading,
  Text,
  extendTheme,
  Flex,
  Button,
  Spacer,
  Center,
  Image,
  Stack,
  StackDivider,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { 
  ChevronDownIcon,
  ChevronRightIcon,
  SettingsIcon,
  ArrowRightIcon,
  DownloadIcon,
} from '@chakra-ui/icons'
import "@fontsource/poppins/600.css"
import "@fontsource/poppins/400.css"
import "@fontsource/poppins/200.css"

function App() {
  //BG #282A37 CMPNT #01CC90
  const config = {
    styles: {
      global: () => ({
        body: {
          bg: "linear-gradient(90deg, rgba(40,43,56,1) 0%, rgba(51,55,72,1) 77%)",
          color: "black",
        },
        fonts: {
          heading: "Poppins",
          body: "Poppins",
        }
      }),
    },
  }
  const theme = extendTheme(config);
  const pictureInputRef = useRef();
  const [isUseRateSettings, setIsUseRateSettings] = useState(0);
  const [picture, setPicture] = useState(null);
  const [preview, setPreview] = useState(null);
  const [compressionRates, setCompressionRates] = useState("med");
  const [compressedPicture, setCompressedPicture] = useState("nothing");
  const [timeUsed, setTimeUsed] = useState(0);
  const [ratioRates, setRatioRates] = useState(0);
  const [sizeCompressed, setSizeCompressed] = useState(0);
  const [succed, setSucced] = useState("nodata");

  const onChangePicture = e => {
      const file = e.target.files[0];
      if (file && file.type.substr(0, 5) === "image") {
        setSucced("nodata");
        setPicture(file);
      }
      else {
        setPicture(null);
      }
  };
  
  useEffect(() => {
    if (picture) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(picture);
    }
    else {
      setPreview(null);
    }
  }, [picture])

  function handlePostQuery() {
    var myParams = {
      data: preview,
      rates: compressionRates
    }

    if (picture) {
      axios.post('http://127.0.0.1:5000/compress', myParams)
          .then(function(response) {
            console.log(response);
            setCompressedPicture(response.data.gambarKompres);
            setRatioRates(response.data.rasioKompres);
            setTimeUsed(response.data.waktuKompres);
            setSizeCompressed(response.data.sizeKompres);
            setSucced(response.data.berhasilKompres);
          })
          .catch(function(error) {
            console.log(error);
          });
    } else {
      swal("Picture Not Found!", "Seems like you didn't select the picture", "error");
    }
  }

  const handleUseSettings = () => {
      isUseRateSettings ? setIsUseRateSettings(0) : setIsUseRateSettings(1);
  };
  const handleLowRates = () => {
      setCompressionRates("low");
  };
  const handleMedRates = () => {
      setCompressionRates("med");
  };
  const handleHighRates = () => {
      setCompressionRates("high");
  };
  console.log(compressedPicture);







  return (
    <ChakraProvider theme={theme}>
      <Box overflowX="hidden">
      <Heading color="#FFFFFF" fontSize="5xl" fontFamily="poppins" textAlign="center" mt={10} mb={3} minW="100vw"> 
        Smart <span style={{ color: "#01CC90" }}>PNG</span> and <span style={{ color: "#01CC90" }}>JPEG</span> Compressor
      </Heading>
      <Text color="#FFFFFF" fontFamily="poppins" textAlign="center" fontWeight={200} fontSize="md">
        An ultimate image optimizer to compress your images
      </Text>
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={onChangePicture}
        ref={pictureInputRef}
      />
      <Box mt ={10} >
        <Center>
          <Button onClick={(event) => {
            event.preventDefault();
            pictureInputRef.current.click();
          }} color="#01CC90" borderStyle="dotted" borderWidth={5} borderColor="#01CC90" width="45vw" height="25vh" boxShadow="xl">
            <Flex width="100%">
              <Spacer/>
              <Box>
                { preview ? (
                  <Image
                    boxSize="8vw"
                    objectFit="cover"
                    borderRadius="3px"
                    src={preview}
                    alt="Upload your image"
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <Image
                    boxSize="8vw"
                    objectFit="cover"
                    borderRadius="3px"
                    src={uploadBigArrow}
                    alt="Upload your image"
                    style={{ objectFit: 'cover' }}
                  />
                )}
              </Box>
              <Spacer/>
              <Box>
                <Text fontSize="5xl" color="#FFFFFF">Click here to <span style={{ color: "#8ef1d4" }}>select</span></Text>
                <Text color="#FFFFFF" fontSize="2xl" textAlign="left">or <span style={{ color: "#8ef1d4" }}>change</span> your image.</Text>
              </Box>
              <Spacer/>
            </Flex>
          </Button>
        </Center>
      </Box>
      
      <Center>
        <Box w="45vw">
          <Flex>
            <Box>
              <Box mt ={5} >
                <Button onClick={handleUseSettings}>
                  {isUseRateSettings ?
                  (<Text color="#FFFFFF" fontSize="xl" fontFamily="poppins" fontWeight={200}>
                    <SettingsIcon mr={5}/>  
                    Additional settings <ChevronDownIcon/>
                  </Text>) :
                  (<Text color="#FFFFFF" fontSize="xl" fontFamily="poppins" fontWeight={200}>
                    <SettingsIcon mr={5}/>  
                    Additional settings <ChevronRightIcon/>
                  </Text>)}
                </Button>
              </Box>
              {isUseRateSettings ? (
                <Box mt = {5}>
                  <Center>
                      <Flex>
                        <Text color="#8ef1d4" fontSize="xl" fontFamily="poppins" mr={4} fontWeight={400}>
                          Compression rates
                        </Text>
                        {compressionRates === "low" ? (
                          <Button onClick={handleLowRates} mr={4} colorScheme="teal" variant="solid">
                            Low
                          </Button>
                        ) : (
                          <Button onClick={handleLowRates} mr={4} colorScheme="teal" variant="outline">
                            Low
                          </Button>
                        )}
                        {compressionRates === "med" ? (
                          <Button onClick={handleMedRates} mr={4} colorScheme="teal" variant="solid">
                            Medium
                          </Button>
                        ) : (
                          <Button onClick={handleMedRates} mr={4} colorScheme="teal" variant="outline">
                            Medium
                          </Button>
                        )}
                        {compressionRates === "high" ? (
                          <Button onClick={handleHighRates} mr={4} colorScheme="teal" variant="solid">
                            High
                          </Button>
                        ) : (
                          <Button onClick={handleHighRates} mr={4} colorScheme="teal" variant="outline">
                            High
                          </Button>
                        )}
                      </Flex>
                  </Center>
                </Box>
              ) : null}
            </Box>
            <Spacer />
            <Box>
              <Center mt ={5}>
                <Button bg="linear-gradient(90deg, rgba(48,226,173,1) 0%, rgba(142,241,212,1) 100%)" 
                        color="#282A37" 
                        h="6vh" 
                        w="15vw" 
                        boxShadow="2xl"
                        fontSize="xl"
                        onClick={handlePostQuery}>
                        Compress PNG/JPEG <ArrowRightIcon ml={2} color="black"/></Button>
              </Center>
            </Box>
          </Flex>
        </Box>
      </Center>


      {succed ==="yess" ? (
        <Box mt={10} >
          <Center>
            <Box w="40vw" borderRadius="10px">
              <Alert py="20px" borderRadius="10px" status="success" bg="linear-gradient(90deg, rgba(48,226,173,1) 0%, rgba(142,241,212,1) 100%)">
                <AlertIcon color="#121633" boxSize="40px" mr={5} ml={2}/>
                <Box flex="1">
                  <AlertTitle fontSize="3xl">Successfully Compressed!</AlertTitle>
                  <AlertDescription display="block" fontSize="xl" mt={3}>
                    Your image has been compressed in <span style={{ fontWeight: "bold" }}>{timeUsed}</span> seconds
                    and reduced by <span style={{ fontWeight: "bold" }}>{ratioRates}%</span>
                  </AlertDescription>
                </Box>
              </Alert>
            </Box>
          </Center>
        </Box>
      ) : null}

      {succed ==="noo" ? (
        <Box mt={10} >
          <Center>
            <Box w="40vw" borderRadius="10px">
              <Alert py="20px" borderRadius="10px" status="error" bg="linear-gradient(90deg, rgba(253,29,29,1) 0%, rgba(252,124,69,1) 100%)">
                <AlertIcon color="#121633" boxSize="40px" mr={5} ml={2}/>
                <Box flex="1">
                  <AlertTitle fontSize="3xl">Failed to compress!</AlertTitle>
                  <AlertDescription display="block" fontSize="xl" mt={3}>
                    An error occured while we're compressing your image
                  </AlertDescription>
                </Box>
              </Alert>
            </Box>
          </Center>
        </Box>
      ) : null}

      {succed === "yess" ? (
      <Box mt = {10}>
        <Flex>
          <Spacer />
          <Box bg="#121633" width="24vw" px="2vw" py="2vw" borderRadius="5px" >
            <Center>
              <Text color="#01CC90" fontSize="3xl" fontFamily="poppins" mr={4} fontWeight={600}>
                Before
              </Text>
            </Center>
            <Center mb="1vw">
              {compressedPicture === "nothing" ? (
                <Image
                  shadowBox="2xl"
                  boxSize="20vw"
                  objectFit="cover"
                  borderRadius="3px"
                  src={imgDefault}
                  alt="Default Image"
                  mt={5}
                />
              ) : (
                <Image
                  shadowBox="2xl"
                  boxSize="20vw"
                  objectFit="cover"
                  borderRadius="3px"
                  src={preview}
                  alt="Compressed Image"
                  mt={5}
                />
              )}
            </Center>
            <Flex>
              <Text color="#FFFFFF" fontSize="2xl" fontFamily="poppins" mr={4} fontWeight="200" w="100%">
                Image Name
              </Text>
              <Spacer />
              {picture ? (
                <Text color="#01CC90" fontSize="2xl" fontFamily="poppins" mr={4} isTruncated>
                  {picture.name}
                </Text>
              ) : (
                <Text color="#01CC90" fontSize="2xl" fontFamily="poppins" mr={4}>
                  Test.jpg
                </Text>
              )}
            </Flex>
            <Flex mt={1.5}>
              <Text color="#FFFFFF" fontSize="2xl" fontFamily="poppins" mr={4} fontWeight="200">
                Image Size
              </Text>
              <Spacer />
              {picture ? (
                <Text color="#01CC90" fontSize="2xl" fontFamily="poppins" mr={4} >
                  {Math.floor(picture.size/1000)} Kb
                </Text>
              ) : (
                <Text color="#01CC90" fontSize="2xl" fontFamily="poppins" mr={4}>
                  Test Kb
                </Text>
              )}
            </Flex>
          </Box>
          <Spacer />
          <Box bg="#121633" width="24vw" px="2vw" py="2vw" borderRadius="5px">
            <Center>
              <Text color="#01CC90" fontSize="3xl" fontFamily="poppins" mr={4} fontWeight={600}>
                After
              </Text>
            </Center>
            <Center mb="1vw">
              {compressedPicture === "nothing" ? (
                <Image
                  shadowBox="2xl"
                  boxSize="20vw"
                  objectFit="cover"
                  borderRadius="3px"
                  src={imgDefault}
                  alt="Default Image"
                  mt={5}
                />
              ) : (
                <Image
                  shadowBox="2xl"
                  boxSize="20vw"
                  objectFit="cover"
                  borderRadius="3px"
                  src={compressedPicture}
                  alt="Compressed Image"
                  mt={5}
                />
              )}
            </Center>
            <a href={compressedPicture} download>
            <Button download h="50px" bg="linear-gradient(90deg, rgba(48,226,173,1) 0%, rgba(142,241,212,1) 100%)" width="100%" borderRadius="10px" boxShadow="2xl" py={2} mb={3}>
              <Center>
                <Text color="black" fontSize="2xl" fontFamily="poppins" fontWeight={600}>
                  <DownloadIcon mr={5}/> Download Image
                </Text>
              </Center>
            </Button>
            </a>
            <Flex>
              <Text color="#FFFFFF" fontSize="2xl" fontFamily="poppins" mr={4} fontWeight="200">
                Image Size
              </Text>
              <Spacer />
              {compressedPicture ? (
                <Text color="#01CC90" fontSize="2xl" fontFamily="poppins" mr={4}>
                  {Math.floor(sizeCompressed/1000)} Kb
                </Text>
              ) : (
                <Text color="#01CC90" fontSize="2xl" fontFamily="poppins" mr={4}>
                  TestKompres Kb
                </Text>
              )}
            </Flex>
          </Box>
          <Spacer />
        </Flex>
      </Box>
      ) : null }

      {/* <Box mt={10} bg="#121633" width="100%" height="10vw"> */}
      <Box
        as="footer"
        mt={10}
        bg="#121633"
        width="100%"
        role="contentinfo"
        mx="auto"
        // maxW="7xl"
        py="12"
        px={{
          base: '4',
          md: '8',
        }}
      >
        <Stack spacing="10" divider={<StackDivider />}>
          <Stack
            direction={{
              base: 'column',
              lg: 'row',
            }}
            spacing={{
              base: '10',
              lg: '28',
            }}
          >
            <Box>
              <Image
                boxSize="200px"
                src={logoPNG}
                alt="logo PNG"
              />
            </Box>
            <Stack
              direction={{
                base: 'column',
                md: 'row',
              }}
              spacing={{
                base: '10',
                md: '20',
              }}
            >
          
              <Center>
                <Box >
                  <Text color="White" fontSize="2xl" fontFamily="poppins" fontWeight={700} h ={70}>
                    Pemuja Hidayah-Mu
                  </Text>
                  <Text color="White" fontSize="l" fontFamily="poppins" fontWeight={400}>
                  I Gede Arya Raditya Parameswara
                  </Text>
                  <Text color="White" fontSize="l" fontFamily="poppins" fontWeight={400}>
                  Januar Budi Ghifari
                  </Text>
                  <Text color="White" fontSize="l" fontFamily="poppins" fontWeight={400}>
                  Rizky Ramadhana P. K.
                  </Text>
                </Box>
              </Center>

            </Stack>
          </Stack>
          <Stack
            direction={{
              base: 'column-reverse',
              md: 'row',
            }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Copyright />
            <SocialMediaLinks />
          </Stack>

        </Stack>
      </Box>

      {/* </Box> */}

      </Box>
    </ChakraProvider>
  );
}

export default App;
