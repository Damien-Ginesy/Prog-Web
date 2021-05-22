const express = require('express')
const path = require('path');
const fs = require('fs')
const {openDb} = require("./db")
const session = require('express-session')
const SQLiteStore = require('connect-sqlite3')(session);


const app = express()
const bodyParser = require('body-parser');
const { time } = require('console');
const db = require('./db');
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
    pseudo: "Bob",
    email: "bob@wanadoo.fr",
    password: "123456"
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}
app.use(session(sess));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', './views');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

function Date_parser(date){
    date = Math.floor(date/1000)
    jour = Math.floor(date/(3600*24))
    heure = Math.floor((date-(jour*3600*24))/3600)
    minute = Math.floor((date - (jour*3600*24)-(heure*3600))/60)
    if(jour !== 0){
        return jour+" days "
    }
    else if(heure !== 0){
        return heure+" hours "
    }
    else if (minute !== 0){
        return minute+ " minutes "
    }
    else{
        return date+" secondes"
    }
}

app.get('/login',(req, res) => {
    res.render('login',{errors:""})
})

app.post('/login',async(req,res)=>{
    const email = req.body.inputEmailLogin
    const password = req.body.inputPasswordLogin
    let data = {}
    const db = await openDb()
    const user = await db.get(`SELECT * FROM Users WHERE email = ? AND password = ?`,
    [email,password])
    if(user !== undefined)
    {
        req.session.logged = true
        let current_user = {
            id: user.id,
            pseudo: user.pseudo,
            email:user.email,
            password:user.password
        }
        let data = JSON.stringify(current_user)
        fs.writeFileSync('current_user.json',data)
    }
    else{
        data = {
            errors: "Mot de passe ou identifiant incorrect"
        }
        res.render('login',data)
    }
    res.redirect(302,'/')
})

app.get('/logout',(req, res) => {
    if(req.session.logged){
        req.session.logged = false
        let current_user = {
            id: 0,
            pseudo: "test",
            email: "test",
            password: "test"
        }
        let data = JSON.stringify(current_user)
        fs.writeFileSync('current_user.json',data)
    }
    res.redirect(302,'/login')
})

app.get('/new_account',(req,res)=>{
    res.render('new_account',{errors:""})
})

app.post('/new_account',async(req,res) =>{
    pseudo = req.body.inputPseudo
    email = req.body.inputEmail
    password = req.body.inputPassword
    let data = {}
    if(pseudo.length <= 4){
        data = {
            errors: "Le pseudo doit contenir plus de 4 caractères"
        }
    }
    else if (password.length < 6){
        data = {
            errors: "Le mot de passe doit contenir au minimum 6 caractères"
        }
    }
    if(data.errors){
        res.render("new_account",data)
    }
    else{
        const db = await openDb()
        await db.run(`INSERT INTO Users(pseudo,email,password) VALUES(?,?,?)`,[pseudo,email,password])
        res.redirect(302,'/login')
    }
    
})

app.get('/my_account',(req,res) =>{
    if(req.session.logged == false){
        res.redirect(302,'/login')
    }
    else{
        let rawdata = fs.readFileSync('current_user.json');
        let user = JSON.parse(rawdata);
        res.render('my_account',{pseudo:user.pseudo,email:user.email})
    }
    
})

app.get('/add_post',(req,res)=>{
    res.render('add_post')
})

app.post('/add_post',async(req,res)=>{
    let rawdata = fs.readFileSync('current_user.json');
    let save_user = JSON.parse(rawdata);
    titre = req.body.titre
    lien = req.body.lien
    image = req.body.image
    text = req.body.texte
    const db = await openDb()
    await db.run(`INSERT INTO Posts(title,lien,image,text,commentaire,time,votes,createur) VALUES(?,?,?,?,?,?,?,?)`,[titre,lien,image,text,"",Date.now(),0,save_user.id])
    res.redirect(302,'/')
})

app.get('/vote_up/:id',async(req,res)=>{
    const db = await openDb()
    const post = await db.get(`SELECT votes FROM Posts WHERE id=?`,[req.params.id])
    vote = post.votes+1
    await db.run(`UPDATE Posts SET votes=? WHERE id=?`,[vote,req.params.id]);
    res.redirect(302,'/');
})

app.get('/vote_down/:id',async(req,res)=>{
    const db = await openDb()
    const post = await db.get(`SELECT votes FROM Posts WHERE id=?`,[req.params.id])
    vote = post.votes-1
    await db.run(`UPDATE Posts SET votes=? WHERE id=?`,[vote,req.params.id]);
    res.redirect(302,'/');
})   
app.get('/comment',(req,res)=>{
    res.render('comment_page')
})

app.get('/add_comment',(req,res)=>{
    res.render('add_comment')
})

app.get('/',async(req,res)=>{
    let rawdata = fs.readFileSync('current_user.json');
    let save_user = JSON.parse(rawdata);
    if(save_user.id !== 0){
        req.session.logged = true
    }
    if(!req.session.logged){
        res.redirect(302,'/login')
    }
    else{
        const db = await openDb()
        posts = await db.all(`SELECT * FROM Posts LEFT JOIN Users ON Users.id = Posts.createur ORDER BY Posts.votes DESC`)
        var time_array = []
        for(post of posts){
            var time_now =  Date.now()
            time_now = time_now - post.time
            date = Date_parser(time_now)
            time_array.push(date)
        }
        res.render('home_page',{posts:posts,time:time_array})
    }
})

app.listen(port,() => {
    console.log(`app listening at http://localhost:${port}`)
})
