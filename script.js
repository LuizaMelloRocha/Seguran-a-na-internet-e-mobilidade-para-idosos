/* =================================================
   TAMANHO DA FONTE E ACESSIBILIDADE
================================================= */

const aumentarFonte = document.getElementById("aumentarFonte");
const diminuirFonte = document.getElementById("diminuirFonte");
const restaurar = document.getElementById("restaurar");
const modoEscuro = document.getElementById("modoEscuro");
const altoContraste = document.getElementById("altoContraste");

let tamanhoFonte = 18;


/* AUMENTAR FONTE */

if (aumentarFonte) {
    aumentarFonte.addEventListener("click", () => {
        if (tamanhoFonte < 26) {
            tamanhoFonte += 2;
            document.body.style.fontSize = tamanhoFonte + "px";
        }
    });
}


/* DIMINUIR FONTE */

if (diminuirFonte) {
    diminuirFonte.addEventListener("click", () => {
        if (tamanhoFonte > 14) {
            tamanhoFonte -= 2;
            document.body.style.fontSize = tamanhoFonte + "px";
        }
    });
}


/* RESTAURAR CONFIGURAÇÕES */

if (restaurar) {
    restaurar.addEventListener("click", () => {
        tamanhoFonte = 18;
        document.body.style.fontSize = "18px";

        document.body.classList.remove(
            "dark-mode",
            "high-contrast"
        );
    });
}


/* MODO ESCURO */

if (modoEscuro) {
    modoEscuro.addEventListener("click", () => {
        document.body.classList.remove("high-contrast");
        document.body.classList.toggle("dark-mode");
    });
}


/* ALTO CONTRASTE */

if (altoContraste) {
    altoContraste.addEventListener("click", () => {
        document.body.classList.remove("dark-mode");
        document.body.classList.toggle("high-contrast");
    });
}


/* =================================================
   MENU RESPONSIVO
================================================= */

const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

if (menuBtn && menu) {

    menuBtn.addEventListener("click", () => {

        const aberto = menu.classList.toggle("active");

        menuBtn.setAttribute(
            "aria-expanded",
            aberto ? "true" : "false"
        );
    });


    /* Fecha o menu ao clicar em um link */

    document.querySelectorAll("#menu a").forEach(link => {

        link.addEventListener("click", () => {

            menu.classList.remove("active");

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );
        });

    });
}


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

        if (!texto) {
            return;
        }

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

if (btnQuiz && resultadoQuiz) {

    btnQuiz.addEventListener("click", () => {

        const p1 = document.querySelector(
            'input[name="p1"]:checked'
        );

        const p2 = document.querySelector(
            'input[name="p2"]:checked'
        );


        /* Verifica se as perguntas foram respondidas */

        if (!p1 || !p2) {

            resultadoQuiz.textContent =
                "Por favor, responda a todas as perguntas antes de enviar.";

            resultadoQuiz.style.color = "red";

            return;
        }


        /* Calcula a pontuação */

        let pontuacao = 0;

        if (p1.value === "correta") {
            pontuacao++;
        }

        if (p2.value === "correta") {
            pontuacao++;
        }


        /* Mostra o resultado */

        resultadoQuiz.textContent =
            `Você acertou ${pontuacao} de 2 perguntas!`;

        resultadoQuiz.style.color = "green";
    });
}