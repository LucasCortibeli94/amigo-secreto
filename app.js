// Lista que armazenará os nomes dos participantes
let nomes = [];
let nomesSorteados = [];

// Adiciona um evento para detectar a tecla "Enter" no campo de entrada
// Quando pressionado, chama a função adicionarAmigo()
document.getElementById("amigo").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Impede o comportamento padrão do Enter
        adicionarAmigo(); // Adiciona o nome à lista
    }
});

// Função para adicionar um nome à lista
function adicionarAmigo() {
    let nomeInput = document.getElementById("amigo");
    let nome = nomeInput.value.trim(); // Obtém o valor do campo de entrada e remove espaços extras
    
    // Verifica se o campo está vazio
    if (!nome) {
        alert("Por favor, insira um nome válido!");
        return;
    }
    
    // Verifica se o nome já foi adicionado
    if (nomes.includes(nome)) {
        alert("Este nome já foi adicionado!");
        return;
    }
    
    // Adiciona o nome à lista e atualiza a exibição
    nomes.push(nome);
    atualizarLista();
    nomeInput.value = ""; // Limpa o campo de entrada após adicionar
    nomeInput.focus(); // Retorna automaticamente o foco para o campo de entrada
}

// Atualiza a lista exibida na tela
function atualizarLista() {
    let lista = document.getElementById("listaAmigos");
    lista.innerHTML = ""; // Limpa a lista antes de atualizar
    
    // Percorre a lista de nomes e adiciona cada um como um item na lista (li)
    nomes.forEach(nome => {
        let li = document.createElement("li");
        li.textContent = nome;
        lista.appendChild(li);
    });
}

// Função para realizar o sorteio do amigo secreto sem repetir até que todos sejam sorteados
function sortearAmigo() {
    // Garante que há pelo menos dois participantes no sorteio
    if (nomes.length < 2) {
        alert("Adicione pelo menos 2 nomes para realizar o sorteio!");
        return;
    }
    
    // Se todos os nomes já foram sorteados, reinicia a lista de sorteios
    if (nomesSorteados.length === nomes.length) {
        alert("Todos os nomes já foram sorteados! Reiniciando a lista.");
        nomesSorteados = [];
    }
    
    // Sorteia um nome que ainda não tenha sido sorteado
    let disponiveis = nomes.filter(nome => !nomesSorteados.includes(nome));
    let sorteado = disponiveis[Math.floor(Math.random() * disponiveis.length)];
    
    // Adiciona o nome à lista de sorteados
    nomesSorteados.push(sorteado);
    
    // Exibe o nome sorteado na tela por 10 segundos
    let resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = `<p>O amigo secreto sorteado é: <strong>${sorteado}</strong></p>`;
    
    // Após 10 segundos, altera a mensagem para "Sortear novo amigo secreto"
    setTimeout(() => {
        resultadoDiv.innerHTML = `<p><strong>Sortear novo amigo secreto</strong></p>`;
    }, 10000);
}

// Função para limpar a lista de nomes
function limparLista() {
    nomes = []; // Esvazia o array de nomes
    nomesSorteados = []; // Esvazia a lista de sorteios também
    atualizarLista(); // Atualiza a exibição da lista
    document.getElementById("resultado").innerHTML = ""; // Limpa o resultado do sorteio
}