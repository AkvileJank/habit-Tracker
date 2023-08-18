<script setup>
import { onMounted, ref } from 'vue'
import leftNav from './icons/leftNav.png'
import rightNav from './icons/rightNav.png'
import { store } from './Store.Js'

const displayedDates = ref([])
// const selectedDate = ref(new Date())

//displays the dates when app is loaded immediately, without it dates are displayed only when buttons are pressed
onMounted(() => {
  updateDisplayedDates()
})

const updateDisplayedDates = () => {
  displayedDates.value = []
  for (let i = 4; i >= 0; i--) {
    const pastDate = new Date(store.selectedDate.value) // Create a copy
    pastDate.setDate(pastDate.getDate() - i) // Use pastDate for calculations
    displayedDates.value.push(pastDate)
  }
}

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
</script>

<template>
  <div>
    <div class="date-navigation">
      <img :src="leftNav" @click="navigate(-1)" alt="Navigate left" />
      <div class="dates">
        <div
          class="date-select"
          v-for="date in displayedDates"
          :key="date"
          @click="store.selectedDate.value = date"
        >
          <div class="month">{{ formatDateMonth(date) }}</div>
          <div class="day">{{ formatDateDay(date) }}</div>
        </div>
      </div>
      <img :src="rightNav" @click="navigate(1)" alt="Navigate right" />
    </div>
  </div>
</template>

<style scoped>
.date-navigation {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  /* padding: 0 20px; */
}

.date-select {
  text-align: center;
  padding: 10px;
  background-color: #f48e35;
  border-radius: 1rem;
}

.dates {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.month {
  font-size: 1rem;
  font-weight: bold;
}

.day {
  font-size: 1rem;
}

img {
  width: 2.5rem;
}
</style>
