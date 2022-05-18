<template>
  <div class="menuBar">
    <div class="headDiv">
        <div class="head">
          <span class="logo">
            <a style="display:inline-block;width:100%;height:100%;" href="#/"></a>
          </span>
          <div class="phone"><span class="icon"></span>咨询电话：<span class="phoneNum">400-001-7799</span></div>
          <div v-show="!signState" class="sign" @click="signBut">登录</div> 
          <div v-show="!signState" class="register" @click="$root.REGISTERSTATE = true">注册</div>
          <a href="#/userMeans">
            <img v-show="signState" :src="userInfor.imgUrl" />
          </a>
          <div v-show="signState" class="name">
            <a href="#/userMeans">{{userInfor.stuName}}</a>
          </div>
          <div v-show="signState" class="logout" @click="logout">退出</div>
        </div>
      </div>
    <div class="menuBarDiv">
      <el-menu
      router
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#1CB278"
        text-color="#fff"
        active-text-color="#fff">
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/">找学校</el-menu-item>
        <el-menu-item index="/searchMajor">查专业</el-menu-item>
        <el-submenu index="4">
          <template slot="title">填志愿</template>
          <!-- <el-menu-item index="4-1">志愿填报</el-menu-item> -->
          <el-menu-item index="4-2">院校优化填报</el-menu-item>
          <el-menu-item index="4-3">专业优化填报</el-menu-item>
          <el-menu-item index="4-4">一键填报</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">信息查询</template>
          <el-menu-item index="/batchLine">批次线</el-menu-item>
          <el-menu-item index="/scoreTable">一分一段表</el-menu-item>
          <el-menu-item index="/subjectAssessment">学科评估</el-menu-item>
          <el-menu-item index="/schoolLeagueTable">排行榜</el-menu-item>
        </el-submenu>
        <el-menu-item index="/collegeExpert">高考专家</el-menu-item>
      </el-menu>
    </div>
    <Login :loginState="$root.LOGINSTATE"  @signState="signStateFun"/>
    <Forget :forgetState="$root.FORGETSTATE"/>
    <Register :registerState="$root.REGISTERSTATE"/>
  </div>
</template>

<script>
import settings from '@/settings'
import logo from './logo.png'
import phoneIcon from './phoneIcon.png'

export default {
  name: 'menuBar',
  data() {
    return {
      activeIndex2: '/',
      logo,
      phoneIcon,
      signState: false,
      userInfor: {
        imgUrl: '',
        stuName: ''
      }
    }
  },
  watch: {},
  methods: {
    handleSelect(key, keyPath) {
      if(key.indexOf('4') !== -1){
        this.$alert('功能暂未开放', '提示', {
          confirmButtonText: '确定',
          confirmButtonClass: 'btnFalses'
          // callback: action => {
          //   this.$message({
          //     type: 'info',
          //     message: `action: ${ action }`
          //   });
          // }
        });
      }
      if(key === '/'){
        setTimeout(()=>{location.reload();},500)
      }
      console.log(key, keyPath);
    },
    signBut() {
      this.$root.LOGINSTATE = !this.$root.LOGINSTATE
    },
    signStateFun(data) {
      this.signState = true;
      this.userInfor = JSON.parse(sessionStorage.getItem('studentInfor'))
    },
    logout() {
      sessionStorage.removeItem('studentInfor');
      sessionStorage.removeItem('token');
      this.signState = false;
      this.$router.push('/');

    }
  },
  beforeDestroy(){},
  mounted: function() {
    // this.loginState = !this.loginState;
    if(sessionStorage.getItem('studentInfor')) {
      this.signState = true;
      this.userInfor = JSON.parse(sessionStorage.getItem('studentInfor'))
    }
  }
}
</script>

<style lang="scss">
.btnFalses{
    background: #1CB278 !important;
    border-color:#1CB278 !important;
}
.el-menu--popup-bottom-start {
  background: #fff !important;
  margin-top: 0px;
}
.el-menu--popup {
    min-width: 145px;
}
.el-menu--horizontal .el-menu .el-menu-item, .el-menu--horizontal .el-menu .el-submenu__title {
  background: #fff !important;
  color: #000 !important;
  text-align: center;
}
.el-menu--horizontal .el-menu .el-menu-item:hover {
  background: #1CB278 !important;
  color: #fff !important;
}
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>

.menuBar {
  width: 100%;
  background: #1CB278;
}
.headDiv {
  height: 84px;
  width: 100%;
  background: #fff;
  .head {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    .logo {
      display: inline-block;
      height: 51px;
      width: 163px;
      background: url('./logo.png');
      background-size: 100% 100%;
    }
    .phone {
      font-size: 18px;
      color: #666;
      font-weight: bold;
      display: flex;
      align-items: center;
      .icon {
        display: inline-block;
        height: 21px;
        width: 22px;
        background: url('./phoneIcon.png');
        background-size: 100% 100%;
      }
      .phoneNum {
        color: #1CB278;
      }
      margin-left: auto;
    }
    .sign {
      width: 76px;
      height: 36px;
      border: 1px solid #1CB278;
      opacity: 1;
      border-radius: 18px;
      font-size: 14px;
      color: #1CB278;
      line-height: 36px;
      text-align: center;
      cursor: pointer;
      margin-right: 14px;
      margin-left: 68px;
    }
    .register {
      line-height: 36px;
      text-align: center;
      cursor: pointer;
      width: 76px;
      height: 36px;
      background: #1CB278;
      border-radius: 18px;
      color: #fff;
    }
    img {
      height: 40px;
      width: 40px;
      border: 2px solid #1CB278;
      border-radius: 50px;
      margin: 0 8px 0 80px;
    }
    .name {
      font-size: 15px;
      color: #333;
      margin-right: 16px;
    }
    .logout {
      padding-left: 16px;
      color: #1CB278;
      font-size: 15px;
      border-left: 1px solid #999999;
      cursor: pointer;
    }
  }
}
.menuBarDiv {
  width: 1200px;
  margin: 0 auto;
}
::v-deep .el-menu--horizontal > .el-menu-item.is-active {
  border: 0;
}
::v-deep .el-menu.el-menu--horizontal {
  border: 0;
}
::v-deep .el-menu--horizontal>.el-submenu.is-active .el-submenu__title {
  border: 0;
}
::v-deep .el-menu--horizontal>.el-submenu .el-submenu__title {
  width: 145px;
  text-align: center;
}
::v-deep .el-menu-item {
  width: 145px;
  text-align: center;
  border: 0 !important;
}
::v-deep .el-menu .el-menu--popup .el-menu--popup-bottom-start {
  background: #fff;
}
::v-deep .el-submenu__title i {
  color: #fff;
}
::v-deep .el-menu .el-menu--popup .el-menu--popup-bottom-start {
  background: #fff !important;
}
</style>
