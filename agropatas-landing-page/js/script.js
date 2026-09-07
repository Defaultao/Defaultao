// =========================================================
// AGROPATAS — script.js
// - Monta os links de WhatsApp dinamicamente (número + mensagem)
// - Controla o menu mobile
// - Filtra os cards de serviço por espécie
// - Sincroniza os pontos (dots) do carrossel de serviços
// =========================================================

(function () {
  "use strict";

  // Número da Agropatas no formato internacional (sem espaços/símbolos)
  var WHATSAPP_NUMBER = "5511917039611";

  function buildWhatsAppLink(message) {
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
  }

  function setupWhatsAppLinks() {
    var links = document.querySelectorAll(".js-whatsapp");
    links.forEach(function (link) {
      var message = link.getAttribute("data-wa-msg") || "Olá! Quero agendar um banho e tosa para meu pet 🐾";
      link.setAttribute("href", buildWhatsAppLink(message));
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");

      link.addEventListener("click", function () {
        // ==================================================
        // PONTO DE RASTREAMENTO DE CONVERSÃO — clique no WhatsApp
        // Descomente as linhas abaixo depois de configurar os
        // pixels/tags no <head> do index.html.
        // ==================================================
        // if (typeof fbq === "function") {
        //   fbq('track', 'Lead');
        // }
        // if (typeof gtag === "function") {
        //   gtag('event', 'conversion', { 'send_to': 'SEU_ID_DE_CONVERSAO_ADS' });
        // }
      });
    });
  }

  function setupMobileNav() {
    var toggle = document.getElementById("nav-toggle");
    var nav = document.getElementById("nav-menu");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("nav--open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("nav--open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function setupFiltrosServicos() {
    var filtros = document.querySelectorAll(".filtro");
    var cards = document.querySelectorAll(".produto-card");
    if (!filtros.length || !cards.length) return;

    filtros.forEach(function (botao) {
      botao.addEventListener("click", function () {
        filtros.forEach(function (b) {
          b.classList.remove("is-active");
          b.setAttribute("aria-selected", "false");
        });
        botao.classList.add("is-active");
        botao.setAttribute("aria-selected", "true");

        var especie = botao.getAttribute("data-filtro");
        cards.forEach(function (card) {
          var especies = card.getAttribute("data-especies") || "";
          var mostrar = especie === "todos" || especies.indexOf(especie) !== -1;
          card.hidden = !mostrar;
        });
      });
    });
  }

  function setupCarrosselDots() {
    var carrossel = document.getElementById("carrossel-servicos");
    var dotsContainer = document.getElementById("carrossel-dots");
    if (!carrossel || !dotsContainer) return;

    function renderDots() {
      var cardsVisiveis = Array.prototype.filter.call(
        carrossel.querySelectorAll(".produto-card"),
        function (card) { return !card.hidden; }
      );
      dotsContainer.innerHTML = "";
      cardsVisiveis.forEach(function () {
        var dot = document.createElement("span");
        dotsContainer.appendChild(dot);
      });

      if (!cardsVisiveis.length) return;

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var index = cardsVisiveis.indexOf(entry.target);
            var dots = dotsContainer.querySelectorAll("span");
            dots.forEach(function (d) { d.classList.remove("is-active"); });
            if (dots[index]) dots[index].classList.add("is-active");
          }
        });
      }, { root: carrossel, threshold: 0.6 });

      cardsVisiveis.forEach(function (card) { observer.observe(card); });
    }

    renderDots();
    document.querySelectorAll(".filtro").forEach(function (botao) {
      botao.addEventListener("click", function () {
        setTimeout(renderDots, 50);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    setupWhatsAppLinks();
    setupMobileNav();
    setupFiltrosServicos();
    setupCarrosselDots();
  });
})();
