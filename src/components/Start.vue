<script setup>
import {
  useRouter
} from "vue-router";
import {ref} from "vue";

const router = useRouter();
let isPinkHovered = ref(false);
let isBlueHovered = ref(false);

</script>


<script>
export default {
  name: "start"
}
</script>


<template>
  <div class='start' :class="{'pink-hovered': isPinkHovered, 'blue-hovered' : isBlueHovered}">
    <div class="pink-wrapper" :class="{'pink-hovered': isPinkHovered}"></div>
    <button class="pink" @mouseover="isPinkHovered=true" @mouseleave="isPinkHovered = false"
            :class="{'blue-hovered': isBlueHovered}"
            @click="router.push({name: 'system'})">Хочу систему уравнений
    </button>
    <div class="blue-wrapper" :class="{'blue-hovered': isBlueHovered}"></div>
    <button class="blue" :class="{'pink-hovered': isPinkHovered}" @mouseover="isBlueHovered=true" @mouseleave="isBlueHovered=false"
            @click="router.push({name: 'nonlinear-methods'})">Хочу линейные уравнения
    </button>
  </div>
</template>


<style>
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  overflow-x: hidden;
}


.start {
  background: linear-gradient(to right, rgba(203, 63, 140, 0.9), rgba(203, 63, 140, 0.8), rgba(203, 63, 140, 0.7), rgba(203, 63, 140, 0.6),
  rgba(11, 16, 236, 0.3), rgba(11, 16, 236, 0.4), rgba(11, 16, 236, 0.5), rgba(11, 16, 236, 0.6));
  position: absolute;
  width: 100%;
  height: 100%;
  transition: 0.5s;
}


.pink {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 35%;
  height: 70%;
  top: 15%;
  bottom: 0;
  left: 8%;
  border: transparent;
  background-color: transparent;
  color: white;
  transition: 1.5s ease-out;
}

.pink-wrapper {
  position: absolute;
  height: 100%;
  width: 100%;
  right: 100%;
  background-color: rgba(203, 63, 140, 1);
  transition: 0.5s ;
}

.pink-wrapper.pink-hovered {
  right: 0;
  transition: 1s ;
  z-index: 1;
}

.pink:hover {
  transition: 0.5s;
  z-index: 2;
}

.pink.blue-hovered{
  color: transparent;
  transition: color 1s ;
}
.blue.pink-hovered{
  color: transparent;
  transition: color 1s ;
}

.blue {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 35%;
  height: 70%;
  top: 15%;
  bottom: 0;
  left: 55%;
  border: transparent;
  background-color: transparent;
  color: white;
  transition: 1.5s ease-out;
}

.blue-wrapper {
  position: absolute;
  height: 100%;
  width: 100%;
  left: 100%;
  background-color: #676AEBFF;
  transition: 0.5s;
}

.blue-wrapper.blue-hovered {
  left: 0;
  transition: 1s;
  z-index: 1;
}

.blue:hover {
  transition: 0.5s;
  z-index: 2;
}


button {
  width: 600px;
  height: 300px;
  font-size: 40px;
  font-family: "Russo One", serif;
  font-weight: 500;
  color: #2c2d38;
}
</style>