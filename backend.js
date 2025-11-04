// string conexao com banco de dadosn mongodb+srv://digopiol_db_user:SenhaDeGente1234@machion.1yft9al.mongodb.net/?retryWrites=true&w=majority&appName=machion
const express = require("express");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt")
const uniqueValidator = require("mongoose-unique-validator")
require("dotenv").config();
app.use(express.json());
app.use(cors());
const mongoose = require("mongoose");


const Filme = mongoose.model("Filme", mongoose.Schema({
    titulo: {type: String},
    sinopse: {type: String}
}))


const usuarioSchema = mongoose.Schema({
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})
usuarioSchema.plugin(uniqueValidator)
const Usuario = mongoose.model("Usuario", usuarioSchema)

const stringConexao = process.env.CONEXAO_BD;



async function conectarAoMongoDB() {
    await mongoose.connect(stringConexao);
}   

// Requisição GET no endereço http://localhost:3000/Ola
app.get("/Ola", (req, res) => {
    res.send("Ola");
});


let filmes = [
    // {
    // titulo: "Forrest Gump - O Contador de Histórias",
    // sinopse: "Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gump (Tom Hanks),um rapaz com QI abaixo da média e boas intenções."
    // },
    // {
    // titulo: "Um Sonho de Liberdade",
    // sinopse: "Em 1946, Andy Dufresne (Tim Robbins), um jovem e bem sucedido banqueiro, tem a sua vida radicalmente modificada ao ser condenado por um crime que nunca cometeu, o homicídio de sua esposa e do amante dela"
    // },
    ];


// Requisição GET para obter a lista de filmes: http://localhost:3000/filmes
app.get("/filmes", async(req, res) => {
    const filmes = await Filme.find()
    res.json(filmes);
})

// Requisição para cadastrar um novo filme no banco
// post http://localhost:3000/filmes
app.post("/filmes", async(req, res) => {
    // Obtem as informações que chegam
    const titulo = req.body.titulo;
    const sinopse = req.body.sinopse;
    // Monta um objeto de acordo com o model Filme
    const filme = new Filme( {titulo: titulo, sinopse: sinopse});
    // mandar o filme para o banco
    await filme.save()
    // Buscar a lista de filmes atualizada do banco
    const filmes = await Filme.find()
    res.json(filmes);
})

app.post('/signup', async(req, res) => {
    try {const login = req.body.login
        const password = req.body.password
        const passwordCriptografada = await bcrypt.hash(password, 10)
        const usuario = new Usuario({ login: login, password: passwordCriptografada})
        const respMongo = await usuario.save()
        console.log(respMongo)
        res.status(201).end()
    }
    catch (exception) {
        console.log(exception)
        res.status(409).end()
    }
})


app.post('/login', async (req, res) => {
    // capturar oque o usuário digitou
    const login = req.body.login
    const password = req.body.password
    // faz a busca no MongoDB
    const user = await Usuario.findOne({login: login})
    if (!user) {
        // Usuário não foi encontrado
        return response.status(401).json({mensagem: "usuário inválido"})
    }
    const senhaValida = bcrypt.compare(password, usser.password)
if (!senhaValida) {
    //  senha incorrea
    return res.status(401).json({mensagem: "senha inválida"})
    }

    // gerar o 
})

app.listen(3000, () => {
    try {
        conectarAoMongoDB();
        console.log("Servidor up and Running");
    } catch (e) {
        console.log("erro: " + e);
    }
});