/**
 * Created by Administrator on 2016/6/17.
 */
(function (w, d, $, undefined) {
    var controller = {};

    controller.ifAjaxing = false;

    controller.login = function (params, callback) {
        $.ajax({
            type: "get",
            url: jimiHost + '/login.php',
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: "jsonpcallback",
            data: params,
            success: function (data) {
                callback(data);
            },
            error: function (err) {
                console.log('ERROR!');
                console.log(err);
            }
        });
    };

    controller.register = function (params, callback) {
        $.ajax({
            type: "get",
            url: jimiHost + '/register.php',
            dataType: "jsonp",
            jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
            jsonpCallback: "jsonpcallback",
            data: params,
            success: function (data) {
                callback(data);
            },
            error: function (err) {
                console.log('ERROR!');
                console.log(err);
            }
        });
    }

    w.controller = controller;
})(window, document, $)
