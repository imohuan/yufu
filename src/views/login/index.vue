<template>
  <div class="h100">
    <div class="h-100 bruce">
      <ul class="bubble-bgwall">
        <li>Love</li>
        <li>Love</li>
        <li>Love</li>
        <li>Love</li>
        <li>Love</li>
        <li>Love</li>
        <li>Love</li>
        <li>Love</li>
        <li>Love</li>
        <li>Love</li>
      </ul>
      <div class="flex-ct-x">
        <form class="bubble-distribution">
          <h3>欢迎来到语符</h3>
          <div class="accout">
            <input v-model="info.username" type="text" placeholder="请输入手机或邮箱" pattern="^1[3456789]\d{9}$|^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$" required @keyup.enter.native="login">
            <img src="https://b-gold-cdn.xitu.io/v3/static/img/greeting.1415c1c.png">
          </div>
          <div class="password">
            <input
              v-model="info.password"
              type="password"
              placeholder="请输入密码(6到20位字符)"
              pattern="^[\dA-Za-z_]{6,20}$"
              required
              @keyup.enter.native="login"
            >
            <img src="https://b-gold-cdn.xitu.io/v3/static/img/blindfold.58ce423.png">
          </div>
          <img src="https://b-gold-cdn.xitu.io/v3/static/img/normal.0447fe9.png">
          <div class="button-login">
            <div class="login-btn">
              <button type="button" @click="login">登录</button>
            </div>
            <div class="login-btn">
              <button type="button" @click="register">注册</button>
            </div>
          </div>
        </form>
        <p style="position: absolute;bottom: 10px;left: 10px;color: #2c3e50;">https://codepen.io 网上开源代码</p>
      </div>
    </div>
  </div>
</template>

<script>
// import { randomWord } from '@/api/word.js'
import { login, register } from '@/api/user.js'
import { setToken } from '@/utils/auth.js'

