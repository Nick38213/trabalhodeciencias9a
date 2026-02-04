// ===== CONFIGURAÇÃO =====
let precoKwh = localStorage.getItem("precoKwh") || 0;
let aparelhos = JSON.parse(localStorage.getItem("aparelhos")) || [];
let registros = JSON.parse(localStorage.getItem("registros")) || [];

// ===== ELEMENTOS =====
const precoInput = document.getElementById("precoKwh");
const listaAparelhos = document.getElementById("listaAparelhos");
const listaRegistros = document.getElementById("listaRegistros");

// ===== SALVAR PREÇO KWH =====
function salvarPreco() {
  precoKwh = parseFloat(precoInput.value);
  localStorage.setItem("precoKwh", precoKwh);
  atualizarRegistros();
}

// ===== ADICIONAR APARELHO =====
function adicionarAparelho() {
  const nome = document.getElementById("nomeAparelho").value;
  const consumo = parseFloat(document.getElementById("consumoAparelho").value);

  if (!nome || consumo <= 0) return alert("Preencha corretamente!");

  aparelhos.push({ nome, consumo });
  localStorage.setItem("aparelhos", JSON.stringify(aparelhos));

  atualizarAparelhos();
}

// ===== APAGAR APARELHO =====
function apagarAparelho(index) {
  aparelhos.splice(index, 1);
  localStorage.setItem("aparelhos", JSON.stringify(aparelhos));
  atualizarAparelhos();
}

// ===== REGISTRAR CONSUMO =====
function registrarUso(index) {
  const aparelho = aparelhos[index];
  const custo = aparelho.consumo * precoKwh;

  registros.push({
    nome: aparelho.nome,
    consumo: aparelho.consumo,
    custo: custo,
    data: new Date().toLocaleDateString()
  });

  localStorage.setItem("registros", JSON.stringify(registros));
  atualizarRegistros();
}

// ===== APAGAR REGISTRO =====
function apagarRegistro(index) {
  registros.splice(index, 1);
  localStorage.setItem("registros", JSON.stringify(registros));
  atualizarRegistros();
}

// ===== ATUALIZAR APARELHOS =====
function atualizarAparelhos() {
  listaAparelhos.innerHTML = "";

  aparelhos.forEach((a, i) => {
    listaAparelhos.innerHTML += `
      <li>
        <strong>${a.nome}</strong> — ${a.consumo} kWh
        <button onclick="registrarUso(${i})">Registrar</button>
        <button onclick="apagarAparelho(${i})">❌</button>
      </li>
    `;
  });
}

// ===== ATUALIZAR REGISTROS =====
function atualizarRegistros() {
  listaRegistros.innerHTML = "";

  registros.forEach((r, i) => {
    listaRegistros.innerHTML += `
      <li>
        ${r.data} — ${r.nome} | ${r.consumo} kWh | R$ ${r.custo.toFixed(2)}
        <button onclick="apagarRegistro(${i})">🗑️</button>
      </li>
    `;
  });
}

// ===== INICIALIZAÇÃO =====
window.onload = () => {
  if (precoInput) precoInput.value = precoKwh;
  atualizarAparelhos();
  atualizarRegistros();
};
