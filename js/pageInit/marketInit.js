;
(function () {
    var conInput = {
        $container: $('#conInput'),
        pageName: 'conInput',
        JM: {},
        init: function () {
            this.createDom();
            this.initCSS();
            this.bindEvent();
        },
        createDom: function () {
        },
        initCSS: function () {
        },
        bindEvent: function () {
            var that = this;
            this.$C = this.$container;
            var $bottom = this.$C.find('.bottom');
            var $barCodeMenu = this.$C.find('.barCodeMenu');
            var $handInputCon = this.$C.find('.handInputCon');
            var $barcode = this.$C.find('#barcode');


            this.$C.find('#finishInsert').click(function () {
                pageManager.goPush('conProductList');
                conProductList._appendProductList();
            })
            this.$C.find('#barcode')
                .focus(function () {
                    $bottom.hide();
                }).blur(function () {
                    $bottom.show();
                });

            this.$C.find('#saoma').click(function () {
                wx.scanQRCode({
                    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ["barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                    success: function (res) {
                        var errMsg = res.errMsg;
                        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                        var lineCode = result.split(',')[1];

                        that._ajaxBarcode(lineCode);
                    }
                });
            });

            this.$C.find('#shoudong').click(function () {
                $barCodeMenu.slideUp();
                $handInputCon.slideDown();
                $barcode.focus();
            });

            this.$C.find('#confirm').click(function () {
                var lineCode = $barcode.val();
                if (lineCode.trim() == '') {
                    return;
                }
                that._ajaxBarcode(lineCode);
            });
            this.$C.find('#cancel').click(function () {
                $barCodeMenu.slideDown();
                $handInputCon.slideUp();
            });

        },
        _ajaxBarcode: function (lineCode) {
            var $conMatch = $('#conMatch');
            controller.checkLineCode({
                jsoncallback: 1,
                regcode: lineCode,
            }, function (json) {
                if (Object.prototype.toString.call(json) == "[object Array]") {


                    var product = json[0];
                    var pid = product.pid;
                    var imgUrl = product.imgUrl || 'img/logo.jpg';
                    var pname = product.pname;
                    var category = product.category;
                    var brand = product.brand;

                    $conMatch.find('#pImg').attr('src', imgUrl);
                    $conMatch.find('#pName').html(pname);
                    $conMatch.find('#pBrand').html('品牌：' + brand);
                    $conMatch.find('#pCat').html('分类：' + category);
                    $conMatch.find('#pBarcode').html('条码：' + lineCode);

                    pageManager.go('conMatch');
                    $conMatch.find('#matchCon').show();
                    $conMatch.find('#notMatchCon').hide();

                    //product应该是数据层的json
                    GM.product = product;
                    GM.product.lineCode = lineCode;

                } else {
                    pageManager.go('conMatch');
                    $conMatch.find('#matchCon').hide();
                    $conMatch.find('#notMatchCon').show();
                    GM.product = null;
                }
            })
        },
        updateProNum: function () {
            this.$container.find('.alreadyInsert').html('已录入产品(' + GM.productList.length + ')');
        },
    }
    window.conInput = conInput;
})
(window, document, $, 'conInput')
;
(function () {
    var conMatch = {
        $container: $('#conMatch'),
        pageName: 'conMatch',
        JM: {},
        init: function () {
            this.createDom();
            this.initCSS();
            this.bindEvent();
        },
        createDom: function () {
        },
        initCSS: function () {
        },
        bindEvent: function () {
            var that = this;
            this.$C = this.$container;

            //conMatch 中 取消关联 直接返回输入界面................
            this.$C.find('#cancelMatch').click(function () {
                pageManager.go('conInput');
            });
            //conMatch 中 关联 如果录入过则直接返回 没录入过则存库................
            this.$C.find('#finishMatch').click(function () {
                var index = _.findLastIndex(GM.productList, {lineCode: GM.product.lineCode});
                //没录过
                if (index == -1) {
                    GM.productList.push(GM.product);

                    controller.saveProduct(GM.product, function () {
                        GM.product = null;
                        alert('关联成功');
                        conInput.updateProNum();
                        pageManager.go('conInput');
                    })

                } else {
                    GM.product = null;
                    alert('该产品已被录入');
                    pageManager.go('conInput');
                }
            });


            //notMatch..................................................
            this.$C.find('#notMatchBack').click(function () {
                pageManager.go('conInput');
            });
        },

    }
    window.conMatch = conMatch;
})
(window, document, $, 'conMatch')
;
(function () {
    var conProductList = {
        $container: $('#conProductList'),
        pageName: 'conProductList',
        JM: {},
        init: function () {
            this.createDom();
            this.initCSS();
            this.bindEvent();
        },
        createDom: function () {
        },
        initCSS: function () {
        },
        bindEvent: function () {
            var that = this;
            this.$C = this.$container;

            this.$C.find('#productListGo').click(function () {
                pageManager.goPush('conBrandSet');
                conBrandSet._appendHotBrand();
            });
            this.$C.find('#productListBack').click(function () {
                history.back();
            });
        },
        _appendProductList: function () {
            var that = this;
            this.$C = this.$container;
            var str = '';

            [].forEach.call(GM.productList, function (e, i, arr) {
                str += "<span class='productSec listSec'>" +
                    "<img src=" + e.imgUrl + " />" +
                    "<div class='pSecTxt'>" + e.pname + "</div>" +
                    "<div class='pSecDelete'>×</div>" +
                    "</span>"
            })
            this.$C.find('#productListCon').html(str);
        }
    }
    window.conProductList = conProductList;
})
(window, document, $, 'conProductList')
;
(function () {
    var conBrandSet = {
        $container: $('#conBrandSet'),
        pageName: 'conBrandSet',
        JM: {},
        init: function () {
            this.createDom();
            this.initCSS();
            this.bindEvent();
        },
        createDom: function () {
        },
        initCSS: function () {
        },
        bindEvent: function () {
            var that = this;
            this.$C = this.$container;
        },
        _appendHotBrand: function () {
            var that = this;
            controller.direct(jimiHost,
                'getHot.php', {
                    uid: GM.uid
                }, function (json) {
                    //that.$container.html(JSON.stringify(json));
                })
        },
    }
    window.conBrandSet = conBrandSet;
})
(window, document, $, 'conProductList')
