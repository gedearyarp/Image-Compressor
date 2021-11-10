from flask import Flask, request
from flask_cors import CORS
from time import perf_counter
from PIL import Image
from numpy import array
from svd import *
import io
import base64

app = Flask(__name__)
CORS(app)
# venv\Scripts\activate
# python api.py
@app.route('/compress', methods=['POST', 'GET'])
def compressImage():
    imageURL = request.get_json()
    imageBase64 = imageURL["data"]
    compressionRates = imageURL["rates"]
    if(compressionRates=='low'):
        tingkatKompresi=3
    elif(compressionRates=='med'):
        tingkatKompresi=2
    else:
        tingkatKompresi=1
    mulai=perf_counter()

    sebelum_img=Image.open(io.BytesIO(base64.b64decode(imageBase64)))
    sebelum_array=array(sebelum_img)
    m=sebelum_array.shape[0]
    n=sebelum_array.shape[1]
    banyakEigen = min(m,n)
    k = banyakEigen//(tingkatKompresi*3)
    if(sebelum_img.mode=='RGB'):
        setelah_array=kompresiGambarNLayer(sebelum_array,3,k)
        im = finalisasi(setelah_array)
        im=base64.b64encode(im)
    elif(sebelum_img.mode=='L'):
        setelah_array=kompresiGambarNLayer(sebelum_array,1,k)
        im = finalisasi(setelah_array)
        im=base64.b64encode(im)
    elif(sebelum_img.mode=='RGBA'):
        a=sebelum_array[:,:,3]
        setelah_array=kompresiGambarNLayer(sebelum_array,3,k)
        setelah_array[:,:,3]=a
        setelah_array=pertahankanTransparansi(setelah_array)
        im = finalisasi(setelah_array)
        im=base64.b64encode(im)
    elif(sebelum_img.mode=='LA'):
        a=sebelum_array[:,:,1]
        setelah_array=kompresiGambarNLayer(sebelum_array,1,k)
        setelah_array[:,:,1]=a
        setelah_array=pertahankanTransparansi(setelah_array)
        im = finalisasi(setelah_array)
        im=base64.b64encode(im)
    else:
        try:
            setelah_array=kompresiGambarNLayer(sebelum_array,sebelum_array.shape[2],k)
            im = finalisasi(setelah_array)
            im=base64.b64encode(im)
        except:
            print('Proses gagal !')
            im=''

    selesai=perf_counter()
    lama=selesai-mulai
    rasio=100*(k*(m+n)+k)/(m*n)
    print(f'Waktu pengerjaan : {lama} detik')
    print(f'Rasio kompresi : {rasio}%')     
    return im,lama,rasio

if __name__ == '__main__':
    app.run(debug=True)
