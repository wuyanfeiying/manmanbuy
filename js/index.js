$(function () {
	var mmb = new MMB();
	//调用获取首页菜单数据的函数
	mmb.getIndexMenu();
	mmb.getMoneyCtrl();
});
//创建一个慢慢买的构造函数
var MMB = function () {

}

MMB.prototype = {
	//在原型对象上写一个baseURL API的前缀网址 本地 或者网络
	baseURI:'http://localhost:9090/api/',
	// baseURI:'http://mmb.ittun.com/api/',
	//获取首页菜单数据的函数
	getIndexMenu:function () {
		console.log(this.baseURI+'getindexmenu');
		// 1. 使用$.ajax请求API
		$.ajax({
			url:this.baseURI+'getindexmenu',
			success:function (data) {
				console.log(data);
				var html = template('indexMenuTpl',data);
				console.log(html);
				$('#nav > .mui-row').html(html);
			}
		})
	},
	getMoneyCtrl:function () {
		$.ajax({
			url:this.baseURI+'getmoneyctrl',
			success:function (data) {
				console.log(data);
				var html = template('moenyCtrlTpl',data);
				$('.content > .mui-table-view').html(html);
			}
		})
	}
}