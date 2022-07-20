<template>
  <div class="homePage">
    <!-- <div class="resetBut" @click="resetBut"></div> -->
    <div class="titleDiv"></div>
    <div class="carouselDiv">
      <div class="bordercss" v-show="oldPic !== ''||newPic !== ''||imgTxt !==''">
            <div class="img" style="position: relative;">
              <div class="txtDiv" v-show="imgTxt !==''&&newPic ===''">{{imgTxt}}</div>
              <div @click="picfinishFun" class="backmake" v-show="status !== '已生成' && status !== ''"></div>
              <img :src="`${imgUrl}/${newPic !=='' ? newPic : oldPic}`" :style="{'filter': `blur(${filterNum}px)`}" class="img1" />
              <div v-show="mengbanshow" class="filterDiv" >
                <div :style="{'filter': filterArr.indexOf(item) !== -1 || filterArr.length > 480 ? '' :'blur(10px)','background': filterArr.indexOf(item) !== -1 || filterArr.length > 480 ? '' :'#fff'}" v-for="item in 500" :key="item"></div>
              </div>
            </div>
          </div>
      <el-carousel @change="lunbochange" v-show="oldPic === ''&&newPic === ''&&imgTxt ===''" ref="carousel" trigger="click" :autoplay='false' :setActiveItem="carouselIndex"  style="height: 100%;">
        <el-carousel-item name="1">
          <div class="bordercss">
            <div class="img sumiaoback" :style="{'filter': `blur(${LfilterNum1}px)`}" style="position: relative">
            </div>
          </div>
        </el-carousel-item>
        <el-carousel-item name="2">
          <div class="bordercss">
            <div class="img shuimoback" :style="{'filter': `blur(${LfilterNum2}px)`}" style="position: relative;">
            </div>
          </div>
        </el-carousel-item>
        <el-carousel-item name="3">
          <div class="bordercss">
            <div class="img monaiback" :style="{'filter': `blur(${LfilterNum3}px)`}" style="position: relative;">
            </div>
          </div>
        </el-carousel-item>
        <el-carousel-item name="4">
          <div class="bordercss">
            <div class="img fangaoback" :style="{'filter': `blur(${LfilterNum4}px)`}" style="position: relative;">
            </div>
          </div>
        </el-carousel-item>
        <el-carousel-item name="5">
          <div class="bordercss">
            <div class="img caiqianback" :style="{'filter': `blur(${LfilterNum5}px)`}" style="position: relative;">
            </div>
          </div>
        </el-carousel-item>
        <el-carousel-item name="6">
          <div class="bordercss">
            <div class="img bopuback" :style="{'filter': `blur(${LfilterNum6}px)`}" style="position: relative;">
            </div>
          </div>
        </el-carousel-item>
        <el-carousel-item name="7">
          <div class="bordercss">
            <div class="img banhuaback" :style="{'filter': `blur(${LfilterNum7}px)`}" style="position: relative;">
            </div>
          </div>
        </el-carousel-item>
        
      </el-carousel>
    </div>
    <div class="styleTypeDiv" v-show="status !== '已生成'">
      <div class="title">请选择“白泽”作画风格</div>
      <div class="typeList">
        <!--
        <div @click="typeFun(1)" :class="[styleIndex !== 1 ? 'style1' : 'style1r' ]"></div>
        <div @click="typeFun(2)" :class="[styleIndex !== 2 ? 'style2' : 'style2r' ]"></div>
        <div @click="typeFun(3)" :class="[styleIndex !== 3 ? 'style3' : 'style3r' ]"></div>
        <div @click="typeFun(4)" :class="[styleIndex !== 4 ? 'style4' : 'style4r' ]"></div>
        <div @click="typeFun(5)" :class="[styleIndex !== 5 ? 'style5' : 'style5r' ]"></div>
        <div @click="typeFun(6)" :class="[styleIndex !== 6 ? 'style6' : 'style6r' ]"></div>
        <div @click="typeFun(7)" :class="[styleIndex !== 7 ? 'style7' : 'style7r' ]"></div>  
        !-->
        <div :key="item" v-for="item in 7" @click="typeFun(item)">
          <div :class="`style${item}`">
            <div v-show="styleIndex === item"></div>
          </div>
          <div :style="{'color': styleIndex === item ? '#DA2428' : '#5B5B5B'}" v-if="item === 1">素描</div>
          <div :style="{'color': styleIndex === item ? '#DA2428' : '#5B5B5B'}" v-if="item === 2">水墨</div>
          <div :style="{'color': styleIndex === item ? '#DA2428' : '#5B5B5B'}" v-if="item === 3">莫奈</div>
          <div :style="{'color': styleIndex === item ? '#DA2428' : '#5B5B5B'}" v-if="item === 4">梵高</div>
          <div :style="{'color': styleIndex === item ? '#DA2428' : '#5B5B5B'}" v-if="item === 5">彩铅</div>
          <div :style="{'color': styleIndex === item ? '#DA2428' : '#5B5B5B'}" v-if="item === 6">波普</div>
          <div :style="{'color': styleIndex === item ? '#DA2428' : '#5B5B5B'}" v-if="item === 7">版画</div>
        </div>
      </div>
    </div>
    <div class="makeDraw" v-show="status === ''" @click="QRcodeFun"></div>
    <div class="makeDraw1" v-show="status === '准备中' && styleIndex === ''"></div>
    <div class="makeDraw" v-show="status === '准备中' && styleIndex !== ''" @click="startMakeFun"></div>
    <div class="makeDraw2" v-show="status === '进行中'"></div>
    
    <div v-show="status === '已生成'" style="width:88.2%;height: 6.8%;margin: 15% auto 0;">
      <div @click="sendmsgFun" class="newMake"></div>
      <div @click="picfinishFun" class="send"></div>
    </div>
    <div v-show="status === '已生成'" style="color: #6A718B;font-size: 24px;text-align: center;margin-top: 7%;">* 发送至手机后，请在手机界面点击“刷新”</div>
    <div v-show="status === '已生成'" style="color: #000;font-size: 32px;text-align: center;margin-top: 3%;"><span style="color: blue;">{{goNum}}</span>后将自动返回</div>
    <div class="footerDiv">
      <div class="footerLogo"></div>
    </div>
    <div class="mantle" v-show="QRcodeSHow">
      <div>
        <div class="title">—  扫码体验AI作画  —</div>
        <div class="QRcode"></div>
        <div>请扫描二维码</div>
        <div>上传照片或文字，告诉白泽你想画什么</div>
        <div @click="QRcodeClose">好的</div>
      </div>
    </div>
    <div class="mantle1" v-show="QRcodeSHow"></div>

  </div>
