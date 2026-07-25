document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('adminLoginForm');
  const errorBox = document.getElementById('adminLoginError');
  const button = document.getElementById('adminLoginBtn');

  if (!form) return;

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    errorBox.hidden = true;
    button.disabled = true;
    button.textContent = 'Έλεγχος...';

    const email = document.getElementById('adminEmail').value.trim();
    const password = document.getElementById('adminPassword').value;

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || 'Αποτυχία σύνδεσης');
      }

      window.location.href = '/admin/index.html';
    } catch (err) {
      errorBox.textContent = err.message || 'Αποτυχία σύνδεσης';
      errorBox.hidden = false;
    } finally {
      button.disabled = false;
      button.textContent = 'Σύνδεση';
    }
  });
});
