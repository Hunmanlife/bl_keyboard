<template>
  <div class="bl-keyboard-container" v-if="show">
    <key-board-view
      :toggle="toggle"
      :selectedIndex="selectedIndex"
      v-on:onChangeProvinceCode="onButtonClick"
      v-on:onButtonClick="onButtonClick"
      v-on:onClose="onClose"
      v-on:onToggleSystem="onToggleSystem"
    ></key-board-view>
  </div>
</template>

<script>
const browser = {
  versions: function () {
    var u = navigator.userAgent, app = navigator.appVersion;
    return {//移动终端浏览器版本信息
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile/i) || !!u.match(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
      iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
    };
  } (),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
};
import KeyBoardView from './KeyboardView'
export default {
  name: 'BLKeyboard',
  props: {
    tmp: {
      type: String,
      default: 'square'
    },
    show: Boolean,
    toggle: {// 是否显示切换系统键盘按钮
      type: Boolean,
      default: true
    },
    index: Number,
    maxlength: {
      type: Number,
      default: 8
    },
    value: {
      type: [String, Array],
      default: ''
    },
    defaultConf: {
      type: Object,
      default: () => {
        return {

        }
      }
    }

  },
  data () {
    return {
      readonly: true,
      currentCarNumber: '',
    }
  },
  components: {
    KeyBoardView
  },
  beforeUpdate () {

  },
  created() {
    const self = this;
    const originalHeight = document.documentElement.clientHeight || document.body.clientHeight;
    window.onresize = function () {
      let resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
      // 安卓手机 - 当视图高度发生改变时，隐藏
      if (resizeHeight-0 < originalHeight -0) {// 当键盘升起时
        self.onClose();
      } else {

      }

    };
    document.body.addEventListener('focusin', ()=> {
      if (browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
        self.onClose();
      }
    })
    document.body.addEventListener('focusout', ()=> {
      // self.onClose();
    })
  },
  mounted () {

  },
  computed: {
    selectedIndex: function () {
      return this.index || 0;
    }
  },
  methods: {
    focusLast (e) {
      let obj = e.srcElement;
      obj.focus();
      const len = obj.value.length;
      //光标定位要加上 setTimeOut，不然就会重新光标定位失败
      setTimeout(()=>{
        obj.selectionStart = obj.selectionEnd = len;
      },60)
    },
    // 切换系统键盘
    onToggleSystem() {
      this.$emit('toggle')
    },

    onClose () {
      this.$emit('update:showKeyboard', false);
      this.$emit('onclose');
    },
    onButtonClick (params) {
      if (params.name === 'DEL') {
        this.currentCarNumber.splice(this.selectedIndex,1,'');
      } else {
        this.currentCarNumber[this.selectedIndex] = params.name;
      }
      this.$emit('change', {
        data: this.currentCarNumber,
        index: this.selectedIndex,
        delete: params.name === 'DEL'
      });
    }
  },
  watch: {
    value: {
      handler: function (n) {
        if (typeof n === "string") {

        } else if (typeof n === "object") {
          this.currentCarNumber = n
        }

      },
      immediate: true
    }
  }
}

</script>

<style>
  @import "../css/keyboard.css";
</style>
