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