<template>
  <div class="schoolCondition">
    <div class="schoolConditionDiv">
      <div class="title">
        全部院校
      </div>
      <div class="classOption">
        <div class="left"><span>省份：</span></div>
        <div class="right">
          <span :class="{'ckeckSpan':provinceCkeck.indexOf('全部')!== -1}" @click="optionClick('省份','','')">全部</span>
          <span :key='index' :class="{'ckeckSpan':provinceCkeck.indexOf(item.areaName)!== -1}"  v-for="(item,index) in provinceData" @click="optionClick('省份',item,index)">{{item.areaName}}</span>
        </div>
      </div>
      <div class="border_bottom"></div>
      <div class="classOption">
        <div class="left"><span>院校类型：</span></div>
        <div class="right">
          <span :class="{'ckeckSpan': typeCkeck.indexOf('全部')!== -1}" @click="optionClick('院校类型','','')">全部</span>
          <span :key='index' :class="{'ckeckSpan': typeCkeck.indexOf(item.name)!== -1}" v-for="(item,index) in schoolTypeData" @click="optionClick('院校类型',item,index)">{{item.name}}</span>
        </div>
      </div>
      <div class="classOption">
        <div class="left"><span>院校层次：</span></div>
        <div class="right">
          <span :class="{'ckeckSpan': gradeCkeck.indexOf('全部')!== -1}" @click="optionClick('院校层次','','')">全部</span>
          <span :key='index' :class="{'ckeckSpan': gradeCkeck.indexOf(item.name)!== -1}" v-for="(item,index) in schoolGradeData" @click="optionClick('院校层次',item,index)">{{item.name}}</span>
        </div>
      </div>
      <div class="border_bottom"></div>
      <div class="classOption">
        <div class="left"><span>学历层次：</span></div>
        <div class="right">
          <span :class="{'ckeckSpan': educationCkeck==='全部'}" @click="optionClick('学历层次','','')">全部</span>
          <span :key='index' :class="{'ckeckSpan': educationCkeck===item.name}" v-for="(item,index) in educationGradeData" @click="optionClick('学历层次',item,index)">{{item.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { getProvince, getSchoolType, getSchoolGrade, getEducationGrade } from "@/api/public";

export default {
  name: 'schoolCondition',
  props: {
      clearState: {
        type: Boolean,
        default: false
      },
  },
  data() {
    return {
      provinceData:[
        // {
        //   'areaNo':'1',
        //   'areaName':'省份1'
        // },
      ],
      provinceCkeck:'全部',
      provinceCode:'',
      schoolTypeData: [
        // {
        //   code:'1',
        //   name:'1'
        // }
      ],
      typeCkeck:'全部',
      typeCode:'',
      schoolGradeData: [
        // {
        //   code:'1',
        //   name:'1'
        // }
      ],
      gradeCkeck:'全部',
      gradeCode:'',
      educationGradeData: [
        // {
        //   code:'1',
        //   name:'1'
        // }
      ],
      educationCkeck:'全部',
      educationCode:'',
    }
  },
  watch: {
    clearState: {
      handler: function (val, oldVal) { 
        if(val){
          this.provinceCkeck = '全部';
          this.typeCkeck = '全部';
          this.gradeCkeck = '全部';
          this.educationCkeck = '全部';
        }
      },
      immediate: true
    },
  },
  methods: {
    optionClick(sign,item,index){
      let itemName = '';
      let itemCode = '';
      let arrName = [];
      let arrCode = [];
      let start = true;
      if(sign === '省份'){ 
        itemName = item !== '' ? item.areaName : '全部';
        itemCode = item !== '' ? item.areaNo : '';
        arrName = this.provinceCkeck.split(',');
        let arrName_ = []
        arrCode = this.provinceCode.split(',');
        let arrCode_ = []
        //name处理
        for(let i in arrName) {
          if(arrName[i] === '全部') continue
          if(arrName[i] === itemName){
            start = false
            continue;
          }
          arrName_.push(arrName[i])
        }
        if(start) {
          arrName_.push(itemName)
        }
        if(arrName_.length === 0) {
          arrName_.push('全部')
        }
        if(itemName === '全部') {
          arrName_ = ['全部']
        }
        //code处理
        for(let i in arrCode) {
          if(arrCode[i] === '') continue
          if(arrCode[i] === itemCode){
            start = false
            continue;
          }
          arrCode_.push(arrCode[i])
        }
        if(start) {
          arrCode_.push(itemCode)
        }
        if(arrCode_.length === 0) {
          arrCode_.push('')
        }
        if(itemCode === '') {
          arrCode_ = ['']
        }
        this.provinceCkeck = arrName_.join(',');
        this.provinceCode = arrCode_.join(',');
      }
      if(sign === '院校类型'){ 
        itemName = item !== '' ? item.name : '全部';
        itemCode = item !== '' ? item.code : '';
        arrName = this.typeCkeck.split(',');
        let arrName_ = []
        arrCode = this.typeCode.split(',');
        let arrCode_ = []
        //name处理
        for(let i in arrName) {
          if(arrName[i] === '全部') continue
          if(arrName[i] === itemName){
            start = false
            continue;
          }
          arrName_.push(arrName[i])
        }
        if(start) {
          arrName_.push(itemName)
        }
        if(arrName_.length === 0) {
          arrName_.push('全部')
        }
        if(itemName === '全部') {
          arrName_ = ['全部']
        }
        //code处理
        for(let i in arrCode) {
          if(arrCode[i] === '') continue
          if(arrCode[i] === itemCode){
            start = false
            continue;
          }
          arrCode_.push(arrCode[i])
        }
        if(start) {
          arrCode_.push(itemCode)
        }
        if(arrCode_.length === 0) {
          arrCode_.push('')
        }
        if(itemCode === '') {
          arrCode_ = ['']
        }
        this.typeCkeck = arrName_.join(',');
        this.typeCode = arrCode_.join(',');
      }
      if(sign === '院校层次'){ 
        itemName = item !== '' ? item.name : '全部';
        itemCode = item !== '' ? item.code : '';
        arrName = this.gradeCkeck.split(',');
        let arrName_ = []
        arrCode = this.gradeCode.split(',');
        let arrCode_ = []
        //name处理
        for(let i in arrName) {
          if(arrName[i] === '全部') continue
          if(arrName[i] === itemName){
            start = false
            continue;
          }
          arrName_.push(arrName[i])
        }
        if(start) {
          arrName_.push(itemName)
        }
        if(arrName_.length === 0) {
          arrName_.push('全部')
        }
        if(itemName === '全部') {
          arrName_ = ['全部']
        }
        //code处理
        for(let i in arrCode) {
          if(arrCode[i] === '') continue
          if(arrCode[i] === itemCode){
            start = false
            continue;
          }
          arrCode_.push(arrCode[i])
        }
        if(start) {
          arrCode_.push(itemCode)
        }
        if(arrCode_.length === 0) {
          arrCode_.push('')
        }
        if(itemCode === '') {
          arrCode_ = ['']
        }
        this.gradeCkeck = arrName_.join(',');
        this.gradeCode = arrCode_.join(',');
      }
      if(sign === '学历层次'){ 
        itemName = item !== '' ? item.name : '全部';
        itemCode = item !== '' ? item.code : '';
        this.educationCkeck = itemName;
        this.educationCode = itemCode
      }
      this.$emit('schoolCondition', {
        provinceName: this.provinceCkeck,
        provinceCode: this.provinceCode,
        typeName: this.typeCkeck,
        typeCode: this.typeCode,
        gradeName: this.gradeCkeck,
        gradeCode: this.gradeCode,
        educationName: this.educationCkeck,
        educationCode: this.educationCode,
      })
    },
    getSchoolTypeList(){
      getSchoolType().then(r => {
        this.schoolTypeData = r.data
      }).catch((e) => {
        console.log(e)
      });
    },
    getProvinceList(){
      getProvince().then(r => {
        this.provinceData = r.data
      }).catch((e) => {
        console.log(e)
      });
    },
    getSchoolGradeList(){
      getSchoolGrade().then(r => {
        this.schoolGradeData = r.data
      }).catch((e) => {
        console.log(e)
      });
    },
    getEducationGradeList(){
      getEducationGrade().then(r => {
        this.educationGradeData = r.data
      }).catch((e) => {
        console.log(e)
      });
    }
  },
  beforeDestroy(){},
  mounted: function() {
    this.getProvinceList()
    this.getSchoolTypeList()
    this.getSchoolGradeList()
    this.getEducationGradeList()
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
.schoolCondition {
  width: 100%;
  .schoolConditionDiv {
    width: 1200px;
    margin: 0 auto;
    border: 1px solid #BCBCBC;
    border-radius: 4px;
    line-height: 60px;
  }
  .border_bottom {
    height: 1px;
    width: 1136px;
    background: #BCBCBC;
    margin: 0 auto;
  }
  .title {
    height: 60px;
    font-size: 18px;
    border-bottom: 1px solid #BCBCBC;
    color: #666666;
    text-indent: 32px;
  }
  .classOption {
    width: 1136px;
    margin: 0 auto;
    overflow: hidden;
    display: flex;
    .ckeckSpan {
      background: #1CB278;
      color: #fff !important;
      border-radius: 18px;
    }
    .left {
      width: 122px;
      color:#666;
    }
    .right{
      flex: 1;
      span {
        display: inline-block;
        height: 33px;
        // min-width: 76px;
        text-align: center;
        padding: 0 20px;
        line-height: 33px;
        cursor: pointer;
        color:#666;
        margin: 0 5px;
      }
      span:hover {
        color: #1CB278;
      }
    }
  }
}
</style>
