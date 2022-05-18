<template>
  <div class="major">
    <div class="moduleTitle">
        <span></span>
        开设专业
    </div>
    <div class="moduleMajor">
      <div class="specialMajor">
        <div class="title">
          国家特色专业
        </div>
        <div class="gatherMajor">
          <div :key="index" v-for="(item, index) in majorTeSeList">{{item}}</div>
        </div>
      </div>
      <el-table
            :data="majorPuTongList"
            border
            style="width: 100%;margin-top:50px;border-radius: 6px">
            <el-table-column
            prop="majorType"
            align="center"
            width="200"
            label="类别">
            </el-table-column>
            <el-table-column
            prop="majorList"
            align="center"
            label="专业名称">
            </el-table-column>
        </el-table>
    </div>
  </div>
</template>

<script>


import { getMajorData } from "@/api/schoolDetailsApi";



export default {
  name: 'major',
  props: {
    schoolId: {
        type: String,
        default: ''
    },
    collegeInfor: {
        type: Object,
        default: ()=>{}
    }
  },
  data() {
    return {
      majorTeSeList:[],
      majorPuTongList:[]
    }
  },
  watch: {
    schoolId: {
        handler: function (val, oldVal) { 
            if(val === '') return
            this.getMajorList()
        },
        immediate: true,
        deep: true
      },
      collegeInfor: {
        handler: function (val, oldVal) { 
            if(val === '') return
        },
        immediate: true,
        deep: true
      },
  },
  components: {},
  methods: {
    getMajorList() {
        getMajorData({
            collegeId: this.schoolId,
        }).then(r => {
            this.majorTeSeList = r.data.majorTeSeList;
            r.data.majorPuTongList.map(item=>{item.majorList = item.majorList.join("，")})
            this.majorPuTongList = r.data.majorPuTongList;
        }).catch((e) => {
            console.log(e)
        });    
    },
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
::v-deep .el-table__header tr th {
    background: #F5F5F5;
    color: #666;
}
.major{
  background: #F3F5F7;
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
          height: 20px;
          margin-right: 13px;
          background: #1CB278;
          border-radius: 3px;
      }
  }
  .moduleMajor {
    background: #fff;
    padding: 40px;
    .specialMajor {
      border: 1px solid #D1D1D1;
      border-radius: 6px;
      display: flex;
      .title {
        width: 179px;
        border-right: 1px dotted #bcbcbc;
        font-size: 14px;
        color: #333;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .gatherMajor {
        flex:1;
        padding: 15px 44px;
        font-size: 14px;
        color: #333;
        line-height: 36px;
        > div {
          display: inline-block;
          margin-right: 20px;
        }
      }
    }
  }
}
</style>
