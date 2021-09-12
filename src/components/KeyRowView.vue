<template>
  <ul class="keyrow common-code-style">
    <li v-for="key in keys" :key="key.id">
      <button tag="button"
              class="key"
              :class="'keycodeof-'+key.id"
              :disabled="disabled || key.name === 'O'"
              v-tap="{methods: onButtonClick, entity: key }"
      >{{ key.name | deleteTextFilter }}
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'KeyRowView',
  props: {
    keys: {
      type: Array,
      default: () => {
        return []
      }
    },
    disabled: Boolean
  },
  data () {
    return {}
  },
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
    onButtonClick (params) {
      let entity = params.entity
      let para = {
        name: entity.name
      }
      this.$emit('onButtonClick', para)
    }
  }
}
</script>
