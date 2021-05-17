const {openDb} = require("./db")

const tablesNames=["Users","Posts"]

async function createUsers(db){
    const insertRequest = await db.prepare("INSERT INTO Users(pseudo,email,password) VALUES(?,?,?)")
    const users = [{
        pseudo:"Bob",
        email:"bob@wanadoo.fr",
        password:"123456"
    },
    {
        pseudo:"Roger",
        email:"roger@wanadoo.fr",
        password:"123456"
    }]
    return await Promise.all(users.map(user => {
        return insertRequest.run([user.pseudo,user.email,user.password])
    }))
}

async function createPosts(db){
    const insertRequest = await db.prepare("INSERT INTO Posts(title,lien,image,text,commentaire,time,createur) VALUES(?,?,?,?,?,?,?)")
    const posts = [{
        title: "google",
        lien:"www.google.fr",
        image:null,
        text:"",
        commentaire:"",
        time:Date.now()/1000,
        createur:1
    }]
    return await Promise.all(posts.map(post => {
        return insertRequest.run([post.title,post.lien,post.image,post.text,post.commentaire,post.time,post.createur])
    }))
}

async function createTables(db){
    const Users = db.run(`
      CREATE TABLE IF NOT EXISTS Users(
        id INTEGER PRIMARY KEY,
        pseudo varchar(255),
        email varchar(255),
        password varchar(255)
      )
    `)
    const Posts = db.run(`
          CREATE TABLE IF NOT EXISTS Posts(
            id INTEGER PRIMARY KEY,
            title varchar(255),
            lien varchar(255),
            image varchar(255),
            text text,
            commentaire text,
            time int,
            createur int,
            FOREIGN KEY(createur) REFERENCES Users(id)
          )
    `)
    return await Promise.all([Users,Posts])
}

async function dropTables(db){
    return await Promise.all(tablesNames.map( tableName => {
        return db.run(`DROP TABLE IF EXISTS ${tableName}`)
      }
    ))
}
  
(async () => {
    // open the database
    let db = await openDb()
    await dropTables(db)
    await createTables(db)
    await createUsers(db)
    await createPosts(db)
})()