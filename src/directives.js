import Vue from 'vue'

const IP_REGEX = '^(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|[1-9])\\.' +
'(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\.' +
'(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\.' +
'(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)$'

// 注册一个全局自定义指令 `v-checkParam`
Vue.directive('checkParam', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el, binding, vNode) {
    el.addEventListener('keyup', function (event) {
      // 首先去除已有样式
      el.className = el.className.replace('input-error', '').trim()
      if (!event.keyCode) { // 加上这个判断就是在提交时，才会校验
        // 判断是否是否必填
        let isRequired = binding.value.required
        if (isRequired) {
          if (!el.value || el.value === '') {
            el.className += ' input-error'
          }
        }

        // 判断正则
        // debugger
        let regex = binding.value.regex
        if (regex === 'IpRegex') {
          if (!el.value.match(IP_REGEX)) {
            el.className += ' input-error'
          }
        } else if (!el.value.match(regex)) {
          el.className += ' input-error'
        }
      }
    })
  }
})

// 注册一个全局自定义指令 `v-checkSubmit`
Vue.directive('checkSubmit', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el, binding, vNode) {
    el.addEventListener('click', function (event) {
      let elements = document.getElementsByClassName('v-check')
      var evObj = document.createEvent('Event')
      evObj.initEvent('keyup', true, true)
      for (let element of elements) {
        element.dispatchEvent(evObj)
      }
      let errorInputs = document.getElementsByClassName('input-error')
      if (errorInputs.length === 0) {
        vNode.context.submit()
      }
    })
  }
})
