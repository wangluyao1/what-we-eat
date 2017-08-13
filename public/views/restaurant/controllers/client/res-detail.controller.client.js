/**
 * Created by Luyao on 8/13/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .controller("ResDetailController", ResDetailController);

    function ResDetailController(resSearchService, $routeParams) {
        var model = this;
        model.restaurantKey = $routeParams['restaurantKey'];

        function init() {
            resSearchService.searchWithKey(model.restaurantKey)
                .then(function (response) {
                    model.info = response.data;
                });
            resSearchService.searchMenuWithKey(model.restaurantKey)
                .then(function (response) {
                    model.menu = response.data;
                })
        }

        init();
    }
})();
