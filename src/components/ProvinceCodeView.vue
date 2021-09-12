<template>
  <ul class="province-code-wrapper common-code-style">
    <li class="province-code-item" v-for="(key,index) in provinceCode" :key="index">
      <button tag="button"
              class="key"
              :class="'keycodeof-'+key.id"
              v-tap="{methods: onButtonClick, entity: key }"
      >{{ key.name | deleteTextFilter }}
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ProvinceCodeView',
  props: ['provinceCode'],
  filters: {
    deleteTextFilter: function (text) {
      if (!text || text === 'DEL') {
        return ''
      } else {
        return text
      }
    }
  },
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

