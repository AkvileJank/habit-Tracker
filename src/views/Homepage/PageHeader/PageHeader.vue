<script setup>
import { useRouter } from 'vue-router'
import addIcon from './addIcon.png'

defineProps({
  monthDay: {
    required: true
  }
})

const router = useRouter()
const navigateToAddHabit = () => {
  router.push({ name: 'NewHabit' })
}
</script>

<template>
  <div class="header-elements">
    <div class="date">
      <h2>{{ monthDay }}</h2>
    </div>
    <button type="button" @click="navigateToAddHabit">
      <img :src="addIcon" alt="Add habbit" />
    </button>
  </div>
</template>

<style scoped>

button {
  grid-area: add;
  margin: 10px;
  background-color: transparent;
  border: none;
}

.header-elements {
  margin-top: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas: 'empty date add';
  justify-items: flex-end;
  padding: 10px;
}

img {
  width: 3rem;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

img:hover {
  cursor: pointer;
  transform: scale(1.1);
  opacity: 0.7;
}

.date {
  grid-area: date;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (width >= 768px) {
  img {
    margin-right: 30px;
    width: 4.5rem;
  }

  .header-elements {
    padding-top: 30px;
  }
}
</style>
