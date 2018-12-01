<template>
  <div class="container">
    <div class="main">
      <div class="left">
        <div class="sys-logo">
          <img src="./assets/image/logo.png">
        </div>
        <div class="sys-name">
          <span>{{ kindo.config.SYSTEM_TITLE1 }}</span><br>
          <span style="font-size:26px; letter-spacing: 3px;">{{ kindo.config.SYSTEM_TITLE2 }}</span>
        </div>
      </div>
      <div class="right" :style="{ 'background': 'url(assets/image/login_c.png) no-repeat;' }">
        <div class="login-form">
          <el-form :model="form" ref="form" :rules="rules" @submit.native.prevent @keyup.enter.native="signIn">
            <el-form-item class="sign-input" prop="userName" style="margin-bottom:30px;">
              <el-input v-model.trim.trim="form.userName" placeholder="用户名" prefix-icon="fa fa-user" style="height:28px"></el-input>
            </el-form-item>
            <el-form-item class="sign-input" prop="password" style="margin-bottom:20px;">
              <el-input v-model.trim.trim="form.password" type="password" placeholder="密码" prefix-icon="fa fa-key" style="height:28px "></el-input>
            </el-form-item>
            <el-form-item style="text-align:center;width:214px;height:28px; ">
              <el-button type="primary" @click="signIn" class="signIn-btn">登 录</el-button>
            </el-form-item>
            <!-- <el-form-item style="text-align:center;width:214px;height:28px; ">
                <el-button type="info" @click="langIn" class="langIn-btn">语音登录</el-button>
              </el-form-item> -->
          </el-form>
        </div>
      </div>
    </div>
    <router-view></router-view>
    <div class="footer">
      <p>未经许可网站内容禁止复制，转载，任何人不得擅自使用 </p>
      <!-- <p>国家卫生计生委卫生发展研究中心版权所有，未经许可网站内容禁止复制，转载，任何人不得擅自使用 </p> -->
      <!-- <p>邮编：100191 电话：82802398 邮箱：drg_nhdrc@126.com </p> -->
    </div>

    <el-dialog title="语音登录" width="30%" :visible.sync="loginVisible">
      <div class="maincon">
        <img :src="'http://qr.liantu.com/api.php?text='+ipaddress+'?code='+code" style="text-align:center; margin:0 auto" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import io from 'socket.io-client'
