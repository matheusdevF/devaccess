console.log("SCRIPT CARREGOU ✅");

const usuarioCorreto = "teste";
const senhaCorreta = "1234";

const form = document.getElementById("loginForm");

if (form) {
  const inputSenha = document.getElementById("senha");
  const mostrarSenha = document.getElementById("mostrarSenha");
  const btnEntrar = document.getElementById("btnEntrar");
  const erro = document.getElementById("erro");

  // Mostrar/ocultar senha (se existir no HTML)
  if (mostrarSenha && inputSenha) {
    mostrarSenha.addEventListener("change", () => {
      inputSenha.type = mostrarSenha.checked ? "text" : "password";
    });
  }
 
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    erro.textContent = "";

    const usuario = document.getElementById("usuario").value.trim();
    const senha = document.getElementById("senha").value.trim();
    // Loading
    if (btnEntrar) {
      btnEntrar.classList.add("is-loading");
      btnEntrar.textContent = "Entrando";
    }

    setTimeout(() => {
      const ok = (usuario === usuarioCorreto && senha === senhaCorreta);

      if (ok) {
        localStorage.setItem("usuarioLogado", usuario); // ✅ salva aqui
        window.location.href = "dashboard.html";
        return;
      }

      erro.textContent = "Usuário ou senha incorretos.";

      if (btnEntrar) {
        btnEntrar.classList.remove("is-loading");
        btnEntrar.textContent = "Entrar";
      }
    }, 700);
  });
}

// ✅ Mostrar nome no dashboard
const nomeSpan = document.getElementById("nomeUsuario");
if (nomeSpan) {
  const nomeSalvo = localStorage.getItem("usuarioLogado");

  if (nomeSalvo) {
    nomeSpan.textContent = nomeSalvo;
  } else {
    // se tentar entrar direto sem login, volta
    window.location.href = "index.html";
  }
}

function logout() {
  localStorage.removeItem("usuarioLogado"); // ✅ limpa login
  window.location.href = "index.html";
}

// Dashboard extras: saudação, data/hora, contador e última entrada
if (document.getElementById("nomeUsuario")) {
  const agora = new Date();

  const h = agora.getHours();
  const saudacao =
    h < 12 ? "Bom dia" :
    h < 18 ? "Boa tarde" :
    "Boa noite";

  const saudacaoEl = document.getElementById("saudacao");
  if (saudacaoEl) saudacaoEl.textContent = saudacao;

  const dataHoje = document.getElementById("dataHoje");
  if (dataHoje) dataHoje.textContent = agora.toLocaleDateString("pt-BR");

  const horaAgora = document.getElementById("horaAgora");
  if (horaAgora) {
    const atualizarHora = () => {
      const d = new Date();
      horaAgora.textContent = d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    };
    atualizarHora();
    setInterval(atualizarHora, 1000);
  }

  // contador de acessos (no navegador)
  const keyCount = "devaccess_count";
  const count = Number(localStorage.getItem(keyCount) || "0") + 1;
  localStorage.setItem(keyCount, String(count));

  const contadorAcessos = document.getElementById("contadorAcessos");
  if (contadorAcessos) contadorAcessos.textContent = String(count);

  // última entrada
  const keyLast = "devaccess_last";
  const ultimo = localStorage.getItem(keyLast);
  const ultimaEntrada = document.getElementById("ultimaEntrada");
  if (ultimaEntrada) {
    ultimaEntrada.textContent = ultimo ? ultimo : "Primeira vez";
  }
  const dataFormatada = agora.toLocaleDateString("pt-BR");
const horaFormatada = agora.toLocaleTimeString("pt-BR");

localStorage.setItem(keyLast, `${dataFormatada} ${horaFormatada}`);
}
