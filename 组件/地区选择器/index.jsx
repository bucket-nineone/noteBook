import { Component } from "react";
import { View, Text, Picker } from "@tarojs/components";
import "./index.scss";
import areaListjson from "./area.json";

export default class Index extends Component {
  state = {
    areaObj: {}, //地区显示
    areaList: [], //地区编码
    cityAreaList: [], //省市区数组
  };

  provinceList = []; //省
  cityList = []; //市
  areaList = []; //区
  index = ""; //多列选择器第1列选中的value值下标

  // 当省变化时对应的市变化，当市变化对应的区变化
  handleColChange = (e) => {
    const { areaList } = this.state;
    if (areaList[0].items.length != 0) {
      if (e.detail.column == 0) {
        //判断第1列value值省发生了变化
        this.index = e.detail.value;
        this.cityList = [];
        for (let i = 0; i < areaList[e.detail.value].items.length; i++) {
          if (
            areaList[e.detail.value].items[i].areaName != "县" &&
            areaList[e.detail.value].items[i].areaName != "市"
          ) {
            //过滤县与市
            this.cityList.push(areaList[e.detail.value].items[i]);
          }
        }
        if (areaList[e.detail.value].items[0].items.length > 0) {
          //存在区
          this.areaList = []; //将市区内容置空
          let arrArea = areaList[e.detail.value].items[0].items; //将第1列选中的value值下标对应的市区存入数组arrArea中
          for (let i = 0; i < arrArea.length; i++) {
            this.areaList.push(arrArea[i]); //将最新的市区数组放入全局变量市区数组中
          }
          this.state.cityAreaList.splice(1, 2, this.cityList, this.areaList); //替换原来的市数组，触发页面更新
          this.setState({
            cityAreaList: this.state.cityAreaList,
          });
        } else {
          this.cityList = [""];
          this.areaList = [""];
          this.state.cityAreaList.splice(1, 2, this.cityList, this.areaList);
          this.setState({
            cityAreaList: this.state.cityAreaList,
          });
        }
      }
      if (e.detail.column == 1) {
        //判断第2列value值变化
        if (areaList[this.index].items[e.detail.value].items.length > 0) {
          this.areaList = []; //将区置空
          let arrArea = areaList[this.index].items[e.detail.value].items;
          for (let i = 0; i < arrArea.length; i++) {
            this.areaList.push(arrArea[i]);
          }
        } else {
          this.areaList = [];
        }
        this.state.cityAreaList.splice(2, 1, this.areaList); //替换原来的区数组
        this.setState({
          cityAreaList: this.state.cityAreaList,
        });
      }
    } else {
      this.cityList = [];
      this.areaList = [];
      this.state.cityAreaList.splice(1, 2, this.cityList, this.areaList);
      this.setState({
        cityAreaList: this.state.cityAreaList,
      });
    }
  };

  handleCancle = (e) => {
    let areaObj = {};
    let province = e.detail.value[0];
    let city = e.detail.value[1];
    let area = e.detail.value[2];
    if (city > this.cityList.length) {
      city = 0;
    }
    if (area > this.areaList.length) {
      area = 0;
    }
    areaObj.province = this.provinceList[province];
    areaObj.city = this.cityList[city];
    areaObj.area = this.areaList[area];
    console.log(
      998,
      this.provinceList[province],
      this.cityList[city],
      this.areaList[area]
    );
    this.setState({ areaObj }, () => {
      console.log(99999999, this.state.areaObj);
    });
  };

  componentDidMount() {
    let areaList = areaListjson.data;
    this.provinceList = [];
    this.cityList = [];
    this.areaList = [];
    this.setState({ cityAreaList: [] });

    //省
    for (let i = 0; i < areaList.length; i++) {
      this.index = 0;
      this.provinceList.push(areaList[i]);
    }
    //市
    if (areaList[0].items.length != 0) {
      for (let i = 0; i < areaList[0].items.length; i++) {
        if (
          areaList[0].items[i].areaName != "县" &&
          areaList[0].items[i].areaName != "市"
        ) {
          //过滤县与市
          this.cityList.push(areaList[0].items[i]);
        }
      }
    } else {
      this.cityList = [];
    }
    //区
    if (areaList[0].items.length != 0) {
      if (areaList[0].items[0].items) {
        //如果区存在
        for (let i = 0; i < areaList[0].items[0].items.length; i++) {
          this.areaList.push(areaList[0].items[0].items[i]);
        }
      } else {
        this.areaList = [];
      }
    }
    //修改省市区显示
    this.state.cityAreaList.push(this.provinceList);
    this.state.cityAreaList.push(this.cityList);
    this.state.cityAreaList.push(this.areaList);
    this.setState({
      cityAreaList: this.state.cityAreaList,
    });

    this.setState({ areaList });
  }

  render() {
    const { areaObj, cityAreaList } = this.state;
    return (
      <View>
        <Picker
          range={cityAreaList}
          rangeKey="areaName"
          onChange={this.handleCancle}
          onColumnChange={this.handleColChange}
          mode="multiSelector"
        >
          {/* {areaObj.province.areaName}-{areaObj.city.areaName}-
            {areaObj.area.areaName} */}
          <View className="picker">
            {Object.keys(areaObj).length > 0
              ? `当前选择：${areaObj.province.areaName}-${areaObj.city.areaName}-
            ${areaObj.area.areaName}`
              : "请选择"}
          </View>
        </Picker>
      </View>
    );
  }
}
