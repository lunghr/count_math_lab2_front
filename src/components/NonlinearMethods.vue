<script setup>

import {ref} from "vue";
import {useRouter} from "vue-router";
import axios from "axios";

const router = useRouter();

let showPic = ref(false);
const method = ref(null);
const root = ref(null);
let submitted = ref(false);
let iteration = ref(0);
let iterations = ref([])
const equations = ['2.3x^3 + 5.75x^2 - 7.41x - 10.6', '2.74x^3 - 1.93x^2 - 15.28x - 3.72',
'x^3 + 2.84x^2 - 5.606x - 14.766'];
let selectedEquation = ref(null);
let currentAccuracy = ref(null);
let currentX = ref(null);
let response = ref(null);
let message = ref("Выберите погрешность")
let warn = false;
const accuracy = ref(null)
let equation = ref(null);
let img = ref('');
function pickEquation(index) {
  selectedEquation.value = selectedEquation.value === index ? null : index;
  equation.value = index+1;
  console.log(equation.value)
}

async function sendData() {
  iterations = [];
  if (!method.value || !root.value || !equation.value) {
    submitted.value = true;
    setTimeout(() => {
      submitted.value = false;
    }, 2500);
  }
  else if(!validate()) {
    warn = true;
    message.value = "Данные неккоректны";
    setTimeout(() => {
      warn = false;
      message.value = "Выберите погрешность";
    }, 2500);
  }else if (method.value && root.value && equation.value) {
    const res = await axios.post('http://localhost:8080/methods/res', {root: root.value, equation: equation.value, type: "nonlinear",
      a: 0, b: 0, accuracy: accuracy.value}, {
          headers: {
            CalculationMethod: method.value
          }
        }
    );
    img.value = equation.value;
    iteration.value = 0;
    iterations.value = res.data;
    response = iterations.value[iterations.value.length - 1].x;
    console.log("resp:" + iterations.value.length)
    console.log("ans:" + response)
    showPic.value=true;
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
    currentAccuracy = iterations.value[iteration.value - 1].accuracy;
    console.log(currentAccuracy)
  }
}
function validate() {
  return !!( parseFloat(accuracy.value) && accuracy.value > 0 && accuracy.value <= 1);
}

function filterInput(event) {
  const regex = /[^0-9.-]/g;
  event.target.value = event.target.value.replace(',', '.');
}


</script>

<script>
export default {
  name: 'nonlinear-methods',
}
</script>


<template>
  <div class="circle"></div>

  <div class="form">
    <div class="equation-container">
      <p :class="{'pulse':submitted && !equation}">Выберите уравнение</p>
      <button
          v-for="(equation, index) in equations"
          :key="index"
          class="equation-button"
          style="color: white; font-family:'Russo One', serif; font-weight: 300;font-size: 20px"
          :class="{ active: selectedEquation === index }"
          @click="pickEquation(index)"
      >
        {{ equation }}
      </button>
    </div>

    <div class="methods-container">
      <p :class="{'pulse':submitted && !method}">Выберите метод решения уравнения</p>

      <div class="radio-button">
        <input type="radio" id="newton" value="Newton" v-model="method">
        <label :class="{ 'selected': method === 'Newton' }" for="newton">Метод Ньютона</label>
      </div>

      <div class="radio-button">
        <input type="radio" id="halving" value="Halving" v-model="method">
        <label :class="{ 'selected': method === 'Halving' }" for="halving">Метод половинного деления</label>
      </div>

      <div class="radio-button">
        <input type="radio" id="simpleIteration" value="SimpleIteration" v-model="method">
        <label :class="{ 'selected': method === 'SimpleIteration' }" for="simpleIteration">Метод простых
          итераций</label>
      </div>
    </div>

    <div class="root-container">
      <p :class="{'pulse':submitted && !root}">Выберите корень, который хотите найти</p>

      <div class="radio-button">
        <input type="radio" id="left" value="Left" v-model="root">
        <label :class="{ 'selected': root === 'Left' }" for="left">Крайний левый</label>
      </div>

      <div class="radio-button">
        <input type="radio" id="central" value="Central" v-model="root">
        <label :class="{ 'selected': root === 'Central' }" for="central">Центральный</label>
      </div>

      <div class="radio-button">
        <input type="radio" id="right" value="Right" v-model="root">
        <label :class="{ 'selected': root === 'Right' }" for="right">Крайний правый</label>
      </div>
    </div>
  </div>

  <div class="accuracy-wrapper">
    <p class="note" :class="{'pulse': warn}">{{ message }}</p>
    <input type="text" id="accuracy" placeholder="ACC" v-model="accuracy" @input="filterInput">
  </div>


  <button class="submit-button" @click="sendData">Решение</button>
  <div class="response-wrapper">
    <div class="response">
      <span class="signature">Ответ: </span>
      <span :style="{color:'rgba(236, 55, 153, 0.6)'}">{{ response }}</span>

      <div class="iteration">
        <div>X: <span :style="{color:'rgba(80, 83, 236, 0.8)'}">{{ currentX }}</span></div>
        <div>Погрешность: <span :style="{color:'rgba(80, 83, 236, 0.8)'}">{{ currentAccuracy }}</span></div>
        <span id="index" v-if="iteration> 0"> {{ iteration }}</span>
      </div>
    </div>
    <div class="iter-buttons">
      <button id="previous" @click="previous"> <</button>
      <button id="next" @click="next"> ></button>
    </div>
  </div>

  <div class="graph" v-if="showPic && img == 1">
    <img src="./icons/nonlinear_1.jpg">
  </div>

  <div class="graph" v-if="showPic && img == 2">
    <img src="./icons/nonlinear_2.jpg">
  </div>
  <div class="graph" v-if="showPic && img == 3">
    <img src="./icons/nonlinear_3.jpg">
  </div>


  <button @click="router.push({name:'start'})" class="back-button">
    Вернуться назад
  </button>
