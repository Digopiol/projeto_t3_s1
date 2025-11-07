// aqui
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
        let celulaTitulo = linha.insertCell(0)
        let celulaSinopse = linha.insertCell(1)
        celulaTitulo.innerHTML = filme.titulo;
        celulaSinopse.innerHTML = filme.sinopse;
    }
};
async function cadastrarFilmes() {
    const filmesEndPoint = "/filmes";
    // montamos a URL completa
    const URLcompleta = `${protocolo}${baseURL}${filmesEndPoint}`
    // pega os inputs
    let tituloInput = document.querySelector('#tituloInput');
    let sinopseInput = document.querySelector('#sinopseInput');
    let titulo = tituloInput.value;
    let sinopse = sinopseInput.value;
    if (titulo && sinopse) {
        tituloInput.value = ""

        // limpa as caiinhas de input
        tituloInput.value = "";
        sinopseInput.value = "";
        const filmes = (await axios.post(URLcompleta, { titulo, sinopse })).data;

        // limpar a tabela e preencher com a lista nova de filmes
        let tabela = document.querySelector('.filmes');
        let corpoTabela = tabela.getElementsByTagName('tbody')[0];
        corpoTabela.innerHTML = "";
        filmes.forEach((filme) => {
            let linha = corpoTabela.insertRow(0);
            let celulaTitulo = linha.insertCell(0);
            let celulaSinopse = linha.insertCell(1);
            celulaTitulo.innerHTML = filme.titulo;
            celulaSinopse.innerHTML = filme.sinopse;
        })
    }
    else {
        // exibir o llerta por até 2 segundos
        let alert = document.querySelector('.alert-filme')
        alert.classList.add('show')
        alert.classList.remove('d-none')
        setTimeout(() => {
            alert.classList.remove('show')
            alert.classList.add('d-none')
        }, 2000)
    }
}
async function cadastrarUsuario() {
    // posicionar nas caixinhas de input
    let usuarioCadastroInput = document.querySelector("#usuarioCadastroInput")
    let passwordCadastroInput = document.querySelector("#passwordCadastroInput")
    // captura os valores digitados
    let usuarioCadastro = usuarioCadastroInput.value
    let passwordCadastro = passwordCadastroInput.value
    // validar se o usuário digitou coisas, 
    if (usuarioCadastro && passwordCadastro) {
        //se digitou ele vai fazer uma requisião no banco
        try {
            const cadastroEndpoint = '/signup'
            const URLcompleta = `${protocolo}${baseURL}${cadastroEndpoint}`
            await axio.post (URLcompleta, {login: usuarioCadastro, password: passwordCadastro})
            usuarioCadastroInput.value = ""
            passwordCadastroInput.value = ""
            let alert = document.querySelector('.alert-modal-cadastro')
            alert.innerHTML = "Usuário cadastrado com sucesso!!!"
            alert.classList.add('show', 'alert-danger')
            alert.classList.remove('d-none')
            setTimeout(() => {
                alert.classList.add('d-none')
                alert.classList.remove('show', 'alert-success')
                modalCadastro = bootstrap.Modal.getInstance(document.querySelector('#modalCadastro'))
                modalCadastro.hide()
            }, 2000)
        }
        catch (erro) {
            let alert = document.querySelector('.alert-modal-cadastro')
            alert.innerHTML = "Não foi possível cadastrar usuário!!!"
            alert.classList.add('show', 'alert-danger')
            alert.classList.remove('d-none')
            setTimeout(() => {
                alert.classList.add('d-none')
                alert.classList.remove('show', 'alert-danger')
                modalCadastro = bootstrap.Modal.getInstance(document.querySelector('#modalCadastro'))
                modalCadastro.hide()
            }, 2000)
        }
    }
    else {
        let alert = document.querySelector('.alert-modal-cadastro')
        alert.innerHTML = "Preencha todos os campos"
        alert.classList.add('show', 'alert-danger')
        alert.classList.remove('d-none')
        setTimeout(() => {
            alert.classList.add('d-none')
            alert.classList.remove('show', 'alert-danger')
        }, 2000)
    }
}   