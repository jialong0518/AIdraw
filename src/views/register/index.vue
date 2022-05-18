<template>
  <div class="register" v-show="registerState">
    <div class="register_mask">
      <div class="registerDiv">
        <div class="close" @click="$root.REGISTERSTATE = false"></div>
        <div class="title">新用户注册</div>
        <div class="formDiv">
          <el-input prefix-icon="el-icon-user-solid" v-model="smsform.phone" placeholder="请输入手机号"></el-input>
          <div class="tips">{{smsform.dtips}}</div>
          <div :style="{'display': 'flex', 'align-items': 'center'}">
            <div class="ckeckDiv" :style="{'position': 'relative'}">
              <el-input :style="{'width': '200px'}" v-model="smsform.code" placeholder="请输入验证码"></el-input>
              <span class="ckeckIcon"></span>
            </div>
            <div class="checkCode"><img :style="{'width': '100%', 'height': '100%'}" :src="imgCode64" /></div>
            <i :style="{'color': '#1890FF', 'font-size': '26px','cursor': 'pointer'}" @click="getImgCode" class="el-icon-refresh"></i>
          </div>
          <div class="tips">{{smsform.imgtips}}</div>
          <div :style="{'display': 'flex', 'align-items': 'center', 'justify-content': 'space-between'}">
            <div class="ckeckDiv" :style="{'position': 'relative'}">
              <el-input :style="{'width': '200px'}" v-model="smsform.smsCode" placeholder="请输入手机验证码"></el-input>
              <span class="ckeckIcon"></span>
            </div>
            <div :class="{'disable':textBut !=='获取验证码'}" class="gainNote"  @click="smsInspect">{{textBut}}</div>
          </div>
          <div class="tips">{{smsform.smstips}}</div>
          <div :style="{'position': 'relative'}">
            <el-input prefix-icon="el-icon-lock" v-show="passwordtype" type="password"  v-model="smsform.passWord" placeholder="设置6-20位登录密码"></el-input>
          </div>
          <div class="tips">{{smsform.passtips}}</div>
          <div :style="{'position': 'relative'}">
            <el-input prefix-icon="el-icon-lock" v-show="passwordtype" type="password"  v-model="smsform.pwd" placeholder="请再次输入登录密码"></el-input>
          </div>
          <div class="tips">{{smsform.pwdtips}}</div>
          <el-select v-model="provinceData" @change="provinceFun" style="width: 100%;" placeholder="请选择省份">
            <el-option
              v-for="item in provinceList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div class="tips">注：省份一经选择，不可修改，请慎重选择</div>
          <el-radio v-model="read" label="1" @change="readFun"><span style="color: rgba(153, 153, 153, 1);font-size: 13px;"> 勾选同意 </span></el-radio>
            <span style="color: #1CB278;font-size: 13px;cursor: pointer;">《用户服务协议》</span>
          <div class="registerBut" @click="codeSignIn">立即注册</div>
          <div class="loginNow">
            <span style="cursor: pointer;" @click="loginFun">已有帐号，立即登录</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { imgCode, userRegister, registerPwd, registersms } from "@/api/login";
import { getDictionary } from "@/api/public";