</template>

<style>

html, body {
  color: #ffffff;
  background-color: rgba(176, 170, 166, 0.2);
  overflow: hidden;

}

.accuracy-wrapper{
  position: absolute;
  top:68.3%;
  left: 5%;
  color: #ffffff;
  font-family: "Russo One", serif;
  font-weight: 300;
  font-size: 30px;
  white-space: nowrap;
  transition: 2s ease-in-out;
}

img {
  height: 500px;
  width: 500px;
  position: fixed;
  top: 70px;
  left: 830px;
}

#index {
  position: absolute;
  top: 93px;
  left: 472px;
  color: rgba(236, 55, 153, 0.6);
  font-size: 30px;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.03);
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.03);
  }
}

.response-wrapper {
  position: fixed;
  padding: 15px;
  top: 590px;
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
  position: fixed;
  white-space: nowrap;
}

.signature {
  color: #ffffff;
}

.equation-container {
  font-family: "Russo One", serif;
  font-weight: bolder;
  font-size: 25px;
  color: white;
  position: fixed;
  top: 7%;
  left: 5%;
  width: 400px;
}

.methods-container {
  position: absolute;
  top: 30%;
  left: 5%;
  color: #ffffff;
  font-family: "Russo One", serif;
  font-weight: 300;
  font-size: 25px;
  white-space: nowrap;
  transition: 2s ease-in-out;

}

.root-container {
  position: absolute;
  top: 49%;
  left: 5%;
  color: #ffffff;
  font-family: "Russo One", serif;
  font-weight: 300;
  font-size: 25px;
  white-space: nowrap;
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


.back-button:hover {
  transition: 0.2s ease-in-out;
  background-color: rgb(220, 220, 227);

}

.submit-button:hover {
  transition: 0.2s ease-in-out;
  background-color: rgb(220, 220, 227);

}

.submit-button {
  position: fixed;
  top: 880px;
  left: 814.5px;
  color: #2c2d38;
  font-size: 25px;
  width: 530px;
  height: 80px;
  font-family: "Russo One", serif;
  font-weight: bold;
  white-space: nowrap;


  border: 1.7px solid black;

}

.circle {
  width: 1500px;
  height: 1500px;
  background-color: rgba(29, 40, 252, 0.55); /* Цвет круга */
  border-radius: 50%; /* Делаем круг с помощью радиуса границы */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1; /* Перемещаем на задний план */
  filter: blur(250px); /* Размытие границ круга */
}

p {
  font-size: 28px;
  font-family: "Russo One", serif;
  font-weight: 500;
}

.radio-button {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  color: rgba(80, 83, 236, 0.65);
}

.radio-button:hover {
  transition: 0.2s ease-in-out;
  color: rgba(80, 83, 236, 0.8);
  transform: scale(1.02);
}

.selected {
  color: rgba(236, 55, 153, 0.6);
  transition: color 0.09s ease-in-out;
  transform: scale(1.02);

}

.radio-button input[type="radio"] {
  visibility: hidden;
}

.equation-button {
  background-color: rgba(8, 0, 157, 0.03);
  border-color: transparent;
  width: 400px;
  height: 50px;
}

.equation-button:hover {
  transition: 0.2s ease-in-out;
  background-color: rgba(8, 0, 157, 0.15);
  transform: scale(1.05);
}

.equation-button.active {
  transition: 0.2s ease-in-out;
  background-color: rgba(203, 63, 140, 0.37);
  transform: scale(1.02);
}

#accuracy {
  font-family: "Russo One", serif;
  font-weight: bolder;
  font-size: 50px;
  margin-left: 15px;
  color: rgba(80, 83, 236, 0.55);
  text-align: center;
  height: 130px;
  width: 240px;
  background-color: rgba(122, 125, 243, 0.2);
  border-color: transparent;
}
#accuracy:hover {
  transform: scale(1.03);
  transition: 0.2s ease-in-out;
  background-color: rgba(122, 125, 243, 0.4);
}

#accuracy:focus {
  outline: none;
  transform: scale(1.05);
  background-color: rgba(203, 63, 140, 0.1);
  transition: 0.2s ease-in-out;
  color: rgba(203, 63, 140, 0.7);
}

#accuracy::-webkit-input-placeholder {
  color: rgba(80, 83, 236, 0.4);
  transition: 0.2s ease-in-out;
}

#accuracy:focus::-webkit-input-placeholder {
  color: transparent;
  transition: 0.5s ease-in-out;
}


</style>