</template>

<script>
// import { init } from './script'
import { picresult, picfinish, playerstatus, sendmsg } from "@/api/account";


export default {
  name: 'channel',
  data() {
    return {
      styleIndex: 1,
      classSign: '',
      filterArr: [],
      LfilterArr1: [],
      LfilterArr2: [],
      LfilterArr3: [],
      LfilterArr4: [],
      LfilterArr5: [],
      LfilterArr6: [],
      LfilterArr7: [],
      filterNum: 0,
      LfilterNum1: 30,
      LfilterNum2: 30,
      LfilterNum3: 30,
      LfilterNum4: 30,
      LfilterNum5: 30,
      LfilterNum6: 30,
      LfilterNum7: 30,
      QRcodeSHow: false,
      picInterval: null,
      oldPic: '',
      newPic: '',
      status: '',
      opendId: '021mg2Ga1VbNqD0LbFFa1VyMXL3mg2Gf',
      carouselIndex: '1',
      imgUrl: 'https://huanqiu-ai.com/aibz/uploadFile',
      styleArr: [ 'sumiao.png', 'shuimo.jpeg','monai.png', 'fangao.jpeg', 'caiqian.jpeg', 'bopu.png', 'banhua.png' ],
      imgTxt: '',
      gameType: '',
      intervalTime: null,
      goNum: 30,
      setTimer: null,
      mengbanshow: false,
      LsetTimer: null,
      lunsettime: null,
    }
  },
  watch: {},
  components: {},
  methods: {
    lunbochange(data){
      console.log(data)
          this.styleIndex = data+1;
          this.LmaskTiming()
    },
    resetBut() {
      this.$router.push('/');
      // this.$router.go(0)
    },
    imgFun(data){
      this.classSign = data;
      // setTimeout(()=>this.classSign = '',3000)
    },
      typeFun(data) {
        this.styleIndex = data;
        this.$refs.carousel.setActiveItem(data - 1)
      },
    QRcodeFun() {
      this.QRcodeSHow = true;
      this.picStateFun()
      this.picInterval = window.setInterval(()=>{
        this.picStateFun()
      },4000)
    },
    QRcodeClose() {
      this.QRcodeSHow = false;
    },
    startMake() {

    },
     picStateFun(){
      picresult({
        openid: '',
        equipNo: 1
      }).then(r => {
        // 39.105.33.147:8621
          if(r.data.newPic === '39.105.33.147:8621') {
            window.clearInterval(this.picInterval);
            this.picInterval = null;
            this.$alert('图片生成失败，请点击重绘，重新传输图片', '提示', {
              confirmButtonText: '重绘',
              callback: action => {
               window.clearInterval(this.picInterval);
               this.picInterval = null;
               this.picfinishFun();
              }
            });
            return
          }

          if(r.data.newPic&&r.data.newPic !== '') {
            this.mengbanshow = true;
            this.filterArr = [];
            this.filterNum = 20;
            this.maskTiming()
          }
          if(r.code === 1) {
            this.oldPic = '';
            this.newPic = '';
            this.status = '';
            this.opendId = '';
            this.gameType = '';
            this.imgTxt = '';
          } else {
            this.oldPic = r.data.oldPic;
            this.newPic = r.data.newPic;
            this.status = r.data.status;
            this.opendId = r.data.openid;
            this.gameType = r.data.gameType;
            this.imgTxt = r.data.texts||'';
            this.QRcodeSHow = false;
          }
          if(this.status === '已生成') {
            window.clearInterval(this.picInterval);
            this.picInterval = null;
          }
          if(this.status === '准备中') {
            this.LfilterNum1 = 0;
            this.LfilterNum2 = 0;
            this.LfilterNum3 = 0;
            this.LfilterNum4 = 0;
            this.LfilterNum5 = 0;
            this.LfilterNum6 = 0;
            this.LfilterNum7 = 0;
            window.clearInterval(this.intervalTime);
            window.clearInterval(this.LsetTimer)
            this.intervalTime = null;
            this.LsetTimer = null;
          }
          console.log(this.oldPic)
      }).catch((e) => {
          console.log(e)
      });
    },
    sendmsgFun() {
      sendmsg({
        openid: this.opendId,
        equipNo: 1
      }).then(r => {
        this.$alert('图片已发送至手机', '提示', {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
           window.setTimeout(()=>{this.picfinishFun();}, 5000)
      }).catch((e) => {
          console.log(e)
      });
    },
    picfinishFun(){
      picfinish({
        openid: this.opendId,
        equipNo: 1
      }).then(r => {
            this.oldPic = '';
            this.newPic = '';
            this.status = '';
            this.opendId = '';
            this.gameType = '';
            this.imgTxt = '';
            this.mengbanshow = false;
            this.filterArr = [];
            this.filterNum = 0;
            this.goNum = 30;
            // for(let i = 0; i< 7; i++) {
            //   if(this.styleIndex !== i+1) {
            //     this[`LfilterNum${i+1}`] = 30;
            //   }
            //   console.log(item)
            // }
            // this.LfilterNum1 = 30;
            // this.LfilterNum2 = 30;
            // this.LfilterNum3 = 30;
            // this.LfilterNum4 = 30;
            // this.LfilterNum5 = 30;
            // this.LfilterNum6 = 30;
            // this.LfilterNum7 = 30;
            window.clearInterval(this.picInterval);
            window.clearInterval(this.setTimer);
            this.picInterval = null;
            this.setTimer = null;
            this.lunboFun();

      }).catch((e) => {
          console.log(e)
      });
    },
    startMakeFun(){
      playerstatus({
          "openid": this.opendId,
          "status": "进行中",
          "gameType": this.gameType,
          "oldPic": this.gameType === '图片' ? this.oldPic : '',
          "texts": this.gameType === '文字' ? this.imgTxt : '',
          "picStyle": this.styleArr[this.styleIndex - 1],
          "equipNo": 1
      }).then(r => {
        if(r.code === 0) {
          this.makeUp = false;
          this.picStateFun();
        } else {
           Dialog.alert({
              title: '提示',
              message: r.msg,
            }).then(() => {
              this.makeUp = false;
            });
        }
      }).catch((r) => {
          let msg = r.toString()
        msg = msg.replace('Error:', '')
              Dialog.alert({
              title: '提示',
              message: msg,
            }).then(() => {
              this.makeUp = false;
            });
      });
    },
    maskTiming() {
      let timeArr = [];
      let timeFun = window.setInterval(()=>{
        // document.getElementsByClassName('el-carousel__container')[0].height = 1208 / 336+'px';
        for(let i = 0; i< 8; i++) {
          let mathNum = Math.floor(Math.random()*500+1);
          if(timeArr.indexOf(mathNum) === -1){
            Math.floor(Math.random()*500+1)
            this.filterArr.push(mathNum)
            timeArr.push(mathNum)
          }
        }
        // let mathNum = Math.floor(Math.random()*500+1);
        //   if(timeArr.indexOf(mathNum) === -1){
        //     Math.floor(Math.random()*500+1)
        //     this.filterArr.push(mathNum)
        //     timeArr.push(mathNum)
        //   }
        if(100 < this.filterArr.length&&this.filterArr.length < 200)this.filterNum = 15;
        if(200 < this.filterArr.length&&this.filterArr.length < 300)this.filterNum = 10;
        if(300 < this.filterArr.length&&this.filterArr.length < 400)this.filterNum = 5;
        if(400 < this.filterArr.length&&this.filterArr.length < 500)this.filterNum = 0;
        if(this.filterArr.length === 485) {
          window.clearInterval(timeFun)
          timeFun = null;
          this.goNum = 30;
          this.goNumFun()
        }
      },10)
    },
    LmaskTiming() {
      let timeArr = [];
      this[`LfilterArr${this.styleIndex}`] = [];
      this[`LfilterNum${this.styleIndex}`] = 30;
        window.clearInterval(this.LsetTimer)
        this.LsetTimer = null;
       this.LsetTimer = window.setInterval(()=>{
         this[`LfilterNum${this.styleIndex}`] = this[`LfilterNum${this.styleIndex}`] - 1;
        // document.getElementsByClassName('el-carousel__container')[0].height = 1208 / 336+'px';
        // for(let i = 0; i< 3 + this.styleIndex; i++) {
        //   let mathNum = Math.floor(Math.random()*500+1);
        //   if(timeArr.indexOf(mathNum) === -1){
        //     Math.floor(Math.random()*500+1)
        //     this[`LfilterArr${this.styleIndex}`].push(mathNum)
        //     timeArr.push(mathNum)
        //   }
          
        // }
        // let mathNum = Math.floor(Math.random()*500+1);
        //   if(timeArr.indexOf(mathNum) === -1){
        //     Math.floor(Math.random()*500+1)
        //     this.filterArr.push(mathNum)
        //     timeArr.push(mathNum)
        //   }
        // if(100 < this[`LfilterArr${this.styleIndex}`].length&&this[`LfilterArr${this.styleIndex}`].length < 200)this[`LfilterNum${this.styleIndex}`] = 15;
        // if(200 < this[`LfilterArr${this.styleIndex}`].length&&this[`LfilterArr${this.styleIndex}`].length < 300)this[`LfilterNum${this.styleIndex}`] = 10;
        // if(300 < this[`LfilterArr${this.styleIndex}`].length&&this[`LfilterArr${this.styleIndex}`].length < 400)this[`LfilterNum${this.styleIndex}`] = 5;
        // if(400 < this[`LfilterArr${this.styleIndex}`].length&&this[`LfilterArr${this.styleIndex}`].length < 500)this[`LfilterNum${this.styleIndex}`] = 0;
        if(this[`LfilterNum${this.styleIndex}`] === 0) {
          if(this.styleIndex === 1) {
            this[`LfilterNum7`] = 20;
            this[`LfilterArr7`] = []
          } else {
            this[`LfilterNum${this.styleIndex - 1}`] = 20;
            this[`LfilterArr${this.styleIndex - 1}`] = [];
          }
          window.clearInterval(this.LsetTimer)
          this.LsetTimer = null;
        }
      },100)
    },
    goNumFun() {
      this.setTimer = window.setInterval(()=>{
        this.goNum = this.goNum - 1;
          console.log(this.goNum)
          console.log(this.setTimer)
          if(this.goNum === 0 || this.goNum < 0) {
              window.clearInterval(this.setTimer)
              this.setTimer = null;
            console.log(this.goNum)
            this.picfinishFun()
          }
      }, 1000)
    },
    lunboFun() {
      window.clearTimeout(this.intervalTime)
      this.intervalTime = null;
      this.intervalTime = window.setInterval(()=>{
        if(this.styleIndex === 7) this.styleIndex = 0
        this.styleIndex ++;
        this.$refs.carousel.setActiveItem(this.styleIndex - 1)
        // this.LmaskTiming()
        this.lunboFun();
      }, 6000)
      // this.intervalTime = window.setInterval(()=>{
      //   window.clearInterval(this.LsetTimer)
      //   this.LsetTimer = null;
      //   if(this.styleIndex === 7) this.styleIndex = 0
      //   this.styleIndex ++;
      //   this.$refs.carousel.setActiveItem(this.styleIndex - 1)
      //   this.LmaskTiming()
      // }, 10000)
    }
  },
  beforeDestroy(){
      window.clearInterval(this.intervalTime)
      window.clearInterval(this.picInterval)
      this.intervalTime = null;
      this.picInterval = null
  },
  mounted: function() {
    this.lunbochange(0)
    window.clearInterval(this.intervalTime)
    window.clearInterval(this.picInterval)
    this.intervalTime = null;
    this.picInterval = null
    this.lunboFun();
    // this.picfinishFun()
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
.el-carousel__container {
    height: 100% !important;
  }
</style>

<style lang="scss" scoped>

.el-carousel__item {
  height: 100%;
}

// .bj2 {
//   height: 30%;
//   width: 100%;
//   background: url('./bg.png') no-repeat;
// }

.homePage{
  height: 100%;
  background: #fff;
  position: relative;
  background: url('./pic/newBj.png') no-repeat;
  background-position: 2% 252%;
  background-size: 120% 106%;
  overflow: auto; 
}

.titleDiv {
  width: 77%;
  height: 4.3%;
  background: url('./BT.png') no-repeat;
  background-size: 100% 100%;
  margin: 4% auto 0;
}

.carouselDiv {
  height:27.8%;
  width:88.2%;
  margin: 1.6% auto 0;
  margin-top: 8%;
  .img {
    height: 81%;
    width: 89%;
    background: url('./pic/imgpic.png') no-repeat;
    background-size: 100% 100%;
  }
  .sumiaoback {
    background: url('./pic/sumiao.jpg') no-repeat;
    background-size: 100% 100%;
  }
  .shuimoback {
    background: url('./pic/shuimo.jpg') no-repeat;
    background-size: 100% 100%;
  }
  .monaiback {
    background: url('./pic/monai.jpg') no-repeat;
    background-size: 100% 100%;
  }
  .fangaoback {
    background: url('./pic/fangao.jpg') no-repeat;
    background-size: 100% 100%;
  }
  .caiqianback {
    background: url('./pic/caiqian.jpg') no-repeat;
    background-size: 100% 100%;
  }
  .bopuback {
    background: url('./pic/bopu.jpg') no-repeat;
    background-size: 100% 100%;
  }
  .banhuaback {
    background: url('./pic/banhua.jpg') no-repeat;
    background-size: 100% 100%;
  }
  .img1 {
    height: 100%;
    // width: 100%;
    background: url('./pic/imgpic.png') no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
  }

  
}

.styleTypeDiv {
    height: 16%;
    width: 88%;
    background: #fff;
    margin: 1.6% auto 0;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    // padding: 0 5.3%
    .title {
      color: #757575;
      font-size: 24px;
      font-weight: bold;
      text-align: center;
    }
    .typeList {
      height: 53.5%;
      display: flex;
      justify-content: space-evenly;
    }
    .typeList > div {
      width: 12%;
      // background-size: 100% 100%;
      height: 100%
    }

    .typeList > div > div > div {
      position: absolute;
      width: 100%;
      height: 100%;
      background: url('./pic/redxuan.png') no-repeat;
      background-size: 100% 100%;
    }

    .typeList > div > div:nth-child(1) {
      width: 100%;
      height: 70%;
      position: relative;
    }

    .typeList > div > div:nth-child(2) {
      color: #5B5B5B;
      font-size: 22px;
      text-align: center;
      font-weight: 700;
      margin-top: 5px;
    }

    .style1 {
      background: url('./pic/sumiao.png') no-repeat;
      background-size: 100% 100%;
      border-radius: 20px;
    }
    .style2 {
      background: url('./pic/Frame2.png') no-repeat;
      background-size: 100% 100%;
      border-radius: 20px;
    }
    .style3 {
      background: url('./pic/Frame3.png') no-repeat;
      background-size: 100% 100%;
      border-radius: 20px;
    }
    .style4 {
      background: url('./pic/Frame4.png') no-repeat;
      background-size: 100% 100%;
      border-radius: 20px;
    }
    .style5 {
      background: url('./pic/Frame5.png') no-repeat;
      background-size: 100% 100%;
      border-radius: 20px;
    }
    .style6 {
      background: url('./pic/Frame6.png') no-repeat;
      background-size: 100% 100%;
      border-radius: 20px;
    }
    .style7 {
      background: url('./pic/Frame7.png') no-repeat;
      background-size: 100% 100%;
      border-radius: 20px;
    }

    .style1r {
      background: url('./pic/sumiao.png') no-repeat;
    }
    .style2r {
      background: url('./pic/Frame2r.png') no-repeat;
    }
    .style3r {
      background: url('./pic/Frame3r.png') no-repeat;
    }
    .style4r {
      background: url('./pic/Frame4r.png') no-repeat;
    }
    .style5r {
      background: url('./pic/Frame5r.png') no-repeat;
    }
    .style6r {
      background: url('./pic/Frame6r.png') no-repeat;
    }
    .style7r {
      background: url('./pic/Frame7r.png') no-repeat;
    }
}
.makeDraw {
  background: url('./pic/Button.png') no-repeat;
  background-size: 100% 100%;
  height: 7.2%;
  width:58.6%;
  margin: 1.6% auto 0;
}
.makeDraw1 {
  background: url('./chioseType.png') no-repeat;
  background-size: 100% 100%;
  height: 7.2%;
  width:58.6%;
  margin: 1.6% auto 0;
}
.makeDraw2 {
  background: url('./makeing.png') no-repeat;
  background-size: 100% 100%;
  height: 7.2%;
  width:58.6%;
  margin: 1.6% auto 0;
}
.textArea {
  margin: 3.2% auto 0;
  width: 85.7%;
  .title {
    color: #17181A;
    font-size: 22px;
    font-weight: bolder;
    text-align: center;
  }
  .introduce {
    color: #737373;
    font-size: 16px;
    margin-top: 20px;
    line-height: 22px;
  }
}
.footerDiv {
  background: #D2D3D7;
  height: 13%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  .footerLogo {
    height: 22%;
    width: 58%;
    background: url('./pic/footerLogo.png') no-repeat;
    background-size: 100% 100%;
  }
}
@-webkit-keyframes jackInTheBox {
  from {
    opacity: 0;
    -webkit-transform: scale(0.1) rotate(30deg);
    transform: scale(0.1) rotate(30deg);
    -webkit-transform-origin: center bottom;
    transform-origin: center bottom;
  }

  50% {
    -webkit-transform: rotate(-10deg);
    transform: rotate(-10deg);
  }

  70% {
    -webkit-transform: rotate(3deg);
    transform: rotate(3deg);
  }

  to {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes jackInTheBox {
  from {
    opacity: 0;
    -webkit-transform: scale(0.1) rotate(30deg);
    transform: scale(0.1) rotate(30deg);
    -webkit-transform-origin: center bottom;
    transform-origin: center bottom;
  }

  50% {
    -webkit-transform: rotate(-10deg);
    transform: rotate(-10deg);
  }

  70% {
    -webkit-transform: rotate(3deg);
    transform: rotate(3deg);
  }

  to {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

.jackInTheBox {
  -webkit-animation-name: jackInTheBox;
  animation-name: jackInTheBox;
}

.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}






@-webkit-keyframes zoomInLeft {
  from {
    opacity: 0;
    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);
    transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);
    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);
    transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);
    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
  }
}

@keyframes zoomInLeft {
  from {
    opacity: 0;
    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);
    transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);
    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);
    transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);
    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
  }
}

