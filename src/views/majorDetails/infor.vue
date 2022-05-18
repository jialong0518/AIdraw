<template>
  <div class="infor">
    <div class="moduleTitle">
        <span></span>
        第一印象
    </div>
    <div class="infor1">
        {{majorInfor.firstImpression===''?'暂无数据':majorInfor.firstImpression}}
    </div>
    <div class="moduleTitle">
        <span></span>
        专业简介
    </div>
    <div class="infor2">
        <div class="title">是什么</div>
        <div class="answer">{{majorInfor.majorWhat===''?'暂无数据':majorInfor.majorWhat}}</div>
        <div class="borderB"></div>
        <div class="title">学什么</div>
        <div class="answer">{{majorInfor.majorStudyWhat===''?'暂无数据':majorInfor.majorStudyWhat}}</div>
        <div class="borderB"></div>
        <div class="title">干什么</div>
        <div class="answer">{{majorInfor.majorDoWhat===''?'暂无数据':majorInfor.majorDoWhat}}</div>
    </div>
    <div class="moduleTitle">
        <span></span>
        选考学科建议
    </div>
    <div class="infor3">
        {{majorInfor.choiceExamSuggestions===''?'暂无数据':majorInfor.choiceExamSuggestions}}
    </div>
    <div class="moduleTitle" v-show="majorInfor.yearOneValue !=null&&majorInfor.yearTwoValue !=null&&majorInfor.yearThreeValue !=null">
        <span></span>
        就业率
    </div>
    <div class="infor4" v-show="majorInfor.yearOneValue !=null&&majorInfor.yearTwoValue !=null&&majorInfor.yearThreeValue !=null">
        <div class="jobRate">
            <div class="item" v-show="majorInfor.yearOneValue !=null">
                <div class="rate">{{majorInfor.yearOneValue}}</div>
                <div class="arrow"></div>
                <div class="year">{{majorInfor.yearOne}}</div>
            </div>
            <div class="item" v-show="majorInfor.yearTwoValue !=null">
                <div class="rate">{{majorInfor.yearTwoValue}}</div>
                <div class="arrow"></div>
                <div class="year">{{majorInfor.yearTwo}}</div>
            </div>
            <div class="item" v-show="majorInfor.yearThreeValue !=null">
                <div class="rate">{{majorInfor.yearThreeValue}}</div>
                <div class="arrow"></div>
                <div class="year">{{majorInfor.yearThree}}</div>
            </div>
        </div>
        <div class="borderB"></div>
    </div>
    <div class="moduleTitle" v-show="majorInfor.manSexValue !=null">
        <span></span>
        男女比例
    </div>
    <div class="infor5" v-show="majorInfor.manSexValue !=null">
        <div class="ratioModule">
            <div class="head"></div>
            <div class="progress">
                <div class="progresstext" style="margin-top:40px;">
                    <span>{{majorInfor.manSexValue}}</span>
                    <span>{{majorInfor.womanSexValue}}</span>
                </div>
                <el-progress :stroke-width='8' :percentage="percentage_" :show-text="false" color="#1CB278"></el-progress>
            </div>
            <div class="head"></div>
        </div>
    </div>
  </div>
</template>

<script>

// schoolId
// collegeInfor
export default {
  name: 'infor',
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
        percentage_: 0,
    }
  },
  watch: {
      majorCode: {
        handler: function (val, oldVal) { 
            if(val === '') return
        },
        immediate: true,
        deep: true
      },
      majorInfor: {
        handler: function (val, oldVal) { 
            this.percentage_ = val.manSexValue&&val.manSexValue.replace('%','')
            this.percentage_ = Number(this.percentage_)
        },
        immediate: true,
        deep: true
      },
  },
  components: {},
  methods: {
    
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
.infor{
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
      background: #FFFFFF;
      border-radius: 10px;
      margin-bottom: 30px;
      padding: 25px 28px 35px;
      font-size: 14px;
      color: #666;
      line-height: 25px;
      .title {
        display: flex;
        font-size: 18px;
        align-items: center;
        text-indent: 13px;
        margin-bottom: 27px;
        color: #333;
      }
      .answer {
          color: #666;
          font-size: 13px;
      }
      .borderB {
          border-bottom: 1px dotted #BCBCBC;
          margin: 25px 0;
      }
  }
  .infor3 {
      background: #FFFFFF;
      border-radius: 10px;
      margin-bottom: 30px;
      padding: 15px 28px 25px;
      font-size: 18px;
      color: #333;
      line-height: 25px;
      font-weight: bold;
  }
  .infor4 {
      background: #FFFFFF;
      border-radius: 10px;
      margin-bottom: 30px;
      padding: 15px 0 25px;
      height: 180px;
      line-height: 25px;
      position: relative;
      .borderB {
          position: absolute;
          bottom: 50px;
          left: 42px;
          right: 42px;
          border-bottom: 1px dotted #F3F5F7;;
      }
      .jobRate {
          display: flex;
          justify-content: space-around;
          position: absolute;
          width: 100%;
          .item {
              width: 162px;
              display: flex;
              flex-direction: column;
              align-items: center;
              .rate {
                  background: #1CB278;
                  height: 60px;
                  width: 100%;
                  border-radius: 10px;
                  font-size: 17px;
                  color: #fff;
                  line-height: 60px;
                  text-align: center;
              }
              .arrow {
                  width: 0px;                 /*  宽高设置为0，很重要，否则达不到效果 */
				  height: 0px;
				  border: 10px solid #1CB278;
				  border-bottom-color: transparent;    /* 设置透明背景色 */
				  border-left-color: transparent;
				  border-right-color: transparent;
              }
              .year {
                  background: rgba(28,178,120,0.3);
                  border-radius: 50%;
                  width: 76px;
                  height: 76px;
                  margin-top: -5px;
                  font-size: 16px;
                  font-weight: bold;
                  line-height: 76px;
                  text-align: center;
                  color: rgba(28,178,120);
                  z-index: 1;
              }
          }
           .item:nth-child(2) {
               .rate {
                    background: #FF7777;
                }
                .arrow {
                    border: 10px solid #FF7777;
                    border-bottom-color: transparent;    /* 设置透明背景色 */
                    border-left-color: transparent;
                    border-right-color: transparent;
                }
                .year {
                    background: rgba(255,119,119,0.3);
                    color: rgba(255,119,119);
                }
           }
           .item:nth-child(3) {
               .rate {
                    background: #33A3EE;
                }
                .arrow {
                    border: 10px solid #33A3EE;
                    border-bottom-color: transparent;    /* 设置透明背景色 */
                    border-left-color: transparent;
                    border-right-color: transparent;
                }
                .year {
                    background: rgba(51,163,238,0.3);
                    color: rgba(51,163,238);
                }
           }
      }
  }
  .infor5 {
      background: #FFFFFF;
      border-radius: 10px;
      margin-bottom: 30px;
      padding: 38px 60px;
      .ratioModule {
          display: flex;
          .head {
              height: 98px;
              width: 98px;
              background: url('./icon/body.png') no-repeat;
          }
          .head:last-child {
              height: 98px;
              width: 98px;
              background: url('./icon/gril.png') no-repeat;
          }
          .progress {
              width: 600px;
              margin: 0 30px;
          }
          .progresstext {
              font-size: 16px;
              color: #333;
              display: flex;
              justify-content: space-between;
              margin-bottom: 20px
          }
      }
  }
}
</style>
