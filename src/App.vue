<template>
  <div id="app">
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
    <div class="license-plate-panel">
      <div class="lp-text">{{numberPlateGroup}}</div>
      <div>
        <input type="text">
        <input type="text">
        <input type="text">
      </div>
    </div>
<!--    <div class="car-number-container">-->
<!--      <span class="label">车牌号码</span>-->
<!--      <bl-keyboard :value="value" v-on:change="onChange"></bl-keyboard>-->
<!--    </div>-->
    <div class="bl-key-container">
      <bl-keyboard
        :index = "currentIndex"
        :value="numberPlateGroup"
        :show.sync="isBlKeyboard"
        v-on:change="onChange"
        v-on:onclose="onClose"
        ref="blKeyboard">
        <div><input type="text" v-model="numberPlateGroup" :readonly="true" @click="handleInp"></div>
      </bl-keyboard>
    </div>

  </div>
</template>

<script>
import BlKeyboard from './components/BlKeyboard'
export default {
  name: 'App',
  data () {
    return {
      isSystemEnabled: false,
      isBlKeyboard: true,
      currentIndex: 0,
      len: 7,// 车牌号长度
      value: '',
      numberPlateGroup: '',
    }
  },

  components: {
    BlKeyboard
  },
  computed: {
  },
  methods: {
    handleInp() {
      this.isBlKeyboard = true;
    },
    onClose() {
      this.isBlKeyboard = false;
    },
    onChange (evt) {
      console.log('evt: ',evt.data.join(""));
      this.numberPlateGroup = evt.data.join("");
    }
  }
}
</script>

<style>
html,body {
  min-height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background: #F5F7FF;
}
.car-number-container {
  display: flex;
}
.label {
  margin: 0 20px;
}
.bl-key-container {
  position: relative;
  height: 11.73vw;
  margin: 0 24px;
}
.license-plate-panel {
  margin: 50px auto;
  width: 638px;
  height: 384px;
  padding: 0 24px;
  background: #FFFFFF;
  box-shadow: 0 2px 20px 0 #ECEDF7;
  border-radius: 8px;
}
.lp-text {
  height: 160px;
}
.license-plate-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 88px;
}
.lp-item {
  position: relative;
  width: 66px;
  height: 100%;
  border-radius: 8px;
  border: 1px solid #C4C4C4;
  font-size: 36px;
  overflow: hidden;
}
.lp-item span {
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.lp-item__input {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  border:none;
  background: transparent;
  font-size: 36px;
  text-align: center;
}

.lp-item-active {
  border: 2px solid #004FFF;
}
.lp-item:last-child {
  background: rgba(228, 255, 213, 1);
}

.lp-item-last:after {
  content: '新能源';
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 22px;
  width: 24px;
  line-height: 1.1;
  font-weight: 400;
  color: #5B6075;
}
</style>
