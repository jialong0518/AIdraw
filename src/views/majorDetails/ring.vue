<template>
  <div class="ring">
    <div :id="idkey" :style="{'height': '300px'}"></div>
    <div v-show="maskState" class="mask">暂无数据</div>
  </div>
</template>

<script>

// schoolId
// collegeInfor
export default {
  name: 'job',
  props: {
    chartdata: {
        type: Array,
        default: ()=>[]
    },
    idkey: {
        type: String,
        default: 'myChart',
     }
  },
  data() {
    return {
        myChart:null,
        maskState: false
    }
  },
  watch: {
      chartdata: {
        handler: function (val, oldVal) { 
            if(val.length === 0){
              this.maskState = true;
              return
            }
            this.maskState = false;
            this.chartFun(val)
        },
        // immediate: true,
        deep: true
      },
  },
  components: {},
  methods: {
    chartFun(data){
        
        if(this.myChart)this.myChart.dispose();
          this.myChart = this.$echarts.init(document.getElementById(`${this.idkey}`))
          this.myChart.setOption({
            title: {
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            
            series: [
                {
                type: 'pie',
                radius: ['40%', '60%'],
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                data: data,
                emphasis: {
                    itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
                }
            ]
          }); 
    },
  },
  beforeDestroy(){
      
  },
  mounted: function() {
      this.chartFun()
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
.el-carousel__item {
    background-color: #d3dce6;
}

.ring{
  // height: 100%;
  background: #fff;;
  position: relative;
  .mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    text-align: center;
    line-height: 300px;
    color: #666;
  }
}
</style>