.zoomInLeft {
  -webkit-animation-name: zoomInLeft;
  animation-name: zoomInLeft;
}

.animated2 {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}




@-webkit-keyframes zoomIn {
  from {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }

  50% {
    opacity: 1;
  }
}

@keyframes zoomIn {
  from {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }

  50% {
    opacity: 1;
  }
}

.zoomIn {
  -webkit-animation-name: zoomIn;
  animation-name: zoomIn;
}

.animated3 {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}



@-webkit-keyframes rotateIn {
  from {
    -webkit-transform-origin: center;
    transform-origin: center;
    -webkit-transform: rotate3d(0, 0, 1, -200deg);
    transform: rotate3d(0, 0, 1, -200deg);
    opacity: 0;
  }

  to {
    -webkit-transform-origin: center;
    transform-origin: center;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes rotateIn {
  from {
    -webkit-transform-origin: center;
    transform-origin: center;
    -webkit-transform: rotate3d(0, 0, 1, -200deg);
    transform: rotate3d(0, 0, 1, -200deg);
    opacity: 0;
  }

  to {
    -webkit-transform-origin: center;
    transform-origin: center;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

.rotateIn {
  -webkit-animation-name: rotateIn;
  animation-name: rotateIn;
}

.animated4 {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}


@-webkit-keyframes flipInY {
  from {
    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    opacity: 0;
  }

  40% {
    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -20deg);
    transform: perspective(400px) rotate3d(0, 1, 0, -20deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }

  60% {
    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 10deg);
    transform: perspective(400px) rotate3d(0, 1, 0, 10deg);
    opacity: 1;
  }

  80% {
    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -5deg);
    transform: perspective(400px) rotate3d(0, 1, 0, -5deg);
  }

  to {
    -webkit-transform: perspective(400px);
    transform: perspective(400px);
  }
}

@keyframes flipInY {
  from {
    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    opacity: 0;
  }

  40% {
    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -20deg);
    transform: perspective(400px) rotate3d(0, 1, 0, -20deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }

  60% {
    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 10deg);
    transform: perspective(400px) rotate3d(0, 1, 0, 10deg);
    opacity: 1;
  }

  80% {
    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -5deg);
    transform: perspective(400px) rotate3d(0, 1, 0, -5deg);
  }

  to {
    -webkit-transform: perspective(400px);
    transform: perspective(400px);
  }
}

