var express = require("express");
var bodyParser = require("body-parser");
var MongoClient = require("mongodb");
objectId = require("mongodb").ObjectId;


var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE,UPDATE, PATCH"); 
    res.header("Access-Control-Allow-Headers", "content-type"); 
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

var port = 8080;
app.listen(port);

var client = new MongoClient.MongoClient("mongodb://localhost:27017");


console.log("online");

app.get('/', function(req, res) {
    return res.send('oi')
})

app.post("/api", async(req, res)=> {    
    var dados = req.body;
    await client.connect();
    const db = client.db("todolist");
    const resultado = await db.collection("tarefas").insertOne(dados); 
    client.close();
   return res.json(resultado);
});

app.get("/api", async (req, res) =>{
    await client.connect();
    const db = client.db("todolist");
    const resultado = await db.collection("tarefas").find({arquivar: false}).toArray(); 
    client.close();
   return res.json(resultado);
});


app.get("/api/arquivados", async (req, res) =>{
    await client.connect();
    const db = client.db("todolist");
    const resultado = await db.collection("tarefas").find({arquivar: true}).toArray(); 
    client.close();
   return res.json(resultado);
});



//por Id agr
app.get("/api/:id", async(req, res) =>{
    await client.connect();
    const db = client.db("todolist");
    const resultado = await db.collection("tarefas").find(objectId(req.params.id)).toArray(); 
    client.close();
   return res.json(resultado);    
});

app.put("/api/:id", async(req, res) =>{    
    const id = req.params.id    
    await client.connect();
    const db = client.db("todolist");
    const resultado = await db.collection("tarefas").updateOne({ _id: objectId(id) }, { $set: { completed: true } }); 
    client.close();    
   return res.status(200).send(resultado);   

    
});


app.put("/api/arquivar/:id", async(req, res)=> {    
    const id = req.params.id
    await client.connect();
    const db = client.db("todolist");
    const resultado = await db.collection("tarefas").updateOne({ _id: objectId(id) }, { $set: { arquivar: true } }); 
    client.close();    
   return res.status(200).send(resultado);   

});

app.put("/api/desarquivar/:id", async(req, res)=> {    
    const id = req.params.id
    await client.connect();
    const db = client.db("todolist");
    const resultado = await db.collection("tarefas").updateOne({ _id: objectId(id) }, { $set: { arquivar: false } }); 
    client.close();    
   return res.status(200).send(resultado);   

});


app.put("/api/atualizar/:id", async(req, res) => {    
    const id = req.params.id
    if( !id ){
        return res.status(400).json({
            error: {
                message:"deu erro"
            }
        })
    }

    const dados = {}
    if (req.body.descricao)
        dados.descricao = req.body.descricao
    if (req.body.data)
        dados.data = req.body.data
    console.log(id)
        await client.connect();
        const db = client.db("todolist");
        const resultado = await db.collection("tarefas").updateOne({ _id: objectId(id) }, { $set: dados }); 
        console.log(dados)
        client.close();    
       return res.status(200).send(resultado);   
});


app.delete("/api/:id", async(req, res) =>{
    await client.connect();
    const db = client.db("todolist");
    const resultado = await db.collection("tarefas").deleteOne({ _id: objectId(req.params.id)}); 
    client.close();
   return res.json(resultado);
    
});

app.get("/api/search/:query", async(req, res)=> {
    await client.connect();
    const db = client.db("todolist");
    const resultado = await db.collection("tarefas").find({descricao : new RegExp(req.params.query, "i")}).toArray(); 
    client.close();
   return res.json(resultado);    
});

