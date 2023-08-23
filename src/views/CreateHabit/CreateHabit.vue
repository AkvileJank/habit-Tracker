<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import store from '../../components/Store.Js'
import Plant from './plant.png'
import NavigateBack from '../../components/NavigateBack.vue'

const todayHabits = ref(JSON.parse(localStorage.getItem(store.today))) // dictionary
const habitName = ref('')
const router = useRouter()
// to be able to use function from child component
const navComponent = ref(null)
// navComponent.value = NavigateBack

function uploadToStorage() {
  localStorage.setItem(store.today, JSON.stringify(todayHabits.value))
  localStorage.setItem('habits', JSON.stringify(store.habitBank.value))
}

function addHabit() {
  store.habitBank.value.push(habitName.value)
  todayHabits.value[habitName.value] = false
  uploadToStorage()
  router.push({path: `/date/${store.today}`})
}

</script>

<template>
  <NavigateBack ref="navComponent"></NavigateBack>
  <img class="plant" :src="Plant" alt="Growing plant" />
  <h1>Add a new habit</h1>
  <div class="input-container">
    <input v-model="habitName" placeholder="Enter new habit's name" />
  </div>
  <div class="button-container">
    <button class="add-button" v-show="habitName && habitName.length > 0" type="button" @click="addHabit">Add</button>
  </div>
</template>

<style scoped>
h1 {
  margin-top: 1rem;
  text-align: center;
  padding-bottom: 20px;
}

.input-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

input {
  width: 95%;
  font-size: 1.2rem;
  text-align: center;
  padding: 10px;
  border-radius: 1rem;
  border-width: 1.5px;
}

.button-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.add-button {
  width: 50%;
  font-size: 1.2rem;
  padding: 10px;
  margin-top: 30px;
  border-radius: 1rem;
  border: none;
  background-color: #fe9c46;
  color: black;
}

.add-button:hover {
  cursor: pointer;
  background-color: #fcba81;
}

.plant {
  width: 200px;
  display: block;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
  height: auto;
}

@media (width >= 768px) {
  input {
    width: 60%;
  }

  .add-button {
    width: 15%;
  }

  .plant {
    margin-top: 0;
  }
}
</style>
