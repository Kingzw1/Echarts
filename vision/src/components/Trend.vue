<script setup>
import { ref, reactive, onMounted, onUnmounted, computed } from "vue";
import echarts from "@/utils/echarts";
import { useStore } from "vuex";
import { all } from "core-js/fn/promise";
const store = useStore();
const trend_ref = ref(null);
let allData = ref(null);
let chartInstance = null;
const showChoice = ref(false); //是否显示可选项
const choiceType = ref("map");
const initChart = () => {
  chartInstance = echarts.init(trend_ref.value, "chalk");
  const initOption = {
    grid: {
      left: "3%",
      top: "35%",
      right: "4%",
      bottom: "1%",
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      // formatter: (params) => {
      //   let tooltipText = "";
      //   params.forEach((param) => {
      //     tooltipText += `${param.seriesName}: ${param.data}<br>`;
      //   });
      //   return tooltipText;
      // },
    },
    legend: {
      left: 20,
      top: "15%",
      icon: "circle",
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
    },
    yAxis: {
      type: "value",
    },
  };
  chartInstance.setOption(initOption);
};
// 获取数据
const getData = async () => {
  try {
    await store.dispatch("trendStore/getTrendData");
    allData = store.state.trendStore.trendDta;
    updateChart();

    // console.log("36510", allData.type);
  } catch (error) {
    console.error("Failed to get trend data:", error);

    return Promise.reject(error);
  }
};

const updateChart = () => {
  const colorArr1 = [
    "rgba(11,168,44,0.5)",
    "rgba(44,110,255,0.5)",
    "rgba(22,242,217,0.5)",
    "rgba(254,33,30,0.5)",
    "rgba(250,105,0,0.5)",
  ];
  const colorArr2 = [
    "rgba(11,168,44,0)",
    "rgba(44,110,255,0",
    "rgba(22,242,217,0)",
    "rgba(254,33,30,0)",
    "rgba(250,105,0,0)",
  ];
  // 处理数据
  // 类目轴的数据
  const timeArr = allData.common.month;
  // Y轴的数据 series下的数据
  const valueArr = allData[choiceType.value].data;
  const seriesArr = valueArr.map((item, index) => {
    const color1 = colorArr1[index] || "rgba(0,0,0,0)"; // 如果索引超出范围，使用默认颜色
    const color2 = colorArr2[index] || "rgba(0,0,0,0)"; // 如果索引超出范围，使用默认颜色
    return {
      name: item.name,
      type: "line",
      data: item.data,
      stack: choiceType.value,
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            // color:color1
            color: "#5052ee",
          }, //0%的颜色值
          {
            offset: 1,
            // color:color2
            color: "#ab6ee5",
          }, //100%的颜色值
        ]),
      },
    };
  });
  // 图例数据
  const legendArr = valueArr.map((item) => {
    return item.name;
  });
  const dataOption = {
    xAxis: {
      data: timeArr,
    },
    legend: {
      data: legendArr,
    },
    series: seriesArr,
  };
  chartInstance.setOption(dataOption);
};
const screenAdapter = () => {
  const adapterOption = {};
  chartInstance.setOption(adapterOption);
  chartInstance.resize();
};
const destroyed = () => {
  window.removeEventListener("resize", screenAdapter);
};
onMounted(async () => {
  initChart();
  await getData();

  window.addEventListener("resize", screenAdapter);
  screenAdapter();
});
onUnmounted(() => {
  destroyed();
});
const handleSelect = (currentType) => {
  choiceType.value = currentType;
  updateChart();
  showChoice.value = false;
};
const type = computed(() => store.getters["trendStore/getType"]);
const showType = computed(() => {
  if (allData) {
    return "";
  } else {
    return allData[choiceType.value].title;
  }
});
</script>

<template>
  <div class="com-container">
    <div class="title">
      <span>{{ showType }}</span>
      <span class="iconfont title-icon" @click="showChoice=!showChoice">&#xe6eb</span>
      <div class="select-con" v-if="showChoice">
        <div class="select-item" v-for="item in type" :key="item.key" @click="handleSelect(item.key)">{{item.text}}</div>
        
      </div>
    </div>
    <div class="com-chart" ref="trend_ref"></div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 10;
  color: white;
  .title-icon {
    margin-right: 10px;
    cursor: pointer;
  }
  .select-con {
    .select-item {
      cursor: pointer;
    }
  }
}
</style>