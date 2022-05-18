<template>
  <div class="vipTips">
    <div v-show="code===143" class="vipTipsDiv">
      <div @click="rechargeFun" class="vipImg"></div>
    </div>
    <div v-show="code!==143" class="noData">暂无数据</div>
  </div>
</template>

<script>


export default {
  name: 'vipTips',
  props: {
    code: {
        type: Number,
        default: 0
    },
  },
  data() {
    return {}
  },
  watch: {
    code: {
      handler: function (val, oldVal) { 
        if(val){
          console.log(val,'vip')
        }
      },
      immediate: true
    },
  },
  methods: {
    rechargeFun() {
      this.$alert('抱歉，此功能暂未开放！', '提示', {
            confirmButtonText: '确定'
      });
    }
  },
  beforeDestroy(){
      
  },
  mounted: function() {}
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
.el-table__empty-text {
  width: 100% !important;
}
</style>

<style lang="scss" scoped>
.vipTips {
  width: 100%;
}
.vipTipsDiv {
 height: 200px;
 line-height: 200px;
 display: flex;
  align-items: center;
 .vipImg {
   height: 130px;
   width: 100%;
   background: url('./vip.png') no-repeat;
   background-size: 100% 100%;
   cursor: pointer;
 }
}
.noData {
  font-size: 14px;
  color: #999;
  text-align: center;
}
</style>
