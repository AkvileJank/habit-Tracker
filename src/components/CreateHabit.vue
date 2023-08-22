<script setup>
import { ref } from 'vue'
import { store } from './Store.Js'

const todayHabits = ref(JSON.parse(localStorage.getItem(store.today) || {})) // dictionary
const habitName = ref('')

function addHabit() {
  store.habitBank.value.push(habitName.value)
  todayHabits.value[habitName.value] = false
  uploadToStorage()
}

function uploadToStorage() {
  localStorage.setItem(store.today, JSON.stringify(todayHabits.value))
  localStorage.setItem('habits', JSON.stringify(store.habitBank.value))
}
</script>

<template>
  <h1>Add a new habit</h1>
  <input v-model="habitName" placeholder="Enter new habit's name" autofocus />
  <button type="button" @click="addHabit">Add</button>
</template>

<style scoped></style>
