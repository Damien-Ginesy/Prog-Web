const express = require('express')
const path = require('path');
const session = require('express-session')
const SQLiteStore = require('connect-sqlite3')(session);


const app = express()
const bodyParser = require('body-parser');
const port = 3000

const sess = {
    store: new SQLiteStore,
    secret: 'secret key',
    resave: true,
    rolling: true,
    cookie: {
      maxAge: 1000 * 3600//ms
    },
    saveUninitialized: true
}

const authentification = {
    pseudo: "Titi",
    email: "TinoRossi@wanadoo.fr",
    password: "Marinella"
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}
app.use(session(sess));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', './views');
app.set('view engine', 'jade');

app.get('/login',(req, res) => {
    res.render('login')
})

app.post('/login',(req,res)=>{
    const email = req.body.inputEmail
    const password = req.body.inputPassword
    if(email == authentification.email&& password == authentification.password){
        req.session.logged = true
    }
    res.redirect(302,'/')
})

app.post('/logout',(req, res) => {
    req.session.logged = false
    res.redirect(302,'/login')
  })

app.get('/new_account',(req,res)=>{
    res.render('new_account')
})

app.post('/new_account',(req,res) =>{
    authentification.pseudo = req.body.inputPseudo
    authentification.email = req.body.inputEmail
    authentification.password = req.body.inputPassword
    res.redirect(302,'/login')

})

app.get('/',async(req,res)=>{
    if(!req.session.logged){
        res.redirect(302,'/login')
    }
    else{
        res.render('home_page')
    }
})

app.listen(port,() => {
    console.log(`app listening at http://localhost:${port}`)
})