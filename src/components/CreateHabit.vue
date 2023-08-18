<script setup>
import { ref, computed } from 'vue'
// import { store } from './Store.Js'

const today = new Date()
const dates = [today]

function addDates() {
  for (let i = 1; i < 7; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    dates.push(date) // dates after this loop contain today and next 7 days
  }
}

// const storedData = JSON.parse(localStorage.getItem('habits')) || {'habits': []}
const storedHabits = JSON.parse(localStorage.getItem('habits')) || { 'habits': [] } // for some reason now array is stored in local storage, empty doesn't work
console.log(storedHabits)
// const storedHabits = storedData['habits']
// console.log(storedHabits)

addDates()

const result = dates.reduce((acc, date) => {
  const habitObject = {}
  for (const habitName of storedHabits) {
    habitObject[habitName] = false
  }
  acc[date.toISOString()] = habitObject
  return acc
}, {})

console.log(result)

const habitName = ref('')

function addHabbit() {
  storedHabits.push(habitName.value)
  localStorage.setItem('habits', JSON.stringify(storedHabits))
}
</script>

<template>
  <h1>Add a new habit</h1>
  <!-- <h3> Date: {{ selectedDateFormatted }}</h3> -->
  <input v-model="habitName" placeholder="Enter new habit's name" autofocus />
  <button type="button" @click="addHabbit">Add</button>
</template>

<style scoped></style>
