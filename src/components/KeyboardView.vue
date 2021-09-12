<template>
  <div class="keyboard-wrapper">
    <div id="keyboard-wrapper" class="keyboard-container safe-area-inset-bottom">
      <div class="keyboard-header">
        <span class="bl-button--text bl-cancel" @click.prevent="onToggle" v-show="toggle">切换系统键盘</span>
        <span></span>
        <span class="bl-button--text bl-confirm" @click.prevent="onClose">完成</span>
      </div>
      <div class="keyboard-key-container province-code-box" v-show="selectedIndex === 0">
        <province-code-view :provinceCode="ProvinceCodeArray.row0"
                            v-on:onChangeProvinceCode="onChangeProvinceCode"></province-code-view>
        <province-code-view :provinceCode="ProvinceCodeArray.row1"
                            v-on:onChangeProvinceCode="onChangeProvinceCode"></province-code-view>
        <province-code-view :provinceCode="ProvinceCodeArray.row2"
                            v-on:onChangeProvinceCode="onChangeProvinceCode"></province-code-view>
        <province-code-view :provinceCode="ProvinceCodeArray.row3"
                            v-on:onChangeProvinceCode="onChangeProvinceCode"></province-code-view>
      </div>
      <div class="keyboard-key-container number-letter-code-box" v-show="selectedIndex !== 0">
        <row-view :keys="numberAndletterArray.row0" :disabled="selectedIndex === 1" v-on:onButtonClick="onButtonClick"></row-view>
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
    toggle: Boolean,
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
          {'id': '5', 'name': '苏'},
          {'id': '4', 'name': '粤'},
          {'id': '6', 'name': '鲁'},
          {'id': '7', 'name': '晋'},
          {'id': '8', 'name': '冀'},
          {'id': '11', 'name': '渝'},
          {'id': '9', 'name': '豫'}
        ],
        'row1': [
          {'id': '10', 'name': '川'},
          {'id': '12', 'name': '辽'},
          {'id': '34', 'name': '吉'},
          {'id': '13', 'name': '黑'},
          {'id': '16', 'name': '湘'},
          {'id': '15', 'name': '鄂'},
          {'id': '14', 'name': '皖'},
          {'id': '17', 'name': '赣'},
          {'id': '18', 'name': '闽'},
          {'id': '19', 'name': '陕'},
        ],
        'row2': [
          {'id': '20', 'name': '甘'},
          {'id': '21', 'name': '宁'},
          {'id': '22', 'name': '蒙'},
          {'id': '23', 'name': '津'},
          {'id': '24', 'name': '贵'},
          {'id': '25', 'name': '云'},
          {'id': '26', 'name': '桂'},
          {'id': '27', 'name': '琼'},
          {'id': '28', 'name': '青'},
          {'id': '29', 'name': '新'},
        ],
        'row3': [
          {'id': '30', 'name': '藏'},
          {'id': '31', 'name': '使'},
          {'id': '77', 'name': '领'},
          {'id': '78', 'name': '警'},
          {'id': '76', 'name': '学'},
          {'id': '74', 'name': '港'},
          {'id': '75', 'name': '澳'},
          {'id': '99', 'name': 'DEL'}
        ]
      },
      numberAndletterArray: {
        'row0': [
          {'id': '101', 'name': '1'},
          {'id': '102', 'name': '2'},
          {'id': '103', 'name': '3'},
          {'id': '104', 'name': '4'},
          {'id': '105', 'name': '5'},
          {'id': '106', 'name': '6'},
          {'id': '107', 'name': '7'},
          {'id': '108', 'name': '8'},
          {'id': '109', 'name': '9'},
          {'id': '100', 'name': '0'},
        ],
        'row1': [
          {'id': '32', 'name': 'Q'},
          {'id': '33', 'name': 'W'},
          {'id': '34', 'name': 'E'},
          {'id': '35', 'name': 'R'},
          {'id': '36', 'name': 'T'},
          {'id': '38', 'name': 'Y'},
          {'id': '37', 'name': 'U'},
          {'id': '39', 'name': 'O'},
          {'id': '40', 'name': 'P'},
        ],
        'row2': [
          {'id': '41', 'name': 'A'},
          {'id': '42', 'name': 'S'},
          {'id': '43', 'name': 'D'},
          {'id': '44', 'name': 'F'},
          {'id': '45', 'name': 'G'},
          {'id': '46', 'name': 'H'},
          {'id': '47', 'name': 'J'},
          {'id': '48', 'name': 'K'},
          {'id': '49', 'name': 'L'},
        ],
        'row3': [
          {'id': '50', 'name': 'Z'},
          {'id': '51', 'name': 'X'},
          {'id': '52', 'name': 'C'},
          {'id': '53', 'name': 'V'},
          {'id': '54', 'name': 'B'},
          {'id': '55', 'name': 'N'},
          {'id': '56', 'name': 'M'},
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
    },
    onToggle() {
      this.$emit('onToggleSystem')
    }
  }
}
</script>

