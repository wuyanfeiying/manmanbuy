/*  使用JS动态变化根元素的字体大小
*   公式 = 当前屏幕宽度 / 标准屏幕宽度 * 标准屏幕的根元素字体大小
*   标准屏幕:如果设计稿是750px,一般使用375px作为标准屏幕
*   假设当前标准屏幕的根元素字体大小为 100px (计算起来方便),
*   为什么不是用1px作为当前标准屏幕的根元素字体大小?
*   因为浏览器默认最小的字体是12px,所以100px最好计算
*/

/*
*   1.获取当前屏幕的宽度
*   2.定义标准屏幕宽度(假设375px)
*   3.默认的根元素字体大小
*   4.计算当前屏幕对应的根元素字体大小
*   5.把当前计算的根元素的字体大小设置到html上面
*   6.添加一个屏幕宽度变化的事件
*/

window.addEventListener('load', function () {

    window.addEventListener('resize', setHTMLFontSize);//6
    setHTMLFontSize();

//动态变化根元素的字体大小
    function setHTMLFontSize() {
        var windowWidth = document.documentElement.offsetWidth;//1
        //
        if (windowWidth > 640) {
            windowWidth = 640;
        } else if (windowWidth < 320) {
            windowWidth = 320;
        }
        var standardWidth = 375;//2
        var standardFontSize = 100;//3
        // var nowFontSize = windowWidth / standardWidth * standardFontSize + 'px';//4

        document.querySelector('html').style.fontSize = windowWidth / standardWidth * standardFontSize + 'px';//5


    }
});
