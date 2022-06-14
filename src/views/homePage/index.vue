<template>
  <div class="homePage">
    <div class="titleDiv"></div>
    <div class="carouselDiv">
      <el-carousel trigger="click"  style="height: 100%;">
        <el-carousel-item>
          <div class="img" @click="imgFun(1)"><div v-show="classSign == '1'" :class="{'img1': true,'animated':classSign === 1, 'jackInTheBox':classSign === 1}">{{ 1 }}</div></div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="img" @click="imgFun(2)"><div v-show="classSign == '2'" :class="{'img1': true,'animated2':classSign === 2, 'zoomInLeft':classSign === 2}">{{ 2 }}</div></div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="img" @click="imgFun(3)"><div v-show="classSign == '3'" :class="{'img1': true,'animated3':classSign === 3, 'zoomIn':classSign === 3}">{{ 3 }}</div></div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="img" @click="imgFun(4)"><div v-show="classSign == '4'" :class="{'img1': true,'animated4':classSign === 4, 'rotateIn':classSign === 4}">{{ 4 }}</div></div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="img" @click="imgFun(5)"><div v-show="classSign == '5'" :class="{'img1': true,'animated5':classSign === 5, 'flipInY':classSign === 5}">{{ 5 }}</div></div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="img" @click="imgFun(6)"><div v-show="classSign == '6'" :class="{'img1': true,'animated6':classSign === 6, 'flipInX':classSign === 6}">{{ 6 }}</div></div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="styleTypeDiv">
      <div class="title">请选择AI作画风格</div>
      <div class="typeList">
        <div @click="typeFun(1)" :class="[styleIndex !== 1 ? 'style1' : 'style1r' ]" class=""></div>
        <div @click="typeFun(2)" :class="[styleIndex !== 2 ? 'style2' : 'style2r' ]"></div>
        <div @click="typeFun(3)" :class="[styleIndex !== 3 ? 'style3' : 'style3r' ]"></div>
        <div @click="typeFun(4)" :class="[styleIndex !== 4 ? 'style4' : 'style4r' ]"></div>
        <div @click="typeFun(5)" :class="[styleIndex !== 5 ? 'style5' : 'style5r' ]"></div>
        <div @click="typeFun(6)" :class="[styleIndex !== 6 ? 'style6' : 'style6r' ]"></div>
        <div @click="typeFun(7)" :class="[styleIndex !== 7 ? 'style7' : 'style7r' ]"></div>
      </div>
    </div>
    <div id="three-container"></div>
    <div class="makeDraw"></div>
    <div class="textArea">
      <div class="title">AI艺术图像生成</div>
      <div class="introduce">AI艺术图像生成简介AI艺术图像生成简介AI艺术图像生成简介AI艺术图像生成简介AI艺术图像生成简介AI艺术图像生成简介AI艺术图像生成简介AI艺术图像生成简介AI艺术图像生成简介AI艺术图像生成简介AI艺术图像生成简介AI艺术图像生成简介AI艺术图像生成简介AI艺术图像生成简介AI艺术图像生成简介AI艺术图像生成简介AI艺术图像生成简介。
      </div>
    </div>
    <div class="footerDiv">
      <div class="footerLogo"></div>
    </div>
   
   
  </div>
</template>

<script>
// import { init } from './script'


