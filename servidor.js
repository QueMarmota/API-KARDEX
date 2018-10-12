var express = require('express');
var jwt = require('jsonwebtoken');
var puerto = process.env.PORT || 3000;
var app = express();

app.use(express.json());

//http://localhost:3000/calificaciones?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiYWx1bW5vIiwibm9tb2JyZSI6IlJhZmFlbCBSZW50ZXJpYSIsImNsYXZlVW5pY2EiOjY2NjY2NiwiaWF0IjoxNTM5MzU1MDg5LCJleHAiOjE1MzkzNTg2ODl9.ilyKZ29ewInwsWxUf2jiaqHWCt9S7d6xDkK9KdUdT40
//se le pasa por la url el token
app.get('/calificaciones', function (req, res) {
    console.log('Token recibido ' + req.query.token);//query recibe los parametros que se mandan atra vez de la url
    //Una vez recibido el token hay q validar ese token
    //Autorizacion
    //esta funcion verify decodifica el token
    //aqui es donde podemos dar permisos a los usuarios
    jwt.verify(req.query.token, 'AbrasosNoBalasos',
        function (error,token) {
            if (error) {
                res.status(403).json({ mensaje: 'Autorizacion no valida' })
            }
            else {
                res.json({
                    mensaje: 'Bienvenido '+token.usuario+' aqui estan las calificaciones...',
                })
            }
        })

})

app.listen(puerto, function () {
    console.log('Server running in port : ' + puerto);
});
/* http://localhost:3000/login
Body raw json
{
	"email":"profesor@uaslp.mx",
	"password":"abc"
}
*/
app.post('/login', function (req, res) {
    //Esto simula la base de datos
    var alumno = {
        email: 'alumno@uaslp.mx',
        password: '123'
    };
    var profesor={
        email:'profesor@uaslp.mx',
        password:'abc'
    }
    //Para mandar los datos hay q mandarlos por post pero por el body atravez de un json
    if (req.body.email == alumno.email && req.body.password == alumno.password) {
        var token = jwt.sign(
            {
                usuario: 'alumno',
                nomobre: 'Rafael Renteria',
                claveUnica: 666666
            },
            'AbrasosNoBalasos', { expiresIn: '1h' });
        console.log('Token generated : ' + token);
        res.json({ ElToken: token ,
            mensaje: 'Bienvenido Alumno'
        
        });
    }
    else if (req.body.email == profesor.email && req.body.password == profesor.password) {
        var token = jwt.sign(
            {
                usuario: 'profesor',
               
            },
            'AbrasosNoBalasos', { expiresIn: '1h' });
        console.log('Token generated : ' + token);
        res.json({ ElToken: token ,
            mensaje: 'Bienvenido Profesor'
        
        });
    }
    else{
        req.status(401).json({mensaje: 'Credenciales no válidas',
        ElToken: null
    })
    }

})