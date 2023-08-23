<script setup>
import { useRouter } from 'vue-router'
import BackIcon from './icons/backIcon.png'

const router = useRouter()

function returnHome() {
  router.go(-1)
}
</script>
<template>
  <button class="nav-button" type="button" @click="returnHome">
    <img class="navigate" :src="BackIcon" alt="Navigate back" />
  </button>
</template>

<style scoped>
.nav-button {
  background-color: transparent;
  border: none;
}

.navigate {
  margin: 30px;
  width: 35px;
  height: auto;
  transition: transform 0.2s ease;
}

.navigate:hover {
  cursor: pointer;
  transform: scale(1.2);
}
</style>
