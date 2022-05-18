<template>
  <div class="job">
    <div class="moduleTitle">
        <span></span>
        就业去向
    </div>
    <div class="infor1">
        {{majorInfor.employDirection===''?'暂无数据':majorInfor.employDirection}}
    </div>
    <div class="infor2">
        <div>
            <div class="moduleTitle">
                <span></span>
                就业岗位分布
            </div>
            <div class="item">
                <ring :idkey="'myChart'" :chartdata="occupationData"/>
                <div class="list">
                    <div :key="index" v-for="(item, index) in occupationData">
                        <span>{{index+1}}、{{item.name}}</span>
                        <span>{{item.value}}%</span>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="moduleTitle">
                <span></span>
                就业行业分布
            </div>
            <div class="item">
                <ring :idkey="'myChart1'" :chartdata="industryData"/>
                <div class="list">
                    <div :key="index" v-for="(item, index) in industryData">
                        <span>{{index+1}}、{{item.name}}</span>
                        <span>{{item.value}}%</span>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="moduleTitle">
                <span></span>
                就业地区分布
            </div>
            <div class="item">
                <ring :idkey="'myChart2'" :chartdata="regionData"/>
                <div class="list">
                    <div :key="index" v-for="(item, index) in regionData">
                        <span>{{index+1}}、{{item.name}}</span>
                        <span>{{item.value}}%</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import ring from './ring'
import { getOccupation, getIndustry, getRegion } from "@/api/majorDetails";

export default {
  name: 'job',
  props: {
    majorCode: {
        type: String,
        default: ''
    },
    majorInfor: {
        type: Object,
        default: ()=>{}
    }
  },
  data() {
    return {
        myChart:null,
        myChart1: null,
        occupationData: [],
        industryData: [],
        regionData: []
    }
  },
  watch: {
      majorCode: {
        handler: function (val, oldVal) { 
            if(val === '') return
            this.getOccupationData()
            this.getIndustryData()
            this.getRegionData()
        },
        immediate: true,
        deep: true
      },
      majorInfor: {
        handler: function (val, oldVal) { 
        },
        immediate: true,
        deep: true
      },
  },
  components: {ring},
  methods: {
    getOccupationData(){
      getOccupation({
        majorCode: this.majorCode
      }).then(r => {
          r.data.map(item=>{
                item.name = item.jobDirection
                item.value = item.rate
            })
          this.occupationData = r.data;
      }).catch((e) => {
          console.log(e)
      });
    },
    getIndustryData(){
      getIndustry({
        majorCode: this.majorCode
      }).then(r => {
          r.data.map(item=>{
                item.name = item.industry
                item.value = item.rate
          })
          this.industryData = r.data;
      }).catch((e) => {
          console.log(e)
      });
    },
    getRegionData(){
      getRegion({
        majorCode: this.majorCode
      }).then(r => {
          r.data.map(item=>{
                item.name = item.majorArea
                item.value = item.majorRatio
          })
          this.regionData = r.data;
      }).catch((e) => {
          console.log(e)
      });
    },
  },
  beforeDestroy(){
      
  },
  mounted: function() {
      
  }
}
</script>

<style lang="scss">
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
.el-carousel__item {
    background-color: #d3dce6;
}
::v-deep .el-progress-bar__outer {
    background: #FFA606;
}
.job{
  // height: 100%;
  background: #F3F5F7;;
  position: relative;
  .moduleTitle {
      display: flex;
      font-size: 20px;
      align-items: center;
      text-indent: 13px;
      margin-bottom: 27px;
      span {
          display: inline-block;
          width: 5px;
          height: 20px;
          background: #1CB278;
          border-radius: 3px;
      }
  }
  .infor1 {
      background: #FFFFFF;
      border-radius: 10px;
      margin-bottom: 30px;
      padding: 15px 28px 25px;
      font-size: 14px;
      color: #666;
      line-height: 25px;
  }
  .infor2 {
    //   background: #FFFFFF;
    //   border-radius: 10px;
      margin-bottom: 30px;
      display: flex;
      > div {
          width: 316px;
      }
      > div:nth-child(2) {
          margin: 0 16px;
      }
      .item {
          background: #FFFFFF;
          width: 316px;
          border-radius: 10px;
          overflow: hidden;
          .list {
              padding: 0 50px 20px;
              > div{
                  display: flex;
                  justify-content: space-between;
                  border-bottom: 1px dotted #BCBCBC;
                  align-items: baseline;
                  padding: 10px 0;
                  >span:nth-child(1){
                      font-size: 12px;
                      color: #666;
                  }
                  >span:nth-child(2){
                      font-size: 14px;
                      color: #FF7777;
                  }
              }
          }
      }
  }
}
</style>
