<template>
    <div style="width:100%;height:100%;" id="visite_volume_con"></div>
</template>

<script>
const echarts = require('echarts');
export default {
    name: 'visiteVolume',
    data () {
        return {
            //
        };
    },
    mounted () {
        this.$nextTick(() => {
            let visiteVolume = echarts.init(document.getElementById('visite_volume_con'));
            let xAxisData = [];
            let data1 = [];
            let data2 = [];
            for (let i = 0; i < 20; i++) {
                xAxisData.push('类目' + i);
                data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
                data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
            }

            const option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter: '{b}\n{c}%'
                },
                grid: {
                    top: 0,
                    left: '2%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    axisLabel: {
                        show: true,
                        interval: 'auto',
                        formatter: '{value} %'
                    },
                    show: true,
                    min: 0,
                    max: 100,
                    // boundaryGap: ['0%', '100%']
                },
                yAxis: {
                    type: 'category',
                    data: ['其它', '桥梁', '隧道', '互通', '路基'],
                    nameTextStyle: {
                        color: '#c3c3c3'
                    }
                },
                series: [
                    {
                        name: '已完成',
                        type: 'bar',
                        data: [
                            {value: 12, name: '路基', itemStyle: {normal: {color: '#2d8cf0'}}},
                            {value: 33, name: '桥梁', itemStyle: {normal: {color: '#2d8cf0'}}},
                            {value: 62, name: '隧道', itemStyle: {normal: {color: '#2d8cf0'}}},
                            {value: 87, name: '互通', itemStyle: {normal: {color: '#2d8cf0'}}},
                            {value: 53, name: '其它', itemStyle: {normal: {color: '#2d8cf0'}}},
                        ]
                    }
                ]
            };

            visiteVolume.setOption(option);

            window.addEventListener('resize', function () {
                visiteVolume.resize();
            });
        });
    }
};
</script>
