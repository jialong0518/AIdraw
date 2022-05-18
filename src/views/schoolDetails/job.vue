<template>
  <div class="job">
    <div class="moduleTitle">
        <span></span>
        毕业生签约地区流向
    </div>
    <div class="contentDiv" :style="{'height': myChartData.length === 0 ? '100px' :'480px','overflow': 'hidden'}">
        <div id="myChart" :style="{'height': '400px'}">
            <div style="color: #666;text-align: center;font-size: 18px;" v-show="myChartData.length === 0">暂无数据</div>
        </div>
    </div>
    <div class="moduleTitle">
        <span></span>
        毕业生就业单位性质
    </div>
    <div class="contentDiv" :style="{'height': myChart1Data.length === 0 ? '100px' :'480px','overflow': 'hidden'}">
        <div id="myChart1" :style="{'height': '400px'}">
            <div style="color: #666;text-align: center;font-size: 18px;" v-show="myChart1Data.length === 0">暂无数据</div>
        </div>
    </div>
    <div class="moduleTitle">
        <span></span>
        毕业生就业单位
    </div>
    <div class="contentDiv">
        <el-table
            :data="tableData"
            border
            style="width: 100%;margin-top:15px;">
            <el-table-column
            type="index"
            align="center"
            width="100"
            label="序号">
            </el-table-column>
            <el-table-column
            prop="typeName"
            align="center"
            label="单位名称">
            </el-table-column>
            <el-table-column
            prop="typeValue"
            align="center"
            width="100"
            label="人数">
            </el-table-column>
        </el-table>
        <div class="remarks">{{jobOrgRemark}}</div>
    </div>
  </div>
</template>

<script>


import { getJobWhere } from "@/api/schoolDetailsApi";



export default {
  name: 'job',
  props: {
    schoolId: {
        type: String,
        default: ''
    }
  },
  data() {
    return {
        tableData:[],
        myChart1: null,
        myChart: null,
        myChartData:[],
        myChart1Data:[],
        jobOrgRemark: ''
    }
  },
  watch: {
      schoolId: {
        handler: function (val, oldVal) { 
            if(val === '') return
            this.id = val
            this.getJobWhereData()
        },
        immediate: true,
        deep: true
      },
  },
  components: {},
  methods: {
      getJobWhereData() {
        getJobWhere({
            collegeId: this.id,
        }).then(r => {
            this.myChartData = r.data.jobAreaDetailList;
            this.myChart1Data = r.data.jobOrgNatureDetailList;
            this.tableData = r.data.jobOrgDetailList;
            this.jobOrgRemark = r.data.jobOrgRemark;
            this.chartFun()
            this.chartFun1()
        }).catch((e) => {
            console.log(e)
        });    
    },
    chartFun(){
        let sdata = [];
        let ydata = [];
        this.myChartData.map(item=>{
            sdata.push(item.typeValue.replace('%',''))
            ydata.push(item.typeName)
        })
        if(this.myChart)this.myChart.dispose();
          this.myChart = this.$echarts.init(document.getElementById('myChart'))
          this.myChart.setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                // data: ['2011年', '2012年']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: ydata
            },
            series: [
                {
                    // name: '2011年',
                    type: 'bar',
                    data: sdata,
                    label: {
                        normal: {
                            show: true,//是否显示
                            position: 'right',//文字位置
                            formatter: '{c}%'//c后面加单位
                            
                        }
                    },
                    itemStyle: {
                            normal: {
                                color: function(params) {
                                    var colorList = [
                                    '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                                    '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                                    '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                                    ];
                                    return colorList[params.dataIndex]
                                },
                            }
                    },
                }
            ]
        }); 
    },
    chartFun1(){
        let sdata = [];
        let ydata = [];
        this.myChart1Data.map(item=>{
            sdata.push(item.typeValue.replace('%',''))
            ydata.push(item.typeName)
        })
        if(this.myChart1)this.myChart1.dispose();
          this.myChart1 = this.$echarts.init(document.getElementById('myChart1'))
          this.myChart1.setOption({
            xAxis: {
                type: 'category',
                data: ydata,
                axisLabel: {
                    interval: 0,
                    rotate: 20
                },
            },
            yAxis: {
                type: 'value',
            },
            series: [{
                data: sdata,
                type: 'bar',
                label: {
                    normal: {
                        show: true,//是否显示
                        position: 'top',//文字位置
                        formatter: '{c}%'//c后面加单位
                        
                    }
                },
                itemStyle: {
                            normal: {
                                color: function(params) {
                                    var colorList = [
                                    '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                                    '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                                    '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                                    ];
                                    return colorList[params.dataIndex]
                                },
                            }
                    },
            }]
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
.job{
  background: #F3F5F7;
  .moduleTitle {
      display: flex;
      font-size: 20px;
      align-items: center;
    //   text-indent: 13px;
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
  .contentDiv {
      padding: 40px;
      background: #fff;
      border-radius: 6px;
      .remarks {
          color: #999999;
          font-size: 13px;
          margin-top: 20px;
          line-height: 25px;
      }
  }
}
</style>
