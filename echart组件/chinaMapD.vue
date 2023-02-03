<template>
  <div>
    <div id="myEcharts" ref="myEcharts" class="myEcharts"></div>
  </div>
</template>

<script>
import Geo from "@/assets/map/china.json";
import "echarts-gl";
export default {
  props: {},
  data() {
    return {};
  },
  created() {},
  mounted() {
    let _that = this;
    this.$echarts.registerMap("map", Geo);
    //2.初始化echarts
    let myChart = this.$echarts.init(this.$refs.myEcharts);
    // 部分测试数据
    let originalDatas = {
      datas: [
        { name: "北京", value: [116.4, 39.9, 3] },
        { name: "天津", value: [117.2, 39.12, 2] },
        { name: "上海", value: [121.47, 31.23, 2] },
        { name: "重庆", value: [106.55, 29.57, 1] },
        { name: "河北", value: [114.52, 38.05, 1] },
        { name: "河南", value: [113.62, 34.75, 1] },
        { name: "云南", value: [102.72, 25.05, 1] },
        { name: "辽宁", value: [123.43, 41.8, 2] },
        { name: "黑龙江", value: [126.53, 45.8, 2] },
        { name: "湖南", value: [112.93, 28.23, 1] },
        { name: "安徽", value: [117.25, 31.83, 1] },
        { name: "山东", value: [116.98, 36.67, 3] },
        { name: "新疆", value: [87.62, 43.82, 2] },
        { name: "江苏", value: [118.78, 32.07, 2] },
        { name: "浙江", value: [120.15, 30.28, 10] },
        { name: "江西", value: [115.85, 28.68, 1] },
        { name: "湖北", value: [114.3, 30.6, 2] },
        { name: "广西", value: [108.37, 22.82, 1] },
        { name: "甘肃", value: [103.82, 36.07, 1] },
        { name: "山西", value: [112.55, 37.87, 2] },
        { name: "内蒙古", value: [111.73, 40.83, 2] },
        { name: "陕西", value: [108.93, 34.27, 2] },
        { name: "吉林", value: [125.32, 43.9, 3] },
        { name: "福建", value: [119.3, 26.08, 2] },
        { name: "贵州", value: [106.63, 26.65, 2] },
        { name: "广东", value: [113.27, 23.13, 4] },
        { name: "青海", value: [101.78, 36.62, 1] },
        // { name: "西藏", value: [91.13, 29.65, 0] },
        { name: "四川", value: [104.07, 30.67, 4] },
        { name: "宁夏", value: [106.28, 38.47, 2] },
        // { name: "海南", value: [110.32, 20.03, 0] },
        // { name: "台湾", value: [121.5, 25.03, 1] },
        // { name: "香港", value: [114.08, 22.2, 4] },
        // { name: "澳门", value: [113.33, 23.13, 60] },
      ],
    };

    let series = [
      {
        type: "map3D",
        map: "map",

        // 设置为透明
        itemStyle: {
          color: [1, 1, 1, 0],
        },
        emphasis: {
          label: { show: false },
          itemStyle: {
            color: [1, 1, 1, 0],
          },
        },
        data: originalDatas.datas,
        viewControl: {
          beta: 5, //x轴旋转
          alpha: 60, //Y轴旋转
        },
      },
    ];

    series.push({
      type: "bar3D",
      coordinateSystem: "geo3D",
      shading: "lambert",
      label: {
        show: false,
        position: "top",
        // formatter: params => {
        //   return params.value[2];
        // },
      },
      data: originalDatas.datas,
      barSize: 2,
      minHeight: 1,
      itemStyle: {
        color: "#FFB239",
      },
      emphasis: {
        label: { show: false },
      },
    });
    let option = {
      // backgroundColor: "#013954",
      tooltip: {
        trigger: "item",
        formatter: function (params) {
          if (params.seriesType == "bar3D") {
            return [params.name + "：" + (params.value[2] || "") + "个"].join(
              "<br />"
            );
          }
        },
      },
      geo3D: {
        show: true,
        map: "map",
        viewControl: {
          beta: 5, //x轴旋转
          alpha: 60, //Y轴旋转
          panMouseButton: "right", //平移操作使用的鼠标按键
          rotateMouseButton: "left", //旋转操作使用的鼠标按键
        },
        light: {
          main: {
            color: "#ffffff",
            intensity: 1,
            shadow: false,
          },
        },
        // top: "1%",
        // height: 700,
        itemStyle: {
          color: "#4D96FA",
          borderWidth: 1,
          borderColor: "#fff",
          opcity: 1,
        },
        shading: "realistic",
        label: {
          show: false,
          color: "#fff",
          distance: 5,
        },
        emphasis: {
          label: { show: false },
          itemStyle: { color: "#36A8FF" },
        },
        groundPlane: false,
        data: originalDatas.datas,
        // 将geo3d放在最底层
        zlevel: -1,
      },

      series: series,
    };
    myChart.setOption(option);
    myChart.off("click");
    myChart.on("click", function (params) {
      // 点击获取data中的数据
      // console.log("--------", params);
      _that.getMapList(params.name);
      // 设置选中高亮
      let regions = [
        {
          itemStyle: { color: "#36A8FF", opacity: 1 },
          label: { show: false },
        },
      ];
      regions[0].name = params.name;
      option.geo3D.regions = regions;
      myChart.setOption(option);
    });

    window.addEventListener("resize", function () {
      myChart.resize();
    });
  },
  methods: {
    getMapList(name) {
      this.$emit("getMapList", name);
    },
  },
};
</script>

<style  lang="scss" scoped>
.myEcharts {
  height: vw(600);
  min-width: vw(831);
}
</style>
