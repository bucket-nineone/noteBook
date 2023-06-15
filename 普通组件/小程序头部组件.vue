<template>
  <view>
    <view class="status_bar" :style="{ '--height': statusHeight }"> </view>
    <view
      class="status-box"
      :style="{ '--height': navHeight, '--margin-top': statusHeight }"
    >
      <!-- 状态栏下的文字内容 -->
      <view @click="openLogin()" class="tou">
        <image
          src="http://zc-travel.oss-cn-guangzhou.aliyuncs.com/icon/login.png"
          alt=""
        />
      </view>
      <view class="name">{{ title }}</view>
      <!-- 占位用 -->
      <view class="tou"></view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    title: { type: String },
  },
  data() {
    return {
      statusHeight: '',
      navHeight: '',
    };
  },
  mounted() {
    this.setNavSize();
  },
  methods: {
    //获取高度
    setNavSize() {
      let sysinfo = wx.getSystemInfoSync(),
        statusHeight = sysinfo.statusBarHeight,
        navHeight = '44px';
      this.statusHeight = statusHeight + 'px';
      this.navHeight = navHeight;
    },
    //调用登录键
    openLogin() {
      this.$emit('openLogin');
    },
  },
};
</script>

<style lang="scss" scoped>
.status_bar {
  height: var(--height);
  width: 100%;
  background: #fff;
  position: fixed;
  top: 0;
  z-index: 999;
}
.status-box {
  height: var(--height);
  margin-top: var(--margin-top);
  width: 100%;
  background: #fff;
  // font-size: 16rpx;
  color: #060606;
  font-weight: 500;
  position: fixed;
  top: 0;
  z-index: 99;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .name {
    font-size: 32rpx;
    font-family: SourceHanSerifCN-Bold, SourceHanSerifCN;
    font-weight: bold;
    color: #162a33;
    line-height: 60rpx;
  }
  .tou {
    width: 48rpx;
    height: 48rpx;
    margin-left: 30rpx;
    color: #060606;
    z-index: 999;
    image {
      width: 48rpx;
      height: 48rpx;
    }
  }
}
</style>
