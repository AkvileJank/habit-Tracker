<script setup>
import Header from './Header.vue'
import DateSelection from './DateSelection.vue'
import Habits from './Habits.vue'
import { store } from './Store.Js'
import { computed } from 'vue'


function setupHabitsForToday() {
  if (!localStorage.getItem(store.today)) {
    const habbitObject = {}
    if (store.habitBank.value) {
      for (const habit of store.habitBank.value) {
        habbitObject[habit] = false
      }
    }
    localStorage.setItem(store.today, JSON.stringify(habbitObject))
  }
}
setupHabitsForToday()

const monthDay = computed(()=> {
  const format = { month: 'long', day: 'numeric' }
  return store.selectedDate.value.toLocaleDateString('en-US', format)
})
</script>

<template>
  <Header :monthDay="monthDay"></Header>
  <DateSelection></DateSelection>
  <Habits :monthDay="monthDay"></Habits>
  <!-- <button type="button" @click="navigateToEdit">Edit</button> -->
</template>
