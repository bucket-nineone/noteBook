<template>
  <view>
    <!-- :style="config5[index]" -->
    <transition name="fade">
      <view
        @touchend="end"
        @touchstart="start"
        @touchmove="move"
        class="swiper"
      >
        <view
          @click="getDetail(item)"
          v-for="(item, index) in list"
          :key="item.id"
          :class="clssstitle[index]"
        >
          <image
            :src="item.pictureUrl || item.cover"
            style="width: 100%; height: 100%; border-radius: 16rpx"
          />
          <view v-if="index == 1" class="onhan title">
            {{ item.title }}
          </view>
        </view>
      </view>
    </transition>
  </view>
</template>

<script>
export default {
  props: {
    list: { type: Array },
  },
  data() {
    return {
      startX: '',
      endX: '',
      clssstitle: ['lefts', 'center', 'rights'],
    };
  },
  methods: {
    getDetail(data) {
      if (data.pictureUrl) {
        wx.navigateTo({
          url: `/pages/museum/archaeologyDeltail?id=${data.id}`,
        });
      }
      if (data.cover) {
        if (data.type !== 1) {
          this.getPatrolUrl(data.url);
        } else {
          let items = JSON.stringify(data);
          wx.navigateTo({
            url:
              `/pages/cultural/wenhuaDetail?item=` + encodeURIComponent(items),
          });
        }
      }
    },
    async getPatrolUrl(url) {
      uni.navigateTo({
        url: '/pages/web/webView?url=' + url,
      });
    },
    // 滑动上一个
    prev() {
      this.$emit('prevPic');
    },
    // 滑动下一个
    next() {
      this.$emit('nextPic');
    },
    // 开始移动端滑动屏幕
    start(event) {
      this.startX = event.changedTouches[0].clientX;
      this.startY = event.changedTouches[0].clientY;
    },
    // 连续滑动
    move(event) {
      this.endY = event.changedTouches[0].clientY;
      this.endX = event.changedTouches[0].clientX;
      this.stopDefault(event);
      // 如果是滑动，注解（223行到231行）这段。如果是连续滑动，放开（223行到231行）注解
      this.interval = this.endX - this.startX;
      if (this.interval > 40) {
        this.startX = this.endX;
        this.prev();
      }
      if (this.interval < -40) {
        this.startX = this.endX;
        this.next();
      }
    },
    // 滑动
    end(event) {
      this.endY = event.changedTouches[0].clientY;
      this.endX = event.changedTouches[0].clientX;
      this.formatSwiper();
    },
    formatSwiper() {
      if (this.startX > this.endX) {
        if (this.startX > this.endX + 40) {
          this.next();
        }
      } else {
        if (this.endX > this.startX + 40) {
          this.prev();
        }
      }
    },
    // 阻止touchmove的横向默认事件（ios快捷操作会关闭页面）
    stopDefault(event) {
      let differenceY = this.endY - this.startY;
      let differenceX = this.endX - this.startX;
      if (Math.abs(differenceX) > Math.abs(differenceY)) {
        event.preventDefault();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.swiper {
  display: flex;
  height: 303rpx;
  position: relative;
  overflow: hidden;
  justify-content: space-between;

  .lefts {
    border-radius: 16px;
    position: absolute;
    width: 246rpx;
    height: 260rpx;
    top: 22rpx;
    left: 0;
    opacity: 1;
    z-index: 2;
    transition: 0.2s;
  }
  .center {
    position: absolute;
    width: 496rpx;
    height: 303.4rpx;
    top: 0rpx;
    left: 96rpx;
    opacity: 1;
    z-index: 4;
    transition: 0.2s;
    border-radius: 16rpx;
  }
  .center::before {
    border-radius: 16rpx;
    content: '';
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
    opacity: 0.8;
    position: absolute;
    width: 100%;
    height: 145rpx;
    bottom: 0;
    left: 0;
  }
  .rights {
    border-radius: 16px;
    position: absolute;
    width: 246rpx;
    height: 260rpx;
    top: 22rpx;
    left: 442rpx;
    opacity: 1;
    z-index: 2;
    transition: 0.2s;
  }

  .title {
    width: 452rpx;
    position: absolute;
    bottom: 19rpx;
    left: 29rpx;
    height: 38rpx;
    font-size: 28rpx;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffffff;
    line-height: 38rpx;
  }
}
</style>
