import Vue from 'vue'
// 弹窗组件单文件
import mockSwitch from './main.vue'

// 获取body并且创建一个新的div节点
let body = document.body,
  mockSwitchBox = document.createElement('div')
// 给创建的div设置id=message，并且添加到body后
mockSwitchBox.setAttribute('id', 'mockSwitchBox')
body.appendChild(mockSwitchBox)

new Vue({
  render: (h) => {
    return h(
      mockSwitch
    )
  }
}).$mount('#mockSwitchBox')