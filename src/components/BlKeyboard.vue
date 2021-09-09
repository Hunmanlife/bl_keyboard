<template>
  <div class="bl-keyboard-container">
    <div class="input-box">
      <input type="text" ref="carNumberInput" v-model="currentCarNumber" v-on:input="onInput" :readonly="readonly" @click.prevent="onClick" class="bl-input" @focus="focusLast"/>
      <span class="bl-input--expand " :class="readonly?'system-keyboard-icon':'system-keyboard-active-icon'" @click.prevent="onToggle"></span>
    </div>
    <key-board-view
      v-if="isShowKeyboard"
      :selectedIndex="selectedIndex"
      v-on:onChangeProvinceCode="onChangeProvinceCode"
      v-on:onButtonClick="onButtonClick"
      v-on:onClose="onClose"
    ></key-board-view>
  </div>
</template>

<script>
import KeyBoardView from './KeyboardView'
export default {
  name: 'BLKeyboard',
  props: {
    show: Boolean,
    maxlength: {
      type: Number,
      default: 8
    },
    value: {
      type: String,
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
      isShowKeyboard: false
    }
  },
  components: {
    KeyBoardView
  },
  beforeUpdate () {

  },
  mounted () {

  },
  computed: {
    selectedIndex: function () {
      let arr = this.currentCarNumber.split('')
      return arr.length
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
    onInput () {
      this.currentCarNumber = this.currentCarNumber.toUpperCase()
      this.$emit('change', this.currentCarNumber)
    },
    onToggle () {
      this.readonly = !this.readonly
      if (!this.readonly) {
        this.$refs.carNumberInput.focus();
        this.isShowKeyboard = false
      } else {
        this.$refs.carNumberInput.blur();
        this.isShowKeyboard = true
      }
    },
    onClick () {
      if (this.readonly) {
        this.isShowKeyboard = true
      }
    },
    onClose () {
      this.isShowKeyboard = false
      this.$emit('change', this.currentCarNumber)
    },
    onChangeProvinceCode (params) {
      this.currentCarNumber = params.name
    },
    onButtonClick (params) {
      let len = this.currentCarNumber.length
      if (params.name === 'DEL') {
        this.currentCarNumber = this.currentCarNumber.substring(0, len - 1)
      } else {
        if (len === 8) {
          this.currentCarNumber = this.currentCarNumber.substring(0, len - 1).concat(params.name)
        } else {
          this.currentCarNumber = this.currentCarNumber.concat(params.name)
        }
      }
    }
  },
  watch: {
    value: {
      handler: function (n) {
        this.currentCarNumber = n
      },
      immediate: true
    }
  }
}

</script>

<style>
  @import "../css/keyboard.css";
  html,body,ul,li{
    padding: 0;
    margin: 0;
  }
  ul,li{
    list-style: none;
  }
  .bl-keyboard-container {
    position: relative;
    flex: 1;
  }
  .input-box {
    position: relative;
    z-index: 2001;
    display: flex;
    width: 100%;
  }
  .bl-input {
    flex: 1;
    border: 0;
    outline: 0;
    -webkit-appearance: none;
    background-color: transparent;
    font-size: inherit;
    color: inherit;
    width: 100px;
    height: 1.41176471em;
    line-height: 1.41176471;
  }
  .bl-input--expand {
    display: inline-block;
    margin-left: 10px;
    width: 24px;
    height: 24px;
  }
  .system-keyboard-icon {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgEAYAAAAj6qa3AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAABltJREFUaN7tWVtIVF0UXssZNQPDkkS0IEIJxGTcexJLZwoGSTJMC43ECspulKC9lFkWFmb0ZLeHELtQaKKhopJReBunq4fyYehidvHClFDSCF6SWf/DmX3md6ZBzdv/Q9/LsM9ZZ63v+/Y+++y9B+Av5gfraT2tpwULxO988VDPdMKw8rDysHIvL59Cn0Kfwg0bAAEBk5KomZqpWafDSqzEyuDgQe2gdlC7eLF4jt/it/itHz9oG22jbb29YAELWIxGKIESKKmqGtYMa4Y1jY3mVHOqOXV0dKb44nQTcMYZZ56estCMDHpCT+hJXh6uxbW4NjDQ3XN0la7S1eFhhchhPIyH3Y8EOa/FIufNzwcCAioubpfapXbp1685N4AFsAAWEBEBn+ATfCovRx3qULdqlRKgBz3oOzrISlay3r9PZjKTua7O+573Pe97XV1Plz9d/nT59+8iPLo7uju6e8mSke0j20e2r1yJYRiGYQkJ6Iu+6Lt1K7RAC7RERCiGtFIrtb59CytgBaxITZW+Sd+kbx0d0+3QCcE555wnJfESXsJLrFa5TcSzeBbPMpv5G/6Gv9myZcbr2vMqdURdOw9WxIpYUXLyVPNOegREmiJNkab4eFSjGtW1tXgID+EhlYqqqZqqS0u9yIu8aO9euWeHhmarA0IuhVwKueTtvWh00eii0WvXsBRLsXTPHjgAB+CAzYZf8St+TU5+eerlqZenamqmXVCbrk3XpoeHMxMzMdPPn4rzxInTmTOzJXSyYBksg2WcPi14CZ6C9zTTe3jwbJ7Ns1+/VgoUsSJWdPv2fAt3McLOS+kgO2+hY8oJ5US7dyvCh9gQG/rwYb6/2+4geLFH7BF71NWlGGHXMcV0Hh68jJfxso8flUQmbuKmHTvmW+hEkPmmpSm87TqErgkTsHgWz+Kjo517Xr6LLpMmq2SVrLKtbbzjra0zFccG2AAbMBqd7ztfHw9EwVvJY9flHOniCPZjP/b/6zN2Fs7C2epquUHkEl+ABVhgsykXDGAAw8zF/b69bh0a0ICGmJjfG0A0nvdvdLkdAeWsnJU3NSk9NcAH+EBc3IQPzhHGjyBXA5U4O28l/iF/yB82NzvHuY4AIxrRGBws2jazzWwzi3fo/wMX3rVQC7VBQRMaABrQgMaxhh/pGekZ6bFY3BWa7Tlgsj3uIizTI9Mjs69PudAGbdA2GQNewAt4MTYmmp4pnimeKWq3u8bZngPcwgAGMLgaKKAqU5Wpyhy86Rk9o2cOXW7hvNbWtGhaNC1hYZN1/r8Cwdt5r+Ic5zIC6CSdpJM9PYqTAaoAVUBo6HwLmiqceVMURVFUb69znOvQzoIsyGpqkhtxcZAGaZC2ebPcdnxWBMQ7Kz5PcyWQHtNjetzWJvlJfpJfbKxLgOCNgIAAUA/1UN/Y6BzmMgJs+237bfurqpQL2ZAN2YmJYhfmUsjNuzzbkNcBrnUVnnbebnVNBGZlVmaVJPEOaYO0Qdqg7Oy5FjpV8Lv8Lr979KiyArTrcBfvfm18Hs7D+ZwcxcHPts+2z7m58uSydOl8C3WG4EWplEqpJ0640zFpA6QCqUAqaGiAjbARNjY0YDRGY7S/v2pYNawarqgQh5/zLVycSQpegqfgreiYqgEC6nB1uDpcbCe/fIEcyIEcvd7ngs8Fnws3bridG2YZSl0EBLx5U/AiE5nI1N09nvcMQKvX6rX6yEjns0CxK1uTsiZlTYr7U+CZgqgj6jqfDcptxmaNgDzkVq92OXg4yA/yg4ODrIN1sI7Cwhj/GP8Yf1/fadfjnHO+cKH8v8GxY3J7YEDpgEbWyBq7uxljjDHOp5r/j4/FIy5GXIy4GBCg3qneqd55/TomYAImOLabdJku02WrFY/gETzy4AEdp+N0vL4eC7EQCzs7MR/zMd+xVqc8yqO8oCA5LiREjtu0ia7QFboSH4+ZmImZDkOpjuqorrra9s72zvZu375X+lf6V/r+/jkzwBksnaWzdJ0Od+Eu3HXuHFRABVTodNAO7dCOf16HAwdOBH7gB35GI/VRH/Xl5kp3pDvSHfd7gTk3wBlR76PeR71ftmysc6xzrDMxEQMxEAP1esiADMgIDiYjGcno2J1hLMZibF8fFEMxFPf2koUsZGlpUYeoQ9QhNTXPQ5+HPg91LNH/4i9mBv8ApjugFtwtKh4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTktMDctMjVUMTk6MDM6NDYrMDg6MDDjypgnAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE5LTA3LTI1VDE5OjAzOjQ2KzA4OjAwkpcgmwAAAEt0RVh0c3ZnOmJhc2UtdXJpAGZpbGU6Ly8vaG9tZS9hZG1pbi9pY29uLWZvbnQvdG1wL2ljb25fcnZjcmVvZHhkZDgva2V5Ym9hcmQuc3ZnzT1jWAAAAABJRU5ErkJggg==");
    background-size: 100% 100%;
    background-position: center center;
  }
  .system-keyboard-active-icon {
    background-image: url("data:image/png;base64,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");
    background-size: 100% 100%;
    background-position: center center;
  }
</style>
