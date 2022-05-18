<template>
  <div class="searchTable">
    <div class="searchTableDiv">
      <div class="title">共<span>{{total}}</span>所院校</div>
      <div class="broderBottoomG"></div>
      <div class="table">
        <div class="tr" :key="index" v-for="(item, index) in tableDataList">
          <div class="logo">
            <img
              :src="`${
                item.collegeLogo == null || item.collegeLogo == ''
                  ? icon
                  : item.collegeLogo
              }`"
            />
          </div>
          <div class="infor">
            <div class="schoolName">
              <div>
                <div class="nameSchool" @click="goDetails(item)">{{ item.collegeName }}</div><span>{{ item.cityName }}</span>
              </div>
            </div>
            <div class="schoolLabel">
              <div v-if="item.flag985 === '1'">985</div>
              <div v-if="item.flag211 === '1'">211</div>
              <div v-if="item.flagDoubleFirst === '1'">双一流</div>
              <div v-if="item.flagStrongBase === '1'">强基</div>
              <div>{{item.educationNatureName}}</div>
              <!-- <div v-if="item.educationNature === '公办'">公办</div> -->
            </div>
          </div>
          <div class="details" @click="goDetails(item)">查看详情</div>
          <!-- @change="checkboxFun($event,item,index)" -->
          <div class="ratio" @click="ratioFun($event, item, index)">
            <el-checkbox
              @click.native.prevent
              style="margin-right: 8px; position: relative; top: -2px"
              :checked="item.checked"
              v-model="item.checked"
            ></el-checkbox
            >加入对比
          </div>
        </div>
        <div class="noData" v-show="tableDataList.length === 0">
          暂无数据
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import icon from "./schoolicon.png";

export default {
  name: "searchTable",
  props: {
    tableData: {
      type: Object,
      default: () => {},
    },
    delCompareData: {
      type: Array,
      default: () => [],
    },
    total: {
      type: Number,
      default: 0,
    }
  },
  data() {
    return {
      checked: "",
      icon,
      tableDataList: [],
      checkedArr: [],
    };
  },
  watch: {
    tableData: {
      handler: function (val, oldVal) {
        if (val) {
          if (!val.list) return;
          let ids = [];
          this.checkedArr.map(item=>{
            ids.push(item.id)
          })
          let arr = JSON.parse(JSON.stringify(val.list));
          arr.map((item) => {
            if(ids.indexOf(item.id) !== -1) {
              this.$set(item, "checked", true);
            } else {
              this.$set(item, "checked", false);
            }
            return item;
          });
          this.tableDataList = arr;
        }
      },
      immediate: true,
      deep: true,
    },
    delCompareData: {
      handler: function (val, oldVal) {
        let arr = val.concat();
        this.tableDataList.map((item) => {
          item.checked = false;
          for (let v of arr) {
            if (v.id === item.id) {
              item.checked = true;
              break;
            }
          }
        });
        this.checkedArr = arr;
        this.$emit("checkedList", this.checkedArr);
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    ratioFun(e, item, index) {
      // if(e.target.tagName !== 'DIV') return
      if (this.checkedArr.length === 4 && !item.checked) {
        this.$message({
          message: "对比学校最多4个！",
          type: "warning",
        });
        return;
      }
      item.checked = !item.checked;
      this.compareDataHandle(item.checked, item);
    },
    checkboxFun(data, item, index) {
      if (this.checkedArr.length === 4 && item.checked) {
        this.$message({
          message: "对比学校最多4个！",
          type: "warning",
        });
        item.checked = false;
        return;
      }
      item.checked = data;
      this.compareDataHandle(data, item);
    },
    compareDataHandle(state, data) {
      if (state) {
        this.checkedArr.push(data);
      } else {
        let arr = [];
        this.checkedArr.map((item, index) => {
          if (data.id !== item.id) {
            arr.push(item);
          }
        });
        this.checkedArr = arr;
      }
      this.$emit("checkedList", this.checkedArr);
    },
    goDetails(data) {
      this.$router.push({ name: "schoolDetails", query: { id: data.id } });
    },
  },
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
::v-deep .el-checkbox__input.is-checked .el-checkbox__inner {
  border-color: #1cb278;
  background: #1cb278;
}
::v-deep .el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #1cb278;
}
::v-deep .el-checkbox__inner {
  border-color: #1cb278;
}
.searchTable {
  width: 100%;
}
.noData {
    height: 200px;
    text-align: center;
    line-height: 200px;
    color: #666;
    font-size: 20px;
}
.searchTableDiv {
  width: 1200px;
  margin: 0 auto;
  .title {
    font-size: 22px;
    padding: 13px 0;
    color: #666;
    border-bottom: 1px solid #1cb278;
    display: inline-block;
    span {
      color: #ff8037;
    }
  }
  .broderBottoomG {
    height: 1px;
    background: #1cb278;
    width: 100%;
  }
  .table {
    .tr {
      height: 163px;
      display: flex;
      width: 100%;
      align-items: center;
      flex-direction: row;
      border-bottom: 1px solid #bcbcbc;
      .logo {
        height: 100px;
        width: 100px;
        img {
          height: 100%;
          width: 100%;
        }
      }
      .infor {
        margin-left: 26px;
        .schoolName {
          font-size: 22px;
          color: #333;
          margin-top: -10px;
          .nameSchool {
            cursor: pointer;
            display: inline-block;
          }
          span {
            font-size: 16px;
            color: #999;
            margin-left: 20px;
          }
        }
        .schoolLabel {
          display: flex;
          margin-top: 12px;
          div {
            width: 76px;
            height: 26px;
            background: #e9fef6;
            border: 1px solid #1cb278;
            border-radius: 4px;
            font-size: 14px;
            color: #1cb278;
            line-height: 26px;
            text-align: center;
            margin-right: 30px;
          }
        }
      }
      .ratio {
        width: 124px;
        height: 40px;
        border: 1px solid #1cb278;
        line-height: 40px;
        text-align: center;
        color: #1cb278;
        font-size: 16px;
        border-radius: 6px;
        cursor: pointer;
        margin: 0 18px 0 30px;
      }
      .details {
        width: 124px;
        height: 40px;
        border: 1px solid #1cb278;
        margin-left: auto;
        background: #1cb278;
        font-size: 16px;
        color: #fff;
        line-height: 40px;
        text-align: center;
        border-radius: 6px;
        cursor: pointer;
      }
    }
  }
}
</style>
