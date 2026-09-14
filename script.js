/* =================================================
   TAMANHO DA FONTE E ACCESSIBILIDADE
================================================= */
const aumentarFonte = document.getElementById("aumentarFonte");
const diminuirFonte = document.getElementById("diminuirFonte");
const restaurar = document.getElementById("restaurar");
const modoTema = document.getElementById("modoTema");
const altoContraste = document.getElementById("altoContraste");

let tamanhoFonte = 18;

aumentarFonte.addEventListener("click", () => {
    if (tamanhoFonte < 26) {
        tamanhoFonte += 2;
        document.body.style.fontSize = tamanhoFonte + "px";
    }
});

diminuirFonte.addEventListener("click", () => {
    if (tamanhoFonte > 14) {
        tamanhoFonte -= 2;
        document.body.style.fontSize = tamanhoFonte + "px";
    }
});

restaurar.addEventListener("click", () => {
    tamanhoFonte = 18;
    document.body.style.fontSize = "18px";
    document.body.classList.remove("dark-mode", "high-contrast");
});

modoTema.addEventListener("click", () => {
    document.body.classList.remove("high-contrast");
    document.body.classList.toggle("dark-mode");
});

altoContraste.addEventListener("click", () => {
    document.body.classList.remove("dark-mode");
    document.body.classList.toggle("high-contrast");
});

/* =================================================
   MENU RESPONSIVO
================================================= */
const menuToggle = document.getElementById("menuToggle");
const menuList = document.getElementById("menuList");

menuToggle.addEventListener("click", () => {
    const aberto = menuList.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", aberto);
});

document.querySelectorAll(".menu-list a").forEach(link => {
    link.addEventListener("click", () => {
        menuList.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

/* =================================================
   LEITURA EM VOZ ALTA
================================================= */
document.querySelectorAll(".leitura").forEach(botao => {
    botao.addEventListener("click", () => {
        if (!("speechSynthesis" in window)) {
            alert("Seu navegador não suporta leitura em voz alta.");
            return;
        }
        speechSynthesis.cancel();
        const texto = botao.getAttribute("data-leitura");
        const fala = new SpeechSynthesisUtterance(texto);
        fala.lang = "pt-BR";
        fala.rate = 0.9;
        speechSynthesis.speak(fala);
    });
});

/* =================================================
   LÓGICA DO QUIZ
================================================= */
const btnQuiz = document.getElementById("btnQuiz");
const resultadoQuiz = document.getElementById("resultadoQuiz");

btnQuiz.addEventListener("click", () => {
    const p1 = document.querySelector('input[name="p1"]:checked');
    const p2 = document.querySelector('input[name="p2"]:checked');

    if (!p1 || !p2) {
        resultadoQuiz.textContent = "Por favor, responda a todas as perguntas antes de enviar.";
        resultadoQuiz.style.color = "red";
        return;
    }

    let pontuacao = 0;
    if (p1.value === "correta") pontuacao++;
    if (p2.value === "correta") pontuacao++;

    resultadoQuiz.textContent = `Você acertou ${pontuacao} de 2 perguntas!`;
    resultadoQuiz.style.color = "green";
});