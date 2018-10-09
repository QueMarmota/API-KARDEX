var express = require('express');
var jwt = require('jsonwebtoken');
var puerto = process.env.PORT||3000;
var app = express();

app.use(express.json());
app.get('/calificaciones',function(req,res){
    res.json({
        mensaje:'Welcome to my API KARDEX'
    })
})

app.listen(puerto,function(){
    console.log('Server running in port : '+puerto);
});

app.post('/login',function(req,res){
    var token = jwt.sign(
        {usuario:'alumno'}, 'ClaveSuperSecreta',{expiresIn:'60s'} );
        console.log('Token generated : '+token);
        res.json({ElToken:token});
})