<script setup>
import { ref} from 'vue'
import { store } from './Store.Js'

const selectedDate = store.selectedDate.value.toLocaleDateString('en-CA')
const storedHabits = ref(JSON.parse(localStorage.getItem(selectedDate)))
const habitNames = ref(Object.keys(storedHabits.value))

function updateStorage() {
  localStorage.setItem('habits', JSON.stringify(store.habitBank.value))
  localStorage.setItem(selectedDate, JSON.stringify(storedHabits.value))
}

function updateHabitName(habitName, newHabitName) {
  const value = storedHabits.value[habitName]
  delete storedHabits.value[habitName]
  storedHabits.value[newHabitName] = value
  updateHabitBank(habitName, newHabitName)
  updateStorage()
}

function updateHabitBank(habitName, newHabitName) {
  const index = store.habitBank.value.indexOf(habitName)
  store.habitBank.value[index] = newHabitName
}

function stopHabit(habitName) {
  const index = store.habitBank.value.indexOf(habitName)
  store.habitBank.value.splice(index, 1) // use splice to mutate original array
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
  storedHabits.value = JSON.parse(localStorage.getItem(selectedDate)) // to trigger re-render of template
}
</script>
<template>
  <div v-for="(value, habitName) in storedHabits" :key="habitName">
    <input type="text" :placeholder="habitName" v-model="habitNames[habitName]" />
    <button type="button" @click="updateHabitName(habitName, habitNames[habitName])">Save</button>
    <button type="button" @click="stopHabit(habitName)">Stop</button>
    <button type="button" @click="deleteHabit(habitName)">Delete</button>
  </div>
</template>
