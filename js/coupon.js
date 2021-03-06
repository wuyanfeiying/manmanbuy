$(function () {
    var mmb = new MMB();
    mmb.getcoupon();
});

var MMB = function () {

};

MMB.prototype = {
    baseUrl:'http://localhost:9090',
    //用来获取优惠券标题信息 并渲染到页面
    getcoupon:function () {
        var that = this;
        $.ajax({
            url:that.baseUrl+'/api/getcoupon',
            //再发送请求前，可以被取消。
            beforeSend:function(){
                $('#loading').show();
            },
            //请求已经完成后
            complete:function(){
                $('#loading').hide();
            },
            success:function (data) {
                var html = template('getcouponTmp',data);
                $('#main .mui-row').html(html);
            }
        })
    },
};