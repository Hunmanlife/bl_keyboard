import Vue from 'vue'
import App from './App.vue'
import 'amfe-flexible'
const _IS_MOBILE = /mobile|table|ip(ad|hone|od)|android/i.test(navigator.userAgent)
Vue.directive('tap', {
  bind: function (el, binding) {
    el.binding_ref = binding
    el.tapEventHandler = function (evt) {
      if (el.disabled) return
      evt.stopPropagation()
      evt.cancelBubble = true
      var value = el.binding_ref.value
      value.event = evt
      value.methods.call(this, value)
    }
    el.tapEventHandler_nop = function () {}
    if (_IS_MOBILE) {
      el.addEventListener('touchstart', el.tapEventHandler, true)
      el.addEventListener('touchend', el.tapEventHandler_nop, true)
    } else {
      el.addEventListener('click', el.tapEventHandler, true)
    }
  },
  unbind: function (el) {
    if (_IS_MOBILE) {
      el.removeEventListener('touchstart', el.tapEventHandler, true)
      el.removeEventListener('touchend', el.tapEventHandler_nop, true)
    } else {
      el.removeEventListener('click', el.tapEventHandler, true)
    }
  },
  update: function (el, binding) {
    el.binding_ref = binding
  }
})
new Vue({
  el: '#app',
  render: h => h(App)
})
