console.log("JS carregou!");

const usuarioCorreto = "matheus";
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
    const senha = document.getElementById("senha").value;

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
