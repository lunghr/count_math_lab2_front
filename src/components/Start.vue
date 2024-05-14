<script setup>
import {
  useRouter
} from "vue-router";

const router = useRouter();
</script>

<script>
export default {
  name: "start"
}

</script>
<template>
  <div class='start'>
    <button id="1-button" @click="router.push({name: 'next'})">Хочу систему уравнений</button>
    <button id="2" @click="router.push({name: 'nonlinear-methods'})">Хочу просто линейные уравнения</button>
  </div>
</template>


<style scoped>
.start {
  display: flex;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#1-button:hover{
  background-color: rgba(203, 63, 140, 0.76);
  color: white;
  transition: 0.2s ease-in-out;
}
button {
  width: 600px;
  height: 300px;
  margin-left: 40px;
  margin-right: 40px;
  font-size: 40px;
  font-family: "Russo One", serif;
  font-weight: 500;
  color: #2c2d38;
}
</style>