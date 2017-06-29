/**
 * Created by PX on 2017/6/15.
 */
/**
 * 功能：演示文件
 * 日期：2017/4/24
 **/
//计数器，计算遍历的次数
var i = 0;
//总计初始化值
var sum ;
//费用种类数组
var nameArr = [];
//系列数组
var seriesArr = [];
//定义饼状图数组
var  lineArr = [];
const chart2 = echarts.init(document.getElementById('chart2'));
$(function () {
    $.getJSON("data/consume.json", function (data) {

        $.each(data, function (idx, info) {
            i++;
            sum = 0;
            // 添加费用种类
            $(".charTh").append(`
                <th>${info.name}</th>
            `)
            // 获取value的长度
            var infoLeng = info.value.length;
            //循环添加tbody值
            for(let j = 0;j < infoLeng;j++){
                $("tbody>tr").eq(j).append(`<td contenteditable="true">${info.value[j]}</td>`);
                //每列总计值
                sum += Number($("tbody>tr").eq(j).children("td").eq(i).text());
            }
            //添加每列总计值
            $("tfoot>tr").append(`
                <td>${sum}</td>
            `)
            // 添加值改变的事件
            $("tbody td").on("input",function () {
                //改变每列值后求和的值
                var sum1 = 0;
                var iptIdx = $(this).index();
                for(let j = 0;j < infoLeng;j++) {
                    sum1 += Number($("tbody>tr").eq(j).children("td").eq(iptIdx).text());
                }
                $("tfoot>tr>td").eq(iptIdx).text(sum1);
            })
            //添加费用种类数组
            nameArr.push(info.name);
            var obj1 = {
                name:[info.name],
                type:'bar',
                data:info.value,
            }
            //饼状图数据对象
            var obj2 = {
                name:[info.name],
                value:sum
            }
            seriesArr.push(obj1);
            lineArr.push(obj2);
            if(i == 9){
                var lastNameArr = nameArr;
                var lastSeriesArr = seriesArr;
                var lastLineArr = lineArr;
            }


 // 调用“生成柱状图表”函数，并进行配置
            setBarCharts({
                id: 'chart1',
                title:"本周生活消费数据",
                legend: lastNameArr,
                xAxis: ['周一','周二','周三','周四','周五','周六','周日'],
                series: lastSeriesArr,
                callback: function (e) {
                    const scaling = $("#scaling");
                    let nextNotInfo = !(scaling.next().is("#showChartsInfo"));
                    if(nextNotInfo) {
                        scaling.after(`<div id="showChartsInfo"></div>`);
                    }
                    $.getJSON('data/electric.json', { catch: false },function (data) {
                        let dataIdx = e.dataIndex;
                        const showChartsInfo = $("#showChartsInfo");
                        showChartsInfo.html(`
				产品名称：${data[dataIdx].name}，产品型号：${data[dataIdx].model}
			`);
                        setTimeout(function () {
                            showChartsInfo.fadeOut(600, function () {
                                $(this).remove();
                            });
                        }, 1600);
                    });
                }
            });
            //饼状图
            var option2 = {
                backgroundColor:"#333",
                title : {
                    text: '本周生活消费比重',
                    x:'center',
                    textStyle: {            
                        color: '#fff'
                    },

                },
                series : [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        data:lastLineArr

                    }
                ]
            };
            chart2.setOption(option2);
        })



    })
})


