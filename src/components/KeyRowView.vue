<template>
  <ul class="keyrow common-code-style">
    <li v-for="key in keys" :key="key.id">
      <button tag="button"
              class="key r-border txt-key"
              :class="'keycodeof-'+key.id"
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
    }
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

<style scoped>
ul.keyrow {
  width: 100%;
  height: 20%;
  text-align: center;
}

ul.keyrow > li {
  display: inline-block;
}

/*删除按键，按键码为1*/
button.keycodeof-99 {
  color: transparent;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 4.5vw;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NiIgaGVpZ2h0PSI0NiIgdmlld0JveD0iMCAwIDQ2IDQ2Ij48cGF0aCBmaWxsPSIjOTk5IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00MiwzOUgxOGExLjk5LDEuOTksMCwwLDEtLjQ2Mi0wLjA1OSwzLjI2OCwzLjI2OCwwLDAsMS0yLjg4LS45MDZMMS45MTQsMjUuMjkxYTMuMjc3LDMuMjc3LDAsMCwxLDAtNC42MzRMMTQuNjU3LDcuOTE0YTMuMjY4LDMuMjY4LDAsMCwxLDMuMDA5LS44OEExLjk5MywxLjk5MywwLDAsMSwxOCw3SDQyYTQsNCwwLDAsMSw0LDRWMzVBNCw0LDAsMCwxLDQyLDM5Wk0zNy43LDE2Ljg0N0wzMS41MywyM2w2LjE0NSw2LjE0NWExLjA4NywxLjA4NywwLDEsMS0xLjUzNywxLjUzN0wyOS45OTEsMjQuNTRsLTYuMTI4LDYuMTE2YTEuMDg2LDEuMDg2LDAsMCwxLTEuNTM3LTEuNTM0TDI4LjQ1NSwyMywyMi4zLDE2Ljg1MWExLjA4NywxLjA4NywwLDAsMSwxLjUzNy0xLjUzN2w2LjE1NSw2LjE1NSw2LjE2OC02LjE1NkExLjA4NiwxLjA4NiwwLDEsMSwzNy43LDE2Ljg0N1oiLz48L3N2Zz4=");
}
</style>
