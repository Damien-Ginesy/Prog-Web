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
    const insertRequest = await db.prepare("INSERT INTO Posts(title,lien,image,text,commentaire,time,votes,createur) VALUES(?,?,?,?,?,?,?,?)")
    const posts = [{
        title: "Napoléon 1er",
        lien:"https://fr.wikipedia.org/wiki/Napol%C3%A9on_Ier",
        image:"/images/Napoleon_Ier_en_costume_du_Sacre.jpg",
        text:"Napoléon Bonaparte, né le 15 août 1769 à Ajaccio et mort le 5 mai 1821 sur l'île Sainte-Hélène, est un militaire et homme d'État français, premier empereur des Français du 18 mai 1804 au 6 avril 1814 et du 20 mars au 22 juin 1815, sous le nom de Napoléon Ier.",
        commentaire:"",
        time:Date.now(),
        votes: 0,
        createur:1
    },{
        title: "Tino Rossi",
        lien:"https://fr.wikipedia.org/wiki/Tino_Rossi",
        image:"/images/tino_rossi_melody_ina_600.jpg",
        text:"Constantin Rossi, dit Tino Rossi, est un chanteur et acteur français, né le 29 avril 1907 à Ajaccio (Corse) et mort le 27 septembre 1983 à Neuilly-sur-Seine (Hauts-de-Seine). Sa chanson Petit Papa Noël, sortie en 1946, demeure la chanson la plus vendue de l'histoire en France.",
        commentaire:"",
        time:Date.now(),
        votes: 0,
        createur:2
    }]
    return await Promise.all(posts.map(post => {
        return insertRequest.run([post.title,post.lien,post.image,post.text,post.commentaire,post.time,post.votes,post.createur])
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
            votes int,
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