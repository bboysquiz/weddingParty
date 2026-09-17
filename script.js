const weddingDate = new Date('2027-07-25T16:00:00+03:00');

function updateCountdown() {
  const now = new Date();
  const diff = Math.max(0, weddingDate - now);

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  document.getElementById('days').textContent = String(days).padStart(3, '0');
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

const form = document.getElementById('rsvp-form');
const status = form.querySelector('.form-status');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = String(data.get('name') || '').trim();
  status.textContent = name ? `Спасибо, ${name}! Ответ сохранён на этом устройстве.` : 'Спасибо! Ответ сохранён.';
  localStorage.setItem('wedding-rsvp', JSON.stringify(Object.fromEntries(data.entries())));
});