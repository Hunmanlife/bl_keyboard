<template>
  <div class="keyboard-container">
    <div class="keyboard-expand" @click.prevent="onClose"></div>
    <div id="keyboard-wrapper" class="safe-area-inset-bottom">
      <div class="keyboard-header">
        <span class="bl-button--text bl-cancel" @click.prevent="onClose">取消</span>
        <span class="bl-button--text bl-confirm" @click.prevent="onClose">确认</span>
      </div>
      <div class="province-code-box" v-show="selectedIndex === 0">
        <province-code-view :provinceCode="ProvinceCodeArray.row0"
                            v-on:onChangeProvinceCode="onChangeProvinceCode"></province-code-view>
        <province-code-view :provinceCode="ProvinceCodeArray.row1"
                            v-on:onChangeProvinceCode="onChangeProvinceCode"></province-code-view>
        <province-code-view :provinceCode="ProvinceCodeArray.row2"
                            v-on:onChangeProvinceCode="onChangeProvinceCode"></province-code-view>
        <province-code-view :provinceCode="ProvinceCodeArray.row3"
                            v-on:onChangeProvinceCode="onChangeProvinceCode"></province-code-view>
      </div>
      <div class="number-letter-code-box" v-show="selectedIndex !== 0">
        <row-view :keys="numberAndletterArray.row0" v-on:onButtonClick="onButtonClick"></row-view>
        <row-view :keys="numberAndletterArray.row1" v-on:onButtonClick="onButtonClick"></row-view>
        <row-view :keys="numberAndletterArray.row2" v-on:onButtonClick="onButtonClick"></row-view>
        <row-view :keys="numberAndletterArray.row3" v-on:onButtonClick="onButtonClick"></row-view>
      </div>

    </div>
  </div>

</template>

<script>
import KeyRow from './KeyRowView.vue'
import ProvinceCode from './ProvinceCodeView.vue'
export default {
  name: 'KeyboardView',
  components: {
    'row-view': KeyRow,
    'province-code-view': ProvinceCode
  },
  props: {
    keyboard: {
      type: Object,
      default: () => {
        return {}
      }
    },
    selectedIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      ProvinceCodeArray: {
        'row0': [
          {'id': '1', 'name': '京'},
          {'id': '2', 'name': '沪'},
          {'id': '3', 'name': '浙'},
          {'id': '4', 'name': '粤'},
          {'id': '5', 'name': '苏'},
          {'id': '6', 'name': '鲁'},
          {'id': '7', 'name': '晋'},
          {'id': '34', 'name': '吉'},
          {'id': '8', 'name': '冀'},
          {'id': '9', 'name': '豫'}
        ],
        'row1': [
          {'id': '10', 'name': '川'},
          {'id': '11', 'name': '渝'},
          {'id': '12', 'name': '辽'},
          {'id': '13', 'name': '黑'},
          {'id': '14', 'name': '皖'},
          {'id': '15', 'name': '鄂'},
          {'id': '16', 'name': '湘'},
          {'id': '17', 'name': '赣'},
          {'id': '18', 'name': '闽'}
        ],
        'row2': [
          {'id': '19', 'name': '陕'},
          {'id': '20', 'name': '甘'},
          {'id': '21', 'name': '宁'},
          {'id': '22', 'name': '蒙'},
          {'id': '23', 'name': '津'},
          {'id': '26', 'name': '桂'},
          {'id': '25', 'name': '云'},
          {'id': '24', 'name': '贵'}
        ],
        'row3': [
          {'id': '27', 'name': '琼'},
          {'id': '28', 'name': '青'},
          {'id': '29', 'name': '新'},
          {'id': '30', 'name': '藏'},
          {'id': '31', 'name': '使'}
        ]
      },
      numberAndletterArray: {
        'row0': [
          {'id': '100', 'name': '0'},
          {'id': '101', 'name': '1'},
          {'id': '102', 'name': '2'},
          {'id': '103', 'name': '3'},
          {'id': '104', 'name': '4'},
          {'id': '105', 'name': '5'},
          {'id': '106', 'name': '6'},
          {'id': '107', 'name': '7'},
          {'id': '108', 'name': '8'},
          {'id': '109', 'name': '9'}
        ],
        'row1': [
          {'id': '50', 'name': 'A'},
          {'id': '51', 'name': 'B'},
          {'id': '52', 'name': 'C'},
          {'id': '53', 'name': 'D'},
          {'id': '54', 'name': 'E'},
          {'id': '55', 'name': 'F'},
          {'id': '56', 'name': 'G'},
          {'id': '57', 'name': 'H'},
          {'id': '58', 'name': 'J'},
          {'id': '59', 'name': 'K'}
        ],
        'row2': [
          {'id': '60', 'name': 'L'},
          {'id': '61', 'name': 'M'},
          {'id': '62', 'name': 'N'},
          {'id': '63', 'name': 'P'},
          {'id': '64', 'name': 'Q'},
          {'id': '65', 'name': 'R'},
          {'id': '66', 'name': 'S'},
          {'id': '67', 'name': 'T'},
          {'id': '68', 'name': 'U'},
          {'id': '69', 'name': 'V'}
        ],
        'row3': [
          {'id': '74', 'name': '港'},
          {'id': '75', 'name': '澳'},
          {'id': '70', 'name': 'W'},
          {'id': '71', 'name': 'X'},
          {'id': '72', 'name': 'Y'},
          {'id': '73', 'name': 'Z'},
          {'id': '76', 'name': '学'},
          {'id': '77', 'name': '领'},
          {'id': '99', 'name': 'DEL'}
        ]
      }
    }
  },
  methods: {
    onClose () {
      this.$emit('onClose')
    },
    onChangeProvinceCode (params) {
      this.$emit('onChangeProvinceCode', params)
    },
    onButtonClick (params) {
      this.$emit('onButtonClick', params)
    }
  }
}
</script>

<style scoped>
.keyboard-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
  display: flex;
  flex-flow: column;
}
.keyboard-expand {
  flex: 1;
}
#keyboard-wrapper {
  position: absolute;
  top: auto;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 2vh 0;
  background: #FFFFFF;
  box-shadow: 0 9px 28px 8px rgba(21, 118, 254, 0.05), 0 6px 16px 0 rgba(22, 119, 255, 0.08), 0 3px 6px -4px rgba(21, 118, 253, 0.12);
}
.safe-area-inset-bottom {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
.province-code-box {
  width: 100%;
}

.keyboard-header {
  display: flex;
  justify-content: space-between;
}

.bl-button--text {
  display: inline-block;
  padding: 0.4vh 4vw;
  color: #1aad19;
}

.bl-button--text:active {
  background: rgba(26, 173, 25, 0.5);
  color: #FFFFFF;
}
</style>
