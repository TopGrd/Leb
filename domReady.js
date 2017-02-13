//window.onload = sdk.createFrame;

/**
 * [domReady]
 * @param  {Function} fun 执行的函数
 * @return {null}
 */

var isReady = false,
    scrollIntervalId,
    queue = [];
function domReady(callback) {

    var testDiv,
        isTop;
    // justage
    if (domReady.done)
        return callback();

    if (!isReady || queue != null) {
        // 把参数中的函数放入执行队列
        queue.push(callback);
    }
    if (window.addEventListener) {
        window.addEventListener('load', isDOMReady, false);
    } else {
        window.attachEvent('onload', isDOMReady);

        testDiv = document.createElement('div');
        try {
            isTop = window.frameElement === null;
        } catch (e) {}
        // 判断IE http://javascript.nwbox.com/IEContentLoaded/
        if (testDiv.doScroll && isTop && window.external) {
            scrollIntervalId = setInterval(function() {
                try {
                    testDiv.doScroll();
                    isDOMReady();
                } catch (e) {}
            }, 30);
        }

    }

    if (document.readyState === "complete") {
        isDOMReady();
    }

}

function isDOMReady() {
    if (!isReady) {
        isReady = true;
        if (scrollIntervalId) {
            clearInterval(scrollIntervalId);
        }

        runFunction();
    }
}

function runFunction() {

    if (domReady.done)
        return false;

    // 执行所有正在队列中的函数
    for (var i = 0; i < queue.length; i++) {
        queue[i]();
        //queue.shift();
        // 防止不执行内嵌domReady函数
        if (queue.length == 0) {
            queue = null;
            domReady.done = true;
        }
    }

}
