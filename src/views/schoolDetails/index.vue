<template>
  <div class="schoolDetails" ref="schoolDetails">
    <div>
      <menuBer />
    </div>
    <div class="banner">
        <div class="bannerDiv">
            <img :src="collegeInfor.collegeBgi == null||collegeInfor.collegeBgi == ''?defaultBj:collegeInfor.collegeBgi"/>
            <div v-show="collegeInfor.collegeBgi == null||collegeInfor.collegeBgi == ''?false:true"></div>
        </div>
        <div class="schoolInfor">
            <img :src="`${collegeInfor.collegeLogo == null||collegeInfor.collegeLogo == ''?schoolicon:collegeInfor.collegeLogo}`"/>
            <div class="infor">
              <div class="title">
                <div class="name">{{collegeInfor.collegeName}}</div>
              </div>
              <div  class="title">
                <div class="label" v-show="collegeInfor.flag985 === '1'">985</div>
                <div class="label" v-show="collegeInfor.flag211 === '1'">211</div>
                <div class="label" v-show="collegeInfor.flagDoubleFirst === '1'">双一流</div>
                <div class="label" v-show="collegeInfor.flagStrongBase === '1'">强基</div>
                <div class="label">{{collegeInfor.educationNatureName}}</div>
                <!-- <div class="label" v-show="collegeInfor.educationNature === '公办'">公办</div> -->
              </div>
              <div class="minute">
                <div>官方网址：<span style="cursor: pointer;" @click="goWebUrl(collegeInfor.webUrl)">{{collegeInfor.webUrl}}</span></div>
                <div>办学地址：<span>{{collegeInfor.address}}</span></div>
                <div>电子邮箱：<span style="margin-right:30px;">{{collegeInfor.email}}</span>联系电话：<span>{{collegeInfor.phone}}</span></div>
              </div>
            </div>
            <div class="score">
              <div class="item">
                <div>{{collegeInfor.comprehensiveScore}}</div>
                <span>综合评分</span>
              </div>
              <div class="item">
                <div>{{collegeInfor.environmentScore}}</div>
                <span>环境评分</span>
              </div>
              <div class="item">
                <div>{{collegeInfor.liveScore}}</div>
                <span>生活评分</span>
              </div>
            </div>
        </div>
      </div>
    <div class="schoolDetailsDiv">
      <div style="width: 190px;">
        <div class="tabsDiv" :class="{float: floatState}">
          <div :key="index" :class="{hit:tabsHit === item.name}"  @click="tabsFun(item)" v-for="(item, index) in tabsData">
            <img :style="{'width':item.width}" :src="item.icon" v-show="tabsHit !== item.name"/>
            <img :style="{'width':item.width}" :src="item.hitIcon" v-show="tabsHit === item.name"/>
            <div>{{item.name}}</div>
          </div>
        </div>
      </div>
      <div class="panesDiv">
        <div v-show="tabsHit==='学校概况'"><survey :collegeInfor="collegeInfor" :schoolId="schoolId"/></div>
        <div v-show="tabsHit==='开设专业'"><major :schoolId="schoolId"/></div>
        <div v-show="tabsHit==='历年分数'"><historyScore :schoolId="schoolId"/></div>
        <div v-show="tabsHit==='招生计划'"><plan :schoolId="schoolId"/></div>
        <div v-show="tabsHit==='招生简章'"><generalRules :schoolId="schoolId"/></div>
        <div :key="key_" v-show="tabsHit==='学校就业'"><job :schoolId="schoolId"/></div>
      </div>
    </div>
  </div>
</template>

<script>
import menuBer from '@/components/menuBar'
import survey from './survey'
import major from './major'
import historyScore from './historyScore'
import plan from './plan'
import generalRules from './generalRules'
import job from './job'


import defaultBj from './defaultBj.png'
import schoolicon from './schoolicon.png'
import icon1 from './icon/icon1.png'
import icon11 from './icon/icon11.png'
import icon2 from './icon/icon2.png'
import icon22 from './icon/icon22.png'
import icon3 from './icon/icon3.png'
import icon33 from './icon/icon33.png'
import icon4 from './icon/icon4.png'
import icon44 from './icon/icon44.png'
import icon5 from './icon/icon5.png'
import icon55 from './icon/icon55.png'
import icon6 from './icon/icon6.png'
import icon66 from './icon/icon66.png'

