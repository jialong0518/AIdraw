<template>
  <div class="passWordDiv">

    <div class="inputDiv">
      <span class="leftSpan">当前密码：</span>
      <el-input
        placeholder="请输入当前密码"
        v-model="oldPassword"
        show-password
        clearable>
      </el-input>
    </div>

    <div class="inputDiv">
      <span class="leftSpan">新密码：</span>
      <el-input
        placeholder="请输入新密码"
        v-model="newPassword"
        show-password
        clearable>
      </el-input>
    </div>

    <div class="inputDiv">
      <span class="leftSpan">确认密码：</span>
      <el-input
        placeholder="请再次输入新密码"
        v-model="againPassword"
        @keyup.enter.native="subPassword"
        show-password
        clearable>
      </el-input>
    </div>

    <div @click="subPassword" class="submitPassword">提交</div>


  </div>
</template>

<script>
import { updatePassword } from "@/api/userCenterApi";

export default {
  name: "changePassword",
  data() {
    return {
      stuId: '',
      oldPassword: '',
      newPassword: '',
      againPassword: '',

      
    };
  },
  watch: {},
  components: {  },
  mounted: function () {
    let infor =JSON.parse(sessionStorage.getItem('studentInfor'));
    this.stuId = infor.id;

  },
  methods: {
    subPassword(){
      if(!this.oldPassword){
        this.$alert('请输入当前密码', '提示', {
          confirmButtonText: '确定',
          callback: action => {}
        });
        return false;
      }

      if(!this.newPassword){
        this.$alert('请输入新密码', '提示', {
          confirmButtonText: '确定',
          callback: action => {}
        });
        return false;
      }

      if(this.newPassword.length<6||this.newPassword.length>12){
        this.$alert('密码限制在6~12位之间', '提示', {
          confirmButtonText: '确定',
          callback: action => {}
        });
        return false;
      }

      if(!this.againPassword){
        this.$alert('请再次输入新密码', '提示', {
          confirmButtonText: '确定',
          callback: action => {}
        });
        return false;
      }

      if(this.againPassword != this.newPassword){
        this.$alert('两次密码必须一致', '提示', {
          confirmButtonText: '确定',
          callback: action => {}
        });
        return false;
      }

      updatePassword(
        {
          stuId: this.stuId,
          pwdOld: this.oldPassword,
          pwd1: this.newPassword,
          pwd2: this.againPassword,
        }
      )
      .then((r) => {

        this.$alert('密码修改成功，请重新登录', '提示', {
          confirmButtonText: '确定',
          callback: () => {
            sessionStorage.clear();
            this.$router.push('/');
          }
        });

      })
      .catch((e) => {
        console.log(e);
      });



    },

  },
  beforeDestroy() {},
  
};
</script>

<style lang="scss" scoped>
  .passWordDiv {
    width: 100%;
    padding: 40px 40px;
    .inputDiv {
      width: 100%;
      margin-bottom: 20px;
      .leftSpan {
        display: inline-block;
        width: 80px;
        text-align: right;
        font-size: 14px;
        line-height: 40px;
      }
      .el-input__inner,.el-input {
        width: 300px;
      }

    }
    .submitPassword {
      width: 120px;
      height: 40px;
      border-radius: 4px;
      background-color: #1CB278;
      color: #fff;
      text-align: center;
      line-height: 40px;
      cursor: pointer;
      margin-top: 40px;
      margin-left: 100px;
    }
    .submitPassword:hover {
      background-color: #17E696;
    }
  }
  


</style>
