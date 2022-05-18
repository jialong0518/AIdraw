<template>
  <div class="survey">
    <div class="moduleTitle">
      <span></span>
      基本信息
    </div>
    <div class="infor1">
      <div>
        <div class="survey1"></div>
        <div>
          <div class="title">国家重点学科</div>
          <div class="num" style="color: #1cb278">
            {{ collegeInfor.numSubject }}个
          </div>
        </div>
      </div>
      <div style="border: 1px solid #ffd39a">
        <div class="survey2"></div>
        <div>
          <div class="title">博士点</div>
          <div class="num" style="color: #ffd39a">
            {{ collegeInfor.numDoctor }}个
          </div>
        </div>
      </div>
      <div style="border: 1px solid #9fd9ff">
        <div class="survey3"></div>
        <div>
          <div class="title">硕士点</div>
          <div class="num" style="color: #9fd9ff">
            {{ collegeInfor.numMaster }}个
          </div>
        </div>
      </div>
      <div style="border: 1px solid #ffbfbf">
        <div class="survey4"></div>
        <div>
          <div class="title">重点实验室</div>
          <div class="num" style="color: #ffbfbf">
            {{ collegeInfor.numLab }}个
          </div>
        </div>
      </div>
    </div>
    <div class="infor2">
      <div>
        <div class="item1">
          <div></div>
          创办时间：{{ collegeInfor.buildDate }}
        </div>
        <div class="item2">
          <div></div>
          占地面积：{{ collegeInfor.numFloorSpace }}亩
        </div>
        <div class="item3">
          <div></div>
          隶属于：{{ collegeInfor.under }}
        </div>
      </div>
      <div>
        <div class="item4">
          <div></div>
          院校类型：{{ collegeInfor.collegeTypeName }}
        </div>
        <div class="item5">
          <div></div>
          办学类型：{{ collegeInfor.educationLevelName }}
        </div>
        <div class="item6">
          <div></div>
          办学性质：{{ collegeInfor.educationNatureName }}
        </div>
      </div>
    </div>
    <div class="moduleTitle">
      <span></span>
      院校概览
    </div>
    <p class="infor3" v-html="collegeInfor.briefDetailsHtml"></p>
    <div
      class="moduleTitle"
      v-show="
        collegeInfor.collegeSceneryImgList && collegeInfor.collegeSceneryImgList.length > 0
      "
    >
      <span></span>
      校园风光
    </div>
    <div
      class="infor4"
      v-show="
        collegeInfor.collegeSceneryImgList && collegeInfor.collegeSceneryImgList.length > 0
      "
    >
      <!-- <el-carousel height="350px" direction="vertical" :autoplay="false">
            <el-carousel-item v-for="item in collegeInfor.collegeFileList" :key="item.id">
            <h3 class="medium"><img :src="item.fileUrl" /></h3>
            </el-carousel-item>
        </el-carousel> -->
      <el-carousel
        indicator-position="outside"
        height="350px"
        :autoplay="false"
      >
        <el-carousel-item
          v-for="(item, index) in collegeInfor.collegeSceneryImgList"
          :key="index"
        >
          <!-- <h3  class="medium"></h3> -->
          <img style="height: 350px; width: 926px" :src="item" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
// schoolId
// collegeInfor
export default {
  name: "survey",
  props: {
    schoolId: {
      type: String,
      default: "",
    },
    collegeInfor: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  watch: {
    schoolId: {
      handler: function (val, oldVal) {
        if (val === "") return;
      },
      immediate: true,
      deep: true,
    },
    collegeInfor: {
      handler: function (val, oldVal) {
        if (val === "") return;
      },
      immediate: true,
      deep: true,
    },
  },
  components: {},
  methods: {},
  beforeDestroy() {},
  mounted: function () {},
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
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
.survey {
  // height: 100%;
  background: #f3f5f7;
  position: relative;
  .moduleTitle {
    display: flex;
    font-size: 20px;
    align-items: center;
    // text-indent: 13px;
    margin-top: 20px;
    margin-bottom: 27px;
    span {
      display: inline-block;
      width: 5px;
      height: 20px;
      margin-right: 13px;
      background: #1cb278;
      border-radius: 3px;
    }
  }
  .infor1 {
    height: 171px;
    background: #ffffff;
    border-radius: 10px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    > div {
      width: 200px;
      height: 110px;
      background: #ffffff;
      border: 1px solid #8cdebe;
      border-radius: 10px;
      margin-left: 34px;
      display: flex;
      align-items: center;
      .title {
        font-size: 16px;
        color: #666;
      }
      .num {
        font-size: 24px;
        margin-top: 6px;
      }
    }
    .survey1 {
      background: url("./icon/survey11.png");
      width: 42px;
      height: 49px;
      background-size: 100% 100%;
      margin-left: 24px;
      margin-right: 16px;
    }
    .survey2 {
      background: url("./icon/survey12.png");
      width: 55px;
      height: 52px;
      background-size: 100% 100%;
      margin-left: 32px;
      margin-right: 16px;
    }
    .survey3 {
      background: url("./icon/survey13.png");
      width: 52px;
      height: 53px;
      background-size: 100% 100%;
      margin-left: 34px;
      margin-right: 16px;
    }
    .survey4 {
      background: url("./icon/survey14.png");
      width: 53px;
      height: 53px;
      background-size: 100% 100%;
      margin-left: 23px;
      margin-right: 16px;
    }
  }
  .infor2 {
    height: 220px;
    background: #ffffff;
    border-radius: 10px;
    display: flex;
    align-items: center;
    margin-bottom: 37px;
    div {
      font-size: 16px;
      color: #333;
    }
    > div:nth-child(1) {
      margin-left: 54px;
    }
    > div:nth-child(2) {
      margin-left: 112px;
    }
    > div > div {
      display: flex;
      align-items: center;
      font-size: 16px;
      color: #333333;
    }
    .item1 div {
      height: 25px;
      width: 25px;
      background: url("./icon/survey21.png");
      background-size: 100% 100%;
      margin-right: 10px;
    }
    .item2 div {
      height: 25px;
      width: 25px;
      background: url("./icon/survey22.png");
      background-size: 100% 100%;
      margin-right: 10px;
      margin-top: 32px;
      margin-bottom: 32px;
    }
    .item3 div {
      height: 25px;
      width: 25px;
      background: url("./icon/survey23.png");
      background-size: 100% 100%;
      margin-right: 10px;
    }
    .item4 div {
      height: 25px;
      width: 25px;
      background: url("./icon/survey24.png");
      background-size: 100% 100%;
      margin-right: 10px;
    }
    .item5 div {
      height: 25px;
      width: 25px;
      background: url("./icon/survey25.png");
      background-size: 100% 100%;
      margin-right: 10px;
      margin-top: 32px;
      margin-bottom: 32px;
    }
    .item6 div {
      height: 25px;
      width: 25px;
      background: url("./icon/survey26.png");
      background-size: 100% 100%;
      margin-right: 10px;
    }
  }
  .infor3 {
    padding: 39px 42px;
    background: #ffffff;
    border-radius: 10px;
    word-break: break-all;
    font-size: 13px;
    color: #666;
    line-height: 28px;
    margin-bottom: 40px;
  }
  .infor4 {
    padding: 32px 27px;
    background: #ffffff;
    border-radius: 10px;
    margin-bottom: 100px;
    img {
      height: 200px;
      width: 400px;
    }
  }
}
</style>
