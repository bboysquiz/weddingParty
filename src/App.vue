<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'

type Rsvp = {
  attendance: string
  name: string
}

const weddingDate = new Date('2027-07-25T16:00:00+03:00')
const now = ref(Date.now())
const form = reactive<Rsvp>({ attendance: '', name: '' })
const status = ref('')
let timer: number | undefined

const countdown = computed(() => {
  const diff = Math.max(0, weddingDate.getTime() - now.value)
  const total = Math.floor(diff / 1000)
  return {
    days: String(Math.floor(total / 86400)).padStart(3, '0'),
    hours: String(Math.floor((total % 86400) / 3600)).padStart(2, '0'),
    minutes: String(Math.floor((total % 3600) / 60)).padStart(2, '0'),
    seconds: String(total % 60).padStart(2, '0'),
  }
})

function submitRsvp() {
  localStorage.setItem('wedding-rsvp', JSON.stringify(form))
  status.value = form.name.trim()
    ? `Спасибо, ${form.name.trim()}! Ответ сохранён на этом устройстве.`
    : 'Спасибо! Ответ сохранён.'
}

onMounted(() => {
  timer = window.setInterval(() => (now.value = Date.now()), 1000)
})

onBeforeUnmount(() => {
  if (timer) window.clearInterval(timer)
})
</script>

<template>
  <main class="page-shell">
    <section class="hero section-dark">
      <div class="top-icons" aria-hidden="true"><span>⌁</span><span>♥</span><span>⌁</span></div>
      <div class="hero-mark">
        <span class="hero-w">W</span>
        <div class="hero-copy"><span>edding</span><strong>party</strong></div>
      </div>
      <div class="hero-photo" aria-hidden="true" />
      <p class="hero-caption">Дорогие друзья! Мы очень хотим разделить этот особенный день вместе с вами.</p>
    </section>

    <section class="section-light invite">
      <div class="mist mist-top" />
      <p class="date">25.07.27</p>
      <div class="place">
        <p><strong>Севкабель × Social Club</strong><br />ул. Кожевенная, 40</p>
        <a class="map-link" href="https://yandex.ru/maps/?text=Севкабель%20Порт%20Кожевенная%2040" target="_blank" rel="noreferrer">открыть<br />карту</a>
      </div>
      <div class="time-block"><small>сбор гостей</small><span>16:00</span></div>
      <div class="mist mist-bottom" />
    </section>

    <section class="dress section-dark">
      <div class="dress-copy">
        <h2>dress<br />code</h2>
        <p>элегантность<br />и свобода.<br /><br />подойдут оттенки<br />бордо, шоколада,<br />черного, красного<br />и приглушенного<br />розового.</p>
      </div>
      <div class="party-photo" aria-hidden="true" />
    </section>

    <section class="gifts section-dark">
      <h2>подарки</h2>
      <p>Мы будем рады вашему присутствию больше всего. Если захотите сделать подарок — пусть он будет компактным и от сердца.</p>
      <div class="mist mist-bottom" />
    </section>

    <section class="section-light rsvp">
      <div class="mist mist-top" />
      <h2>планируете ли<br />быть с нами<br />в этот день?</h2>
      <form @submit.prevent="submitRsvp">
        <label><input v-model="form.attendance" type="radio" value="Да, с удовольствием" required /><span>Да, обязательно буду!</span></label>
        <label><input v-model="form.attendance" type="radio" value="Буду с парой" /><span>Буду не один / не одна</span></label>
        <label><input v-model="form.attendance" type="radio" value="Не смогу" /><span>К сожалению, не получится</span></label>
        <input v-model="form.name" class="name-input" type="text" placeholder="ваше имя" required />
        <button type="submit">отправить</button>
        <p class="form-status" aria-live="polite">{{ status }}</p>
      </form>
      <div class="ornament">♥ · ♥ · ♥</div>
      <div class="contacts">
        <h2>обращайтесь<br />по любым<br />вопросам</h2>
        <div><span>Невеста<br /><a href="tel:+79999999999">+7 999 999-99-99</a></span><span>Жених<br /><a href="tel:+79999999999">+7 999 999-99-99</a></span></div>
      </div>
      <div class="mist mist-bottom" />
    </section>

    <section class="footer section-dark">
      <div class="footer-photo" aria-hidden="true" />
      <p>до встречи в этот<br />особенный день</p>
      <div class="countdown" aria-label="Обратный отсчет до свадьбы">
        <div><strong>{{ countdown.days }}</strong><span>дней</span></div><i>:</i>
        <div><strong>{{ countdown.hours }}</strong><span>часов</span></div><i>:</i>
        <div><strong>{{ countdown.minutes }}</strong><span>минут</span></div><i>:</i>
        <div><strong>{{ countdown.seconds }}</strong><span>секунд</span></div>
      </div>
    </section>
  </main>
</template>
