<script setup>
import { ref } from 'vue'
import { store } from './Store.Js'

const selectedDate = store.selectedDate.value.toLocaleDateString('en-CA')
const storedHabits = ref(JSON.parse(localStorage.getItem(selectedDate)))
const allHabits = JSON.parse(localStorage.getItem('habits'))
const habitNames = ref(Object.keys(storedHabits.value))

function updateStorage() {
  localStorage.setItem('habits', JSON.stringify(allHabits))
  localStorage.setItem(selectedDate, JSON.stringify(storedHabits.value))
}

function onSave(habitName, newHabitName) {
  const value = storedHabits.value[habitName]
  delete storedHabits.value[habitName]
  storedHabits.value[newHabitName] = value
  updateAllHabits(habitName, newHabitName)
  updateStorage()
}

function updateAllHabits(habitName, newHabitName) {
  const index = allHabits.indexOf(habitName)
  allHabits[index] = newHabitName
}

function stopHabit(habitName) {
  console.log(habitName)
  const index = allHabits.indexOf(habitName)
  allHabits.splice(index, 1) // use splice to mutate original array
  delete storedHabits.value[habitName]
  updateStorage()
}

function deleteHabit(habitName) {
  const allKeys = Object.keys(localStorage)
  for (const key of allKeys) {
    const storedData = JSON.parse(localStorage.getItem(key))
    if (Array.isArray(storedData) && storedData.includes(habitName)) {
      storedData.splice(storedData.indexOf(habitName), 1)
      localStorage.setItem(key, JSON.stringify(storedData))
    }
    if (storedData.hasOwnProperty(habitName)) {
      delete storedData[habitName]
      localStorage.setItem(key, JSON.stringify(storedData))
    }
  }
}
</script>
<template>
  <div v-for="(value, habitName) in storedHabits" :key="habitName">
    <input type="text" :placeholder="habitName" v-model="habitNames[habitName]" />
    <button type="button" @click="onSave(habitName, habitNames[habitName])">Save</button>
    <button type="button" @click="stopHabit(habitName)">Stop</button>
    <button type="button" @click="deleteHabit(habitName)">Delete</button>
  </div>
</template>
