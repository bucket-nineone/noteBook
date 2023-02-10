<template>
  <view class="audio-page">
    <view class="box-left">
      <view class="page-btn" @click="clickAudio()">
        <image :src="music_play ? stop_img : start_img" mode="widthFix"></image>
      </view>
    </view>
    <view class="box-content">
      <text class="startTime">{{ getMinuteTime(now_time) }}</text>
      <view class="progress">
        <slider
          block-size="10"
          :value="(now_time / total_time) * 100"
          @change="sliderChange"
        ></slider>
        <text>{{ getMinuteTime(total_time) }}</text>
      </view>
    </view>
    <view class="box-fight">
      <view class="page-btn" v-if="status" @click="closeMusic()">
        <image
          src="http://zc-travel.oss-cn-guangzhou.aliyuncs.com/icon/icon_pt_sy_normal.png"
          mode="widthFix"
        ></image>
      </view>
      <view v-else class="page-btn" @click="openMusic()">
        <image
          src="http://zc-travel.oss-cn-guangzhou.aliyuncs.com/icon/icon_pt_sy_select.png"
          mode="widthFix"
        ></image>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'WZSAudio',
  props: ['music', 'image', 'title', 'autoplay'],
  data() {
    return {
      music_play: false, //播放控制
      AUDIO: '', //实例化的音频流
      total_time: '', //音频时间
      now_time: 0, //开始时间
      timeupdata: '', //
      interval: '', //获取总时间的定时器
      start_img:
        'http://zc-travel.oss-cn-guangzhou.aliyuncs.com/icon/icon_pt_play_normal.png',
      stop_img:
        'http://zc-travel.oss-cn-guangzhou.aliyuncs.com/icon/icon_pt_play_select.png',
      status: true, //静音状态
    };
  },
  created() {
    this.playAudio();
  },
  methods: {
    closeMusic() {
      this.status = false;
      this.AUDIO.volume = 0;
    },
    openMusic() {
      this.status = true;
      this.AUDIO.volume = 1;
    },
    // 播放音乐
    playAudio() {
      this.AUDIO = uni.createInnerAudioContext();
      this.AUDIO.src = this.music;
      //是否自动播放
      if (this.autoplay) {
        this.AUDIO.autoplay = true;
        this.music_play = true;
        this.AUDIO.play();
      }
      //获取总时间的定时器
      this.interval = setInterval(() => {
        this.AUDIO.play(); //由于播放的时候才能获取总时间,所以先自动播放
        if (this.AUDIO.duration != 0 && !isNaN(this.AUDIO.duration)) {
          this.total_time = Math.round(this.AUDIO.duration); //获取总时间并转化
          clearInterval(this.interval);
          this.AUDIO.pause(); //一旦获取到时间马上停止播放
        }
      }, 10); //速度快点
    },

    clickAudio() {
      this.music_play = !this.music_play;
      if (this.music_play == false) {
        this.AUDIO.pause();

        clearInterval(this.timeupdata);
      } else {
        this.AUDIO.play();
        this.timeupdata = setInterval(() => {
          if (this.music_play) {
            this.now_time++;
            if (this.now_time >= this.total_time) {
              this.music_play = false;
              this.now_time = 0;
              clearInterval(this.timeupdata);
            }
          }
        }, 1000);
      }
    },
    // 拖动进度条
    sliderChange(e) {
      const second = (e.detail.value / 100) * this.total_time;
      this.AUDIO.seek(second);
      this.now_time = second;
    },
    // 秒转换分秒
    getMinuteTime(data) {
      console.log(123, data);
      let minute = parseInt(data / 60);
      let second = parseInt(data % 60);
      if (minute.toString().length == 1) minute = `0${minute}`;
      if (second.toString().length == 1) second = `0${second}`;
      return `${minute}:${second}`;
    },
  },
  destroyed() {
    this.music_play = false;
    this.AUDIO.pause();
    clearInterval(this.timeupdata);
  },
};
</script>

<style lang="scss">
.audio-page {
  display: flex;
  justify-content: space-between;
  margin-top: 12rpx;
  margin-bottom: 22rpx;
  width: 690rpx;
  height: 80rpx;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 16rpx;
  .box-left {
    width: 10%;
    position: relative;
    display: flex;
    .box-img {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 2;
    }
    .page-btn {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 3;
      image {
        width: 48rpx;
        height: 48rpx;
        border-radius: 50%;
      }
    }
  }
  .box-content {
    width: 90%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10rpx;
    box-sizing: border-box;
    font-size: 24rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    opacity: 0.2;
    line-height: 33rpx;
    .content-name {
      width: 100%;
      display: -webkit-box; /* 弹性盒模型 */
      -webkit-box-orient: vertical; /* 元素垂直居中*/
      -webkit-line-clamp: 1; /*  文字显示的行数*/
      overflow: hidden; /* 超出隐藏 */
    }
    .progress {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      slider {
        width: 80%;
      }
    }
  }
  .box-fight {
    width: 10%;
    position: relative;
    display: flex;

    .box-img {
      width: 100%;
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      z-index: 2;
    }
    .page-btn {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 3;
      image {
        width: 48rpx;
        height: 48rpx;
        border-radius: 50%;
      }
    }
  }
}
</style>
