Paquetes de intalacion
            npm install -y
            npm install express
            npm install jsonwebtokens

jwt.sign(payload, secretOrPrivateKey, [options, callback])
        json      llaveprimaria        

https://jwt.io/ para decodificar el token

AUTORIZACION Y AUTENTIFICACION

Cadena formada por
                        Tipo de toker
1) Encabezado--->
                        Algoritmo de codificacion
2)Paylod(datos)

3)Firma de verificacion

Node

npm install jsonwebtoken

var jwt require('jsonwebtoken');

jwt.sign(payload,clave,optiones)
        /login
Cliente <------>  API
        /token    genera token
                  Verificarel token

