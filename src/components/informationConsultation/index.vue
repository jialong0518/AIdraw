<template>
  <div class="inforDiv">
    <div class="zz"></div>
    <div class="zxContent">
      <div class="zxHeader">
        <span class="headerWord">信息咨询</span>
        <div class="closeImgBtn" @click="closeBtn">
          <img src="./close.png" alt="">
        </div>  
      </div>

      <div class="inputDiv">
        <span>姓名：</span>
        <el-input style="width:370px;" clearable v-model="name" placeholder="请输入电话"></el-input>
      </div>

      <div class="inputDiv">
        <span>电话：</span>
        <el-input style="width:370px;" clearable v-model="phone" placeholder="请输入电话"></el-input>
      </div>

      <div class="inputDiv">
        <span style="vertical-align:top;">咨询内容：</span>
        <el-input style="width:370px;" type="textarea" rows='5' resize='none' placeholder="请输入咨询内容" v-model="content" maxlength="400" show-word-limit></el-input>
      </div>


      <div class="submitDiv">
        <span class="btnSpan submitBtn" @click="submitConsult">提交</span>
        <span class="btnSpan cancleBtn" @click="closeBtn">取消</span>
      </div>

    </div>

    
  </div>
</template>

<script>
import { saveConsult } from "@/api/batchLineApi";
import { MessageBox } from "element-ui";

export default {
  name: 'informationConsultation',
  data() {
    return {
      stuId: '',
      phone: '',
      name: '',
      content: '',
    }
  },
  watch: {
    teaId: {
      handler: function (val, oldVal) { 
        this.teaId = val;
      },
      immediate: true,
      deep: true
    },
  },
  props:{
    teaId:{
      // type:String,
      default:''
    }
  },
  mounted: function() {
    
    
    
  },
  methods: {
    closeBtn(){
      this.$emit('closeInfor');
    },
    submitConsult(){
      // let infor = JSON.parse(sessionStorage.getItem("studentInfor"));
      // if(infor){
      //   this.stuId = infor.id;
      // }
      // if(!this.stuId){
      //   MessageBox.alert("请先登录", "提示", {
      //     confirmButtonText: "确定",
      //     callback: () => {
      //     },
      //   });
      //   return false
      // }

      if(!this.name){
        this.$message({
          showClose: true,
          message: '请先输入姓名',
          type: 'error'
        });
        return false;
      } 

      if(!this.phone){
        this.$message({
          showClose: true,
          message: '请先输入电话',
          type: 'error'
        });
        return false;
      } 

      if(this.phone.length !=11){
        this.$message({
          showClose: true,
          message: '请输入正确的电话',
          type: 'error'
        });
        return false;
      } 

      if(!this.content){
        this.$message({
          showClose: true,
          message: '请先输入咨询内容',
          type: 'error'
        });
        return false;
      } 

      saveConsult({
        stuId: this.stuId,
        teaId: this.teaId,
        name: this.name,
        phone: this.phone,
        node: this.content,
      })
      .then((r) => {

        this.$message({
          showClose: true,
          message: '提交成功',
          type: 'success'
        });

        this.phone = '';
        this.name = '';
        this.content = '';

        this.$emit('closeInfor');


      })
      .catch((e) => {
        console.log(e);
      });


    }


  },
  beforeDestroy(){
      
  },
  
}
</script>

<style lang="scss" scoped>
  .inforDiv {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left:0;
    .zz {
      position: fixed;
      top: 0;
      bottom: 0;
      right: 0;
      left:0;
      background-color: rgba(0,0,0,0.5);
    }
    .zxContent {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      // transform: translate(-50%,-50%);
      margin: auto;
      width: 500px;
      height: 400px;
      background-color: #fff;
      .zxHeader {
        position: relative;
        width: 100%;
        height: 60px;
        text-align: center;
        background-color: #1CB278;
        .headerWord {
          color: #fff;
          font-size: 20px;
          font-weight: 700;
          line-height: 60px;
        }
        .closeImgBtn {
          display: inline-block;
          width: 30px;
          height: 30px;
          position: absolute;
          top: 10px;
          right:10px;
          cursor: pointer;
          img {
            width: 100%;
          }
        }
      }
      .inputDiv {
        padding: 0 20px;
        margin-top: 20px;
        span {
          font-size: 14px;
          color: #666666;
          display: inline-block;
          width: 80px;
          text-align: right;
          line-height: 40px;
        }
      }
      .submitDiv {
        margin-top:30px;
        text-align:center;
        .btnSpan {
          display: inline-block;
          width: 80px;
          height: 30px;
          border-radius: 15px;
          font-size: 12px;
          overflow: hidden;
          letter-spacing: 1px;
          color: #fff;
          cursor: pointer;
          text-align: center;
          line-height: 30px;
          margin: 0 10px;
          // border: 1px solid #fff;
        }
        .submitBtn {
          background-color: #1CB278;
        }
        .submitBtn:hover {
          background-color: #49DC89;
        }
        .cancleBtn {
          background-color: #cecece;
        }
        .cancleBtn:hover {
          background-color: #E6E3E3;
        }

        

      }
    }

  }

</style>
