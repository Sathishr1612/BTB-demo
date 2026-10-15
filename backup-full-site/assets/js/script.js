/* Break the Barriers Academy — site behaviour (vanilla JS, no dependencies besides Bootstrap's bundle). */
(function () {
  "use strict";

  /* ---- Configuration: edit here ---------------------------------------- */
  var CONFIG = {
    whatsappNumber: "919360046012", // international format, digits only (+91 93600 46012)
    academyName: "Break the Barriers Academy",
    maxNameLength: 60,
    maxMessageLength: 300
  };
  var VIDEO_PATH = /^assets\/videos\/[a-z0-9-]+\.mp4$/;

  /* ---- Header: subtle shadow once the page scrolls ---------------------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Footer year ------------------------------------------------------ */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---- Video modal: sound never autoplays; viewer presses play ---------- */
  var modalEl = document.getElementById("videoModal");
  if (modalEl && window.bootstrap) {
    var video = modalEl.querySelector("video");
    var title = modalEl.querySelector(".modal-title");
    var modal = new window.bootstrap.Modal(modalEl);

    document.querySelectorAll("[data-video]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var src = btn.getAttribute("data-video") || "";
        if (!VIDEO_PATH.test(src)) { return; } // only local, whitelisted files
        title.textContent = btn.getAttribute("data-title") || "Video";
        video.setAttribute("poster", btn.getAttribute("data-poster") || "");
        video.setAttribute("src", src);
        video.load();
        modal.show();
      });
    });

    modalEl.addEventListener("hidden.bs.modal", function () {
      video.pause();
      video.removeAttribute("src");
      video.load();
    });
  }

  /* ---- Enquiry form (demo): builds a WhatsApp message in the browser ---- */
  /* Nothing is sent to or stored on a server. The visitor reviews and sends
     the message inside WhatsApp. For stored enquiries, wire the form to a
     trusted backend or form service with server-side validation and spam
     protection (see README). */
  var form = document.getElementById("enquiryForm");
  if (form) {
    var nameInput = form.elements.name;
    var courseInput = form.elements.course;
    var messageInput = form.elements.message;
    var counter = document.getElementById("messageCount");

    var clean = function (value, max) {
      // Collapse whitespace and strip control characters.
      return String(value).replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
    };

    if (counter && messageInput) {
      messageInput.addEventListener("input", function () {
        counter.textContent = String(messageInput.value.length) + " / " + CONFIG.maxMessageLength;
      });
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var name = clean(nameInput.value, CONFIG.maxNameLength);
      var valid = name.length >= 2 && /^[\p{L}\p{M}][\p{L}\p{M}\s.'-]*$/u.test(name);
      nameInput.setCustomValidity(valid ? "" : "Please enter your name (letters only, at least 2 characters).");
      form.classList.add("was-validated");
      if (!form.checkValidity()) { return; }

      var course = courseInput.value;
      var note = clean(messageInput.value, CONFIG.maxMessageLength);
      var text = "Hello, I'm " + name + ". ";
      text += course
        ? "I would like to know more about " + course + " at " + CONFIG.academyName + "."
        : "I would like to know more about the spoken English classes at " + CONFIG.academyName + ".";
      if (note) { text += " " + note; }

      var url = "https://wa.me/" + CONFIG.whatsappNumber + "?text=" + encodeURIComponent(text);
      window.open(url, "_blank", "noopener,noreferrer");
    });

    nameInput.addEventListener("input", function () { nameInput.setCustomValidity(""); });
  }
})();
