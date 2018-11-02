$(function () {
    var mmb = new MMB();
    mmb.getQueryCoupon();
    mmb.couponproductHeader();
    mmb.couponproductMask();
});

var MMB = function () {

};

MMB.prototype = {
    baseUrl: 'http://localhost:9090',
    //根据优惠券标题id获取该标题对应的列表
    getQueryCoupon: function () {
        var that = this;
        that.couponid = that.getQueryString('couponid');
        // console.log(this.couponid);

        //发送ajax,渲染页面
        $.ajax({
            url: that.baseUrl + '/api/getcouponproduct',
            data: {couponid: that.couponid},
            success: function (data) {
                // console.log(data);
                var html = template('couponproductTmp', data);
                $('#main .discount_product ul').html(html);
                //获取后台传过来的数据里的商品id
                // var resultObj = data.result[0];
                // console.log(resultObj.couponProductId);

                //点击的时候,根据ID来获取图片(思路:用户点击对应的商品,MASK显示更换后的图片,首要从后台获取图片的数据,遍历数据data,然后获取用户每次点击图片的id,通过ID找到每个商品的图片信息,最后根据每次点击的id的图片数更换图片即可)
                $('#main .discount_product ul li').on('click',function () {


                    // console.log(this.id);//用户点击时候的对应的商品的id
                    // console.log(resultObj.couponProductImg);
                    for (var i=0; i<data.result.length; i++){
                        var resultObj = data.result[i];

                        //如果用户点击id等于数据里的id,那么就取出来图片信息
                        //用户点击哪个商品,就出现哪个商品的图片信息
                        if (resultObj.couponProductId==this.id) {
                            // console.log(resultObj.couponProductImg);
                            $('.mask .imgBox li').html(resultObj.couponProductImg)
                        }
                    }

                    $('.mask').show();
                    // console.log($('.mask .imgBox li img').attr()[0]);
                    // var a = $('.mask .imgBox li img').attr()[0];
                    // console.log(a);

                })
            }
        })
    },
    //顶部标题和底部标题根据id变化
    couponproductHeader: function () {
        var that = this;
        that.couponid = that.getQueryString('couponid');
        if (that.couponid == 1) {
            $('#header .content ').html('必胜客优惠券');
            $('#footer .footer_title ').html('必胜客优惠券');
        } else if (that.couponid == 2) {
            $('#header .content ').html('棒约翰优惠券');
            $('#footer .footer_title ').html('棒约翰优惠券');
        }else if (that.couponid == 3) {
            $('#header .content ').html('哈根达斯优惠券');
            $('#footer .footer_title ').html('哈根达斯优惠券');
        }
    }
    ,
    //隐藏面板
    couponproductMask:function(){
        var errorButton =$('.mask .error');
        errorButton.on('click',function () {
            // console.log(this);
            $('.mask').hide();
        })
    },
    //js获取url指定参数值(解决了中文乱码的问题)
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = decodeURI(window.location.search).substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
};