<template>
  <div class="compareSchool">
    <menuBer />

    <div class="userContent">

      <div class="userLeft">

        <div class="nameDiv">
          Hi~{{ userName }}
        </div>

        <div class="scoreDiv">
          <span>成绩：</span>
          <span class="scoreSpan">{{ userScore }}</span>
          <span title="修改成绩" class="scoreImg" @click="editResult">
            <img src="./edit.png" alt="">
          </span>

        </div>

        <div class="leftList">
          <div @click="rightChange(0)" :class="{'check': rightIndex==0}" class="leftBtnDiv">
            <a href="#/userMeans">我的资料</a>
          </div>

          <div @click="rightChange(1)" :class="{'check': rightIndex==1}" class="leftBtnDiv">
            <a href="#/changePassword">修改密码</a>       
          </div>

        </div>


      </div>

      <div class="userRight">
        <router-view />
      </div>

    </div>

    <result :resultState="resultState" :userInfor="userInfor" @upScore="upScore"/>
  </div>
</template>

<script>
import menuBer from "@/components/menuBar";
import { getStu } from "@/api/userCenterApi";
import { MessageBox } from "element-ui";

import result from "./result";

export default {
  name: "userCenter",
  data() {
    return {
      stuId: '',
      rightIndex: 0,
      userName: '',
      userScore: '',
      resultState: 0,
      userInfor: {},
    };
  },
  watch: {},
  components: { menuBer, result },
  mounted: function () {
    let infor =JSON.parse(sessionStorage.getItem('studentInfor'));
    this.stuId = infor.id;
    this.getStuDetail();

    let hrefUrl = window.location.href;
    if(hrefUrl.includes('changePassword')){
      this.rightChange(1)
    }else {
      this.rightChange(0)
    }
    
  },
  methods: {
    rightChange(index){
      this.rightIndex = index;
    },
    zjxq(id){
      this.$router.push(`/teacherDetail?teaId=${id}`)
    },
    zxBtn(id){
      this.teaId =  id;
      this.zxShow = true;
    },
    closeBtn(){
      this.zxShow = false;
    },
    getStuDetail() {
      getStu({
        stuId: this.stuId
      })
        .then((r) => {
          this.userName = r.data.stuName;
          this.userScore = r.data.score;
          this.userInfor = r.data;
          sessionStorage.setItem('studentInfor', JSON.stringify(r.data))
        })
        .catch((e) => {
          console.log(e);
        });
    },
    handleSizeChange(data){
      this.pageSize = data;
      this.getExpertList()
    },
    handleCurrentChange(data){
      this.pageNum = data;
      this.getExpertList()
    },
    editResult() {
      if(this.userName == null) {
        MessageBox.alert("请先完善信息", "提示", {
          confirmButtonText: "确定",
          callback: () => {},
        });
        return
      }
      this.resultState = Math.random();
    },
    upScore(data) {
      this.userScore = data;
    }
  },
  beforeDestroy() {},
  
};
</script>

<style lang="scss" scoped>
  .userContent {
    width: 1200px;
    margin: 20px auto;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    .userLeft {
      width: 200px;
      background-color: #fff;
      flex-shrink: 0;
      margin-right:20px;
      padding: 40px 0;
      .nameDiv {
        font-size: 20px;
        color: #333;
        line-height: 30px;
        text-align: center;
        font-weight: 700;
      }
      .scoreDiv {
        margin: 20px auto;
        text-align: center;
        font-size: 14px;
      }
      .scoreSpan {
        font-size: 20px;
        color: #FF8037;
        font-weight: 700;
        margin-right: 10px;
      }
      .scoreImg {
        display: inline-block;
        width: 14px;
        cursor: pointer;
        img {
          width: 100%;
          vertical-align: middle;
          position: relative;
          top: -1px;
        }
      }
      .leftList {
        width: 100%;
        .leftBtnDiv {
          line-height: 40px;
          margin: 20px auto;
          box-sizing: border-box;
          a {
            display: inline-block;
            width: 100%;
            height: 100%;
            padding-left: 50px; 
            box-sizing: border-box; 
          }
        }
        .leftBtnDiv.check {
          border-left: 4px solid #1CB278;
          color: #1CB278;
        }

      }

    }
    .userRight {
      width: 100%;
      background-color: #fff;
      flex-shrink: 1;
    }
  }


</style>
