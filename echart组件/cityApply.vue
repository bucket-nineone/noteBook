<template>
  <div class="apply">
    <div ref="main" class="main" />
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      screenWidth: "",
      data: [
        { value: 113, name: "广州", percent: "26.9%" },
        { value: 101, name: "深圳", percent: "24%" },
        { value: 89, name: "珠海", percent: "21.2%" },
        { value: 82, name: "佛山", percent: "19.5%" },
        { value: 35, name: "东莞", percent: "8.3%" },
      ],
      option: {
        color: ["#0861e3", "#dbbe58", "#faec72", "#99f2b8", "#44dbb8"],
        tooltip: {
          show: false,
          formatter: "{b}:{d}%",
        },
        legend: {
          data: this.data, //就是取得每个series里面的name属性。2324
          orient: "vertical",
          icon: "circle", //图例形状
          padding: 10,
          bottom: "center",
          right: 0,
          height: this.transformFontSize(188),
          itemWidth: 12, //小圆点宽度
          itemHeight: 12, // 小圆点高度
          itemGap: 10, // 图例每项之间的间隔。[ default: 10 ]横向布局时为水平间隔，纵向布局时为纵向间隔。
          textStyle: {
            fontSize: this.transformFontSize(20),
            color: "#000",
          },
          formatter: name => {
            const value = this.data.find(item => item.name === name).value;
            const percent = this.data.find(item => item.name === name).percent;
            return `${name}  (${value}件)     ${percent} `;
          },
        },
        grid: {
          top: "0%",
          left: "0%",
          right: "15%",
          bottom: "3%",
          containLabel: true,
        },
        series: [
          {
            type: "pie",
            center: ["30%", "50%"], //圆心的位置
            top: "2%", //单单指的饼图距离上面的距离，top越大饼图越小
            left: "0%", //单单指的饼图距离左面的距离，会改变饼图的大小
            radius: ["0%", "80%"], //实心圆[内半径=0，外半径] 外半径越大，圆越大
            clockwise: true, //顺时针排列
            startAngle: 90, //起始角度 影响不大
            labelLine: {
              //删除指示线
              show: false,
            },
            //roseType:"", // 实心圆 不能出现roseType这个属性
            label: {
              show: false, //false不显示饼图上的标签
              position: "outside", //inside（在饼图上显示）,outside(默认就会出现引导线) center
              formatter: "{b}:{c}",
            },
            itemStyle: {
              //每个扇形的设置
              borderColor: "rgba(0,0,0,.1)", //扇形边框颜色
              borderWidth: 1, //扇形边框大小 要先给borderColor颜色 设置borderWidth才会有效果
            },
            data: [
              { value: 113, name: "广州" },
              { value: 101, name: "深圳" },
              { value: 89, name: "珠海" },
              { value: 82, name: "佛山" },
              { value: 35, name: "东莞" },
            ].sort((a, b) => b.value - a.value), //数组从大到小排序

            emphasis: {
              //启用鼠标放上去放大效果，这个挺好的
              scale: true,
              scaleSize: 20,
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
    };
  },
  mounted() {
    const myChart = echarts.init(this.$refs.main);
    myChart.setOption(this.option);
    window.addEventListener("resize", () => {
      myChart.resize();
    });
  },
  methods: {
    // 根据不同的屏幕宽度换算字体大小
    transformFontSize(fontsize) {
      // 获取屏幕宽度
      const width = document.body.clientWidth;
      const ratio = width / 1920;
      // 取下整
      return parseInt(fontsize * ratio);
    },
  },
  beforeDestoryed() {
    // 组件销毁前移除监听,防止内存泄露
    window.removeEventListener("resize");
  },
};
</script>

<style lang="scss" scoped>
.apply {
  display: flex;
  justify-content: center;
  .main {
    height: vw(304);
    width: 100%;
    z-index: 10;
  }
  // margin-bottom: vw(30);
}
</style>
