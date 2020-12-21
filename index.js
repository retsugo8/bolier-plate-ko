const express = require('express') //express 가져옴
const app = express() //앱을만듬
const port = 4000 //포트설정해줌
const bodyParser = require('body-parser');
const config = require("./config/key");
 
//application/x-www-form-urlencoded 라는 데이터를 분석해서 가져올수있게 해주는것
app.use(bodyParser.urlencoded({ extended: true,}));

//application/json 이렇게 된것을 분석해서 가져올수 있게 해주는것
app.use(bodyParser.json());

const mongoose = require('mongoose'); 
mongoose.connect(config.mongoURI,{
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
  res.send('헬로월드')
})

app.post("/register", (req, res) => {
   //회원가입 할때 필요한 정보를 client에서 가져오면
   //그것들을 데이터베이스에 넣어줍니다.
   /*
   req.body -->
    {id:"hello"
    pasword:"123"} 이런형태
   */
   const user = new User(req.body);
   console.log(user);
   user.save((err,userInfo) => {
      if(err) return res.json({success: false, err});
      
      //sucess를 false로 알려주고 err내용을 알려준다.
      //에러가 없으면
      
      //status(200) 성공했따.
      return res.status(200).json({
          success:true
      });

    });

});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

// var os = require( 'os' );
// var networkInterfaces = os.networkInterfaces( );
// console.log( networkInterfaces );


