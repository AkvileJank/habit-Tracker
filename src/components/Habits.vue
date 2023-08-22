<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { store } from './Store.Js'

//this format is key for habits stored for specific day
const selectedDateFormatted = computed(() => {
  return store.selectedDate.value.toLocaleDateString('en-CA')
})

const storedHabits = ref({})

const updateHabit = (key) => {
  localStorage.setItem(selectedDateFormatted.value, JSON.stringify(storedHabits.value))
}

watch(selectedDateFormatted, (newDate) => {
  // Fetch the habits for the new selected date and update the template
  storedHabits.value = JSON.parse(localStorage.getItem(newDate))
})

onMounted(() => {
  //  StoredHabits is initialized for the initial selected date, without it habits are not shown until clicking date
  storedHabits.value = JSON.parse(localStorage.getItem(selectedDateFormatted.value))
})
</script>

<template>
  <h2>Habits for {{ selectedDateFormatted }}</h2>
  <div v-for="(value, key) in storedHabits" :key="key">
    <input :id="key" type="checkbox" v-model="storedHabits[key]" @change="updateHabit(key)" />
    <label :for="key">{{ key }}</label>
  </div>
</template>

<style scoped></style>
