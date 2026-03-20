const produtos = [
    { nome: "Creatina Integralmedica 150g", preco: "R$ 54,90", imagem: "integral150.webp", categoria: "creatinas" },
    { nome: "Creatina Max Titanium 150g", preco: "R$ 54,90", imagem: "max150_1.webp", categoria: "creatinas" },
    { nome: "Creatina Black Skull Turbo 300g", preco: "R$ 54,90", imagem: "turbo300.webp", categoria: "creatinas" },
    { nome: "Balança Digital 10Kg", preco: "R$ 25,00", imagem: "balança.webp", categoria: "acessorios" },
    { nome: "Hipercalorico 3kg", preco: "R$ 110,00", imagem: "darkmass.webp", categoria: "proteinas" },
    { nome: "Coqueteleira", preco: "R$ 25,00", imagem: "coqueteleira.webp", categoria: "acessorios" },
    { nome: "Whey Protein 900g", preco: "R$ 84,90", imagem: "wheyftw.webp", categoria: "proteinas" },
    { nome: "Par de Strap", preco: "R$ 25,00", imagem: "strap.webp", categoria: "acessorios" }
];

let carrinho = [];

function renderizarProdutos() {
    const secoes = ["proteinas", "creatinas", "acessorios"];
    secoes.forEach(cat => {
        const container = document.getElementById(`categoria-${cat}`);
        if (container) container.innerHTML = ""; 
    });

    produtos.forEach(produto => {
        const idCategoria = `categoria-${produto.categoria}`;
        const container = document.getElementById(idCategoria);

        if (container) {
            const card = `
            <div class="produto">
                <img src="./${produto.imagem.trim()}" alt="${produto.nome}">
                <div class="info">
                    <h2>${produto.nome}</h2>
                    <p>${produto.preco}</p>
                </div>
                <button class="btn-animado" onclick="adicionarAoCarrinho('${produto.nome}', '${produto.preco}')">
                    Adicionar ao Carrinho
                </button>
            </div>
            `;
            container.innerHTML += card;
        }
    });
}

function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    atualizarInterfaceCarrinho();
    
    // Opcional: Efeito visual simples ao adicionar
    const contador = document.getElementById("icone-carrinho");
    contador.style.transform = "scale(1.2)";
    setTimeout(() => contador.style.transform = "scale(1)", 200);
}

function atualizarInterfaceCarrinho() {
    document.getElementById("contagem-carrinho").innerText = carrinho.length;
}

function abrirModalCarrinho() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let listaProdutos = "";
    let total = 0;

    carrinho.forEach((item, index) => {
        listaProdutos += `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; border-bottom:1px solid #333; padding-bottom:5px;">
                <span>${item.nome}</span>
                <span>${item.preco} <button onclick="removerDoCarrinho(${index})" style="background:none; color:#ff4d4d; border:none; cursor:pointer; font-weight:bold; margin-left:10px;">X</button></span>
            </div>`;
        
        let valor = parseFloat(item.preco.replace("R$ ", "").replace(",", "."));
        total += valor;
    });

    document.getElementById("produtoNome").innerHTML = listaProdutos + `<div style="margin-top:15px; text-align:right;"><strong>Total: R$ ${total.toFixed(2).replace(".", ",")}</strong></div>`;
    document.getElementById("modal").style.display = "block";
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarInterfaceCarrinho();
    if (carrinho.length > 0) {
        abrirModalCarrinho();
    } else {
        fecharModal();
    }
}

function fecharModal(){
    document.getElementById("modal").style.display = "none";
}

function finalizarPedido() {
    const enderecoCampo = document.getElementById("endereco");
    const erroTexto = document.getElementById("erro-endereco");
    const pagamento = document.getElementById("pagamento").value;
    const endereco = enderecoCampo.value.trim();

    if (endereco === "") {
        erroTexto.style.display = "block"; 
        enderecoCampo.style.border = "2px solid #ff4d4d"; 
        enderecoCampo.focus();
        return; 
    }

    let itensTexto = "";
    let total = 0;
    carrinho.forEach((item, index) => {
        itensTexto += `${index + 1}. ${item.nome} (${item.preco})\n`;
        total += parseFloat(item.preco.replace("R$ ", "").replace(",", "."));
    });

    const mensagem = `*Olá - AJ Suplementos*\n\n*Itens:*\n${itensTexto}\n*Total:* R$ ${total.toFixed(2).replace(".", ",")}\n*Pagamento:* ${pagamento}\n*Endereço:* ${endereco}`;
    const link = `https://wa.me/5599981721230?text=${encodeURIComponent(mensagem)}`;

    window.open(link, "_blank");
    carrinho = [];
    atualizarInterfaceCarrinho();
    fecharModal();
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    renderizarProdutos();
    
    document.getElementById("endereco").addEventListener("input", function() {
        this.style.border = "none";
        document.getElementById("erro-endereco").style.display = "none";
    });
});
