<template>
  <div class="echartsMapAllDemo">
    <!-- style的宽高一定要写，不写也不会展示echarts图 -->
    <div id="myEcharts" ref="myEcharts" style="width: 100%; height: 100%"></div>
  </div>
</template>
<script>
import chinaJson from "@/assets/map/china.json";
export default {
  data() {
    return {};
  },
  mounted() {
    this.chinaEcharts();
  },
  methods: {
    chinaEcharts() {
      //1.注册一个地图
      this.$echarts.registerMap("china", chinaJson);

      //2.初始化echarts
      let myChart = this.$echarts.init(this.$refs.myEcharts);

      // 3.准备数据

      let guanwang = [
        {
          name: "青海省专利信息服务中心",
          value: [101.75542, 36.63739],
        },
        {
          name: "山西省知识产权技术服务中心",
          value: [112.54343, 37.85823],
        },
        {
          name: "黑龙江省专利信息服务中心",
          value: [126.50704, 45.79888],
        },
        {
          name: "江苏省专利信息服务中心",
          value: [118.74898, 32.03861],
        },
        {
          name: "山东省专利信息服务中心",
          value: [117.0903, 36.65661],
        },
        {
          name: "广西壮族自治区专利信息服务中心",
          value: [108.421192, 22.830635],
        },
        {
          name: "重庆市专利信息服务中心",
          value: [106.572811, 29.581784],
        },
        {
          name: "四川省专利信息服务中心",
          value: [104.06308, 30.53903],
        },
        {
          name: "甘肃省知识产权保护中心（甘肃省专利信息服务中心）",
          value: [103.897197, 36.059007],
        },
        {
          name: "大连市专利信息服务中心（隶属于大连市市场监管事务服务中心）",
          value: [121.602665, 38.91149],
        },
        {
          name: "吉林省专利信息服务中心",
          value: [125.33773, 43.850109],
        },
        {
          name: "内蒙古自治区知识产权公共服务中心（内蒙古自治区知识产权研究会）",
          value: [111.707764, 40.781273],
        },
        {
          name: "太原理工大学高校信息服务中心",
          value: [112.52313, 37.85823],
        },
        {
          name: "厦门市知识产权信息公共服务中心",
          value: [118.09277, 24.45424],
        },
        {
          name: "河北省专利信息服务中心",
          value: [114.61469, 38.04418],
        },
        {
          name: "内蒙古知识产权服务中心",
          value: [111.70321, 40.79735],
        },
        {
          name: "江西省陶瓷知识产权信息中心（国家知识产权局江西省专利信服务中心）",
          value: [117.250136, 29.293074],
        },
        {
          name: "安徽省专利信息服务中心",
          value: [117.330904, 31.747337],
        },
        {
          name: "中关村知识产权促进中心",
          value: [116.34568, 39.97728],
        },
        {
          name: "贵州省专利信息服务中心",
          value: [106.70358, 26.5998],
        },
        {
          name: "长春市知识产权保护中心（长春市专利信息服务中心）",
          value: [125.396759, 43.98645],
        },
        {
          name: "云南省专利信息服务中心",
          value: [102.71098, 24.99897],
        },
        {
          name: "浙江省专利信息服务中心（浙江省知识产权研究与服务中心）",
          value: [120.208794, 30.20982],
        },
        {
          name: "新疆维吾尔自治区知识产权服务促进中心",
          value: [87.490128, 43.837219],
        },
        {
          name: "新疆生产建设兵团知识产权信息中心",
          value: [86.05738, 44.30775],
        },
        {
          name: "上海市知识产权服务中心",
          value: [121.4052, 31.16311],
        },
        {
          name: "中国（杭州）知识产权维权援助中心",
          value: [120.206324, 30.269739],
        },
        {
          name: "中国（温州）知识产权维权援助中心",
          value: [120.70733, 28.009147],
        },
        {
          name: "中国义乌（小商品）知识产权快速维权中心",
          value: [120.11818, 29.344055],
        },
        {
          name: "中国杭州（制笔）知识产权快速维权援助中心",
          value: [119.707921, 29.79332],
        },
        {
          name: "中国温州（服饰）知识产权快速维权中心",
          value: [120.70733, 28.009147],
        },
        {
          name: "中国（南京）知识产权保护中心（南京市知识产权维权援助中心）",
          value: [118.64083, 32.0379],
        },
        {
          name: "中国（宁波）知识产权保护中心",
          value: [121.63902, 29.88483],
        },
        {
          name: "陕西省知识产权保护中心",
          value: [108.885361, 34.195053],
        },
        {
          name: "中国（沈阳）知识产权保护中心（沈阳市知识产权信息中心）",
          value: [123.42719, 41.7643],
        },
        {
          name: "中国（济南）知识产权保护中心",
          value: [116.995394, 36.6454],
        },
        {
          name: "中国（浙江）知识产权保护中心",
          value: [120.13354, 30.28313],
        },
        {
          name: "中国（浙江）知识产权维权援助中心",
          value: [120.22532, 30.220261],
        },
        {
          name: "中国（深圳）知识产权保护中心（深圳国家知识产权局专利代办处）",
          value: [113.904747, 22.530283],
        },
        {
          name: "中国（西安）知识产权保护中心（西安市知识产权保护中心）",
          value: [108.943685, 34.345937],
        },
        {
          name: "中国（长春）知识产权维权援助中心",
          value: [125.281658, 43.889722],
        },
        {
          name: "哈尔滨市知识产权服务中心（中国（哈尔滨）知识产权维权援助中心）",
          value: [126.617786, 45.761018],
        },
        {
          name: "四川省知识产权服务中心",
          value: [104.06208, 30.53932],
        },
        {
          name: "天津市知识产权服务中心",
          value: [117.129939, 39.102419],
        },
        {
          name: "宁夏回族自治区知识产权服务中心",
          value: [106.23794, 38.48238],
        },
        {
          name: "广东省知识产权保护中心（中国（广东）知识产权保护中心、广州商标审查协作中心）",
          value: [113.30027, 23.14128],
        },
        {
          name: "成都市知识产权保护中心",
          value: [104.093497, 30.645014],
        },
        {
          name: "武汉知识产权保护中心",
          value: [114.269159, 30.6045],
        },
        {
          name: "河南省知识产权事务中心",
          value: [113.68223, 34.77773],
        },
        {
          name: "湖北省知识产权发展中心",
          value: [114.3646, 30.52907],
        },
        {
          name: "湖南省知识产权信息服务中心",
          value: [112.95536, 28.1894],
        },
        {
          name: "福建省知识产权发展保护中心",
          value: [119.300002, 26.097678],
        },
        {
          name: "贵州省知识产权维权援助中心",
          value: [106.695203, 26.591918],
        },
        {
          name: "陕西省知识产权服务中心",
          value: [108.970625, 34.231052],
        },
        {
          name: "青岛市专利代办处（青岛市知识产权事务中心）",
          value: [120.457314, 36.104671],
        },
        {
          name: "上海市知识产权发展研究中心",
          value: [121.454326, 31.24535],
        },
        {
          name: "杭州市知识产权服务中心",
          value: [120.206324, 30.269739],
        },
        {
          name: "广州知识产权保护中心（广州市知识产权信息中心）（广州市知识产权维权援助中心）",
          value: [113.351415, 23.147127],
        },
      ];
      //4.把数据变成[{{ name: "北京", value: [121.472644, 31.231706,177] },...}]格式
      var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value),
            });
          }
        }
        console.log(res);
        return res;
      };
      //5.echarts配置
      let option = {
        geo: {
          map: "china",
          show: true,
          roam: false,
          label: {
            emphasis: {
              show: false,
            },
          },
          itemStyle: {
            normal: {
              show: false,
            },
          },
        },
        series: [
          {
            //  name: 'Top 5',
            type: "effectScatter",
            coordinateSystem: "geo",
            // data: [{ name: "北京", value: [116.4551, 40.2539] }],
            symbolSize: 8,
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke",
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: false,
              },
            },
            itemStyle: {
              normal: {
                color: "#E01F21",
                shadowBlur: 10,
                shadowColor: "#E01F21",
              },
            },
            zlevel: 1,
          },

          {
            type: "map",
            map: "china",
            aspectScale: 0.75,
            //zoom:1.1,
            itemStyle: {
              normal: {
                areaColor: "#B3D8EF",
                borderColor: "rgba(0,0,0,0.3)",
                borderWidth: 1,
              },
              emphasis: {
                areaColor: "#B3D8EF",
              },
            },
            emphasis: {
              label: {
                show: false,
                color: "transparent",
              },
            },
            data: [],
          },
          {
            // name: "分公司",
            type: "scatter",
            coordinateSystem: "geo",
            data: guanwang,
            symbolSize: [12, 8],
            symbolKeepAspect: false,
            label: {
              normal: {
                show: true,
                formatter: function (params) {
                  return params.name;
                },
                position: "top",
                color: "transparent",
                fontSize: "14",
              },
            },
            emphasis: {
              // show: false,
              label: {
                show: true,
                color: "#E01F21",
              },
            },
            itemStyle: {
              normal: {
                color: "#ea6347",
                borderWidth: 2,
                // borderColor: "#f4b391",
              },
            },
          },
        ],
      };

      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
  },
  beforeDestoryed() {
    // 组件销毁前移除监听,防止内存泄露
    window.removeEventListener("resize");
  },
};
</script>
<style lang="scss" scoped>
.echartsMapAllDemo {
  height: vw(601);
  width: 100%;
}
</style>


