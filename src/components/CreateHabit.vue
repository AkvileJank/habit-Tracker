<script setup>
import { ref} from 'vue'

const allStoredHabits = ref(JSON.parse(localStorage.getItem('habits')) || [])
const todayFullDate = new Date()
const today = todayFullDate.toLocaleDateString('en-CA')

const todayHabits = ref(JSON.parse(localStorage.getItem(today) || {})) // dictionary

function addHabit() {
  allStoredHabits.value.push(habitName.value)
  todayHabits.value[habitName.value] = false
  localStorage.setItem(today, JSON.stringify(todayHabits.value))
  localStorage.setItem('habits', JSON.stringify(allStoredHabits.value))
}

const habitName = ref('')
</script>

<template>
  <h1>Add a new habit</h1>
  <input v-model="habitName" placeholder="Enter new habit's name" autofocus />
  <button type="button" @click="addHabit">Add</button>
</template>

<style scoped></style>