export default {
  data() {
    return {
      api: {
        signIn: kindo.api.upms + 'user/login/signIn'
      },
      form: {
        userName: '',
        password: ''
      },
      loginVisible: false,
      ipaddress: 'http://www.yautoshow.com:4567/',
      code: '',
      rules: {
        userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },

  beforeCreate() {
    // 跳转登录时, 如果尚未获取到配置信息. 则返回首页
    if (!kindo.api) {
      this.$router.push('/')
    }
  },

  mounted() {
    this.$nextTick(function() {
      // this.getweb()
    })
  },
  methods: {
    // getweb() {
    //   let self = this
    //   const socket = io(kindo.api.websoket) // 192.168.2.55
    //   socket.on('opend', function(data) {
    //     console.log('opend:', data)
    //     // let token = io.socket.handshake.headers.referer
    //     // console.log(socket)
    //     // let num = token.indexOf('code=')
    //     console.log(socket.id)
    //     self.code = socket.id
    //   })
    //   socket.on('joined', function(data) {
    //     // console.log(socket.id)
    //     if (data.indexOf('200') !== -1 && data.replace('200:', '') === socket.id) {
    //       console.log('joined:', data)
    //       self.form.userName = 'kindo'
    //       self.form.password = '123456'
    //       self.signIn()
    //       socket.emit('result', '登录成功')
    //     } else {
    //       self.form.userName = ''
    //       self.form.password = ''
    //       self.signIn()
    //       socket.emit('result', '对不起登录失败')
    //     }
    //   })
    // },
    langIn() {
      this.loginVisible = true
    },
    signIn() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const param = {
            loginNo: this.form.userName,
            pwd: kindo.util.md5(this.form.password)
          }

          this.$http.post(this.api.signIn, param).then(res => {
            // 保存登录信息到 session
            const userToken = window.encodeURIComponent(res.data.token)
            const userInfo = res.data
            kindo.cache.set(kindo.constant.USER_TOKEN, userToken, 'session')
            kindo.cache.set(kindo.constant.USER_INFO, userInfo, 'session')

            // 跳转首页
            this.$router.push('/')
          })
        }
      })
    },

    reset() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  background: #f0f2f5;
  width: 100%;
  height: 100%;
  /* background-image: url(../../../assets/image/bg.svg); */
  background-image: url(assets/image/bg.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  background-origin: content-box;

  .main {
    position: absolute;
    width: 802px;
    height: 458px;
    top: 94px;
    left: 50%;
    margin: 0 0 0 -401px;
    z-index: 1;
  }

  .main .left {
    /* background: url(../../../assets/image/login-bg.png); */
    width: 802px;
    text-align: center;
    position: relative;
  }
  @media screen and (min-width: 1366px) {
    .main .right {
      width: 550px;
      height: 200px;
      position: absolute;
      left: 50%;
      margin: 125px 0 0 -275px;
      background: url(assets/image/login_c.png) no-repeat;
    }
  }

  .sys-logo {
    position: absolute;
    top: -12px;
    left: -172px;
  }

  .sys-logo img {
    height: 60px;
  }

  .sys-en-name {
    vertical-align: text-bottom;
    margin: 0 24px;
    font-size: 32px;
    color: #2cadff;
    text-shadow: 0 0 1px #666;
    font-weight: 100;
  }

  .letter {
    display: inline-block;
    position: relative;
    color: #00b4f1;
    transform-style: preserve-3d;
    perspective: 400;
    z-index: 1;
  }
  .letter:before,
  .letter:after {
    position: absolute;
    content: attr(data-letter);
    transform-origin: top left;
    top: 0;
    left: 0;
  }
  .letter,
  .letter:before,
  .letter:after {
    transition: all 0.3s ease-in-out;
  }
  .letter:before {
    text-shadow: -1px 0px 1px rgba(255, 255, 255, 0.8), 1px 0px 1px rgba(0, 0, 0, 0.8);
    z-index: 3;
    transform: rotateX(0deg) rotateY(-15deg) rotateZ(0deg);
  }
  .letter:after {
    color: rgba(0, 0, 0, 0.11);
    z-index: 2;
    transform: scale(1.08, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 1deg);
  }
  .letter:hover:before {
    color: #fafafa;
    transform: rotateX(0deg) rotateY(-40deg) rotateZ(0deg);
  }
  .letter:hover:after {
    transform: scale(1.08, 1) rotateX(0deg) rotateY(40deg) rotateZ(0deg) skew(0deg, 22deg);
  }

  .sys-name {
    text-align: center;
    font-family: 'SimHei';
    /* margin: 0 20px; */
    font-size: 38px;
    color: #ffffff;
    text-shadow: 0 0 1px #666;
    letter-spacing: 6px;
    font-weight: 100;
    line-height: 65px;
  }

  .login-title {
    font-size: 14px;
    margin-bottom: 20px;
    text-align: center;
    position: relative;
    margin-top: 30px;
    color: #fff;
  }

  .login-form {
    width: 214px;
    position: relative;
    margin: 10px auto 0;
  }

  .login-form .sign-input {
    margin-bottom: 18px;
  }
  .signIn-btn {
    width: 214px;
    height: 28px;
    font-size: 14px;
    color: #fbfbfb;
  }

  .langIn-btn {
    width: 214px;
    height: 28px;
    font-size: 14px;
    color: #fbfbfb;
  }

  @media screen and (max-width: 1366px) {
    .main .right {
      width: 550px;
      height: 200px;
      position: absolute;
      left: 50%;
      margin: 65px 0 0 -275px;
      background: url(assets/image/login_c.png) no-repeat;
    }
  }

  .footer {
    position: absolute;
    width: 100%;
    bottom: 20px;
    text-align: center;
    line-height: 24px;
  }
  .footer p {
    color: #ffffff;
  }
  .maincon {
    text-align: center;
  }
}
</style>
