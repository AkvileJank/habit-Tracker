<script setup>
import { onBeforeMount, watch, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import leftNav from './leftNav.svg'
import rightNav from './rightNav.svg'
import store from '../../../components/Store.Js'

const todayDate = new Date()
const previousDay = new Date(todayDate)
// to disable navigation to later days than tomorrow
previousDay.setDate(previousDay.getDate() - 1)

const displayedDates = ref([])

// displays the dates when app is loaded immediately, without it dates are displayed only when buttons are pressed

const updateDisplayedDates = () => {
  displayedDates.value = []
  for (let i = 4; i >= 0; i -= 1) {
    const pastDate = new Date(store.selectedDate.value) // Create a copy
    pastDate.setDate(pastDate.getDate() - i) // Use pastDate for calculations
    displayedDates.value.push(pastDate)
  }
}
onMounted(() => {
  updateDisplayedDates()
})

const formatDateMonth = (date) => {
  return new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date)
}

const formatDateDay = (date) => {
  return new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(date)
}

const navigate = (days) => {
  const newDate = new Date(store.selectedDate.value) // Create a copy
  newDate.setDate(newDate.getDate() + days) // Modify the copy
  store.selectedDate.value = newDate // Update the selectedDate with the new copy
  updateDisplayedDates()
}

const router = useRouter()

watch(
  () => store.selectedDate.value,
  (newDate) => {
    const formattedDate = newDate.toLocaleDateString('en-CA')
    router.replace({ name: 'Homepage', params: { selectedDate: formattedDate } })
  }
)

// bidirectional data binding between url param and selected date - changes to url update store.selectedDate.value
onBeforeMount(() => {
  if (router.currentRoute.value.params.selectedDate) {
    const urlDate = new Date(router.currentRoute.value.params.selectedDate)
    store.selectedDate.value = urlDate
  }
})
</script>

<template>
  <div class="date-navigation">
    <button class="left" type="button" @click="navigate(-1)">
      <img :src="leftNav" alt="Navigate left" />
    </button>
    <div class="dates">
      <button
        type="button"
        class="date-select"
        v-for="date in displayedDates"
        :key="date"
        @click="store.selectedDate.value = date"
      >
        <div class="month">{{ formatDateMonth(date) }}</div>
        <div class="day">{{ formatDateDay(date) }}</div>
      </button>
    </div>
    <button
      class="right"
      type="button"
      v-show="store.selectedDate.value < previousDay"
      @click="navigate(1)"
    >
      <img :src="rightNav" alt="Navigate right" />
    </button>
  </div>
</template>

<style scoped>
button {
  background-color: transparent;
  border: none;
}

.left {
  grid-area: left;
}

.right {
  grid-area: right;
}

.date-navigation {
  display: grid;
  grid-template-columns: 1fr 7fr 1fr;
  grid-template-areas: 'left dates right';
}

.date-select {
  text-align: center;
  padding: 10px;
  background-color: #fe9c46;
  border-radius: 1rem;
  border: none;
  justify-items: stretch;
  height: 4.5rem;
}

.date-select:hover {
  cursor: pointer;
  background-color: #fcba81;
}

.dates {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 5px;
  justify-content: space-evenly;
}

.month {
  font-weight: bold;
}

.day,
.month {
  font-size: 1rem;
}

img {
  width: 2.5rem;
  transition: transform 0.2s ease;
}

img:hover {
  cursor: pointer;
  transform: scale(1.2);
}

</style>
