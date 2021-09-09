<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div class="car-number-container">
      <span class="label">车牌号码</span>
      <bl-keyboard :value="value" v-on:change="onChange"></bl-keyboard>
    </div>
  </div>
</template>

<script>
import BlKeyboard from './components/BlKeyboard'
export default {
  name: 'App',
  data () {
    return {
      value: '京'
    }
  },
  components: {
    BlKeyboard
  },
  methods: {
    onChange (val) {
      this.value = val
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.car-number-container {
  display: flex;
}
.label {
  margin: 0 20px;
}
</style>
