const express = require('express')
const path = require('path');
const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', './views');
app.set('view engine', 'jade');

const port = 3000

const authentification = {
    username: "username",
    password: "password"
  }

app.get('/',(req, res) => {
    res.render('login')
})

app.get('/new_account',(req,res)=>{
    res.render('new_account')
})
  


app.listen(port,  () => {
    console.log(`app listening at http://localhost:${port}`)
})