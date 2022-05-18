<template>
  <div class="compareSchool">
    <menuBer />
    <div class="collegeAllDiv">
      <div class="collegeDiv">
        <div class="expertDiv">

          <div class="expertDetail"  v-for="(t,index) in teaList" :key="index">
            <div class="teaPhoto">
              <img :src="t.photo?t.photo:'/static/img/teaPhoto.73440632.png'" alt="" />
            </div>

            <div class="teaName">{{ t.teaName }}</div>

            <div class="teaJs">
              <div class="wordEll">{{ t.note }}</div>
              
            </div>

            <div class="teaHideDiv">

              <div class="hideTeaName">{{ t.teaName }}</div>

              <div class="hideTeaJs">
                {{ t.note }}
              </div>  

              <div class="teaBtnDiv">
                <span class="teaBtn xqBtn" @click="zjxq(t.id)">专家详情</span>
                <span class="teaBtn zxBtn" @click="zxBtn(t.id)">专家咨询</span>
              </div>

              
            </div>

          </div>


        </div>

        <div class="block" v-show="teaList.length>0">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageNum"
              :page-sizes="[8,10, 20, 30]"
              :page-size="pageSize"
              popper-class='select_bottom'
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalSize">
            </el-pagination>
        </div>

        
      </div>
    </div>

    <div class="zxPopup" v-show="zxShow">
      <informationConsultation @closeInfor='closeBtn' :teaId='teaId'/>
    </div>

  </div>
</template>

<script>
import menuBer from "@/components/menuBar";
import { getExpert } from "@/api/batchLineApi";
import informationConsultation from "@/components/informationConsultation";
import { MessageBox } from "element-ui";

export default {
  name: "collegeExpert",
  data() {
    return {
      stuId: '',
      teaId: '',
      zxShow: false,
      pageNum: 1,
      pageSize: 8,
      totalSize: 0,
      teaList: [],
      
    };
  },
  watch: {},
  components: { menuBer,informationConsultation },
  mounted: function () {
    // this.$root.LOGINSTATE = true;
    this.getExpertList();
  },
  methods: {
    zjxq(id){
      this.$router.push(`/teacherDetail?teaId=${id}`)
    },
    zxBtn(id){
      this.teaId =  id;
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
    getExpertList() {
      getExpert({
        pageNum: this.pageNum,
        pageSize: this.pageSize
      })
        .then((r) => {
          this.teaList = r.data.list;
          this.totalSize = r.data.totalSize;
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
    }

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
  .expertDiv {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    justify-content: flex-start;
    .expertDetail {
      width: 280px;
      background-color: #fff;
      border-radius: 8px;
      margin-bottom: 20px;
      overflow: hidden;
      position: relative;
      margin-right: 20px;
      .teaPhoto {
        margin: 20px auto;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        overflow: hidden;
        // border: 1px solid #cecece;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .teaName {
        font-size: 18px;
        font-weight: 700;
        color: #333;
        text-align: center;
        margin: 20px auto;
      }
      .teaJs {
        width: 100%;
        background-color: #a9afb5;
        padding: 10px 10px;
        .wordEll{
          color: #fff;
          font-size: 12px;
          line-height: 25px;
          height: 50px;
          overflow: hidden;
          word-break:break-all;
          display:-webkit-box;
          -webkit-line-clamp:2;
          -webkit-box-orient:vertical;
          overflow:hidden;
          text-overflow:ellipsis;
        }
        
      }
      .teaHideDiv {
        position: absolute;
        display: none;
        width: 100%;
        height: 100%;
        padding: 20px 10px;
        background-color: rgba(169,175,181,0.7);
        top: 0;
        left: 0;
        text-align: center;
        color: #fff;
        .hideTeaName {
          font-size:18px;
          margin: 10px auto;
          font-weight: 700;
        }
        .hideTeaJs {
          height: 140px;
          overflow: auto;
          font-size: 14px;
          line-height: 20px;
          margin-top: 10px;
          margin-bottom: 10px;
        }
        .teaBtnDiv {
          text-align: center;
          .teaBtn {
            display: inline-block;
            width: 80px;
            height: 30px;
            border-radius: 15px;
            font-size: 12px;
            overflow: hidden;
            letter-spacing: 1px;
            cursor: pointer;
            text-align: center;
            background-color: #49DC89;
            line-height: 30px;
            margin: 0 10px;
          }
          .xqBtn {
            background-image: linear-gradient(to right, #1CB278 , #49DC89);
          }
          .zxBtn {
            background-image: linear-gradient(to right, #FF7777 , #FFB28F);
          }

        }
      }
    }
    .expertDetail:hover .teaHideDiv{
      display: block;

    }
    
  }
}

</style>
