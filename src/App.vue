<template>
  <div id="app">
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
    <div class="license-plate-panel">
      <div class="lp-text"></div>
      <div class="license-plate-container">
        <div class="lp-item"
             v-for="(item,index) in numberPlateGroup"
             :class="{'lp-item-active':index === currentIndex}"
             @click="handleClick(index)"
        >
          <input
            v-if="isSystemEnabled && index === currentIndex"
            type="text"
           :value="item"
           class="lp-item__input"
           maxlength="1"
           v-focus
            @input="onInputChange($event,index)"
           ref="inputName"/>
          <span v-text="item"
                :class="{'lp-item-last':isItEmpty}"
                v-else-if="index === len"></span>
          <span v-text="item" v-else></span>
        </div>
      </div>
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
    <bl-keyboard
      :toggle="true"
      :index = "currentIndex"
      :value="numberPlateGroup"
      :show.sync="isBlKeyboard"
      v-on:change="onChange"
      v-on:toggle="toggleSystem"
      v-on:onclose="onClose"
      ref="blKeyboard"></bl-keyboard>
  </div>
</template>

<script>
import BlKeyboard from './components/BlKeyboard'
export default {
  name: 'App',
  data () {
    return {
      isSystemEnabled: false,
      isBlKeyboard: false,
      currentIndex: 0,
      len: 7,// 车牌号长度
      value: '',
      numberPlateGroup: ['','','','','','','',''],
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus();
      }
    }
  },
  components: {
    BlKeyboard
  },
  computed: {
    isItEmpty:function () {
      let len = this.numberPlateGroup.length;
      return this.numberPlateGroup[len - 1] === "";
    }
  },
  methods: {
    onInputChange(evt,index) {
      this.$set(this.numberPlateGroup,index, evt.data);
    },
    onClose() {
      this.isBlKeyboard = false;
    },
    toggleSystem() {
      this.isBlKeyboard = false;
      this.isSystemEnabled = true;
    },
    handleClick(index) {
      this.isSystemEnabled = false;
      this.currentIndex = index;
      this.isBlKeyboard = true;
    },
    onChange (evt) {
      this.$set(this.numberPlateGroup, evt.data);
      if (evt.delete && evt.index !== 0) {
        this.currentIndex = evt.index - 1;
      }
      else if (evt.delete && evt.index === 0) {
        return false;
      }
      else if (evt.index !== this.len) {
        this.currentIndex = evt.index +1;
      }
      else {
        return false
      }

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
