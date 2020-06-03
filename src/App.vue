<script>
/*eslint-disable*/
export default {
  created() {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // eslint-disable-next-line
    console.log('app created and cache logs by setStorageSync')
  }
}
</script>

<style>
/* flex布局兼容性写法
flex：定义布局为盒模型
flex-v：盒模型垂直布局
flex-l：盒模型水平布局
flex-1：子元素占据剩余的空间
flex-align-center：子元素垂直居中
flex-pack-center：子元素水平居中
flex-pack-justify：子元素两端对齐
border-box：元素padding不影响
flex-text：按钮文本居中
*/

.flex {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}

.flex-v {
  -webkit-box-orient: vertical;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
}

.flex-l {
  -webkit-box-orient: horizontal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
}

.flex-1 {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

.flex-align-center {
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.flex-pack-center {
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.flex-pack-justify {
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.border-box {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  box-sizing: border-box;
}

.flex-text {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 清除浮动 */
.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: ' ';
  clear: both;
  height: 0;
}

.clearfix {
  display: inline-table;
}

/* 解决动画闪烁，开启硬件加速，优化CSS动画性能 */
.css3fix {
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-perspective: 1000;
  -moz-perspective: 1000;
  -ms-perspective: 1000;
  perspective: 1000;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  animation-fill-mode: forwards;
}

/* 框架布局 */
.fl {
  float: left;
}

.fr {
  float: right;
}

.ovH {
  overflow: hidden;
}

.poR {
  position: relative;
}

/* 文本对齐 */
.tL {
  text-align: left;
}

.tR {
  text-align: right;
}

/* 清楚小程序按钮样式 */
button::after {
  border: none;
}

input {
  outline: none;
  border: none;
  list-style: none;
}

button {
  margin: 0;
  padding: 0;
  background: none;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}

* {
  margin: 0;
  padding: 0;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
}
img {
  font-size: 0px;
  vertical-align: bottom;
}
body {
  background-color: #f6f6f6;
}
ul li {
  list-style-type: none;
}
ol li {
  list-style: none;
}

.fengge_box {
  width: 100%;
  height: 0.2rem;
  background: #f8f8f8;
  margin: 0 auto;
}

/*状态色*/
.zhuangtai {
  position: absolute;
  top: 0.3rem;
  right: 2%;
  font-size: 0.28rem;
}
.del {
  position: absolute;
  top: 0.3rem;
  right: 2%;
  font-size: 0.28rem;
  width: 0.3rem;
}
.re {
  color: #fd3b3e;
}
.ye {
  color: #fbac2b;
}
.bl {
  color: #55a8fc;
}
.gr {
  color: #1ecc5c;
}
.hui {
  color: #968c96;
}

/* 无数据 */
.null {
  width: 100%;
  text-align: center;
  margin-top: 1.7rem;
}
.null img {
  display: block;
  width: 3.2rem;
  height: 3.2rem;
  margin: 0 auto;
}
.null p {
  color: #9a9a9a;
  font-size: 0.35rem;
}
.null a {
  font-size: 0.3rem;
  color: #3a4042;
  text-align: center;
  width: 2rem;
  height: 0.8rem;
  display: block;
  line-height: 0.8rem;
  margin: 0 auto;
  border: 0.01rem solid #979797;
  border-radius: 0.12rem;
}

.wdl_box {
  width: 7.5rem;
}
.wdl_box img {
  width: 2rem;
  height: 2rem;
  margin: 0 auto;
  display: block;
  text-align: center;
  margin-bottom: 0.3rem;
}
.wdl_box p {
  display: block;
  text-align: center;
  font-size: 0.32rem;
  color: #999;
}
.wdl_box .button {
  display: block;
  width: 4rem;
  margin: 0 auto;
  height: 0.9rem;
  margin-top: 0.85rem;
  background: #2d5ad6;
  color: #fff;
  text-align: center;
  line-height: 0.9rem;
  font-size: 0.3rem;
  border-radius: 0.1rem;
}

.wsl_box {
  width: 7.5rem;
}
.wsl_box img {
  width: 3.5rem;
  height: 3.5rem;
  margin: 0 auto;
  display: block;
  text-align: center;
  margin-top: 2.5rem;
  margin-bottom: 0.3rem;
}
.wsl_box p {
  display: block;
  text-align: center;
  font-size: 0.32rem;
  color: #666;
  font-weight: 400;
}
.wsl_box .button {
  display: block;
  width: 4rem;
  margin: 0 auto;
  height: 0.9rem;
  margin-top: 1.2rem;
  background: #2d5ad6;
  color: #fff;
  text-align: center;
  line-height: 0.9rem;
  font-size: 0.3rem;
  border-radius: 0.1rem;
}

.font_box {
  width: 7.5rem;
  background-color: #f6f6f6;
}
.font_box p {
  display: block;
  text-align: center;
  font-size: 0.28rem;
  color: #666;
  padding-top: 0.3rem;
}
</style>
