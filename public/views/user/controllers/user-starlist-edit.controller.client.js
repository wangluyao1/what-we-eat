/**
 * Created by Luyao on 8/14/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .controller("StarListEditController", StarListEditController);

    function StarListEditController($routeParams,userService) {
        var model = this;

        model.userId = $routeParams['uid'];

        function init() {
            return userService
                .getStarList(model.userId)
                .then(function (response) {
                    model.restaurants = response.data;
                });
        }
        
        init();

    }
})();