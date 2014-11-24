openssl genrsa -out server.pem 2048

openssl req -new -key server.pem -out server.csr
#For Common Name, enter random.codeindeed.com.

openssl x509 -req -days 365 -in server.csr -signkey server.pem -out server.crt

