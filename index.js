const express = require('express')//express 가져옴
const app = express() //앱을만듬
const port = 4000 //포트설정해줌
const bodyParser = require('body-parser');
const config = require('./config/key');
const { User } = require("./models/Users");
 
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

app.post('/register', (req, res) => {
  //회원 가입 할떄 필요한 정보들을  client에서 가져오면 
  //그것들을 데이터 베이스에 넣어준다. 
  const user = new User(req.body)

  //MongoDB에 사용자를 저장
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true
    })
  });
})

app.post("/login", (req,res)=> {
  // 1.요청된 이메일을 데이터 베이스에서 있는지 찾는다.
    User.findOne({ email:req.body.email }, (err,user) => {
      if(!user){
        return res.json({
          loginSuccess : false,
          message: "제공된 이메일에 해당하는 유저가 없습니다."
        })
      }
      // 2.데이터 베이스에서 요청한 이메일이 있다면 비밀번호가 같은지 확인
      user.comparePassword(req.body.password,(err,isMatch) => {
        if(!isMatch){
          return res.json({
            loginSuccess : false,message: "비밀번호가 틀렸습니다."
          });
        }
        //3.비밀번호까지 맞다면토큰을 생성하기.
        user.generateToken((err,user) => {

        });
      });

    });
  
  // 3.비밀번호까지 맞닥면 토큰을 생성하기
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

// var os = require( 'os' );
// var networkInterfaces = os.networkInterfaces( );
// console.log( networkInterfaces );


