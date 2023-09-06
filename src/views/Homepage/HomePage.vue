<script setup>
import Header from './PageHeader/PageHeader.vue'
import DateSelection from './DateSelection/DateSelection.vue'
import HabitsList from './HabitsList/HabitsList.vue'
import store from '../../components/Store.Js'


function setupHabitsForDay(day) {
  if(!localStorage.getItem(day)) {
    const habitObject = {}
    if (store.habitBank.value) {
      store.habitBank.value.forEach((habit)=> {
        habitObject[habit] = false
      })
      localStorage.setItem(day, JSON.stringify(habitObject))
    }
  }
}

setupHabitsForDay(store.today)

// Based on the logic, app doesn't display habits if they were not entered by the user at that point
// For now to see functionality, use this date or entered yesterday's date for example in same format
setupHabitsForDay('2023-09-04')
</script>

<template>
  <Header :monthDay="store.monthDay.value"></Header>
  <DateSelection></DateSelection>
  <HabitsList></HabitsList>
</template>
