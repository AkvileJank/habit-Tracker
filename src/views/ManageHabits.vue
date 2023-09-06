<script setup>
import { ref } from 'vue'
import store from '../components/Store.Js'
import NavigateBack from '../components/NavigateBack.vue'

const selectedDate = store.selectedDate.value.toLocaleDateString('en-CA')
const storedHabits = ref(JSON.parse(localStorage.getItem(selectedDate)))
const habitNames = ref(Object.keys(storedHabits.value))

function getDaysFromStorage() {
  return Object.keys(localStorage).filter((key) => key !== 'habits')
}

const dayKeys = getDaysFromStorage()

function updateStorage() {
  localStorage.setItem('habits', JSON.stringify(store.habitBank.value))
  localStorage.setItem(selectedDate, JSON.stringify(storedHabits.value))
}

function updateHabitBank(habitName, newHabitName) {
  const index = store.habitBank.value.indexOf(habitName)
  store.habitBank.value[index] = newHabitName
}

function updateHabitName(habitName, newHabitName) {
  dayKeys.forEach(day => {
    const storedDailyData = JSON.parse(localStorage.getItem(day))
    storedDailyData[newHabitName] = storedDailyData[habitName]
    delete storedDailyData[habitName]
    localStorage.setItem(day, JSON.stringify(storedDailyData))
  })
  updateHabitBank(habitName, newHabitName)
  localStorage.setItem('habits', store.habitBank.value)
}

function stopHabit(habitName) {
  const index = store.habitBank.value.indexOf(habitName)
  store.habitBank.value.splice(index, 1)
  delete storedHabits.value[habitName]
  updateStorage()
}

function removeHabitFromArray(habitName) {
  return store.habitBank.value.filter((habit) => habit !== habitName)
}

function removeHabitFromDaysStorage(habitName) {
  dayKeys.forEach((day) => {
    const storedDailyData = JSON.parse(localStorage.getItem(day))
    delete storedDailyData[habitName]
    localStorage.setItem(day, JSON.stringify(storedDailyData))
  })
}

function deleteHabit(habitName) {
  store.habitBank.value = removeHabitFromArray(habitName)
  localStorage.setItem('habits', JSON.stringify(store.habitBank.value))
  removeHabitFromDaysStorage(habitName)
  storedHabits.value = JSON.parse(localStorage.getItem(selectedDate))
}

</script>
<template>
  <NavigateBack></NavigateBack>
  <h2>Manage habits for {{ store.monthDay.value }}</h2>
  <div class="all-habits-container">
    <div class="habit-container" v-for="(value, habitName) in storedHabits" :key="habitName">
      <div class="change-name">
        <label>
          <input type="text" :placeholder="habitName" v-model="habitNames[habitName]" />
        </label>
        <button
          class="save"
          type="button"
          v-show="habitNames[habitName] && habitNames[habitName].length > 0"
          @click="updateHabitName(habitName, habitNames[habitName])"
        >
          Save
        </button>
      </div>
      <div class="removal-container">
        <button class="stop" type="button" @click="stopHabit(habitName)">Stop</button>
        <button class="delete" type="button" @click="deleteHabit(habitName)">Delete</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2 {
  text-align: center;
  margin-bottom: 2rem;
}

.habit-container {
  padding-bottom: 20px;
}

.change-name {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 10px;
  margin-left: 15px;
}

.all-habits-container {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

label {
  width: 95%;
}

input {
  width: 100%;
  font-size: 1.2rem;
  padding: 8px;
  border-radius: 1rem;
  border-width: 1.3px;
}

.removal-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
}

.save {
  background-color: #a9d86c;
  margin-right: 10px;
}

.stop {
  background-color: #444542;
  color: white;
}

.delete {
  background-color: #fe9c46;
}

button {
  font-size: 1.2rem;
  margin-left: 5px;
  border-radius: 1rem;
  border: none;
  padding: 10px;
}

.removal-container button {
  width: 45%;
}

@media (width >= 768px) {
  h2 {
    margin-top: 1rem;
  }

  button {
    width: 10%;
  }

  .removal-container button {
    width: 20%;
  }

  .removal-container {
    justify-content: center;
  }

  .habit-container {
    width: 60%;
  }

  .all-habits-container {
    align-items: center;
  }
}
</style>
