const express = require('express')
const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.set('views', '../views/jade');
app.set('view engine', 'jade');

const port = 3000

const authentification = {
    username: "username",
    password: "password"
  }

app.get('/login',(req, res) => {
    res.render('login')
})
  


app.listen(port,  () => {
    console.log(`app listening at http://localhost:${port}`)
})