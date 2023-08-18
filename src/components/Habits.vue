<script setup>
import { ref, computed } from 'vue'
import { store } from './Store.Js'

//repeated from create habit - need to have one consistent value for date in this format
const selectedDateFormatted = computed(() => {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
  return store.selectedDate.value.toLocaleDateString('en-US', options)
})

// const habitKey = selectedDateFormatted.value
const habits = ref([])
// const habits = JSON.parse(localStorage.getItem(selectedDateFormatted.value)) || []
const storedHabits = computed(() => {
  localStorage.getItem(selectedDateFormatted.value)
  if (storedHabits) {
    habits.value = JSON.parse(storedHabits)
  }
})
</script>

<template>
  <h2>Habits for {{ selectedDateFormatted }}</h2>
  <div>{{ habits }}</div>
</template>

<style scoped></style>
