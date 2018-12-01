/*
 * update by pengzhen on 2017/9/18
 * peng_zhen@outlookindo.com
 * -------------------------------------------------
 * 扩展element-ui dialog 拖动
 */

import Vue from 'vue'

Vue.directive('drag', {
  bind: function (el, binding, vnode) {
    let dlg = el.getElementsByClassName('el-dialog')[0]
    let title = el.getElementsByClassName('el-dialog__title')[0]
    title.style.userSelect = 'none'
    title.style['-ms-user-select'] = 'none'
    title.style['-moz-user-select'] = 'none'
    title.style.cursor = 'default'

    dlg.offsetX = 0
    dlg.offsetY = 0

    let move = function (e) {
      dlg.style.left = e.pageX - dlg.x - dlg.offsetX + dlg.left + 'px'
      dlg.style.top = e.pageY - dlg.y - dlg.offsetY + dlg.top + 'px'
    }

    let up = function () {
      removeEventListener('mousemove', move)
      removeEventListener('mouseup', up)
    }

    let down = function (e) {
      dlg.x = dlg.offsetLeft
      dlg.left = parseInt(dlg.style.left) || 0
      dlg.offsetX = e.pageX - dlg.offsetLeft

      dlg.y = dlg.offsetTop
      dlg.top = parseInt(dlg.style.top) || 0
      dlg.offsetY = e.pageY - dlg.offsetTop

      addEventListener('mousemove', move)
      addEventListener('mouseup', up)
    }
    let header = el.getElementsByClassName('el-dialog__header')[0]
    header.onmousedown = down
    // header.addEventListener('mousedown', down)
  },
  unbind: function (el, binding, vnode) {
    let header = el.getElementsByClassName('el-dialog__header')[0]
    header.onmousedown = function (e) {
      return false
    }
  }
})
// Vue.directive('dragLR', {
//   bind: function (el, binding, vnode) {
//     let left = el.querySelector('.left')
//     let right = el.querySelector('.right')
//     let line = el.querySelector('.line')
//     let countWidth = document.body.offsetWidth - 284
//     let initW = 0
//     let starX = 0
//     let flag = false
//     let move = function (e) {
//       let moveX = e.pageX - starX
//       if (moveX > 0 && moveX <= initW) {
//         left.style.width = moveX + initW + 'px'
//       } else if (moveX < 0 && moveX >= -(starX - (initW + 257))) {
//         left.style.width = starX + moveX - 257 + 'px'
//       }
//       right.style.width = countWidth - left.offsetWidth + 'px'
//     }
//     let down = function (e) {
//       if (!flag) {
//         flag = true
//         initW = left.offsetWidth
//       }
//       starX = e.pageX
//       addEventListener('mousemove', move)
//       addEventListener('mouseup', up)
//       window.onresize = resize
//       document.onselectstart = function () {
//         return false
//       }
//     }
//     let up = function (e) {
//       removeEventListener('mousemove', move)
//       removeEventListener('mouseup', up)
//       document.onselectstart = function () {
//         return true
//       }
//     }

//     let resize = function () {
//       countWidth = document.body.offsetWidth - 284
//       left.style.width = ''
//       right.style.width = ''
//     }
//     left.style.height = document.body.offsetHeight - 200 + 'px'
//     line.addEventListener('mousedown', down)
//   }
// })