<template>
  <div class="compareSchool">
    <menuBer />
    <div class="collegeDiv">

      <div style="padding:20px 0;">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/collegeExpert' }">专家</el-breadcrumb-item>
          <el-breadcrumb-item>{{ teaName }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="teaDetailDiv">

        <div class="teaHeader">
          <span></span>
          专家风采
        </div>

        <div style="border-top:1px dashed #cecece;width:100%;margin:20px auto;"></div>

        <div class="teaDiv">

          <div class="photoNameDiv">

            <div class="imgDiv" v-show="imgUrl">
              <img :src="imgUrl" alt="">
            </div>

            <div class="nameDiv">{{ teaName }}</div>

          </div>

          <div class="teaJsDiv">{{ note }}</div>

        </div>


      </div>

      <div style="margin-top:40px;text-align:center;">
        <span class="zxBtn" @click="zxBtn">立即咨询</span>
      </div>

    </div>

    <div class="zxPopup" v-show="zxShow">
      <informationConsultation @closeInfor='closeBtn' :teaId='teaId'/>
    </div>


  </div>
</template>

<script>
import menuBer from "@/components/menuBar";
import { getView } from "@/api/batchLineApi";
import informationConsultation from "@/components/informationConsultation";
import { MessageBox } from "element-ui";


export default {
  name: "teacherDetail",
  data() {
    return {
      stuId: "",
      teaName: "",
      zxShow: false,
      teaId: '',
      imgUrl: '',
      note: '',
    };
  },
  watch: {},
  components: { menuBer,informationConsultation },
  mounted: function () {
    
    this.teaId = this.$route.query.teaId;
    if (this.teaId) {
      this.getTeaView();
    }
  },
  methods: {
    zxBtn(){
      let infor = JSON.parse(sessionStorage.getItem("studentInfor"));
      if(infor){
        this.stuId = infor.id;
      }
      if(!this.stuId){
        MessageBox.alert("请先登录", "提示", {
          confirmButtonText: "确定",
          callback: () => {
          },
        });
        return false
      }
      this.zxShow = true;
    },
    closeBtn(){
      this.zxShow = false;
    },
    getTeaView() {
      getView({
        id: this.teaId,
      })
        .then((r) => {

          this.teaName = r.data.teaName;
          this.imgUrl = r.data.photo;
          this.note = r.data.note;

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
.collegeAllDiv {
  width: 100%;
  // background-color: #F3F5F7;
  padding: 20px 0;
}
.collegeDiv {
  width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  .teaDetailDiv {
    width: 100%;
    background-color: #fff;
    padding: 30px 0;
    border-radius: 10px;
    overflow: hidden;
    margin: 20px auto;
    .teaHeader {
      padding-left: 20px;
      font-size: 20px;
      font-weight: 700;
      color: #333;
      line-height: 30px;
      span {
        display: inline-block;
        width: 4px;
        height: 30px;
        background-color: #1CB278;
        border-radius: 2px;
        margin-right:10px;
        vertical-align: middle;
        position: relative;
        top: -2px;

      }

    }
    .teaDiv {
      width: 100%;
      padding: 20px 20px;
      .photoNameDiv {
        width: 100%;
        display: flex;
        flex-wrap: nowrap;
        justify-content: flex-start;
        .imgDiv {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .nameDiv {
          font-size: 20px;
          font-weight: 700;
          color: #333;
          line-height: 140px;
          margin-left:20px;
        }
      }
      .teaJsDiv {
        font-size: 13px;
        color: #666;
        line-height: 25px;
        margin-top:30px;
      }
    }
  }
  .zxBtn {
    display: inline-block;
    width: 140px;
    height: 40px;
    border-radius: 20px;
    font-size: 16px;
    overflow: hidden;
    letter-spacing: 1px;
    cursor: pointer;
    text-align: center;
    background-color: #49DC89;
    line-height: 40px;
    color: #fff;
    background-image: linear-gradient(to right, #FF7777 , #FF9464);
  }
}
</style>
