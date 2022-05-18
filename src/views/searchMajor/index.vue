<template>
  <div class="searchMajor">
    <menuBer />
    <div class="content">
      <el-radio-group
        v-model="educationType"
        @change="level1Click"
        style="margin-bottom: 30px"
      >
        <el-radio-button style="height: 49px; width: 109px" label="1"
          >本科</el-radio-button
        >
        <el-radio-button style="height: 49px; width: 109px" label="2"
          >专科</el-radio-button
        >
      </el-radio-group>
      <div class="borderB"></div>
      <div class="subjectList">
        <div
          :key="item.id"
          :class="{ hit: subject1Hit === item.id }"
          v-for="(item, index) in titleList"
          @click="subject1Click(item)"
        >
          {{ item.subCategory }}
        </div>
      </div>
    </div>
    <div
      class="content"
      :key="item.id"
      :class="{ hit: subject1Hit === item.id }"
      v-for="(item, index) in subjectList"
    >
      <div class="moduleTitle">
        <span></span>
        {{ item.subCategory }}
      </div>
      <div
        :key="index1"
        v-for="(item1, index1) in item.childrensList"
        class="gather"
      >
        <div class="level2List">
          <div class="title">{{ item1.majorCategory }}：</div>
          <div class="itemList">
            <div
              class="item"
              @click="goMajor(item2)"
              :key="index2"
              v-for="(item2, index2) in item1.childrensList"
            >
              {{ item2.majorName }}
            </div>
          </div>
        </div>
        <div class="borderB"></div>
      </div>
    </div>
  </div>
</template>

<script>
import menuBer from "@/components/menuBar";

import { getSearchTerm } from "@/api/searchMajor";

export default {
  name: "searchMajor",
  data() {
    return {
      educationType: "1",
      subjectList: [],
      subject1Hit: "",
      titleList: [],
    };
  },
  watch: {},
  components: { menuBer },
  methods: {
    level1Click(data) {
      this.getEducationGradeList();
    },
    getEducationGradeList() {
      getSearchTerm({
        levelId: this.educationType,
      })
        .then((r) => {
          this.subjectList = r.data;
          this.titleList = JSON.parse(JSON.stringify(r.data));
        })
        .catch((e) => {
          console.log(e);
        });
    },
    subject1Click(data) {
      this.subject1Hit = data.id;
      let index = 0;
      for (let i in this.subjectList) {
        if (this.subjectList[i].id === data.id) {
          index = i;
          break;
        }
      }
      let obj = this.subjectList.splice(index, 1);
      this.subjectList = [...obj, ...this.subjectList];
    },
    goMajor(data) {
      this.$router.push({
        name: "majorDetails",
        query: { majorCode: data.majorCode },
      });
    },
  },
  beforeDestroy() {},
  mounted: function () {
    this.getEducationGradeList();
  },
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
::v-deep .el-radio-group {
  margin-bottom: 0 !important;
}
::v-deep .el-radio-button__inner {
  border-radius: 0 !important;
  border: 0 !important;
  height: 100%;
  line-height: 25px;
  width: 100%;
  text-align: center;
}
::v-deep .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  background-color: #1cb278;
  box-shadow: -1px 0 0 0 #1cb278;
  color: #fff !important;
}
::v-deep .el-radio-button:first-child .el-radio-button__inner:hover {
  color: #1cb278;
}
::v-deep .el-radio-button:last-child .el-radio-button__inner:hover {
  color: #1cb278;
}
.searchMajor {
  // height: 100%;
  background: #fff;
  position: relative;
  padding-bottom: 30px;
  .moduleTitle {
    display: flex;
    font-size: 20px;
    align-items: center;
    // text-indent: 13px;
    height: 61px;
    border-bottom: 1px solid #c1c1c1;
    span {
      display: inline-block;
      width: 5px;
      height: 20px;
      background: #1cb278;
      border-radius: 3px;
      margin-left: 32px;
      margin-right: 13px;
    }
  }
  .content {
    background: #fff;
    margin: 30px auto 0;
    width: 1200px;
    border: 1px solid #bcbcbc;
    border-radius: 4px;
    .borderB {
      height: 1px;
      background: #bcbcbc;
      width: 100%;
    }
    .subjectList {
      display: flex;
      flex-wrap: wrap;
      padding: 12px 15px;
      .hit {
        background: #1cb278;
        color: #fff !important;
      }
      div {
        padding: 7px 22px;
        background: #f3f3f3;
        border-radius: 18px;
        font-size: 16px;
        color: #666;
        margin: 12px 15px;
        cursor: pointer;
      }
      div:hover {
        color: #1cb278;
      }
    }
    .gather {
      padding: 0 32px;
      .borderB {
        border-bottom: 1px solid #bcbcbc;
      }
    }
    .gather:last-child {
      .borderB:last-child {
        display: none;
      }
    }
    .level2List {
      display: flex;
      padding: 15px 0;
      font-size: 16px;
      color: #666;
      .title {
        width: 110px;
        margin: 15px 0;
      }
      .itemList {
        flex: 1;
        display: flex;
        align-items: start;
        flex-wrap: wrap;
      }
      .item {
        border-right: 1px solid #c1c1c1;
        height: 18px;
        padding: 0 20px;
        cursor: pointer;
        margin: 15px 0;
      }
      .item:hover {
        color: #1cb278;
      }
      .item:nth-last-child(1) {
        border: 0;
      }
    }
  }
}
</style>
