/**
 * Created by Administrator on 2016/11/3.
 */

(function (w) {
    var pageManager = {
        $container: $('body'),
        pageName: null,
        defaultPageName: 'conInput',
        //orihtml: null,
        //oriscript: null,
        //_allPagesName: [],
        //_defaultPageName: 'home',
        //_pageNameStacks: [],
        init: function () {
            var that = this;
            var state = history.state || {};
            var pageName = state.pageName || pageManager.defaultPageName
            pageManager.go(pageName);


            window.onpopstate = function (e) {
                var state = e.state || {};
                var pageName = state.pageName || that.defaultPageName;
                that.go(pageName);
            }
        },

        go: function (pageName) {
            var that = this;
            if (pageName == that.pageName) {
                return;
            }
            that.$container.find('#' + pageName).show().siblings('.container').hide();
        },
        goPush: function (pageName) {
            var that = this;
            if (pageName == that.pageName) {
                return;
            }
            that.go(pageName);

            var state = {pageName: pageName};
            history.pushState(state, '', '?x=' + pageName);
        },
    }
    w.pageManager = pageManager;
    pageManager.init();
})(window)
