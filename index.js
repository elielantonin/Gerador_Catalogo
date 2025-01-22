document.addEventListener("DOMContentLoaded", function () {
    let produtos = JSON.parse(localStorage.getItem("produtos")) || {};
    let catalogo = document.querySelector(".catalogo");

    catalogo.innerHTML = ""; // Limpa os produtos fixos

    // Loop para adicionar os produtos no catálogo
    for (let numero in produtos) {
        let produto = produtos[numero];

        let produtoHTML = `
            <div class="produto">
                <img src="${produto.imagem}" alt="${produto.nome}">
                <h2>${produto.nome}</h2>
                <span>R$ ${produto.preco}</span>
                <button onclick="enviarWhatsApp('${produto.nome}', '${produto.preco}', '${produto.imagem}')">
                    <img src="whatsapp-icon.png" alt="WhatsApp"> Pedir pelo WhatsApp
                </button>
            </div>
        `;
        catalogo.innerHTML += produtoHTML;
    }
});

// Função para enviar mensagem pelo WhatsApp

function enviarWhatsApp(nome, preco, imagem) {
    let numeroWhatsApp = '554195640584';  // Número no formato correto

    // Construindo a mensagem sem emojis
    let mensagem = `Olá! Estou interessado no seguinte produto:\n\nNome: ${nome}\nPreço: R$ ${preco}\nVeja aqui:`;

    // Codificando a mensagem para evitar erros na URL
    let mensagemCodificada = encodeURIComponent(mensagem);

    // Criando a URL do WhatsApp
    let url = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;

    // Abrindo o WhatsApp
    window.open(url, "_blank");
}

function pesquisarProduto() {
    let input = document.getElementById("search").value.toLowerCase(); // Obtém o texto digitado em minúsculas
    let produtos = document.querySelectorAll(".produto"); // Seleciona todos os produtos exibidos

    produtos.forEach(produto => {
        let nome = produto.querySelector("h2").innerText.toLowerCase(); // Obtém o nome do produto
        if (nome.includes(input)) {
            produto.style.display = "block"; // Mostra os produtos que correspondem à pesquisa
        } else {
            produto.style.display = "none"; // Oculta os produtos que não correspondem
        }
    });
}
