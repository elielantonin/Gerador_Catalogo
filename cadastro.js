document.addEventListener("DOMContentLoaded", function () {
    let formulario = document.getElementById("formCadastro");
    let listaProdutos = document.getElementById("listaProdutos");

    // Carregar produtos do localStorage ou criar um objeto vazio
    let produtos = JSON.parse(localStorage.getItem("produtos")) || {};

    // Atualiza a lista de produtos no DOM
    function atualizarLista() {
        listaProdutos.innerHTML = "";
        for (let numero in produtos) {
            let produto = produtos[numero];
            let item = document.createElement("li");
            item.innerHTML = `
                ${numero}: ${produto.nome} - R$ ${produto.preco} 
                <button onclick="removerProduto('${numero}')">❌ Remover</button>
            `;
            listaProdutos.appendChild(item);
        }
    }

    // Submissão do formulário para adicionar um novo produto
    formulario.addEventListener("submit", function (event) {
        event.preventDefault();
        let numero = document.getElementById("numeroProduto").value;
        let nome = document.getElementById("nomeProduto").value;
        let preco = document.getElementById("precoProduto").value;
        let imagemInput = document.getElementById("imagemProduto").files[0];

        // Verifica se todos os campos foram preenchidos
        if (numero && nome && preco && imagemInput) {
            let reader = new FileReader();
            reader.onload = function (e) {
                produtos[numero] = { nome, preco, imagem: e.target.result };
                localStorage.setItem("produtos", JSON.stringify(produtos));
                atualizarLista();
                formulario.reset();
                alert("Produto cadastrado com sucesso!");
            };
            reader.readAsDataURL(imagemInput);
        } else {
            alert("Preencha todos os campos!");
        }
    });

    // Função para remover o produto
    window.removerProduto = function (numero) {
        delete produtos[numero];
        localStorage.setItem("produtos", JSON.stringify(produtos));
        atualizarLista();
    };

    // Inicializa a lista de produtos
    atualizarLista();
});
