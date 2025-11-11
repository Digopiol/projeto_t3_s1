const protocolo = "http://";
const baseURL = "localhost:3000";

async function obtemfilme() {
    const filmesEndPoint = "/filmes";
    const URLcompleta = `${protocolo}${baseURL}${filmesEndPoint}`;
    const filmes = (await axios.get(URLcompleta)).data;
    // console.log(filmes)
    let tabela = document.querySelector(`.filmes`);
    let corpoTabela = tabela.getElementsByTagName(`tbody`)[0];
    // Para cada filme criar uma nova linha
    for (let filme of filmes) {
        // a inserção da linha será no inico, poderia ser no fim (sem argumentos no insertRow)
        let linha = corpoTabela.insertRow(0);
        let celulaTitulo = linha.insertCell(0);
        let celulaSinopse = linha.insertCell(1);
        celulaTitulo.innerHTML = filme.titulo;
        celulaSinopse.innerHTML = filme.sinopse;
    }
}

async function cadastrarFilmes() {
    const filmesEndPoint = "/filmes";
    // Montamos a URL completa
    const URLcompleta = `${protocolo}${baseURL}${filmesEndPoint}`;
    // Pega os inputs digitados pelo usuários
    let tituloInput = document.querySelector(`#tituloInput`);
    let sinopseInput = document.querySelector(`#sinopseInput`);
    let titulo = tituloInput.value;
    let sinopse = sinopseInput.value;
    if (titulo && sinopse) {
        // Limpa as caixinha de input
        tituloInput.value = "";
        sinopseInput.value = "";
        const filmes = (await axios.post(URLcompleta, { titulo, sinopse }))
            .data;
        // Limpar a tabela e preencher com a lista nova de filmes
        let tabela = document.querySelector(`.filmes`);
        let corpoTabela = tabela.getElementsByTagName(`tbody`)[0];
        corpoTabela.innerHTML = "";
        for (let filme of filmes) {
            let linha = corpoTabela.insertRow(0);
            let celulaTitulo = linha.insertCell(0);
            let celulaSinopse = linha.insertCell(1);
            celulaTitulo.innerHTML = filme.titulo;
            celulaSinopse.innerHTML = filme.sinopse;
        }
        exibirAlerta('.alert-filme', "Filme cadastrado com sucesso", ['show', 'alert-success'], ['d-none'], 2000)
    }
     else {
        exibirAlerta('.alert-filme', "Preencha todos os campos!", ['show', 'alert-danger'], ['d-none'], 2000 )
    }
}
async function cadastrarUsuario() {
    let usuarioCadastroInput = document.querySelector("#usuarioCadastroInput");
    let senhaCadastroInput = document.querySelector("#passwordCadastroInput");
    let usuarioCadastro = usuarioCadastroInput.value;
    let senhaCadastro = senhaCadastroInput.value;
    if (usuarioCadastro && senhaCadastro) {
        try {
            const usuarioEndpoint = "/signup";
            const URLcompleta = `${protocolo}${baseURL}${usuarioEndpoint}`;
            const dados = {
                login: usuarioCadastro,
                password: senhaCadastro,
            };
            await axios.post(URLcompleta, dados);
            usuarioCadastroInput.value = "";
            senhaCadastroInput.value = "";
            exibirAlerta(
                ".alert-cadastro",
                "Usuário cadastrado com sucesso!",
                ["show", "alert-success"],
                ["d-none"],
                2000
            );
            esconderModal("#modalCadastro", 2000);
        } catch (error) {
            console.error(error);
            exibirAlerta(
                ".alert-cadastro",
                "Usuário já existente!",
                ["show", "alert-danger"],
                ["d-none"],
                2000
            );
            esconderModal("#modalCadastro", 2000);
        }
    } else {
        exibirAlerta(
            ".alert",
            "Preencha todos os campos!",
            ["show", "alert-danger"],
            ["d-none"],
            2000
        );
    }
}

function exibirAlerta(seletor, innerHTML, classesToAdd, classesToRemove, timeout) {
    let alert = document.querySelector(seletor)
    alert.innerHTML = innerHTML
    // ... é o operaor spread que "varre" a lista e entrega à função
    alert.classList.add(...classesToAdd)
    alert.classList.remove(...classesToRemove);
    setTimeout(() => {
        alert.classList.add(...classesToRemove);
        alert.classList.remove(...classesToAdd);
    }, timeout);
}

function esconderModal(seletor, timeout) {
    setTimeout(() => {
        let modal = bootstrap.Modal.getInstance(document.querySelector(seletor))
        modal.hide()
    }, timeout)
}