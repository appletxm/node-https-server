## 用nodejs创建https服务器

###创建证书
```
mkdir certificate
cd certificate
openssl

genrsa -out private.pem 2048
req -new -key private.pem -out csr.pem
....

x509 -req  -in csr.pem -signkey private.pem -out csr.crt
```

###创建证书二
```
openssl genrsa -out ca.key 1024  
//这里是CA生成的私钥，文件名为ca.key  
openssl req -new -key ca.key -out ca.csr  
//这里是CA通过自己的私钥生成CSR文件，文件名为ca.csr  
openssl x509 -req -in ca.csr -signkey ca.key -out ca.crt  
//这里是通过把CA的csr文件用私钥进行签名，最后生成一个证书的过程，证书名字为ca.crt 
```