export default {
  name: "register",
  props: {
    registerState: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      passwordtype: true,
      hit: '1',
      read:'',
      form: {
        phone: '',
        passWord: '',
        dtips:'',
        mtips:'',
      },
      smsform: {
        phone: '',
        code: '',
        smsCode: '',
        dtips:'',
        imgtips:'',
        smstips:'',
        passWord:'',
        passtips:'',
        pwdtips:'',
        pwd:''
      },
      imgCode64:'',
      imgKey:'',
      note: {},
      textBut: '获取验证码',
      provinceList: [],
      provinceData: '',
      provinceName: ''
    };
  },
  watch: {
    registerState: {
      handler: function (val, oldVal) {
        console.log(val)
        this.smsform = {
          phone: '',
          code: '',
          smsCode: '',
          dtips:'',
          imgtips:'',
          smstips:'',
          passWord:'',
          passtips:'',
          pwdtips:'',
          pwd:''
        },
        this.provinceData = '';
        this.provinceName = '';
        this.read = '';
      },
      // immediate: true,
      // deep: true,
    },
  },
  components: {},
  mounted: function () {
    this.getImgCode();
    this.getProvinceList();
  },
  methods: {
    getImgCode() {
      imgCode()
        .then((r) => {
          if (r.code === 200) {
            this.imgCode64 = r.data.image;
            this.imgKey = r.data.key;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    smsInspect(){
      this.smsform.imgtips = '';
      this.smsform.dtips = '';
      if(this.textBut !== '获取验证码') return;
      let phonereg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      this.smsform.phone = this.smsform.phone.trim();
      if (!phonereg.test(this.smsform.phone)) {
          this.smsform.dtips = '手机号格式不正确';
          return false;
      }
      if (this.smsform.code.length !== 4) {
          this.smsform.imgtips = '验证码输入错误';
          return false;
      }
      // if (this.smsform.smsCode.length !== 6) {
      //     this.smsform.smstips = '手机验证码输入错误';
      //     return false;
      // }
      // this.smsform.smstips = '';
      this.getSmsregister()
    },
    getSmsregister() {
      registersms({
        phone: this.smsform.phone,
        key: this.imgKey,
        imageVerifyCode: this.smsform.code
      })
        .then((r) => {
          this.smsform.dtips = '';
          this.smsform.imgtips = '';
          if(r.code === 101) {
            this.smsform.dtips = '手机号已注册，请登录';
          }
          if(r.code === -1) {
            this.smsform.imgtips = '验证码失效';
          }
          if (r.code === 200) {
            this.timeOut()
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    timeOut() {
      let text = 60;
      this.textBut = '60秒';
       let time = setInterval(()=>{
        text = text -1;
        this.textBut = text+'秒';
        if(text === 0) {
          this.textBut = '获取验证码'
          clearTimeout(time)
          return
        }
      },1000)
    },
    codeSignIn() {
      this.smsform.dtips = '';
      this.smsform.smstips = '';
      this.smsform.passtips = '';
      this.smsform.pwdtips = '';
      let phonereg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      this.smsform.phone = this.smsform.phone.trim();
      if (!phonereg.test(this.smsform.phone)) {
          this.smsform.dtips = '手机号格式不正确';
          return false;
      }
      if (this.smsform.smsCode.length !== 6) {
          this.smsform.smstips = '手机验证码输入错误';
          return false;
      }
      if (this.smsform.passWord.length < 6 || this.smsform.passWord.length > 20) {
          this.smsform.passtips = '请设置6-20位登录密码';
          return false;
      }
      if (this.smsform.passWord !== this.smsform.pwd) {
          this.smsform.pwdtips = '请设置6-20位登录密码';
          return false;
      }
      if (this.provinceData === '') {
          this.$alert('请选择省份', '提示', {
            confirmButtonText: '确定'
          });
          return false;
      }
      if (this.read === '') {
          this.$alert('请勾选《用户服务协议》', '提示', {
            confirmButtonText: '确定'
          });
          return false;
      }
      userRegister({
        phone: this.smsform.phone,
        code: this.smsform.smsCode,
        pwd: this.smsform.passWord,
        provinceId: this.provinceData,
        province: this.provinceName,
      })
        .then((r) => {
          if (r.code === 112) {
            this.smsform.dtips = '手机号不存在，请先注册';
            return
          }
          if (r.code === 102) {
            this.smsform.smstips = '手机验证码输入错误';
            return
          }
          if (r.code === 200) {
            this.smsform.dtips = '';
            this.smsform.smstips = '';
            this.smsform.passtips = '';
            this.smsform.pwdtips = '';
            // sessionStorage.setItem('token', r.data.token);
            // sessionStorage.setItem('studentInfor', JSON.stringify(r.data.student));
            this.$root.REGISTERSTATE = false;
            this.$root.LOGINSTATE = true;
            // this.$emit('signState', true);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getProvinceList() {
      getDictionary({
        typeId: 16
      })
        .then((r) => {
          if (r.code === 200) {
            this.provinceList = r.data;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    readFun(data) {
      console.log(data)
    },
    provinceFun(data) {
      this.provinceList.map(item=>{
        if(data == item.value) {
          this.provinceName = item.label;
        }
      })
    },
    loginFun() {
      this.$root.REGISTERSTATE = false;
      this.$root.LOGINSTATE = true;
    }
  },
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
::v-deep .formDiv .el-input__inner {
  border-radius: 30px !important;
  height: 50px;
  text-indent: 15px;
}
::v-deep .formDiv .el-input__prefix {
  margin-left: 8px;
  font-size: 20px;
  color: #999;
}
::v-deep .ckeckDiv .el-input__inner {
  text-indent: 30px;
}
::v-deep .formDiv .el-radio {
  margin-right: 2px !important;
}
::v-deep .formDiv .el-radio__label {
  padding-left: 0px;
}
::v-deep .formDiv .el-radio__input.is-checked .el-radio__inner {
  border-color: #1CB278;
  background: #1CB278;
}
::v-deep .formDiv .el-radio__inner:hover {
  border-color: #1CB278;
}
.register {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  .register_mask {
    height: 100%;
    width:100%;
    background: rgba(0, 0, 0, 0.39);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .disable {
    background: rgba(233, 233, 233, 0.39) !important;
    color: #999999 !important;
    cursor: no-drop !important;;
  }
  .ckeckIcon {
    position: absolute;
    background: url('./ckeck.png') no-repeat;
    height: 17px;
    width: 15px;
    top: 19px;
    left: 16px;
  }
  .eye {
    background: url('./eye.png') no-repeat;
    height: 13px;
    width: 22px;
    cursor: pointer;
    position: absolute;
    top: 19px;
    right: 19px;
  }
  .registerDiv {
    background: #fff;
    width: 446px;
    // height: 386px;
    border-radius: 8px;
    position: relative;
    .close {
      background: url('./close.png') no-repeat;
      width: 15px;
      height: 15px;
      position: absolute;
      top: 15px;
      right: 15px;
      cursor: pointer;
    }
    .active {
      color: #1CB278 !important;
      border-color: #1CB278 !important;
    }
    .title {
      font-size: 20px;
      font-weight: bold;
      margin-top: 32px;
      margin-bottom: 38px;
      color: #333;
      text-align: center;
    }
    .formDiv {
      padding: 0 50px;
      margin-bottom: 38px;
      .loginNow {
        font-size: 14px;
        color: #1CB278;
        text-align: center;
        margin-top: 12px;
      }
      .tips {
        color: #FF6565;
        font-size: 12px;
        margin: 4px 0 12px;
        height: 14px;
      }
      .registerBut {
        width: 100%;
        height: 50px;
        background: rgba(28, 178, 120, 1);
        color: #fff;
        font-size: 18px;
        text-align: center;
        line-height: 50px;
        border-radius: 30px;
        cursor: pointer;
        margin-top: 10px;
      }
      .register {
        font-size: 12px;
        color: #999;
        cursor: pointer;
      } 
      .register1 {
        font-size: 12px;
        color: #1890FF;
        cursor: pointer;
      }

      .checkCode {
        width: 96px;
        height: 45px;
        background: rgba(233, 233, 233, 0.39);
        opacity: 1;
        border-radius: 22px;
        font-size: 16px;
        color: #999999;
        line-height: 45px;
        text-align: center;
        margin: 0 9px;
      }
      .gainNote {
        width: 132px;
        height: 45px;
        background: rgba(28, 178, 120);
        opacity: 1;
        border-radius: 22px;
        color: #fff;
        font-size: 14px;
        line-height: 45px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
  
}
</style>