export default {
  name: 'channel',
  data() {
    return {
      styleIndex: 0,
      classSign: ''
    }
  },
  watch: {},
  components: {},
  methods: {
    imgFun(data){
      this.classSign = data;
      // setTimeout(()=>this.classSign = '',3000)
    },
      typeFun(data) {
        this.styleIndex = data;
      },
      // init() {
      //   var root = new THREERoot({
      //     createCameraControls: !true,
      //     antialias: (window.devicePixelRatio === 1),
      //     fov: 80
      //   });

      //   root.renderer.setClearColor(0x000000, 0);
      //   root.renderer.setPixelRatio(window.devicePixelRatio || 1);
      //   root.camera.position.set(0, 0, 60);

      //   var width = 100;
      //   var height = 60;

      //   var slide = new Slide(width, height, 'out');
      //   var l1 = new THREE.ImageLoader();
      //   l1.setCrossOrigin('Anonymous');
      //   l1.load('images/winter.jpg', function(img) {
      //     slide.setImage(img);
      //   })
      //   root.scene.add(slide);

      //   var slide2 = new Slide(width, height, 'in');
      //   var l2 = new THREE.ImageLoader();
      //   l2.setCrossOrigin('Anonymous');
      //   l2.load('images/spring.jpg', function(img) {
      //     slide2.setImage(img);
      //   })
        
      //   root.scene.add(slide2);

      //   var tl = new TimelineMax({repeat:0, repeatDelay:1.0, yoyo: true});

      //   tl.add(slide.transition(), 0);
      //   tl.add(slide2.transition(), 0);
      //   // createTweenScrubber(tl);

      //   window.addEventListener('keyup', function(e) {
      //     console.log('123')
      //     var tl = new TimelineMax({repeat:0, repeatDelay:1.0, yoyo: true});
      //     tl.add(slide.transition(), 0);
      //     tl.add(slide2.transition(), 0);
      //   });
      // },
      // Slide(width, height, animationPhase) {
      //   var plane = new THREE.PlaneGeometry(width, height, width * 2, height * 2);

      //   THREE.BAS.Utils.separateFaces(plane);

      //   var geometry = new SlideGeometry(plane);

      //   geometry.bufferUVs();

      //   var aAnimation = geometry.createAttribute('aAnimation', 2);
      //   var aStartPosition = geometry.createAttribute('aStartPosition', 3);
      //   var aControl0 = geometry.createAttribute('aControl0', 3);
      //   var aControl1 = geometry.createAttribute('aControl1', 3);
      //   var aEndPosition = geometry.createAttribute('aEndPosition', 3);

      //   var i, i2, i3, i4, v;

      //   var minDuration = 0.8;
      //   var maxDuration = 1.2;
      //   var maxDelayX = 0.9;
      //   var maxDelayY = 0.125;
      //   var stretch = 0.11;

      //   this.totalDuration = maxDuration + maxDelayX + maxDelayY + stretch;

      //   var startPosition = new THREE.Vector3();
      //   var control0 = new THREE.Vector3();
      //   var control1 = new THREE.Vector3();
      //   var endPosition = new THREE.Vector3();

      //   var tempPoint = new THREE.Vector3();

      //   function getControlPoint0(centroid) {
      //     var signY = Math.sign(centroid.y);

      //     tempPoint.x = THREE.Math.randFloat(0.1, 0.3) * 50;
      //     tempPoint.y = signY * THREE.Math.randFloat(0.1, 0.3) * 70;
      //     tempPoint.z = THREE.Math.randFloatSpread(20);

      //     return tempPoint;
      //   }

      //   function getControlPoint1(centroid) {
      //     var signY = Math.sign(centroid.y);

      //     tempPoint.x = THREE.Math.randFloat(0.3, 0.6) * 50;
      //     tempPoint.y = -signY * THREE.Math.randFloat(0.3, 0.6) * 70;
      //     tempPoint.z = THREE.Math.randFloatSpread(20);

      //     return tempPoint;
      //   }

      //   for (i = 0, i2 = 0, i3 = 0, i4 = 0; i < geometry.faceCount; i++, i2 += 6, i3 += 9, i4 += 12) {
      //     var face = plane.faces[i];
      //     var centroid = THREE.BAS.Utils.computeCentroid(plane, face);

      //     // animation
      //     var duration = THREE.Math.randFloat(minDuration, maxDuration);
      //     var delayX = THREE.Math.mapLinear(centroid.x, -width * 0.5, width * 0.5, 0.0, maxDelayX);
      //     var delayY;

      //     if (animationPhase === 'in') {
      //       delayY = THREE.Math.mapLinear(Math.abs(centroid.y), 0, height * 0.5, 0.0, maxDelayY)
      //     }
      //     else {
      //       delayY = THREE.Math.mapLinear(Math.abs(centroid.y), 0, height * 0.5, maxDelayY, 0.0)
      //     }

      //     for (v = 0; v < 6; v += 2) {
      //       aAnimation.array[i2 + v]     = delayX + delayY + (Math.random() * stretch * duration);
      //       aAnimation.array[i2 + v + 1] = duration;
      //     }

      //     // positions

      //     endPosition.copy(centroid);
      //     startPosition.copy(centroid);

      //     if (animationPhase === 'in') {
      //       control0.copy(centroid).sub(getControlPoint0(centroid));
      //       control1.copy(centroid).sub(getControlPoint1(centroid));
      //     }
      //     else { // out
      //       control0.copy(centroid).add(getControlPoint0(centroid));
      //       control1.copy(centroid).add(getControlPoint1(centroid));
      //     }

      //     for (v = 0; v < 9; v += 3) {
      //       aStartPosition.array[i3 + v]     = startPosition.x;
      //       aStartPosition.array[i3 + v + 1] = startPosition.y;
      //       aStartPosition.array[i3 + v + 2] = startPosition.z;

      //       aControl0.array[i3 + v]     = control0.x;
      //       aControl0.array[i3 + v + 1] = control0.y;
      //       aControl0.array[i3 + v + 2] = control0.z;

      //       aControl1.array[i3 + v]     = control1.x;
      //       aControl1.array[i3 + v + 1] = control1.y;
      //       aControl1.array[i3 + v + 2] = control1.z;

      //       aEndPosition.array[i3 + v]     = endPosition.x;
      //       aEndPosition.array[i3 + v + 1] = endPosition.y;
      //       aEndPosition.array[i3 + v + 2] = endPosition.z;
      //     }
      //   }

      //   var material = new THREE.BAS.BasicAnimationMaterial(
      //     {
      //       shading: THREE.FlatShading,
      //       side: THREE.DoubleSide,
      //       uniforms: {
      //         uTime: {type: 'f', value: 0}
      //       },
      //       shaderFunctions: [
      //         THREE.BAS.ShaderChunk['cubic_bezier'],
      //         //THREE.BAS.ShaderChunk[(animationPhase === 'in' ? 'ease_out_cubic' : 'ease_in_cubic')],
      //         THREE.BAS.ShaderChunk['ease_in_out_cubic'],
      //         THREE.BAS.ShaderChunk['quaternion_rotation']
      //       ],
      //       shaderParameters: [
      //         'uniform float uTime;',
      //         'attribute vec2 aAnimation;',
      //         'attribute vec3 aStartPosition;',
      //         'attribute vec3 aControl0;',
      //         'attribute vec3 aControl1;',
      //         'attribute vec3 aEndPosition;',
      //       ],
      //       shaderVertexInit: [
      //         'float tDelay = aAnimation.x;',
      //         'float tDuration = aAnimation.y;',
      //         'float tTime = clamp(uTime - tDelay, 0.0, tDuration);',
      //         'float tProgress = ease(tTime, 0.0, 1.0, tDuration);'
      //         //'float tProgress = tTime / tDuration;'
      //       ],
      //       shaderTransformPosition: [
      //         (animationPhase === 'in' ? 'transformed *= tProgress;' : 'transformed *= 1.0 - tProgress;'),
      //         'transformed += cubicBezier(aStartPosition, aControl0, aControl1, aEndPosition, tProgress);'
      //       ]
      //     },
      //     {
      //       map: new THREE.Texture(),
      //     }
      //   );

      //   THREE.Mesh.call(this, geometry, material);

      //   this.frustumCulled = false;
      //   Slide.prototype = Object.create(THREE.Mesh.prototype);
      //   Slide.prototype.constructor = Slide;
      //   Object.defineProperty(Slide.prototype, 'time', {
      //     get: function () {
      //       return this.material.uniforms['uTime'].value;
      //     },
      //     set: function (v) {
      //       this.material.uniforms['uTime'].value = v;
      //     }
      //   });

      //   Slide.prototype.setImage = function(image) {
      //     this.material.uniforms.map.value.image = image;
      //     this.material.uniforms.map.value.needsUpdate = true;
      //   };

      //   Slide.prototype.transition = function() {
      //     return TweenMax.fromTo(this, 3.0, {time:0.0}, {time:this.totalDuration, ease:Power0.easeInOut});
      //   };
      // },
      // SlideGeometry(model) {
      //   THREE.BAS.ModelBufferGeometry.call(this, model);
      //   SlideGeometry.prototype = Object.create(THREE.BAS.ModelBufferGeometry.prototype);
      //   SlideGeometry.prototype.constructor = SlideGeometry;
      //   SlideGeometry.prototype.bufferPositions = function () {
      //     var positionBuffer = this.createAttribute('position', 3).array;

      //     for (var i = 0; i < this.faceCount; i++) {
      //       var face = this.modelGeometry.faces[i];
      //       var centroid = THREE.BAS.Utils.computeCentroid(this.modelGeometry, face);

      //       var a = this.modelGeometry.vertices[face.a];
      //       var b = this.modelGeometry.vertices[face.b];
      //       var c = this.modelGeometry.vertices[face.c];

      //       positionBuffer[face.a * 3]     = a.x - centroid.x;
      //       positionBuffer[face.a * 3 + 1] = a.y - centroid.y;
      //       positionBuffer[face.a * 3 + 2] = a.z - centroid.z;

      //       positionBuffer[face.b * 3]     = b.x - centroid.x;
      //       positionBuffer[face.b * 3 + 1] = b.y - centroid.y;
      //       positionBuffer[face.b * 3 + 2] = b.z - centroid.z;

      //       positionBuffer[face.c * 3]     = c.x - centroid.x;
      //       positionBuffer[face.c * 3 + 1] = c.y - centroid.y;
      //       positionBuffer[face.c * 3 + 2] = c.z - centroid.z;
      //     }
      //   };
      // }
  },
  beforeDestroy(){
      
  },
  mounted: function() {
    // init()
    setTimeout(()=>{
      // document.getElementsByClassName('el-carousel__container')[0].height = 1208 / 336+'px';
    },1000)
    
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

.homePage{
  height: 100%;
  background: #fff;
  position: relative;
  background: url('./bg.png') no-repeat;
  background-position: 2% 252%;
  background-size: 120% 106%;
  overflow: auto; 
}

.titleDiv {
  width: 62%;
  height: 7.5%;
  background: url('./BT.png') no-repeat;
  background-size: 100% 100%;
  margin: 4% auto 0;
}

.carouselDiv {
  height:27.8%;
  width:88.2%;
  margin: 1.6% auto 0;
  .img {
    height: 100%;
    width: 100%;
    background: url('./frame.png') no-repeat;
    background-size: 100% 100%;
  }
  .img1 {
    height: 100%;
    width: 100%;
    background: url('./spring.jpg') no-repeat;
    background-size: 100% 100%;
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
      background-size: 100% 100%;
      height: 100%
    }
    .style1 {
      background: url('./pic/Frame1.png') no-repeat;
    }
    .style2 {
      background: url('./pic/Frame2.png') no-repeat;
    }
    .style3 {
      background: url('./pic/Frame3.png') no-repeat;
    }
    .style4 {
      background: url('./pic/Frame4.png') no-repeat;
    }
    .style5 {
      background: url('./pic/Frame5.png') no-repeat;
    }
    .style6 {
      background: url('./pic/Frame6.png') no-repeat;
    }
    .style7 {
      background: url('./pic/Frame7.png') no-repeat;
    }

    .style1r {
      background: url('./pic/Frame1r.png') no-repeat;
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
  height: 6.6%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  .footerLogo {
    height: 40%;
    width: 32.6%;
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
</style>
