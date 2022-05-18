<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted: function() {
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss" scoped>
  ::v-deep .el-pager li.active {
      color: #1CB278;
  }
  ::v-deep .el-pager li:hover {
      color: #1CB278;
  }
  ::v-deep .el-pagination button:hover {
      color: #1CB278;
  }
  ::v-deep .el-input__inner:focus {
      border-color: #1CB278;
  }
  ::v-deep .el-select .el-input.is-focus .el-input__inner {
      border-color: #1CB278;
  }
  ::v-deep .el-pagination__total {
      font-size: 16px!important;
  }
  ::v-deep .el-pagination__sizes .el-input .el-input__inner {
      font-size: 16px;
      padding-left: 10px;
  }
  ::v-deep .el-input--mini .el-input__inner {
      height: 31px;
      line-height: 31px;
  }
  ::v-deep .el-pager li {
      font-size: 16px;
  }
  ::v-deep .el-pagination .btn-next .el-icon, .el-pagination .btn-prev .el-icon {
      font-size: 16px;
  }
  ::v-deep .el-pagination__jump {
      font-size: 16px!important;
  }
  ::v-deep .el-select-dropdown__list .el-select-dropdown__item.selected {
      color: #1CB278 !important;
  }
  ::v-deep input.el-input__inner:hover {
      border-color: #1CB278 !important;
  }
  #app {
    background-color: #F3F5F7;
  }
</style>
<style lang="scss">
.el-breadcrumb__inner a:hover, .el-breadcrumb__inner.is-link:hover {
  color: #1CB278;
}
.el-radio__input.is-checked .el-radio__inner {
  border-color: #1CB278;
  background: #1CB278;
}
.el-radio__inner:hover {
  border-color: #1CB278;
}
.el-radio__input.is-checked+.el-radio__label {
  color: #1CB278;
}
.el-button--primary {
    background-color: #1CB278 !important;
    border-color: #1CB278 !important;
  }
.el-select-dropdown__item.selected {
  color: #1CB278 !important;
}
.el-icon-loading {
    color: #1CB278 !important;
}
.el-loading-text {
    color: #1CB278 !important;
 }
.select_bottom {
   .el-select-dropdown__item.selected {
    color: #1CB278 !important;
  }
  input.el-input__inner:hover {
    border-color: #1CB278 !important;
  }
  .el-input__inner:focus{
    border-color: #1CB278 !important;
  }
  .el-select .el-input.is-focus .el-input__inner {border-color: #1CB278 !important;}
}
  .block {
      text-align: center;
      margin-top: 20px;
      padding-bottom: 40px;
  }

</style>
