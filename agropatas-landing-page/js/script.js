// =========================================================
// AGROPATAS — script.js
// Monta os links de WhatsApp dinamicamente (número + mensagem)
// e registra pontos de rastreamento de conversão.
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

  document.addEventListener("DOMContentLoaded", setupWhatsAppLinks);
})();
