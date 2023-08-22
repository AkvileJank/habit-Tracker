<script setup>
import { onBeforeMount, watch, onMounted, ref } from 'vue'
import leftNav from './icons/leftNav.png'
import rightNav from './icons/rightNav.png'
import { store } from './Store.Js'
import { useRouter } from 'vue-router'

const todayDate = new Date()
const previousDay = new Date(todayDate)
// to disable navigation to later days than tommorrow
previousDay.setDate(previousDay.getDate() - 1)

const displayedDates = ref([])

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

const router = useRouter()
watch(
  () => store.selectedDate.value,
  (newDate) => {
    const formattedDate = newDate.toLocaleDateString('en-CA')
    router.replace({ name: 'Homepage', params: { selectedDate: formattedDate } })
  }
)

//bidirectional data binding between url param and selected date - changes to url update store.selectedDate.value
onBeforeMount(() => {
  if (router.currentRoute.value.params.selectedDate) {
    const urlDate = new Date(router.currentRoute.value.params.selectedDate)
    store.selectedDate.value = urlDate
  }
})
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
      <img
        v-show="store.selectedDate.value < previousDay"
        :src="rightNav"
        @click="navigate(1)"
        alt="Navigate right"
      />
    </div>
  </div>
</template>

<style scoped>
.date-navigation {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.date-select {
  text-align: center;
  padding: 10px;
  background-color: #f48e35;
  border-radius: 1rem;
  width: 18%;
}

.dates {
  width: 80%;
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