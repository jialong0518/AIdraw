<template>
    <div class="compareColumn animate_active" :style="arrow?'bottom:0;':''">
      <div class="compareColumnDiv">
        <div class="arrow" @click="arrowFun($event)">
          <i v-show="!arrow" class="el-icon-sort-up arrowIcon"></i>
          <i v-show="arrow" class="el-icon-sort-down arrowIcon"></i>
        </div>
        <div class='title'>对比栏</div>
        <div class="borderBottomB"></div>
        <div class="list">
          <div class="schoolItem" :key="index" v-for="(item,index) in dataList">
            <div><img :src="`${item.collegeLogo == null||item.collegeLogo == ''?icon:item.collegeLogo}`" /></div>
            <div>{{item.collegeName}}</div>
            <div @click="delCompare(index)">取消对比</div>
          </div>
          <div class="operate">
            <div @click="goCompareSchool">对比</div>
            <div @click="emptyCompare()">清空</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import icon from './schoolicon.png'


export default {
  name: 'compareColumn',
  props: {
      checkedData: {
        type: Array,
        default: ()=>[]
      },
  },
  data() {
    return {
      icon,
      dataList:[],
      arrow: false,
    }
  },
  watch: {
    checkedData: {
      handler: function (val, oldVal) { 
          let arr = JSON.parse(JSON.stringify(val))
          this.dataList = arr;
      },
      immediate: true,
      deep: true
    },
  },
  methods: {
    emptyCompare(){
      this.dataList = [];
      this.$emit('delCompareList', this.dataList);
    },
    arrowFun(el){
      this.arrow = !this.arrow
    },
    delCompare(index) {
      this.dataList.splice(index, 1);
      this.$emit('delCompareList', this.dataList);
    },
    goCompareSchool(){
      let ids = []
      this.dataList.map(item=>{
        ids.push(item.id)
      })
      ids = ids.toString()
      this.$router.push({name:'compareSchool', query:{ids}})
    }
  },
  beforeDestroy(){},
  mounted: function() {}
}
</script>

<style lang="scss">
.animate_active{
      transition: all .4s ease-in-out; //这是滑入划出的动画
}
.el-menu--popup-bottom-start {
  background: #fff !important;
  margin-top: 0px;
}
.el-menu--popup {
    min-width: 145px;
}
.el-menu--horizontal .el-menu .el-menu-item, .el-menu--horizontal .el-menu .el-submenu__title {
  background: #fff !important;
  color: #000 !important;
  text-align: center;
}
.el-menu--horizontal .el-menu .el-menu-item:hover {
  background: #1CB278 !important;
  color: #fff !important;
}
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
.compareColumn {
  width: 100%;
  position: fixed;
  bottom: -362px;
  background: #fff;
  opacity: 1;
  z-index: 999;
}
.compareColumnDiv {
  width: 1200px;
  margin: 0 auto;
  position: relative;
  height: 362px;
  border: 1px solid #BCBCBC;
  border-radius: 4px;
  .arrow {
    margin: -41px auto 0;
    width: 45px;
    height: 41px;
    background: #1CB278;
    border-radius: 4px 4px 0px 0px;
    text-align: center;
    line-height: 45px;
    cursor: pointer;
    .arrowIcon {
      font-size: 28px;
      color: #fff;
    }
  }
  .title {
    font-size: 22px;
    padding: 13px 0;
    color:#666;
    border-bottom: 1px solid #1CB278;
    display: inline-block;
    margin-left: 33px;
  }
  .borderBottomB {
    height: 1px;
    background: #bcbcbc;
    margin-left: 33px;
  }
  .list {
    display: flex;
    margin-top: 42px;
    > div {
      height: 207px;
    }
    .schoolItem {
      width: 20%;
      border-right: 1px solid #BCBCBC;
      text-align: center;
      > div:nth-child(1) {
        width: 100px;
        height: 100px;
        margin:0 auto;
        border-radius: 50%;
        img {
          width: 100%;
        }
      }
      > div:nth-child(2) {
        font-size: 18px;
        color: #333;
        margin-top: 15px;
      }
      > div:nth-child(3) {
        width: 100px;
        height: 40px;
        margin: 30px auto 0;
        background: #fff;
        color: #1CB278;
        border: 1px solid #1CB278;
        border-radius: 6px;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
        cursor: pointer;
      }
    }
    .operate {
      width: 20%;
      margin-left: auto;
      div {
        width: 110px;
        height: 40px;
        margin: 0 auto;
        border-radius: 6px;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
        cursor: pointer;
        &:nth-child(1) {
          background: #1CB278;
          color: #fff;
          margin-top: 48px;
        }
        &:nth-child(2) {
          background: #fff;
          color: #1CB278;
          border: 1px solid #1CB278;
          margin-top: 30px;
        }
      }
    }
  }
}

</style>
