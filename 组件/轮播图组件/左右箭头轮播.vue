<template>
  <div class="pictureBox">
    <i @click="prev()" v-if="prevStaus" class="lunDot prevDot">
      <img src="@/assets/pc/GroupPrev.png" alt="" />
    </i>
    <i @click="next()" v-if="nextStatus" class="lunDot nextDot">
      <img src="@/assets/pc/GroupNext.png" alt="" />
    </i>

    <div class="list">
      <img
        :style="imgStyle"
        v-for="(item, idx) in imgUrlList"
        :key="idx"
        class="picItem"
        :src="item.url"
        alt="暂无图片"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      imgUrlList: [
        {
          url: "https://cdn.uviewui.com/uview/swiper/3.jpg",
          title: "中新官网上线信息3",
        },
        {
          url: "https://cdn.uviewui.com/uview/swiper/1.jpg",
          title: "中新官网上线信息1",
        },
        {
          url: "https://cdn.uviewui.com/uview/swiper/3.jpg",
          title: "中新官网上线信息3",
        },
        {
          url: "https://cdn.uviewui.com/uview/swiper/2.jpg",
          title: "中新官网上线信息2",
        },
        {
          url: "https://cdn.uviewui.com/uview/swiper/3.jpg",
          title: "中新官网上线信息3",
        },
        {
          url: "https://cdn.uviewui.com/uview/swiper/3.jpg",
          title: "中新官网上线信息3",
        },
        {
          url: "https://cdn.uviewui.com/uview/swiper/2.jpg",
          title: "中新官网上线信息2",
        },
        {
          url: "https://cdn.uviewui.com/uview/swiper/2.jpg",
          title: "中新官网上线信息2",
        },
        {
          url: "https://cdn.uviewui.com/uview/swiper/1.jpg",
          title: "中新官网上线信息1",
        },
        {
          url: "https://cdn.uviewui.com/uview/swiper/2.jpg",
          title: "中新官网上线信息2",
        },
      ],
      imgActiveIndex: 4, // 当前移动图片的索引值
      imgDistance: 0, // 移动的距离
      allDistance: 0, // 总移动距离
      prevStaus: false,
      nextStatus: true,
    };
  },
  props: {
    obj: { type: Object },
  },
  watch: {
    imgActiveIndex(newVal) {
      if (newVal < 5) {
        this.prevStaus = false;
      } else {
        this.prevStaus = true;
      }

      if (newVal >= this.imgUrlList.length - 1) {
        this.nextStatus = false;
      } else {
        this.nextStatus = true;
      }
    },
  },
  computed: {
    imgStyle() {
      return {
        transform: `translate3d(${this.imgDistance / 16}rem, 0, 0)`, // 计算移动的距离(x,y,z)
      };
    },
  },
  components: {},
  created() {},
  methods: {
    prev() {
      if (this.imgActiveIndex > 0) {
        this.imgActiveIndex--; // 索引值-1
      }
      if (this.imgActiveIndex >= 4) {
        var index = 0;
        const temp = window.setInterval(() => {
          // 利用定时器实现图片左右移动的动画效果
          if (index < 71) {
            // 移动次数(33次)
            this.imgDistance += 4; // 每次向左移动的距离 (移动总距离为33*this.imgDistance)
            index++;
            return;
          } else {
            window.clearInterval(temp); // 移动完清除定时器
          }
        }, 10);
      }
    },
    next() {
      if (this.imgActiveIndex < this.imgUrlList.length - 1) {
        this.imgActiveIndex++;
        this.allDistance = -264 * this.imgActiveIndex;
        var index = 0;
        const temp = window.setInterval(() => {
          if (index < 71) {
            this.imgDistance -= 4; // 每次向右移动的距离
            index++;
            return;
          } else {
            window.clearInterval(temp);
          }
        }, 10);
      } else {
        console.log("最后一张了");
      }
    },
  },
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
};
</script>

<style lang="scss" scoped>
.pictureBox {
  position: relative;
  overflow: hidden;
  .lunDot {
    z-index: 999;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    img {
      width: 1.875rem;
      height: 3.75rem;
    }
  }
  .prevDot {
    left: 0;
  }
  .nextDot {
    right: 0;
  }
  .list {
    // min-width: 100%;
    display: flex;

    .picItem {
      width: 16.5rem;
      height: 12.5rem;
      background-color: pink;
      margin-right: 1.25rem;
    }
    .picItem:last-child {
      margin-right: 0;
    }
  }
}
</style>
