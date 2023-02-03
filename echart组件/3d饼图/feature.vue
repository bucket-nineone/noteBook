<template>
  <div>
    <div id="chart-panel" ref="main"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import "echarts-gl";
import { getPie3D } from "../utils/sector";
export default {
  data() {
    return {
      optionData: [
        {
          name: "列管数",
          value: 12,
          itemStyle: {
            opacity: 0.2,
            color: "#0159cd",
          },
        },
        {
          name: "出入库提醒",
          value: 16,
          itemStyle: {
            opacity: 0.2,
            color: "#5d8afe",
          },
        },
        {
          name: "来义提醒",
          value: 14,
          itemStyle: {
            opacity: 0.2,
            color: "#46c670",
          },
        },
        {
          name: "档案异常",
          value: 81,
          itemStyle: {
            opacity: 0.2,
            color: "#c4b04d",
          },
        },
        {
          name: "前科",
          value: 66,
          itemStyle: {
            opacity: 0.2,
            color: "#84fbf6",
          },
        },
      ],
    };
  },
  mounted() {
    this.draw3d();
    this.$nextTick(() => {
      let parent = document.getElementById("chart-panel"); // 获取父元素
      let canvas = parent.getElementsByTagName("canvas"); // 获取父元素下面的所有canvas元素
      console.log(canvas);
      canvas[1].style.transform = "rotateX(30deg)";
    });
  },
  methods: {
    draw3d() {
      // 基于准备好的dom，初始化echarts实例
      let chartPanel = echarts.init(document.getElementById("chart-panel"));
      for (let i = 0; i < this.optionData.length; i++) {
        delete this.optionData[i].itemStyle.opacity;
      }
      // 传入数据生成 option
      let series = getPie3D(this.optionData, 2);
      let option = {
        tooltip: {
          formatter: params => {
            // console.log(params)
            if (
              params.seriesName !== "mouseoutSeries" &&
              params.seriesName !== "pie2d"
            ) {
              return `<div style="padding:0 10px">${params.seriesName}：${(
                option.series[params.seriesIndex].pieData.proportion * 100
              ).toFixed(2)}%</div>`;
            }
          },
        },

        xAxis3D: {
          min: -1,
          max: 1,
        },
        yAxis3D: {
          min: -1,
          max: 1,
        },
        zAxis3D: {
          min: -1,
          max: 1,
        },
        grid3D: {
          show: false, //是否显示三维笛卡尔坐标系。
          boxHeight: 20, //三维笛卡尔坐标系在三维场景中的高度
          top: "-12.5%",
          // bottom: "80%",
          // environment: "#021041", //背景
          viewControl: {
            //用于鼠标的旋转，缩放等视角控制
            alpha: 50, //角度
            distance: 250, //调整视角到主体的距离，类似调整zoom 重要
            rotateSensitivity: 0, //设置为0无法旋转
            zoomSensitivity: 0, //设置为0无法缩放
            panSensitivity: 0, //设置为0无法平移
            autoRotate: false, //自动旋转
          },
        },
        series: series,
      };
      chartPanel.setOption(option);

      //是否需要label指引线，如果要就添加一个透明的2d饼状图并调整角度使得labelLine和3d的饼状图对齐，并再次setOption
      option.series.push({
        name: "pie2d",
        type: "pie",
        label: {
          color: "#fff",
          fontSize: 16,
          opacity: 1,
          formatter: "{name|{b}}\n{time|{c}}",
          rich: {
            name: {
              fontSize: 14,
              color: "#fff",
              fontFamily: "AlibabaPuHuiTi",
            },
            time: {
              fontSize: 30,
              color: "#84d4e1",
              fontFamily: "DS-Digital",
            },
          },
        },
        labelLine: {
          length: 10,
          length2: 30,
          lineStyle: {
            color: "#ffffff",
            width: 1.5,
          },
        },
        startAngle: 325, //起始角度，支持范围[0, 360]。 //重要
        clockwise: false, //饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
        radius: ["25%", "50%"],
        center: ["50%", "50%"],
        data: this.optionData,
        itemStyle: {
          opacity: 0,
        },
        top: "-20%",
        avoidLabelOverlap: true, //防止标签重叠
      });
      chartPanel.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
#chart-panel {
  height: vh(300);
  width: 100%;
  z-index: 10;
}
</style>
