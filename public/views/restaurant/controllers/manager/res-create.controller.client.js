/**
 * Created by Luyao on 8/14/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .controller("ResCreateController", ResCreateController);

    function ResCreateController(restaurantService,user,$location) {
        var model = this;
        model.createRestaurant = createRestaurant;

        function init() {

        }
        init();

        function createRestaurant(res) {
            res.manager = user._id;
            return restaurantService.createRestaurant(res)
                .then(function (newRes) {
                    $location.url("/restaurant/details/"+newRes._id+"/edit");
                })
        }
    }



})();
