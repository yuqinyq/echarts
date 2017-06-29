/**
 * 功能：柱状图
 * 日期：2017/6/15
 **/
/**
 * 功能：生成柱状图表
 * 参数：{对象}
 * 参数1：元素ID
 * 参数2：风格主题
 * 参数3：图表标题
 * 参数4：图注
 * 参数5：X轴系列数据
 * 参数6：图表系列数据配置
 **/
function setBarCharts(opt) {
	// 默认配置处理
	// ID处理
	let idIsUndefined =  typeof(opt.id) === "undefined";
	if(idIsUndefined) {
		console.error('ID是必须要配置的项');
	}
	opt.theme = typeof(opt.theme) === "undefined" ? 'dark' : opt.theme;
	// X轴处理
	let xIsUndefined =  typeof(opt.xAxis) === "undefined";
	if(xIsUndefined) {
		console.error('X轴必须是有效的配置');
	}
	// // 系列配置处理
	// let seriesIsUndefined =  typeof(opt.series) === "undefined";
	// if(seriesIsUndefined) {
	// 	console.error('系列配置必须是有效的配置');
	// }
	// 回调函数处理
	opt.callback = typeof(opt.callback) === "function" ? opt.callback : function () {};
	// =================================
	// 图表配置部分
	// =================================
	const scaling = echarts.init(document.getElementById(opt.id),opt.theme);
	
	const option = {
		title: {
			text: opt.title,
			left:"7%",
			top: "4%"
		},
		tooltip: {},
		toolbox: {
			show: true,
			feature: {
				dataView: {readOnly: false},
				restore: {},
				saveAsImage: {}
			},
			top: "4%",
			right: "4%"
		},
		legend: {
			show: true,
			data: opt.legend,
			top: "4%",
            left:"left",
            itemGap:20,
            orient:'vertical'
        },
		xAxis: {
			data: opt.xAxis
		},
		yAxis: {},
		series: opt.series,
		dataZoom: opt.dataZoomShow === true ? [
			{
				type: "inside",
				start: 0,
				end: 100
			},
			{
				type: "slider",
				start: 0,
				end: 100
			}
		]: [],
		grid: {
			left: "10%",
			top: "12%",
			right: "4%",
			bottom: "14%"
		}
	};
	
	scaling.setOption(option);
	// 标题处理
	opt.title = typeof(opt.title) === "undefined" ? (function () {
		scaling.setOption({
			title: {
				show: false
			}
		});
	})() : opt.title;
	// 图注处理
	opt.legend = typeof(opt.legend) === "undefined" ? (function () {
		scaling.setOption({
			legend: {
				show: false
			}
		});
	})() : opt.legend;
	
	// 图表事件
	scaling.on("click",function (e) {
		/*$("#showChartsInfo").html(`
			所属类别：<span style="color: ${event.color}">${event.seriesName}</span>，产品名称：${event.name}，当前值：${event.value}。
		`);*/
		opt.callback(e);
	});
	
	window.onresize = scaling.resize;
}
if(typeof(exports) !== "undefined") {
	exports.barCharts = setBarCharts;
}
