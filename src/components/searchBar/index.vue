<template>
  <div class="searchBar">
    <div class="searchBarDiv">
      <el-input
        :placeholder="placeholder"
        style="border-color: #1CB278;font-size:16px;"
        @input="searchInputFun"
        v-model="searchText">
        <!-- <i slot="suffix" style="color: #1CB278;" class="el-input__icon el-icon-search"></i> -->
      </el-input>
      <i @click="searchFun" class="el-icon-search searchIcon"></i>
    </div>
  </div>
</template>

<script>


export default {
  name: 'searchBar',
  props: {
      placeholder: {
        type: String,
        default: "请输入内容"
      },
      clearSearchText: {
        type: Boolean,
        default: false
      }
  },
  data() {
    return {
      searchText:''
    }
  },
  watch: {
    clearSearchText: {
      handler: function (val, oldVal) { 
        if(val){
          this.searchText = '';
        }
      },
      immediate: true
    },
  },
  methods: {
    searchInputFun(){
      this.$emit('searchText', this.searchText)
    },
    searchFun(){
      this.$emit('searchFun', this.searchText)
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
</style>

<style lang="scss" scoped>
.searchBar {
  width: 100%;
}
.searchBarDiv {
  width: 1000px;
  margin: 0 auto;
  height: 60px;
  position: relative;
}
.searchIcon {
  color: #1CB278;
  cursor: pointer;
  position: absolute;
  right: 20px;
  top: 15px;
  font-size: 25px;
}
::v-deep .el-input__inner {
  border-color: #1CB278;
  height: 60px;
}
</style>
