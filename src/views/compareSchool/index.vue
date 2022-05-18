<template>
  <div class="compareSchool">
    <menuBer />
    <div class="compareSchoolDiv">
      <div class="title">院校对比</div>
      <div class="list">
        <div class="item">
          <div class="name">学校名称</div>
          <div class="ads">所在地</div>
          <div class="time">建校时间</div>
          <div class="type">学校类型</div>
          <div class="special">学校特色</div>
          <div class="master">硕士点</div>
          <div class="doctor">博士点</div>
          <div class="xyhRank">校友会排名</div>
          <div class="twsRank">泰晤士排名</div>
          <div class="rkRank">软科排名</div>
          <div class="USRank">U.S.News排名</div>
          <div class="QSRank">Q.S排名</div>
        </div>
        <div class="itemSchool" :key="index" v-for="(item, index) in dataList">
          <div class="name">
            <img :src="item.collegeLogo==null||item.collegeLogo==''?icon:item.collegeLogo"/>
            <div>{{item.collegeName}}</div>
          </div>
          <div class="ads">{{item.cityName}}</div>
          <div class="time">{{item.buildDate}}年</div>
          <div class="type">{{item.collegeTypeName}}</div>
          <div class="special">{{item.featureLabel}}</div>
          <div class="master">{{item.numMaster}}</div>
          <div class="doctor">{{item.numDoctor}}</div>
          <div class="xyhRank">{{item.rankingXiaoYouHui}}</div>
          <div class="twsRank">{{item.rankingTaiWuShi}}</div>
          <div class="rkRank">{{item.rankingRuanKe}}</div>
          <div class="USRank">{{item.rankingUSNews}}</div>
          <div class="QSRank">{{item.rankingQS}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import menuBer from '@/components/menuBar';

import icon from './schoolicon.png';

import { getCollegeCompare } from "@/api/schoolApi";



export default {
  name: 'compareSchool',
  data() {
    return {
      ids:'',
      icon,
      dataList: []
    }
  },
  watch: {},
  components: {menuBer},
  methods: {
    getCollegeList(){
      getCollegeCompare({
        collegeIds: this.ids
      }).then(r => {
        this.dataList = r.data;
      }).catch((e) => {
          console.log(e)
      });
    },   
  },
  beforeDestroy(){
      
  },
  mounted: function() {
    // if(this.$route.query.ids)undefined
    if(this.$route.query.ids == undefined || this.$route.query.ids == ''){
      console.log('没有参数')
      return
    }
    this.ids = this.$route.query.ids;
    this.getCollegeList()
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
.compareSchool {
  // height: 100%;
  background: #fff;
  position: relative;
  .compareSchoolDiv {
    width: 1200px;
    margin: 0 auto;
    padding-bottom: 30px;
    .title {
      padding: 30px 0;
      font-size: 24px;
      color: #333;
    }
    .list {
      display: flex;
      width: 100%;
      border: 1px solid #EEEEEE;
      border-radius: 4px;
      .item {
        width: 181px;
        border-right: 1px solid #eee;
        text-align: center;
        div {
          background: #F9F9F9;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #333333;
          font-weight: bold;
          font-size: 14px;
        }
      }
      .itemSchool {
        width: 255px;
        border-right: 1px solid #eee;
        text-align: center;
        &:nth-child(5) {
          border: 0;
        }
      }
      .name {
        min-height: 180px;
        border-bottom: 1px solid #EEEEEE;
        img {
          height: 100px;
          width: 100px;
          margin: 22px auto 0;
        }
        div {
          font-size: 16px;
          font-weight: bold;
          color: #333;
          text-align: center;
          line-height: 20px;
          margin-top: 10px;
          word-wrap: break-word;
          word-break: normal;
        }
      }
      .ads, .time, .type, .special, .master, .doctor, .xyhRank, .twsRank, .rkRank, .USRank, .QSRank {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #333;
        line-height: 21px;
        border-bottom: 1px solid #EEEEEE;
      }
      .ads {
        min-height: 66px;
      }
      .time {
        min-height: 59px;
      }
      .type {
        min-height: 55px;
      }
      .special {
        min-height: 55px;
      }
      .master {
        min-height: 59px;
      }
      .doctor {
        min-height: 59px;
      }
      .xyhRank {
        min-height: 59px;
      }
      .twsRank {
        min-height: 59px;
      }
      .rkRank {
        min-height: 59px;
      }
      .USRank {
        min-height: 59px;
      }
      .QSRank {
        min-height: 59px;
        border: 0;
      }
    }
  }
}
</style>
