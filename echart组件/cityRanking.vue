<template>
  <div class="raink">
    <div ref="main" class="main" />
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {
    const myChart = echarts.init(this.$refs.main);
    myChart.setOption({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      textStyle: {},
      legend: {},
      grid: {
        top: "0%",
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "value",
        boundaryGap: [0, 0.01],
      },
      yAxis: {
        type: "category",
        data: ["江门", "河源", "湛江", "佛山", "珠海", "深圳", "广州"],
      },
      series: [
        {
          type: "bar",
          itemStyle: {
            //---图形形状
            color: function (params) {
              return new echarts.graphic.LinearGradient(
                1,
                0,
                0,
                0,
                [
                  {
                    offset: 0,
                    color: "#0149D5",
                  },
                  {
                    offset: 1,
                    color: "#1890FF",
                  },
                ],
                false
              );
            },

            // barBorderRadius: [18, 18, 0, 0],
          },
          barWidth: "12", //---柱形宽度
          barCategoryGap: "20%", //---柱形间距
          data: [32, 35, 43, 82, 89, 102, 113],
        },
      ],
    });

    window.addEventListener("resize", function () {
      myChart.resize();
    });
  },
  methods: {},
  beforeDestoryed() {
    // 组件销毁前移除监听,防止内存泄露
    window.removeEventListener("resize");
  },
};
</script>

<style lang="scss" scoped>
.raink {
  display: flex;
  justify-content: center;
  .main {
    height: vw(247);
    width: vw(508);
    z-index: 10;
  }
}
</style>
