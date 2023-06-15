<template>
  <div class="showImg">
    <img
      @mouseover="changeInterval(true)"
      @mouseleave="changeInterval(false)"
      v-for="(item,idx) in imgArr"
      :key="idx"
      :src="item.url"
      alt="暂无图片"
      v-show="idx === currentIndex"
    />
    <!-- //左侧按钮
    <div @click="clickIcon('up')" class="iconDiv icon-left">
      <i class="el-icon-caret-left"></i>
    </div>
    //右侧按钮
    <div @click="clickIcon('down')" class="iconDiv icon-right">
      <i class="el-icon-caret-right"></i>
    </div> -->
    //控制圆点
    <div class="banner-circle">
      <ul>
        <li
          @click="changeImg(idx)"
          v-for="(item,idx) in imgArr"
          :key="idx"
          :class="idx === currentIndex ? 'active' : ''"
        ></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      currentIndex: 0, //当前所在图片下标
      timer: null, //定时轮询
      imgArr: [
        { id: 0, url: 'https://cdn.uviewui.com/uview/swiper/1.jpg' },
        {
          id: 1,
          url: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
        },
        {
          id: 2,
          url: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
        },
      ],
    }
  },
  props: {
    obj: { type: Object },
  },
  components: {},
  created() {},
  methods: {
    //开启定时器
    startInterval() {
      // 事件里定时器应该先清除在设置，防止多次点击直接生成多个定时器
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.currentIndex++
        if (this.currentIndex > this.imgArr.length - 1) {
          this.currentIndex = 0
        }
      }, 5*1000)
    },
    // 点击左右箭头
    clickIcon(val) {
      if (val === 'down') {
        this.currentIndex++
        if (this.currentIndex === this.imgArr.length) {
          this.currentIndex = 0
        }
      } else {
        /* 第一种写法
					this.currentIndex--;
					if(this.currentIndex < 0){
						this.currentIndex = this.imgArr.length-1;
					} */
        // 第二种写法
        if (this.currentIndex === 0) {
          this.currentIndex = this.imgArr.length
        }
        this.currentIndex--
      }
    },
    // 点击控制圆点
    changeImg(index) {
      this.currentIndex = index
    },
    //鼠标移入移出控制
    changeInterval(val) {
      if (val) {
        clearInterval(this.timer)
      } else {
        this.startInterval()
      }
    },
  },
  mounted() {
    //进入页面后启动定时轮询
    this.startInterval()
  },
  beforeDestroy() {},
  destroyed() {},
}
</script>

<style lang="scss" scoped>
.showImg {
  position: relative;
  width: 40%;
  height: 250px;
  margin: 100px auto;
  overflow: hidden;
}
/* 轮播图片 */
.showImg img {
  width: 100%;
  height: 100%;
}

/* 箭头图标 */
.iconDiv {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  border: 1px solid #666;
  border-radius: 15px;
  background-color: rgba(125, 125, 125, 0.2);
  line-height: 30px;
  text-align: center;
  font-size: 25px;
  cursor: pointer;
}
.iconDiv:hover {
  background-color: white;
}
.icon-left {
  left: 10px;
}
.icon-right {
  right: 10px;
}

/* 控制圆点 */
.banner-circle {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 20px;
}
.banner-circle ul {
  margin: 0 50px;
  height: 100%;
  text-align: right;
}
.banner-circle ul li {
  display: inline-block;
  width: 14px;
  height: 14px;
  margin: 0 5px;
  border-radius: 7px;
  background-color: rgba(125, 125, 125, 0.8);
  cursor: pointer;
}
.active {
  background-color: black !important;
}
</style>