import { getSchoolTable, getCollegeInfor } from "@/api/schoolApi";



export default {
  name: 'schoolDetails',
  data() {
    return {
      defaultBj,
      schoolicon,
      tabsData:[{
        name:'学校概况',
        icon:icon11,
        hitIcon:icon1,
        width:'60px'
      },{
        name:'开设专业',
        icon:icon22,
        hitIcon:icon2,
        width:'55px'
      },{
        name:'历年分数',
        icon:icon33,
        hitIcon:icon3,
        width:'50px'
      },{
        name:'招生计划',
        icon:icon44,
        hitIcon:icon4,
        width:'60px'
      },{
        name:'招生简章',
        icon:icon55,
        hitIcon:icon5,
        width:'55px'
      },{
        name:'学校就业',
        icon:icon66,
        hitIcon:icon6,
        width:'60px'
      }],
      tabsHit:'学校概况',
      schoolId:'',
      key_:'',
      collegeInfor:{},
      floatState: false
    }
  },
  watch: {},
  components: {menuBer,survey,major,historyScore,plan,generalRules,job},
  methods: {
    tabsFun(data){
      this.tabsHit = data.name;
      if(data.name === '学校就业'){
        this.key_ = Math.random()
      }
    },
    getCollegeData(){
      getCollegeInfor({
        collegeId: this.schoolId
      }).then(r => {
          this.collegeInfor = r.data;
        // this.dataList = r.data;
      }).catch((e) => {
          console.log(e)
      });
    },
    goWebUrl(data) {
      window.open(data)
    },
    getScroll(){
      this.$nextTick(() => {
     let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
     if(scrollTop > 455) {
       this.floatState = true;
     } else {
       this.floatState = false;
     }
      console.log(scrollTop)
    });
      
    }
  },
  beforeDestroy(){
    // window.removeEventListener('scroll', this.getScroll);
  },
  mounted: function() {
    // window.addEventListener('scroll', this.getScroll,true);
    if(this.$route.query.id == undefined || this.$route.query.id == ''){
      console.log('没有参数')
      return
    }
    this.schoolId = this.$route.query.id+'';
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
.schoolDetails{
  // height: 100%;
  background: #F3F5F7;;
  position: relative;
  .float {
    position: fixed;
    top: 10px;
  }
  .banner {
    width: 100%;
    height: 310px;
    position: relative;
    .bannerDiv {
      width: 100%;
      height: 310px;
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
    .schoolInfor {
      width: 1200px;
      display: flex;
      position: absolute;
      top: 78px;
      left: 50%;
      transform: translate(-50%, 0);
      img {
        height: 140px;
        width: 140px;
        border-radius: 10px;
      }
      .infor {
        margin-left: 26px;
        .title {
          display: flex;
          color: #fff;
          margin-bottom: 24px;
          .name {
            font-size: 24px;
            margin-right: 20px;
          }
          .label {
            border: 1px solid #FFFFFF;
            border-radius: 50px;
            height: 26px;
            padding: 0px 26px;
            font-size: 14px;
            margin-right: 10px;
            line-height: 24px;
          }
        }
        .minute {
          font-size: 14px;
          color: #FFFFFF;
          width: 620px;
          > div {
            margin-bottom: 14px;
          }
        }
      }
      .score{
        margin-left: auto;
        display: flex;
        .item {
          width: 104px;
          margin-left: 30px;
          > span {
            display: block;
            font-size: 14px;
            color: #fff;
            text-align: center;
            margin-top: 12px;
          }
          > div{
            width: 104px;
            height: 104px;
            background: url('./icon/bround.png') no-repeat;
            font-size: 21px;
            color: #2AAFE9;
            line-height: 104px;
            text-align: center;
          }
        }
        .item:nth-child(2) {
          > div{
            color: #F1654C;
            background: url('./icon/rround.png') no-repeat;
          }
        }
        .item:nth-child(3) {
          > div{
            color:#FFC000;
            background: url('./icon/yround.png') no-repeat;
          }
        }
      }
    }
  }
  .schoolDetailsDiv {
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
