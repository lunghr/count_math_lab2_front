<script setup>
  import {useRouter} from "vue-router";
  const router = useRouter();
</script>

<script>
export default {
  name:"system"
}
</script>

<template>
  <button  @click="router.push({name:'start'})" class="back-button">
    back to start
  </button>

  <div class="circle"></div>

  <button class="submit-button">Решение</button>
</template>

<style scoped>
.back-button {
  position: absolute;
  top: 5%;
  left: 8%;
  transform: translate(-50%, -50%);
  color: #2c2d38;
  font-size: 14px;
  width: 200px;
  height: 50px;
  font-family: "Russo One", serif;
  font-weight: bolder;
  background-color: rgba(255, 255, 255, 0.70);
  border: 1.3px solid black;
}

.circle {
  width: 1500px;
  height: 1500px;
  background-color: rgba(203, 63, 140, 0.76); /* Цвет круга */
  border-radius: 50%; /* Делаем круг с помощью радиуса границы */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1; /* Перемещаем на задний план */
  filter: blur(250px); /* Размытие границ круга */
}
p {
  font-size: 25px;
  font-family: "Russo One", serif;
  font-weight: 500;
}

.back-button:hover{
  transition: 0.2s ease-in-out;
  background-color: rgb(220, 220, 227);
}

.submit-button:hover{
  transition: 0.2s ease-in-out;
  background-color: rgb(220, 220, 227);

}

.submit-button {
  position: absolute;
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #2c2d38;
  font-size: 20px;
  width: 280px;
  height: 70px;
  font-family: "Russo One", serif;
  font-weight: bolder;

  border: 1.7px solid black;

}
</style>