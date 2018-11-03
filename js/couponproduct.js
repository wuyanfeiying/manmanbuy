$(function () {
    var mmb = new MMB();
    mmb.deleteproduct();
    mmb.editproduct();
    mmb.getQueryCoupon();
    mmb.couponproductHeader();
    mmb.couponproductMask();
    mmb.initScroll();
    mmb.slider();
});

var MMB = function () {

};

MMB.prototype = {
    baseUrl: 'http://localhost:9090',
    //根据优惠券标题id获取该标题对应的列表(内含点击图片,出现遮罩层)
    getQueryCoupon: function () {
        var that = this;
        that.couponid = that.getQueryString('couponid');
        // console.log(this.couponid);

        //发送ajax,渲染页面
        $.ajax({
            url: that.baseUrl + '/api/getcouponproduct',
            data: {couponid: that.couponid},
            //再发送请求前，可以被取消。
            beforeSend:function(){
                $('#loading').show();
            },
            //请求已经完成后
            complete:function(){
                $('#loading').hide();
            },
            success: function (data) {
                // console.log(data);
                var html = template('couponproductTmp', data);
                $('#main .discount_product ul').html(html);
                //获取后台传过来的数据里的商品id
                // var resultObj = data.result[0];
                // console.log(resultObj.couponProductId);

                //点击的时候,根据ID来获取图片(思路:用户点击对应的商品,MASK显示更换后的图片,首要从后台获取图片的数据,遍历数据data,然后获取用户每次点击图片的id,通过ID找到每个商品的图片信息,最后根据每次点击的id的图片数更换图片即可)
                $('#main .discount_product ul li ').on('tap',function () {


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
    //滑动模块删除按钮
    deleteproduct:function(){
        $('#main .discount_product').on('tap', '.btn-delete', function() {
            mui.confirm('您真的要删除吗?', '特别提醒:', ['确定', '取消'],function () {

            });
            $('.mask').hide();
        });
    },
    //滑动模块编辑按钮
    editproduct:function(){
        $('#main .discount_product').on('tap', '.btn-edit', function() {
            mui.confirm('您确定要编辑吗?', '特别提醒:', ['确定', '取消'],function () {

            });
            $('.mask').hide();
        });
    },
    //隐藏面板
    couponproductMask:function(){
        var errorButton =$('.mask .error');
        errorButton.on('click',function () {
            // console.log(this);
            $('.mask').hide();
        })
    },
    //隐藏面板轮播图
    slider:function(){
        mui.init({
            swipeBack:true //启用右滑关闭功能
        });
    },
    //初始化区域滚动
    initScroll:function(){
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            scrollY: true, //是否竖向滚动
            scrollX: false, //是否横向滚动
            startX: 0, //初始化时滚动至x
            startY: 0, //初始化时滚动至y
            indicators: false, //是否显示滚动条
            bounce: true //是否启用回弹
        });
    },
    //回到顶部
    callbackTop:function(){
        $('#footer .mmb_foot .callbackTop').on('tap',function () { 
            // 快速回滚到该区域顶部
            mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,100);//100毫秒滚动到顶
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