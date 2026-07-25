/* FAQ Accordion — accessible keyboard-navigable accordion */

document.addEventListener("DOMContentLoaded", function () {
  var questions = document.querySelectorAll(".faq-question");

  if (!questions.length) return;

  questions.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var isOpen  = btn.getAttribute("aria-expanded") === "true";
      var answer  = btn.nextElementSibling;

      /* Close all others */
      questions.forEach(function (other) {
        if (other !== btn) {
          other.setAttribute("aria-expanded", "false");
          var otherAnswer = other.nextElementSibling;
          if (otherAnswer) otherAnswer.hidden = true;
        }
      });

      /* Toggle current */
      if (isOpen) {
        btn.setAttribute("aria-expanded", "false");
        if (answer) answer.hidden = true;
      } else {
        btn.setAttribute("aria-expanded", "true");
        if (answer) answer.hidden = false;
      }
    });

    /* Keyboard: Enter / Space already fire click; also allow Arrow keys */
    btn.addEventListener("keydown", function (e) {
      var items = Array.from(questions);
      var idx   = items.indexOf(btn);

      if (e.key === "ArrowDown") {
        e.preventDefault();
        var next = items[idx + 1];
        if (next) next.focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        var prev = items[idx - 1];
        if (prev) prev.focus();
      } else if (e.key === "Home") {
        e.preventDefault();
        items[0].focus();
      } else if (e.key === "End") {
        e.preventDefault();
        items[items.length - 1].focus();
      }
    });
  });
});
