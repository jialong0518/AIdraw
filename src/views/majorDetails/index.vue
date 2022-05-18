<template>
  <div class="majorDetails">
    <div>
      <menuBer />
    </div>
    <div class="banner">
        <div class="bannerDiv">
            <img :src="defaultBj"/>
        </div>
        <div class="majorInfor">
            <div class="title">{{majorInfor.majorCategory}}</div>
            <div class="infor">
              <div>{{majorInfor.level}}</div>
              <div>专业代码：{{majorInfor.majorCode}}</div>
              <div>修业年限：{{majorInfor.schoolingLength}}</div>
              <div>授予学位：{{majorInfor.awardDegree}}</div>
            </div>
        </div>
      </div>
    <div class="majorDetailsDiv">
      <div class="tabsDiv">
        <!-- class="hit" -->
        <div :key="index" :class="{hit:tabsHit === item.name}"  @click="tabsFun(item)" v-for="(item, index) in tabsData">
          <img :style="{'width':item.width,'height':item.width}" :src="item.icon" v-show="tabsHit !== item.name"/>
          <img :style="{'width':item.width,'height':item.width}" :src="item.hitIcon" v-show="tabsHit === item.name"/>
          <div>{{item.name}}</div>
        </div>
      </div>
      <div class="panesDiv">
        <div v-show="tabsHit==='专业详情'"><infor :majorInfor="majorInfor" :majorCode="majorCode"/></div>
        <div :key="key_" v-show="tabsHit==='就业前景'"><job :majorInfor="majorInfor" :majorCode="majorCode"/></div>
      </div>
    </div>
  </div>
</template>

<script>
import menuBer from '@/components/menuBar'
import infor from './infor'
import job from './job'

import defaultBj from './defaultBj.png'
import icon1 from './icon/icon1.png'
import icon11 from './icon/icon11.png'
import icon2 from './icon/icon2.png'
import icon22 from './icon/icon22.png'


import { getMajorInfor } from "@/api/majorDetails";



export default {
  name: 'majorDetails',
  data() {
    return {
      defaultBj,
      tabsData:[{
        name:'专业详情',
        icon:icon11,
        hitIcon:icon1,
        width:'55px'
      },{
        name:'就业前景',
        icon:icon22,
        hitIcon:icon2,
        width:'50px'
      }],
      tabsHit:'专业详情',
      majorCode:'',
      key_:'',
      majorInfor:{},
    }
  },
  watch: {},
  components: {menuBer,infor,job},
  methods: {
    tabsFun(data){
      this.tabsHit = data.name;
      if(data.name === '就业前景'){
        this.key_ = Math.random()
      }
    },
    getCollegeData(){
      getMajorInfor({
        majorCode: this.majorCode
      }).then(r => {
          this.majorInfor = r.data;
        // this.dataList = r.data;
      }).catch((e) => {
          console.log(e)
      });
    },
  },
  beforeDestroy(){
      
  },
  mounted: function() {
    if(this.$route.query.majorCode == undefined || this.$route.query.majorCode == ''){
      console.log('没有参数')
      return
    }
    this.majorCode = this.$route.query.majorCode+'';
    this.getCollegeData()
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
.majorDetails{
  // height: 100%;
  background: #F3F5F7;;
  position: relative;
  .banner {
    width: 100%;
    height: 210px;
    position: relative;
    .bannerDiv {
      width: 100%;
      height: 210px;
      img {
        height: 100%;
        width: 100%;
      }
      > div {
        background: rgba(51,51,51,0.5);
        position: absolute;
        top: 0px;
        bottom: 0px;
        right: 0px;
        left: 0px;
      }
    }
    .majorInfor {
      width: 1200px;
      position: absolute;
      top: 47px;
      left: 50%;
      transform: translate(-50%, 0);
      img {
        height: 100px;
        width: 100px;
      }
      .title {
        color: #fff;
        font-size: 26px;
        font-weight: bold;
      }
      .infor {
        font-size: 16px;
        background: rgba(103,206,149,0.4);
        color: #fff;
        display: flex;
        width: fit-content;
        padding: 0 8px;
        border-radius: 6px;
        margin-top: 17px;
        div {
          padding: 0 10px;
          border-right: 1px solid #fff;
          margin: 7px 1px;
        }
        div:last-child {
          border: 0;
        }
      }
    }
  }
  .majorDetailsDiv {
    width: 1200px;
    margin: 17px auto 0;
    display: flex;
    .tabsDiv {
      display: flex;
      flex-direction: column;
      > div {
        width: 190px;
        height: 140px;
        margin-bottom: 10px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        cursor: pointer;
        img {
          width: 60px;
          height: 60px;
        }
        div {
          font-size: 22px;
          width: 50px;
          margin-left: 16px;
          line-height: 30px;
        }
      }
      .hit {
        background: linear-gradient(180deg, #49DC89 0%, #1CB278 100%);
        color:#fff;
      }
    }
    .panesDiv {
      flex: 1;
      margin-left: 30px;
    }
  }
}
</style>
