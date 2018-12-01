<template>
  <div class="layout" :class="{ toggleSideBar: toggleSideBar}">
    <div class="left-sidebar-placeholder"></div>
    <div class="header">
      <div class="user-logo">
        <img src="./image/logo.png" style="width:45px;margin: 0 0 8px 8px;font-size:44px;vertical-align: middle;" />
        <span>{{ kindo.config.SYSTEM_TITLE2 }}</span>
      </div>
      <div class="user-control">
        <ul>
          <li @click="toggleSide">
            <i class="el-icon-d-arrow-left" title="伸缩侧边栏"></i>
          </li>
          <li @click="fullScreen">
            <i class="el-icon-rank" title="全屏展示"></i>
          </li>
          <li @click="() => { this.$router.push('/changeLog') }">
            <i class="el-icon-view" title="版本记录"></i>
          </li>
        </ul>

      </div>
      <div class="user-nav">
        <div class="user-nav-item" :class="{ hideMenuSpan : hideMenuSpan }">
          <el-menu mode="horizontal" @select="menuClick">
            <el-menu-item v-for="item in menus" :key="item.id" :index="item.id" :router="item.id">
              <i :class="item.iconUrl" :title="item.name"></i>
              <span>{{ item.name }}</span>
            </el-menu-item>
          </el-menu>
        </div>
        <div class="user-info-item">
          <li>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <i class="fa fa-user"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <div style="min-width: 140px;">
                  <h4 style="padding: 10px"> {{ kindo.cache.get(kindo.constant.USER_INFO).emplName }} </h4>
                  <el-dropdown-item @click.native="signOut">
                    <i class="fa fa-sign-out-alt" style="margin: 0 10px 0 0"></i> 安全退出
                  </el-dropdown-item>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <li @click="() => this.sideForUserSetting = true" title="More...">
            <i class="fa fa-cog"></i>
          </li>
        </div>
      </div>
    </div>

    <div class="content clearfix">
      <div class="sidebar-menu">
        <el-menu ref="sideMenu" :default-openeds="defaultOpeneds" :collapse="toggleSideBar" @select="subMenuClick" style="background-color: #f2f2f2;">
          <!--只存在一级菜单-->
          <el-menu-item v-if="!item.children" v-for="item in subMenus" :index="item.id" :router="item.id" :key="item.id" :path="item.routerPath">
            <i :class="item.iconUrl"></i>
            <span slot="title">{{ item.name || '' }} </span>
          </el-menu-item>

          <!--存在二级菜单 begin-->
          <el-submenu v-else :index="item.id" :router="item.id">
            <template slot="title">
              <i :class="item.iconUrl"></i>
              <span>{{ item.name || '' }}</span>
            </template>

            <el-menu-item v-if="!item.children" v-for="item in item.children" :key="item.id" :index="item.id" :router="item.id" :path="item.routerPath">
              <i :class="item.iconUrl"></i>
              <span slot="title">{{ item.name || '' }} </span>
            </el-menu-item>

            <!--存在三级菜单 begin-->
            <el-submenu v-else :index="item.id" :router="item.id">
              <span slot="title">{{ item.name || '' }}</span>

              <el-menu-item v-for="item in item.children" :key="item.id" :index="item.id" :router="item.id" :path="item.routerPath">
                <i :class="item.iconUrl"></i>
                <span slot="title">{{ item.name || '' }}</span>
              </el-menu-item>
            </el-submenu>
            <!--存在三级菜单 end-->

          </el-submenu>
          <!--存在二级菜单 end-->
        </el-menu>
      </div>

      <transition name="el-zoom-in-top" mode="out-in">
        <router-view class="compnent">
        </router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import './css/element.fix.scss'

