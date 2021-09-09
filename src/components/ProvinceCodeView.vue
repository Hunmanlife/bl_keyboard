<template>
  <ul class="province-code-wrapper common-code-style">
    <li class="province-code-item" v-for="(key,index) in provinceCode" :key="index">
      <button class="key txt-key r-border shortcut"
              tag="button"
              v-tap="{ methods: onButtonClick, entity: key }">{{ key.name }}
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ProvinceCodeView',
  props: ['provinceCode'],
  methods: {
    onButtonClick: function (params) {
      let entity = params.entity
      let para = {
        name: entity.name,
        index: 0
      }
      this.$emit('onChangeProvinceCode', para)
    }
  }
}
</script>

<style scoped>
ul.province-code-wrapper {
  width: 100%;
  height: 20%;
  text-align: center;
}

ul.province-code-wrapper > li {
  display: inline-block;
}
</style>