export default {
  name: 'Login',
  data() {
    return {
      timer: null,
      info: {
        username: '',
        password: ''
      },
      result: ['love']
    }
  },
  mounted() {
  },
  destroyed() {
    this.timer = null
  },
  methods: {
    login() {
      if (this.info.username === '' || this.info.password === '') {
        this.$message({
          message: '请输入信息',
          type: 'error'
        })
        return
      }
      login(this.info).then(res => {
        setToken(res.id)
        const path = this.$route.params['redirect'] || '/'
        this.$router.push({ path })
      })
    },
    register() {
      if (this.info.username === '' || this.info.password === '') {
        this.$message({
          message: '请输入信息',
          type: 'error'
        })
        return
      }
      register(this.info).then(res => {
        setToken(res.id)
        const path = this.$route.params['redirect'] || '/'
        this.$router.push({ path })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  $blue: #0082cb;
  $red: #ff6c43;

  .h100 {
    height: 100vh;
  }
  .bruce {
    background-image: linear-gradient(270deg, #8146b4, #6990f6);
    .bubble-bgwall {
      overflow: hidden;
      position: absolute;
      margin: 0 auto;
      width: 1200px;
      height: 100%;
      li {
        display: flex;
        position: absolute;
        bottom: -200px;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        width: 50px;
        height: 50px;
        background-color: rgba(#fff, .15);
        color: #ccc;
        animation: bubble 15s infinite;
        &:nth-child(1) {
          left: 10%;
        }
        &:nth-child(2) {
          left: 20%;
          width: 90px;
          height: 90px;
          animation-duration: 7s;
          animation-delay: 2s;
        }
        &:nth-child(3) {
          left: 25%;
          animation-delay: 4s;
        }
        &:nth-child(4) {
          left: 40%;
          width: 60px;
          height: 60px;
          background-color: rgba(#fff, .3);
          animation-duration: 8s;
        }
        &:nth-child(5) {
          left: 70%;
        }
        &:nth-child(6) {
          left: 80%;
          width: 120px;
          height: 120px;
          background-color: rgba(#fff, .2);
          animation-delay: 3s;
        }
        &:nth-child(7) {
          left: 32%;
          width: 160px;
          height: 160px;
          animation-delay: 2s;
        }
        &:nth-child(8) {
          left: 55%;
          width: 40px;
          height: 40px;
          font-size: 12px;
          animation-duration: 15s;
          animation-delay: 4s;
        }
        &:nth-child(9) {
          left: 25%;
          width: 40px;
          height: 40px;
          background-color: rgba(#fff, .3);
          font-size: 12px;
          animation-duration: 12s;
          animation-delay: 2s;
        }
        &:nth-child(10) {
          left: 85%;
          width: 160px;
          height: 160px;
          animation-delay: 5s;
        }
      }
    }
    @keyframes bubble {
      0% {
        opacity: .5;
        transform: translateY(0) rotate(45deg);
      }
      25% {
        opacity: .75;
        transform: translateY(-400px) rotate(90deg);
      }
      50% {
        opacity: 1;
        transform: translateY(-600px) rotate(135deg);
      }
      100% {
        opacity: 0;
        transform: translateY(-1000px) rotate(180deg);
      }
    }
  }
  .flex-ct-x {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .bubble-distribution {
    position: relative;
    margin-top: 50px;
    padding: 25px;
    border-radius: 2px;
    width: 320px;
    background-color: #fff;
    z-index: 201;
    h3 {
      font-weight: bold;
      font-size: 16px;
      line-height: 4rem;
      color: #333;
    }
    div {
      margin-top: 10px;
    }
    img {
      position: absolute;
      left: 50%;
      bottom: 100%;
      margin: 0 0 -20px -60px;
      width: 120px;
    }
    ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
      height: 30px;
      line-height: 30px;
      list-style: none;
      padding: 0;
    }
    li {
      position: relative;
      width: 45%;
      transition: all 300ms;
      &:focus-within {
        background: linear-gradient(90deg, $blue 50%, transparent 0) linear-gradient(90deg, $blue 50%, transparent 0) linear-gradient(0deg, $blue 50%, transparent 0) linear-gradient(0deg, $blue 50%, transparent 0) repeat-x repeat-x repeat-y repeat-y 0 0, 0 100%, 0 0, 100% 0;
        background-size: 8px 1px, 8px 1px, 1px 8px, 1px 8px;
        animation: move 500ms infinite linear;
      }
    }
    input[type=text],
    input[type=password] {
      padding: 10px;
      outline: none;
      border: 1px solid #e9e9e9;
      border-radius: 2px;
      width: 100%;
      height: 40px;
      transition: all 300ms;
      &:focus:valid {
        border-color: $blue;
      }
      &:focus:invalid {
        border-color: $red;
      }
    }
    .button-login {

      .login-btn:first-child button{
        background-color: rgba(58, 131, 93, 0.72);
      }

      .login-btn:active {
        border: 1px solid #fff;
      }

      .login-btn {
        float: left;
        width: 50%;
        box-sizing: border-box;
        padding:0 10px;
        button {
          width: 100%;
          overflow: hidden;
          margin-top: 10px;
          outline: none;
          border: none;
          border-radius: 2px;
          height: 40px;
          background-color: $blue;
          cursor: pointer;
          color: #fff;
          transition: all 300ms;
        }
      }
    }
    .accout,
    .password,
    .code {
      img {
        display: none;
        margin-bottom: -27px;
      }
      &:focus-within {
        img {
          display: block;
        }
        & ~ img {
          display: none;
        }
      }
    }
    .code {
      display: flex;
      justify-content: space-between;
      button {
        margin-top: 0;
      }
      input {
        &:not(:placeholder-shown) {
          width: 70%;
          & + button {
            width: 25%;
          }
        }
        &:placeholder-shown {
          width: 100%;
          & + button {
            width: 0;
            opacity: 0;
          }
        }
      }
    }
    @keyframes move {
      to {
        background-position: 6% 0, -6% 100%, 0 -6%, 100% 6%;
      }
    }
  }
</style>
