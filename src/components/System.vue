<script setup>
import {useRouter} from "vue-router";
import {ref, onMounted} from "vue";
import axios from 'axios';
import "@/components/System.vue";

const router = useRouter();
let response = ref([])
const equations = ['sin(x + y) - 1.4x = 0, \n x^2 + y^2 = 1'];
let selectedEquation = ref(null);
const x = ref(null)
const y = ref(null)
let message = ref("Выберите приближение и погрешность")
let warn = false;
const accuracy = ref(null)
let currentAccuracy = ref(null);
let currentX = ref(null);
let  currentY = ref(null);
let iteration = ref(0);
let iterations = ref([])
let showPic = ref(false);


function pickEquation(index) {
  selectedEquation.value = selectedEquation.value === index ? null : index;
}

function validate() {
  return !!(parseFloat(x.value) && parseFloat(y.value) && parseFloat(accuracy.value) && accuracy.value > 0 && accuracy.value <= 1);
}

function filterInput(event) {
  const regex = /[^0-9.,-]/g;
  event.target.value = event.target.value.replace(regex, '');
}

async function sendData() {
  console.log('mgm')
  if (!validate()) {
    warn = true;
    message.value = "Данные неккоректны";
    setTimeout(() => {
      warn = false;
      message.value = "Выберите приближение и погрешность";
    }, 2500);
  } else {

    const res = await axios.post('http://localhost:8080/methods/res', {
          root: "system",
          a: x.value,
          b: y.value,
          accuracy: 0.01
        }, {
          headers: {
            CalculationMethod: 'NewtonForSystems'
          }
        }
    );
    iteration.value = 0;
    iterations.value = res.data;
    response = [iterations.value[iterations.value.length - 1].x, iterations.value[iterations.value.length-1].y];
    console.log("resp:" + iterations.value.length)
    console.log("ans:" + response)
    showPic.value = true;
    next();
  }
}

function next() {
  console.log(iterations.value.length - 1)
  console.log(iteration.value)
  if (iteration.value <= iterations.value.length - 1) {
    iteration.value++;
    currentX = iterations.value[iteration.value - 1].x;
    console.log(currentX);
    currentY = iterations.value[iteration.value - 1].y;
    console.log(currentY);
    currentAccuracy = iterations.value[iteration.value - 1].accuracy;
    console.log(currentAccuracy)
  }
}

function previous() {
  console.log(iteration.value)
  if (iteration.value > 1) {
    iteration.value--;
    currentX = iterations.value[iteration.value - 1].x;
    console.log(currentX);
    currentY = iterations.value[iteration.value - 1].y;
    console.log(currentY);
    currentAccuracy = iterations.value[iteration.value - 1].accuracy;
    console.log(currentAccuracy)
  }
}

</script>

<script>
export default {
  name: "system"
}
</script>

