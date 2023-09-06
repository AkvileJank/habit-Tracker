<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import store from '../../../components/Store.Js'
import emptyState from './empty-state1.svg'

const router = useRouter()
const navigateToEdit = () => {
  router.push({ name: 'Edit' })
}
// this format is key for habits stored for specific day
const selectedDateFormatted = computed(() => {
  return store.selectedDate.value.toLocaleDateString('en-CA')
})

const storedHabits = ref({})

const updateHabit = () => {
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
  <div v-if="storedHabits && Object.keys(storedHabits).length > 0">
    <h2>Habits for this day</h2>
    <div class="container">
      <div class="habit" v-for="(value, key) in storedHabits" :key="key">
        <label :for="key"
          >{{ key }}
          <input :id="key" type="checkbox" v-model="storedHabits[key]" @change="updateHabit(key)"
        /></label>
      </div>
      <div class="button-container">
        <button type="button" @click="navigateToEdit">Edit</button>
      </div>
    </div>
  </div>
  <div class="empty" v-else>
    <h2>No habits for this day</h2>
    <img :src="emptyState" alt="Empty state" />
  </div>
</template>

<style scoped>
h2,
h3 {
  padding-top: 30px;
  text-align: center;
  padding-bottom: 30px;
}

  img {
  width: 100%;
  height: 45vh;
  object-fit: contain;
}

.habit {
  margin: 5px;
  font-size: 1.2rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: #f0efef;
}

button {
  font-size: 1.3rem;
  padding: 12px;
  border-radius: 1rem;
  background-color: #444542;
  color: white;
  border: none;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 20px;
}

button:hover {
  cursor: pointer;
  background-color: #757772;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

label {
  margin-bottom: 12px;
  cursor: pointer;
}

.add {
  display: none;
}

@media (width >= 768px) {
  .habit {
    width: 50%;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  button {
    width: 100%;
    padding: 15px;
  }

  img {
    max-height: 60vh;
  }
}
</style>
