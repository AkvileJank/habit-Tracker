<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { store } from './Store.Js'
import emptyState from './icons/empty_state1.png'

const props = defineProps({
  monthDay: String
})

const router = useRouter()
const navigateToEdit = () => {
  router.push({ name: 'Edit' })
}
//this format is key for habits stored for specific day
const selectedDateFormatted = computed(() => {
  return store.selectedDate.value.toLocaleDateString('en-CA')
})

const storedHabits = ref({})

const updateHabit = (key) => {
  localStorage.setItem(selectedDateFormatted.value, JSON.stringify(storedHabits.value))
}

// Fetch the habits for the new selected date and update the template
watch(selectedDateFormatted, (newDate) => {
  storedHabits.value = JSON.parse(localStorage.getItem(newDate))
})

//  StoredHabits is initialized for the initial selected date, without it habits are not shown until clicking date
onMounted(() => {
  storedHabits.value = JSON.parse(localStorage.getItem(selectedDateFormatted.value))
})

</script>

<template>
  <!-- <h2>Habits for {{ monthDay }}:</h2> -->
  <div v-if="storedHabits && Object.keys(storedHabits).length>0">
  <div v-for="(value, key) in storedHabits" :key="key">
    <input :id="key" type="checkbox" v-model="storedHabits[key]" @change="updateHabit(key)" />
    <label :for="key">{{ key }}</label>
  </div>
  <button type="button" @click="navigateToEdit">Edit</button>
</div>
<div class="empty" v-else>
  <h3 > No habits for this day</h3>
  <img :src="emptyState" alt="Empty state">
</div>
</template>

<style scoped>
h3 {
  padding-top: 30px;
  text-align: center;
}

img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
  height: auto;
}
</style>