.flipInY {
  -webkit-backface-visibility: visible !important;
  backface-visibility: visible !important;
  -webkit-animation-name: flipInY;
  animation-name: flipInY;
}

.animated5 {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}



@-webkit-keyframes flipInX {
  from {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    opacity: 0;
  }

  40% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }

  60% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    opacity: 1;
  }

  80% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
  }

  to {
    -webkit-transform: perspective(400px);
    transform: perspective(400px);
  }
}

@keyframes flipInX {
  from {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    opacity: 0;
  }

  40% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }

  60% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    opacity: 1;
  }

  80% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
  }

  to {
    -webkit-transform: perspective(400px);
    transform: perspective(400px);
  }
}

.flipInX {
  -webkit-backface-visibility: visible !important;
  backface-visibility: visible !important;
  -webkit-animation-name: flipInX;
  animation-name: flipInX;
}

.animated6 {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.filterDiv {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-wrap: wrap;
}

.filterDiv div {  
  height: 5%;
  width: 4%;
  opacity:1;
}

.mantle {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(18, 18, 18, 0.85);
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mantle > div {
 width: 74%;
 height: 49%;
 background: #fff;
 border-radius: 33px;
 display: flex;
 flex-direction: column;
 align-items: center;
}

.mantle > div .title {
  color: #6F6F6F;
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin-top: 7%;
}

.mantle > div .QRcode {
  height: 35%;
  width: 42%;
  background: url('./pic/er1.png') no-repeat;
  margin-top: 7%;
  background-size: 100% 100%;
}

.mantle > div div:nth-child(3) {
  color: #010101;
  font-size: 33px;
  font-weight: 700;
  margin-top: 7%;
}

.mantle > div div:nth-child(4) {
  color: #010101;
  font-size: 25px;
  margin-top: 5%;
}

.mantle > div div:nth-child(5) {
  background: #DA2428;
  height: 12%;
  width: 40%;
  color: #fff;
  font-size: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  margin-top: 7%;
}

.mantle1 {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: #fff;
  z-index: 2;
}
.bordercss {
  background: url('./pic/border.png') no-repeat;
  height: 100%;
  width: 100%;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.send {
  width: 45%;
  height: 100%;
  float: left;
  background: url('./pic/Buttonback.png') no-repeat;
  background-size: 100% 100%;
}

.newMake {
  width: 45%;
  height: 100%;
  float: right;
  background: url('./pic/Buttonfasong.png') no-repeat;
  background-size: 100% 100%;
}

.backmake {
  width: 73px;
  height: 32px;
  background: url('./pic/fanbutton.png') no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 15px;
  right: 17px;
  z-index: 1;
}

.txtDiv {
    position: absolute;
    z-index: 1;
    margin: 0 auto;
    font-size: 36px;
    color: #fff;
    font-weight: 700;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    word-break: break-all;
    padding: 0 20px;
    background: url('./pic/imgpic.png') no-repeat;
    background-size: 100% 100%;
}

.resetBut {
  // background: red;
  height: 3%;
  width: 6%;
  position: absolute;
  top: 0;
  right: 0;
}
</style>
