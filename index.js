const express = require('express') //express 가져옴
const app = express() //앱을만듬
const port = 4000 //포트설정해줌

const mongoose = require('mongoose'); 
mongoose.connect('mongodb+srv://sooin:mimiru0502@boiler-plate.clt2w.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then( ()=> {
    console.log("몽고디비 연결됨..")
}).catch( (err)=> {
    console.log(err)
});

app.get('/', (req, res) => { //req(요청) 및 res(응답)
  res.send('Hello World~~~!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

// var os = require( 'os' );
// var networkInterfaces = os.networkInterfaces( );
// console.log( networkInterfaces );


