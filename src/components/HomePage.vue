<script setup>
import Header from './Header.vue'
import DateSelection from './DateSelection.vue'
import Habits from './Habits.vue'
// import {store} from './Store.Js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const allStoredHabits = ref(JSON.parse(localStorage.getItem('habits')) || [])
const todayFullDate = new Date()
const today = todayFullDate.toLocaleDateString('en-CA')

function setupHabitsToday() {
  if (!localStorage.getItem(today)) {
    const habbitObject = {}
    if (allStoredHabits) {
      for (const habit of allStoredHabits.value) {
        habbitObject[habit] = false
      }
    }
    localStorage.setItem(today, JSON.stringify(habbitObject))
  }
}
setupHabitsToday()

const router = useRouter()
const navigateToEdit = () => {
  router.push({ name: 'Edit' })
}
</script>

<template>
  <Header></Header>
  <DateSelection></DateSelection>
  <Habits></Habits>
  <button type="button" @click="navigateToEdit">Edit</button>
</template>
