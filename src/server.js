const express = require("express")
const server = express()
//pegando o bd
const db = require("./database/db")


//config 

// pasta pública
server.use(express.static("public"))

// template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//habilitando o req.body
server.use(express.urlencoded({extended:true}))


//rotas
server.get("/", (req, res)=>{
  return  res.render("index.html", {title: "um titulo"})
})

server.get("/create-point", (req, res)=>{
//req.query: Query string da aplicação
  // console.log(req.query)

   return res.render("createPoint.html")

})

///////////////////////////////////////////////////////////

server.post("/save-point", (req, res)=>{
//req.body: corpo do formulário
   console.log(req.body)
   

//inserindo dados
const query =  `
       INSERT INTO places (
          image,
          name,
           address,
           address2,
           state,
           city,
           itens
       ) values (?,?,?,?,?,?,?);
       `

        const values = [
     req.body.imagem,
     req.body.name,
     req.body.address,
     req.body.address2,
     req.body.state,
     req.body.city,
     req.body.itens
     ]

     function afterInsertData(err){
        if(err){
            return console.log(err)
            return res.send("Erro no cadastro")
        }

        console.log("Cadastrado com sucesso")
       console.log(this)
       return res.render("createPoint.html", {saved: true})
     }

     db.run(query, values, afterInsertData)
      
})

///////////////////////////////////////////////////////////

server.get("/results", (req, res)=>{

   const search = req.query.search

   if(search == ""){
      //pesquisa vazia
      return  res.render("searchResults.html", {total: 0})
   }
  // pegando os dados do db
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
   if(err){
      return console.log(err)
   }
const total = rows.length

    //mostrar a página html com os dados do bd
     console.log("Aqui estão seus registros")

  return  res.render("searchResults.html", {places: rows, total: total})
   })




  
})

server.listen(3000)