// import io from 'socket.io-client'
export default {
  data() {
    return {
      clickedMenu: null,

      // 是否最小化菜单
      toggleSideBar: false,

      // 是否隐藏菜单span
      hideMenuSpan: false,

      // 用户菜单
      menus: [],

      // 用户侧导航
      subMenus: [],

      // 记录用户打开的菜单
      defaultOpeneds: [],

      // 显示用户设置
      sideForUserSetting: false
    }
  },

  created() {
    this.menus = kindo.cache.get(kindo.constant.USER_MENUTREE)

    this.$nextTick(function () {
      this._userNavWidth = this.$el.querySelector('.user-nav').clientWidth
      this._userLogoWidth = this.$el.querySelector('.user-logo').clientWidth
      this._userControlWidth = this.$el.querySelector('.user-control').clientWidth
      if (this.$el.querySelectorAll(`[router="${this.$route.fullPath.split('/')[1]}"]`)[0]) {
        this.$el.querySelectorAll(`[router="${this.$route.fullPath.split('/')[1]}"]`)[0].click()
      } else {
        this.$el.querySelectorAll('.el-menu-item')[0].click()
      }
    })

    window.onresize = this.autoResize
    this.autoResize()
  },

  mounted() {
    this.$nextTick(function () {
      // this.getweb()
    })
  },

  methods: {
    menuClick(id) {
      let menu = this.menus.find(item => item.id === id)

      this.rootId = id
      this.subMenus = menu.children

      this.$nextTick(function () {
        if (this.$el.querySelectorAll(`[router="${this.$route.path.split('/')[2]}"]`)[0]) {
          this.$el.querySelectorAll(`[router="${this.$route.path.split('/')[2]}"]`)[0].click()
        } else {
          this.$el.querySelectorAll('.sidebar-menu .el-menu-item')[0].click()
        }
      })
    },

    subMenuClick(id) {
      if (id !== this.$route.name) {
        let menu = kindo.cache.get(kindo.constant.USER_MENU).find(item => item.id === id)
        kindo.cache.set('goBack', null, 'session')
        this.clickedMenu = id
        if (menu && menu.href && kindo.validate.url(menu.href)) {
          const token = kindo.cache.get(kindo.constant.USER_TOKEN)
          kindo.cache.remove(kindo.constant.USER_TOKEN)
          window.open(menu.href)
          kindo.cache.set(kindo.constant.USER_TOKEN, token, 'session')
          return
        }
        this.subId = id
        this.$router.push(`/${this.rootId}/${this.subId}`)
      }
    },

    toggleSide() {
      this.toggleSideBar = !this.toggleSideBar

      if (this.toggleSideBar) {
        this._defaultOpeneds = this.$refs.sideMenu.openedMenus.concat([])
      }
      if (!this.toggleSideBar) {
        this.defaultOpeneds = this._defaultOpeneds.concat([])
      }
      this.hideMenuSpan = document.body.clientWidth - this._userLogoWidth - this._userControlWidth - this._userNavWidth < 0
    },

    autoResize() {
      this.toggleSideBar = document.body.clientWidth < 1200
      this.$nextTick(() => {
        this.hideMenuSpan = document.body.clientWidth - this._userLogoWidth - this._userControlWidth - this._userNavWidth < 0
      })
    },

    fullScreen() {
      if (
        (document.fullScreenElement !== undefined && document.fullScreenElement === null) ||
        (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) ||
        (document.mozFullScreen !== undefined && !document.mozFullScreen) ||
        (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)
      ) {
        if (document.body.requestFullScreen) {
          document.body.requestFullScreen()
        } else if (document.body.mozRequestFullScreen) {
          document.body.mozRequestFullScreen()
        } else if (document.body.webkitRequestFullScreen) {
          document.body.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
        } else if (document.body.msRequestFullscreen) {
          document.body.msRequestFullscreen()
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      }
    },

    signOut() {
      kindo.cache.remove(kindo.constant.USER_TOKEN)
      kindo.cache.remove(kindo.constant.USER_INFO)
      kindo.cache.remove(kindo.constant.USER_MENU)
      kindo.cache.remove(kindo.constant.USER_MENUTREE)

      window.location.hash = ''
      window.location.reload()
    },
    activeCurrentMenu() {
      let sidebar = document.querySelector('.sidebar-menu')
      let chosenItem = ''
      Array.from(sidebar.querySelectorAll('.el-menu-item')).map(item => {
        if (item.getAttribute('router') === this.$route.name) {
          chosenItem = item
        }
      })
      if (chosenItem === '') {
        Array.from(document.querySelectorAll('.el-menu--vertical')).map(item => {
          Array.from(item.querySelectorAll('.el-menu-item')).map(itemLi => {
            if (itemLi.getAttribute('router') === this.$route.name) {
              chosenItem = itemLi
            }
          })
        })
      }
      chosenItem.click()
    }
    // getweb() {
    //   let self = this
    //   const socket = io(kindo.api.websoket)
    //   // this.$router.push({
    //   //   path: '/medicalRecordQC/_/statisticshospital',
    //   //   query: Object.assign({}, this.search, { deptCode: data })
    //   // })
    //   socket.on('opend', function(data) {
    //     console.log('opend:', data)
    //     console.log(socket.id)
    //   })
    //   socket.on('joined', function(data) {
    //     self.$router.push({
    //       query: Object.assign({}, this.search, { data: data })
    //     })
    //     // let additionParam = {}
    //     // if (self.search.quarter !== '') {
    //     //   additionParam = { year: '', quarter: self.search.year + self.search.quarter, month: '' }
    //     // } else if (self.search.month !== '') {
    //     //   additionParam = { year: '', quarter: '', month: self.search.year + self.search.month }
    //     // } else if (self.search.year !== '') {
    //     //   additionParam = { year: self.search.year, quarter: '', month: '' }
    //     // }
    //     // additionParam.t = new Date().getTime()
    //     // if (data.length >= 4) {
    //     //   if (data.length === 6) {
    //     //     self.btType = '3'
    //     //     self.search.year = kindo.util.formatDate(data.substr(0, 4), 'yyyy')
    //     //     self.search.month = data.substr(4, 6)
    //     //     self.search.quarter = ''
    //     //   } else if (data.length === 5) {
    //     //     self.btType = '2'
    //     //     self.search.year = kindo.util.formatDate(data.substr(0, 4), 'yyyy')
    //     //     self.search.month = ''
    //     //     self.search.quarter = data.substr(4, 5)
    //     //   } else if (data.length === 4) {
    //     //     self.btType = '1'
    //     //     self.search.year = kindo.util.formatDate(data, 'yyyy')
    //     //     self.search.month = ''
    //     //     self.search.quarter = ''
    //     //   }
    //     //   setTimeout(() => {
    //     //     self.get()
    //     //   }, 100)
    //     //   console.log('joined:', data)
    //     // } else if (data === 203) {
    //     //   document.querySelectorAll('.sidebar-menu .el-menu-item[router="statisticshospital"]')[0].click()
    //     //   self.$router.push({
    //     //     path: '/medicalRecordQC/_/statisticshospital',
    //     //     query: Object.assign({}, self.search, additionParam)
    //     //   })
    //     //   // socket.emit('result', '操作成功')
    //     // } else if (data === 204) {
    //     //   document.querySelectorAll('.sidebar-menu .el-menu-item[router="statisticsdept"]')[0].click()
    //     //   self.$router.push({
    //     //     path: '/medicalRecordQC/_/statisticsdept',
    //     //     query: Object.assign({}, self.search, additionParam)
    //     //   })
    //     //   // socket.emit('result', '操作成功')
    //     // } else if (data === 205) {
    //     //   document.querySelectorAll('.sidebar-menu .el-menu-item[router="invalidMedicalRecordQuery"]')[0].click()
    //     //   self.$router.push({
    //     //     path: '/medicalRecordQC/_/invalidMedicalRecordQuery',
    //     //     query: Object.assign({}, self.search, additionParam)
    //     //   })
    //     // } else if (data === 206) {
    //     //   self.exportTable()
    //     // } else {
    //     //   // socket.emit('result', '对不起操作失败')
    //     // }
    //   })
    // }
  },

  watch: {
    subMenus() {
      this._defaultOpeneds = []

      if (this.subMenus) {
        let expandMenu = menus => {
          menus.forEach(menu => {
            if (menu.children) {
              this._defaultOpeneds.push(menu.id)
              expandMenu(menu.children)
            }
          })
        }
        expandMenu(this.subMenus)
      }

      if (!this.toggleSideBar) {
        this.defaultOpeneds = this._defaultOpeneds.concat([])
      }
    },
    '$route': function (val, oldVal) {
      if (this.clickedMenu != null) {
        this.activeCurrentMenu()
        this.clickedMenu = null
      } else {
        let topMenu = kindo.util.getTopMenu(kindo.cache.get(kindo.constant.USER_MENU), { id: val.name })
        if (document.querySelector(".el-menu-item[router='" + topMenu.id + "']").className.indexOf('is-active') > -1) {
          this.activeCurrentMenu()
        } else {
          document.querySelector(".el-menu-item[router='" + topMenu.id + "']").click()
        }
        this.clickedMenu = null
      }
    },
    'toggleSideBar': function (val, oldVal) {
      setTimeout(() => {
        this.activeCurrentMenu()
      }, 500)
    }
  }
}
</script>

<style>
.left-sidebar-placeholder {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  height: 100%;
  width: 240px;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
  transition: all 0.3s;
  background-color: #f2f2f2;
}

.el-menu--collapse .el-submenu .el-menu {
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
}

.el-menu--collapse .el-submenu .el-submenu__title {
  min-width: 200px;
}

.toggleSideBar .el-menu--collapse .el-submenu .el-submenu__title {
  min-width: 60px;
}

.toggleSideBar .el-icon-k-sys-bars-left:before {
  content: '\e62f';
}

.header .el-menu,
.header .el-submenu .el-menu,
.el-menu--horizontal .el-menu-item:hover,
.el-menu--horizontal .el-menu-item:hover,
.el-menu--horizontal .el-submenu__title:hover,
.header .el-submenu .el-menu-item:hover,
.header .el-submenu__title:hover {
  transition: none;
  background: transparent;
}

.el-menu--collapse .el-menu {
  background: #fff;
}

.el-menu--horizontal > .el-menu-item:hover,
.el-menu--horizontal > .el-submenu.is-active .el-submenu__title,
.el-menu--horizontal > .el-submenu:hover .el-submenu__title,
.el-submenu .el-menu-item:hover {
  border-bottom: 0px solid transparent;
  color: #20a0ff;
}

.el-submenu .el-menu-item {
  height: 40px;
  line-height: 40px;
}

.el-menu-item,
.el-submenu__title {
  padding: 0 10px;
}
/* el-menu end */

.layout {
  width: 100%;
  height: 100%;
  background: #f6f7fb;
}

.layout .header {
  position: relative;
  z-index: 3;
  line-height: 60px;
  height: 60px;
  /*box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);*/
  overflow: hidden;
  background-color: #0d87b8;
}

.layout .content {
  /*margin: 10px 0 0 0;*/
  background-color: #fafafa;
}

.header .user-logo {
  position: relative;
  float: left;
  padding: 0;
  font-size: 18px;
  width: 240px;
  transition: all 0.3s;
  background: #0d87b8;
  color: #fff;
}

.header .user-control {
  float: left;
}

.header .user-control ul {
  padding: 0 20px;
}

.header .user-control li {
  display: table-cell;
  padding: 0 15px;
  cursor: pointer;
  color: #fff;
}

.header .user-nav {
  float: right;
  position: absolute;
  right: 0;
}

.header .user-nav .hideMenuSpan span {
  display: none;
}

.header .user-nav-item {
  float: left;
  margin-right: 20px;
}

.header .user-info-item {
  float: right;
}

.header .user-info-item li {
  display: table-cell;
  padding: 0 15px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.6);
}
.header .user-info-item i {
  font-size: 18px;
}
.header .el-dropdown {
  color: rgba(255, 255, 255, 0.6);
}
.header .user-info-item li:hover,
.header .el-dropdown:hover {
  color: #fff;
}
.content .sidebar-menu {
  float: left;
  position: relative;
  width: 240px;
  z-index: 3;
  transition: all 0.3s;
  background-color: #f2f2f2;
}
.content .sidebar-menu .is-active .el-submenu__title {
  color: #409eff;
}
.content .sidebar-menu .is-active .el-submenu__title i {
  color: #409eff;
}
.content .compnent {
  float: right;
  padding: 10px 15px 0 15px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  width: calc(100% - 243px);
  background-color: #f6f7fb;
}

.toggleSideBar .content .compnent {
  width: calc(100% - 64px);
}

.toggleSideBar .content .sidebar-menu i {
  font-size: 16px;
}

.toggleSideBar .header .user-logo,
.toggleSideBar .content .sidebar-menu,
.toggleSideBar .left-sidebar-placeholder,
.toggleSideBar .left-sidebar-placeholder-bg {
  width: 64px;
}

.toggleSideBar .el-submenu__title:hover {
  transition: none;
  background: transparent;
}
/* toggleSideBar end */
</style>
