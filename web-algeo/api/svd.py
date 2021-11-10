from PIL import Image
from numpy import array,transpose,matmul,zeros,sqrt,add,dot,diag,uint8,ones,abs,outer,divide,zeros_like
from numpy.linalg import norm

def bagiTiapElemen(a,b):
    return divide(a,b,out=zeros_like(a, dtype=float),where=b!=0)

def eigenDominan(A, toleransi=1e-10):
    m, n = A.shape
    k=min(m,n)
    v = ones(k) / sqrt(k)
    if m > n:
        A = matmul(transpose(A),A)
    elif m < n:
        A = matmul(A,transpose(A))
    
    nilaiEigen = bagiTiapElemen((matmul(A,v),v))[0]

    while( True):
        Av = matmul(A,v)
        vBaru = Av / norm(Av)
        nilaiEigenBaru = (bagiTiapElemen(matmul(A,vBaru),vBaru))[0]
        if abs(nilaiEigen - nilaiEigenBaru) < toleransi:
            break

        v = vBaru
        nilaiEigen = nilaiEigenBaru

    return nilaiEigenBaru, vBaru

def svd(A, k=None, toleransi=1e-10):
    A = array(A, dtype=float)
    m, n = A.shape
        
    SVDKeN = []
    if k is None:
        k = min(m, n)

    for i in range(k):
        salinanA = A.copy()

        for u, nilaiSingular, v in SVDKeN[:i]:
            salinanA -= nilaiSingular * outer(u, v)

        if m > n:
            _, v = eigenDominan(salinanA, toleransi=toleransi)
            uAwal = matmul(A,v)
            sigma = norm(uAwal)  
            u = uAwal / sigma
        else:
            _, u = eigenDominan(salinanA, toleransi=toleransi)
            vAwal = matmul(transpose(A),u)
            sigma = norm(vAwal)  
            v = vAwal / sigma

        SVDKeN.append((u, sigma, v))

    us, S, vs = [array(x) for x in zip(*SVDKeN)]
    return transpose(us), S, vs

def kompresiSVD(arr,k):
  u,s,v=svd(arr,k)
  hasilKompresi=dot(u[:,:k],dot(diag(s[:k]),v[:k,:]))
  return hasilKompresi

def kompresiGambarNLayer(arr,n,k):
  hasil=zeros(arr.shape)
  for i in range(n):
    hasil[:,:,i]=kompresiSVD(arr[:,:,i],k)
  return hasil

def pertahankanTransparansi(arr):
  channel=arr.shape[2]
  for i in range(arr.shape[0]):
    for j in range(arr.shape[1]):
      if arr[i,j,-1]==0:
        arr[i,j,:]=[0 for x in range(channel)]
  return arr

def finalisasi(arr):
  arr=(arr-arr.min())/(arr.max()-arr.min())*255
  im = Image.fromarray(arr.astype(uint8))
  return im