<template>
  <button @click="router.push({name:'start'})" class="back-button">
    back to start
  </button>

  <div class="equation-container">
    <p>Выберите уравнение</p>

    <button
        v-for="(equation, index) in equations"
        :key="index"
        class="equation-button"
        style="color: white; font-family:'Russo One', serif; font-weight: 300;font-size: 20px"
        :class="{ active: selectedEquation === index }"
        @click="pickEquation(index)"
    >
      <div id="first">{{ equation.split('\n')[0] }}</div>
      <div id="sign">{</div>
      <div id="second"> {{ equation.split('\n')[1] }}</div>
    </button>
  </div>

  <div class="accuracy-container">
    <p class="note" :class="{'pulse': warn}">{{ message }}</p>
    <div class="input-container">
      <label for="x-accuracy">X: </label>
      <input type="text" id="x-accuracy" placeholder="X" v-model="x" @input="filterInput">

      <label for="y-accuracy">Y: </label>
      <input type="text" id="y-accuracy" placeholder="Y" v-model="y" @input="filterInput">

      <label for="accuracy-s">A:</label>
      <input type="text" id="accuracy-s" placeholder="ACC" v-model="accuracy" @input="filterInput">
    </div>
  </div>

  <div class="circle"></div>
  <div class="response-wrapper">
    <div class="response">
      <span class="signature">Ответ: </span>
      <span :style="{color:'rgba(236, 55, 153, 0.6)'}"v-if="response">({{ response[0]?.toFixed(5)}}; {{response[1]?.toFixed(5)}})</span>

      <div class="iteration">
        <div>X: <span :style="{color:'rgba(80, 83, 236, 0.8)'}">{{ currentX }}</span></div>
        <div>Y: <span :style="{color:'rgba(80, 83, 236, 0.8)'}">{{ currentY }}</span></div>
        <div>Погрешность: <span :style="{color:'rgba(80, 83, 236, 0.8)'}">{{ currentAccuracy }}</span></div>
        <span id="index" v-if="iteration> 0"> {{ iteration }}</span>
      </div>
    </div>
    <div class="iter-buttons">
      <button id="previous" @click="previous"> <</button>
      <button id="next" @click="next"> ></button>
    </div>
  </div>
  <div class="graph" v-if="showPic">
    <img src="./icons/system_1.jpg">
  </div>

  <button class="submit-button" @click="sendData">Решение</button>

</template>

<style scoped>

.accuracy-container {
  font-family: "Russo One", serif;
  font-weight: bolder;
  font-size: 25px;
  color: white;
  position: fixed;
  top: 500px;
  left: 5%;
}

label {
  visibility: hidden;
}
.note{
  position: fixed;
  top: 620px;
  white-space: nowrap;
  transition: 0.5s ease-in-out;
}
.pulse {
  transition: 0.5s ease-in-out;
  animation: pulse 2.5s infinite ease-in-out;
}

input {
  font-family: "Russo One", serif;
  font-weight: bolder;
  font-size: 50px;
  color: rgba(203, 63, 140, 0.7);
  text-align: center;
  position: relative;
  height: 130px;
  width: 173px;
  margin-top: 7px;
  left: -3%;
  background-color: rgba(203, 63, 140, 0.05);

  border-color: transparent;
}

.input-container{
  position: fixed;
  top: 700px;
  white-space: nowrap;
}

input:hover {
  transform: scale(1.03);
  transition: 0.2s ease-in-out;
  background-color: rgba(203, 63, 140, 0.15);
}

input:focus {
  outline: none;
  transform: scale(1.05);
  background-color: rgba(122, 125, 243, 0.2);
  transition: 0.2s ease-in-out;
  color: rgba(80, 83, 236, 0.4);
}

input::-webkit-input-placeholder {
  color: rgba(203, 63, 140, 0.7);
  transition: 0.2s ease-in-out;
}

input:focus::-webkit-input-placeholder {
  color: transparent;
  transition: 0.5s ease-in-out;
}

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

.equation-button:hover {
  transition: 0.2s ease-in-out;
  background-color: rgba(203, 63, 140, 0.15);
  transform: scale(1.05);
}

.equation-button.active {
  transition: 0.2s ease-in-out;
  background-color: rgba(122, 125, 243, 0.2);
}

.equation-button {
  background-color: rgba(203, 63, 140, 0.05);
  border-color: transparent;
  height: 90px;
  position: relative;
}

#sign {
  text-align: left;
  font-size: 60px;
  position: absolute;
  top: 10%;
  left: 20.8%;
  font-weight: 350;
  font-family: Bahnschrift, serif;
}

#first {
  position: absolute;
  text-align: left;
  left: 27%;
  top: 20%;
}

#second {
  position: absolute;
  text-align: left;
  left: 27%;
  bottom: 20%;
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
  font-size: 30px;
  font-family: "Russo One", serif;
  font-weight: 500;
}

.back-button:hover {
  transition: 0.2s ease-in-out;
  background-color: rgb(220, 220, 227);
}

.submit-button:hover {
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

.response-wrapper {
  position: fixed;
  padding: 15px;
  top: 575px;
  left: 800px;

  height: fit-content;
}

.pulse {
  transition: 2s ease-in-out;
  animation: pulse 2.5s infinite ease-in-out;
}

.response {
  background-color: #08009D07;
  position: fixed;
  padding: 15px;
  color: rgba(236, 55, 153, 0.6);
  font-family: "Russo One", serif;
  font-weight: 300;
  font-size: 30px;
  width: 500px;
  height: 165px;
  white-space: nowrap;
}

.iteration {
  color: #ffffff;
  font-size: 20px;
  width: 200px;
  height: 150px;
  align-content: center;
  line-height: 35px;
  position: absolute;
}

#previous, #next {
  width: 260px;
  margin-top: 15px;
  height: 55px;
  align-content: center;
  text-align: center;
  font-family: "Russo One", serif;
  font-weight: bolder;
  white-space: nowrap;
  border: 1.7px solid black;
}

#next {
  margin-left: 10px;
}

.iter-buttons {
  align-content: center;
  justify-content: center;
  margin-top: 190px;
}

.signature {
  color: #ffffff;
}
</style>