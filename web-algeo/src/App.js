import React, { useState } from 'react';
import imgDefault from "./images/imgDefault.jpg"
import uploadBigArrow from "./images/uploadBigArrow.png"

import {
  ChakraProvider,
  Box,
  Input,
  Heading,
  Text,
  extendTheme,
  Flex,
  Button,
  Spacer,
  Center,
  HStack,
  Image,
} from '@chakra-ui/react';
import { 
  ChevronDownIcon,
  ChevronRightIcon,
  SettingsIcon,
  ArrowRightIcon
} from '@chakra-ui/icons'
import "@fontsource/poppins/600.css"
import "@fontsource/poppins/400.css"
import "@fontsource/poppins/200.css"

function App() {
  //BG #282A37 CMPNT #01CC90
  const [isUseRateSettings, setIsUseRateSettings] = useState(0);
  const [compressionRates, setCompressionRates] = useState(50);


  const handleUseSettings = () => {
      isUseRateSettings ? setIsUseRateSettings(0) : setIsUseRateSettings(1);
  }


  // Styling Background
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
  return (
    <ChakraProvider theme={theme}>
      <Box overflowX="hidden">
      <Heading color="#FFFFFF" fontSize="5xl" fontFamily="poppins" textAlign="center" mt={10} mb={3} minW="100vw"> 
        Smart <span style={{ color: "#01CC90" }}>PNG</span> and <span style={{ color: "#01CC90" }}>JPEG</span> Compressor
      </Heading>
      <Text color="#FFFFFF" fontFamily="poppins" textAlign="center" fontWeight={200} fontSize="md">
        An ultimate image optimizer to compress your images
      </Text>
      <Box mt ={10} >
        <Center>
          <Button color="#01CC90" borderStyle="dotted" borderWidth={5} borderColor="#01CC90" width="30vw" height="15vh" boxShadow="xl">
            <Flex width="100%">
              <Spacer/>
              <Box>
                <Image
                  boxSize="3.5vw"
                  objectFit="cover"
                  borderRadius="3px"
                  src={uploadBigArrow}
                  alt="Upload your image"
                />
              </Box>
              <Spacer/>
              <Box>
                <Text fontSize="5xl" color="#4be3b6">Click Here!</Text>
                <Text color="#01CC90" fontSize="xl">to select your image.</Text>
              </Box>
              <Spacer/>
            </Flex>
          </Button>
        </Center>
      </Box>

      <Box mt ={5} >
        <Center>
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
        </Center>
      </Box>

      {isUseRateSettings ?
      (<Box mt = {5}>
        <Center>
            <Flex>
              <Text color="#01CC90" fontSize="xl" fontFamily="poppins" mr={4} fontWeight={400}>
                Compression rates  
              </Text>
              <HStack maxW="320px" >
                <Input color="#FFFFFF"/>
                <Button colorScheme="teal" variant="outline">-</Button>
                <Button colorScheme="teal" variant="outline">+</Button>
              </HStack>
            </Flex>
        </Center>
      </Box>) 
      : null}

      <Center mt ={10}>
        <Button bg="linear-gradient(90deg, rgba(48,226,173,1) 0%, rgba(142,241,212,1) 100%)" 
                color="#282A37" 
                h="6vh" 
                w="15vw" 
                boxShadow="2xl"
                fontSize="2xl">
                Compress PNG/JPEG <ArrowRightIcon ml={2} color="black"/></Button>
      </Center>

      <Box mt={10}>
        <Center>
          <Box bg="linear-gradient(90deg, rgba(48,226,173,1) 0%, rgba(142,241,212,1) 100%)" width="24vw" borderRadius="20px" boxShadow="2xl" py={2}>
            <Center>
            <Text color="black" fontSize="2xl" fontFamily="poppins" fontWeight={600}>
              Successfully Compressed!
            </Text>
            </Center>
            <Center>
            <Text color="black" fontSize="xl" fontFamily="poppins">
              0.5 seconds compression time
            </Text>
            </Center>
          </Box>
        </Center>
      </Box>


      <Box mt = {10}>
        <Flex>
          <Spacer />
          <Box bg="#121633" width="24vw" px="2vw" py="2vw" borderRadius="5px">
            <Center>
              <Text color="#01CC90" fontSize="3xl" fontFamily="poppins" mr={4}>
                Before
              </Text>
            </Center>
            <Center mb="1vw">
              <Image
                shadowBox="2xl"
                boxSize="20vw"
                objectFit="cover"
                borderRadius="3px"
                src={imgDefault}
                alt="Default Image"
                mt={5}
              />
            </Center>
            <Flex>
              <Text color="#FFFFFF" fontSize="2xl" fontFamily="poppins" mr={4}>
                Image Size
              </Text>
              <Spacer />
              <Text color="#FFFFFF" fontSize="2xl" fontFamily="poppins" mr={4}>
                356.7Kb
              </Text>
            </Flex>
          </Box>
          <Spacer />
          <Box bg="#121633" width="24vw" px="2vw" py="2vw" borderRadius="5px">
            <Center>
              <Text color="#01CC90" fontSize="3xl" fontFamily="poppins" mr={4}>
                After
              </Text>
            </Center>
            <Center mb="1vw">
              <Image
                shadowBox="2xl"
                boxSize="20vw"
                objectFit="cover"
                borderRadius="3px"
                src={imgDefault}
                alt="Default Image"
                mt={5}
              />
            </Center>
            <Box bg="linear-gradient(90deg, rgba(48,226,173,1) 0%, rgba(142,241,212,1) 100%)" width="100%" borderRadius="20px" boxShadow="2xl" py={2} my={5}>
              <Center>
              <Text color="black" fontSize="2xl" fontFamily="poppins" fontWeight={600}>
                Download Image
              </Text>
              </Center>
            </Box>
            <Flex>
              <Text color="#FFFFFF" fontSize="2xl" fontFamily="poppins" mr={4}>
                Image Size
              </Text>
              <Spacer />
              <Text color="#FFFFFF" fontSize="2xl" fontFamily="poppins" mr={4}>
                116.1Kb
              </Text>
            </Flex>
          </Box>
          <Spacer />
        </Flex>
      </Box>

      <Box mt={10} bg="#121633" width="100%" height="10vw">

      </Box>

      </Box>
    </ChakraProvider>
  );
}

export default App;