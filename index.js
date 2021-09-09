import BlKeyboard from './src/components/BlKeyboard'

const _IS_MOBILE = /mobile|table|ip(ad|hone|od)|android/i.test(navigator.userAgent);
// 这一步判断window.Vue是否存在，因为直接引用vue.min.js， 它会把Vue绑到Window上，我们直接引用打包好的js才能正常跑起来。
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('BlKeyboard', BlKeyboard)
  window.Vue.directive('tap', {
    bind: function (el, binding) {
      el.binding_ref = binding;
      el.tapEventHandler = function (evt) {
        if (el.disabled) return;
        evt.stopPropagation();
        evt.cancelBubble = true;
        var value = el.binding_ref.value;
        value.event = evt;
        value.methods.call(this, value);
      };
      el.tapEventHandler_nop = function (evt) {
      };
      if (_IS_MOBILE) {
        el.addEventListener("touchstart", el.tapEventHandler, true);
        el.addEventListener("touchend", el.tapEventHandler_nop, true);
      } else {
        el.addEventListener("click", el.tapEventHandler, true);
      }
    },
    unbind: function (el) {
      if (_IS_MOBILE) {
        el.removeEventListener("touchstart", el.tapEventHandler, true);
        el.removeEventListener("touchend", el.tapEventHandler_nop, true);
      } else {
        el.removeEventListener("click", el.tapEventHandler, true);
      }
    },
    update: function (el, binding) {
      el.binding_ref = binding;
    }
  });

}
//这样就可以使用Vue.use进行全局安装了。
BlKeyboard.install = function (Vue) {
  if (typeof window !== 'undefined' && window.Vue) {
    Vue = window.Vue
  }
  Vue.component(BlKeyboard.name, BlKeyboard)
  Vue.directive('tap', {
    bind: function (el, binding) {
      el.binding_ref = binding;
      el.tapEventHandler = function (evt) {
        if (el.disabled) return;
        evt.stopPropagation();
        evt.cancelBubble = true;
        var value = el.binding_ref.value;
        value.event = evt;
        value.methods.call(this, value);
      };
      el.tapEventHandler_nop = function (evt) {
      };
      if (_IS_MOBILE) {
        el.addEventListener("touchstart", el.tapEventHandler, true);
        el.addEventListener("touchend", el.tapEventHandler_nop, true);
      } else {
        el.addEventListener("click", el.tapEventHandler, true);
      }
    },
    unbind: function (el) {
      if (_IS_MOBILE) {
        el.removeEventListener("touchstart", el.tapEventHandler, true);
        el.removeEventListener("touchend", el.tapEventHandler_nop, true);
      } else {
        el.removeEventListener("click", el.tapEventHandler, true);
      }
    },
    update: function (el, binding) {
      el.binding_ref = binding;
    }
  });
}

export default BlKeyboard
