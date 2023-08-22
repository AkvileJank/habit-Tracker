<script setup>
import { computed } from 'vue'
import addIcon from './icons/addIcon.png'
import { useRouter } from 'vue-router'
import {store} from './Store.Js'

const formattedDate = computed(() => {
  const format = { month: 'long', day: 'numeric' }
  return store.selectedDate.value.toLocaleDateString('en-US', format)
})

const router = useRouter()
const navigateToNewHabit = () => {
  router.push({ name: 'NewHabit' })
}
</script>

<template>
  <div class="header-elements">
    <div class="date">
      <h3>{{ formattedDate }}</h3>
    </div>
    <img :src="addIcon" alt="Add habbit" @click="navigateToNewHabit"/>
  </div>
</template>

<style scoped>
.header-elements {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas: 'empty date add';
  justify-items: flex-end;
  padding: 10px;
}

img {
  width: 3rem;
  grid-area: add;
  margin: 10px;
}

.date {
  grid-area: date;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
