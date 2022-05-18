<template>
  <div class="generalRules">
    <div class="moduleTitle">
        <span></span>
        招生简章
    </div>
    <div class="contentDiv">
        <div @click="goGeneralRules(item)" :key="index" v-for="(item, index) in listData">{{item.entryCharterName}}<span>{{item.onlineDateStr}}</span></div>
        <div class="noData" v-show="listData.length === 0">暂无数据</div>
    </div>
  </div>
</template>

<script>


import { getGeneralRules } from "@/api/schoolDetailsApi";



export default {
  name: 'generalRules',
  props: {
    schoolId: {
        type: String,
        default: ''
    }
  },
  data() {
    return {
      listData: [],
    }
  },
  watch: {
    schoolId: {
        handler: function (val, oldVal) { 
            if(val === '') return
            this.getRegionData()
        },
        immediate: true,
        deep: true
    },
  },
  components: {},
  methods: {
    getRegionData() {
        getGeneralRules({
            collegeId: this.schoolId,
        }).then(r => {
          this.listData = r.data
        }).catch((e) => {
            console.log(e)
        });    
    },
    goGeneralRules(data) {
      window.open(`${data.entryCharterUrl}`)
    }
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
.generalRules{
  background: #F3F5F7;
  .noData {
    border: 0 !important;
    font-size: 16px !important;
    color: #666 !important;
    cursor: default !important;
  }
  .moduleTitle {
      display: flex;
      font-size: 20px;
      align-items: center;
      // text-indent: 13px;
      margin-bottom: 27px;
      margin-top: 20px;
      span {
          display: inline-block;
          width: 5px;
          margin-right: 13px;
          height: 20px;
          background: #1CB278;
          border-radius: 3px;
      }
  }
  .contentDiv {
      padding: 40px;
      background: #fff;
      border-radius: 6px;
      > div {
          border-bottom: 1px dotted #BCBCBC;
          height: 31px;
          line-height: 31px;
          font-size: 14px;
          color: #333;
          cursor: pointer;
          span {
            color: #999999;
            font-size: 14px;
            float: right;
          }
      }
  }
}
</style>
