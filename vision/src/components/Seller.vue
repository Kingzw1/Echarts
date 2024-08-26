<!-- 
商家销量统计的横向柱状图 
-->
<script setup>
import { ref, reactive, onMounted, toRaw, computed, onUnmounted } from "vue";
import echarts from "@/utils/echarts";
import { useStore } from "vuex";

const store = useStore();
console.log(store);
const seller_ref = ref(null);
let chartInstance = null;
let timeId = null;
const currentPage = ref(1);
const totalPage = ref(0);
onMounted(async () => {
  // 初始化echartInstance对象

  chartInstance = echarts.init(seller_ref.value, "chalk");
  // 对图表初始化配置的控制
  const initOption = {
    title: {
      text: "▎商家销售统计",

      left: 20,
      top: 20,
    },
    grid: {
      top: "20%",
      left: "3%",
      right: "6%",
      bottom: "3%",
      containLabel: true, //距离是包含坐标轴上面的文字
    },
    xAxis: {
      type: "value",
    },
    yAxis: {
      type: "category",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "line",
        z: 0,
        lineStyle: {
          type: "solid",

          color: "#2d3443",
        },
      },
    },
    series: [
      {
        type: "bar",

        label: {
          show: true,
          position: "right",
          textStyle: {
            color: "white",
          },
        },
        itemStyle: {
          // 指明颜色渐变的方向
          // 指明不同百分百之下颜色的值
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            // 百分之0状态下的颜色值
            {
              offset: 0,
              color: "#5052ee",
            },
            // 百分之百状态下的颜色值
            {
              offset: 1,
              color: "#ab6ee5",
            },
          ]),
        },
      },
    ],
  };
  chartInstance.setOption(initOption);
  // 获取服务器的数据
  await getDate();
  chartInstance.on("mouseover", () => {
    clearInterval(timeId);
  });
  chartInstance.on("mouseout", () => {
    timeId = setInterval(() => {
      currentPage.value++;
      if (currentPage.value > totalPage.value) {
        currentPage.value = 1;
      }
      update();
    }, 3000);
  });
  window.addEventListener("resize", screenAdapter);
  // 在界面加载完成主动进行屏幕的适配
  screenAdapter();
});
const getDate = async () => {
  await store.dispatch("seller/getSellerData");

  update();
  timeId = setInterval(() => {
    currentPage.value++;
    if (currentPage.value > totalPage.value) {
      currentPage.value = 1;
    }
    update();
  }, 3000);
};
const update = async () => {
  const data = await store.state.seller.sellerData;
  // store.state("seller/sellerData");

  // 数据排序
  data.sort((a, b) => {
    return a.value - b.value;
  });
  // 每五个元素显示一页
  totalPage.value =
    data.length % 5 === 0 ? data.length / 5 : data.length / 5 + 1;
  // 更新图标
  const start = (currentPage.value - 1) * 5;
  const end = currentPage.value * 5;
  const showData = data.slice(start, end);
  const sellerNames = showData.map((item) => {
    return item.name;
  });
  const sellerValues = showData.map((item) => {
    return item.value;
  });
  const dataOption = {
    yAxis: {
      data: sellerNames,
    },

    series: [
      {
        data: sellerValues,
      },
    ],
  };
  chartInstance.setOption(dataOption);
};
onUnmounted(() => {
  clearInterval(timeId);
  window.removeEventListener("resize", screenAdapter);
});
// 当浏览器的大小发生变化的时候,会调用的方法,来完成屏幕的适配
const screenAdapter = () => {
  const titleFontSize = (seller_ref.value.offsetWidth / 100) * 3.6;
  // 和分辨率大小相关的配置
  const adapterOption = {
    title: {
      textStyle: {
        fontSize: titleFontSize,
      },
    },

    tooltip: {
      axisPointer: {
        lineStyle: {
          width: titleFontSize,
        },
      },
    },
    series: [
      {
        barWidth: titleFontSize,

        itemStyle: {
          barBorderRadius: [0, titleFontSize / 2, titleFontSize / 2, 0],
        },
      },
    ],
  };
  chartInstance.setOption(adapterOption);
  // 手动的调用图表对象resize 才能产生效果
  chartInstance.resize();
};
</script>

<template>
  <div class="com-container">
    <div class="com-chart" ref="seller_ref"></div>
  </div>
</template>

<style >
</style>