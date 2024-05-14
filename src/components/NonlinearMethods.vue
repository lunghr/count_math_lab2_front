<script setup>

import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();


const method = ref("");
const root = ref("");
const equation = ref("");
</script>

<script>
import Katex from "vue-katex-auto-render";

function pick() {

}

export default {
  name: 'nonlinear-methods',
  directives: {
    katex: Katex
  },
  data() {
    return {
      equations: [
        '2,3x^3 + 5,75x^2 - 7,41x - 10,6'
      ],
      selectedEquation: null
    }
  },
  methods: {
    pickEquation(index) {
      this.selectedEquation = this.selectedEquation === index ? null : index;
    }
  }
}

</script>


<template>
  <div class="form">

    <div class="methods-container">
      <p>Выберите метод решения уравнения</p>

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
        <label :class="{ 'selected': method === 'SimpleIteration' }" for="simpleIteration">Метод простых итераций</label>
      </div>
    </div>


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
        {{ equation }}
      </button>
    </div>

    <div class="circle"></div>


    <div class="root-container">
      <p>Выберите корень, который хотите найти</p>

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

  <button class="submit-button">Решение</button>

  <button @click="router.push({name:'start'})" class="back-button">
    Вернуться назад
  </button>
</template>

<style>

body {
  color: #ffffff;
  background-color: rgba(176, 170, 166, 0.2);
}

.equation-container {
  font-family: "Russo One", serif;
  font-weight: bolder;
  font-size: 22px;
  color: white;
  position: absolute;
  top: 10%;
  left: 5%;
}

.methods-container {
  position: absolute;
  top: 47%;
  left: 20%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  font-family: "Russo One", serif;
  font-weight: 300;
  font-size: 22px;
  width: fit-content;
}

.root-container {
  position: absolute;
  top: 68%;
  left: 21.4%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  font-family: "Russo One", serif;
  font-weight: 300;
  font-size: 22px;
  width: fit-content;
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

.back-button:hover{
  transition: 0.2s ease-in-out;
  background-color: rgb(220, 220, 227);

}

.submit-button:hover{
  transition: 0.2s ease-in-out;
  background-color: rgb(220, 220, 227);
  transform: scale(1);

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

.circle {
  width: 1500px;
  height: 1500px;
  background-color: rgba(29, 40, 252, 0.75); /* Цвет круга */
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
.radio-button {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.radio-button:hover {
  transition:0.2s ease-in-out;
  color:#08009DD6;
  transform: scale(1.02);
}
.selected{
  color: #CB3F8CE7;
  transition: color 0.09s ease-in-out;
  transform: scale(1.02);
}
.radio-button input[type="radio"] {
  visibility: hidden;
}

.equation-button {
  background-color: transparent;
  border-color: transparent;
  width: 400px;
  height: 50px;
}

.equation-button:hover {
  transition: 0.2s ease-in-out;
  background-color: rgba(8, 0, 157, 0.1);
  transform: scale(1.05);

}

.equation-button.active {
  transition: 0.2s ease-in-out;
  background-color: rgba(203, 63, 140, 0.57);
}

</style>