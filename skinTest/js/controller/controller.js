/**
 * Created by Administrator on 2016/6/17.
 */
(function (w, d, $, undefined) {
    var controller = {};

    controller.ifAjaxing = false;

    controller.postSkinTest = function (params, callback) {
        $.ajax({
            type: "get",
            url: 'http://n1.jimi.la/apps_T1/WXTESTInterface/AjaxGetSkinPorductByUid.php',
//                url: 'package.json',
            data: params,
            dataType: "jsonp",
            jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
            jsonpCallback: "jsonpcallback",
            success: function (data) {
                console.log(JSON.stringify(data));
                Router.navigateTo($('#skinDescPage'));

                var str = '';
                [].forEach.call(data, function (e, i, arr) {
                    str += "<div class='stepCon'>" +
                        "<div class='step'>Step" + (i + 1) + "</div>" +
                        "<div class='stepTitle'>" + e.name + "</div>" +
                        "<div class='stepProductCon'>" +
                        getProStr(e.pro) +
                        "</div>" +
                        "</div>"
                })
                function getProStr(proArr) {
                    var str = '';
                    [].forEach.call(proArr, function (e, i, arr) {
                        str += "<div class='stepProductSec'>" +
                            "<img src=" + e.imgUrl + " class='stepProductImg'/>" +
                            getDesc(e.desc) +
                            "</div>";

                        function getDesc(desc) {
                            var str = '';
                            [].forEach.call(desc.split('|'), function (e, i, arr) {
                                str += "<div>" + e + "</div>";
                            })
                            return str;
                        }
                    });
                    return str;
                }
                $('#productRecommendPage').html(str);


                callback(data);
            },
            error: function (err) {
                console.log('ERROR!');
                console.log(err);
            }
        })
    }

    controller.appendDesc = function (params, callback) {
        $.ajax({
            type: "get",
            url: jimiHost + "/AjaxPostGetUserSkinDesc.php",
            data: {uid: 10002},
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: "jsonpcallback",
            success: function (data) {
                //console.log(JSON.stringify(data));
                var html = "";
                var len = data['desc'].length;
                for (var i = 0; i < len; i++) {
                    html += '<li>';
                    html += '<h5>' + data['desc'][i] + '</h5>';
                    html += '<p>' + data['answer'][i] + '</p>';
                    html += '</li>';
                }
                $('#skinDescPage #userdesc').html(html);
            },
            error: function (err) {
                console.log('ERROR!');
                console.log(err);
            }
        });
    }


    w.controller = controller;
})(window, document, $)
