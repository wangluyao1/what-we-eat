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
            if(user.restaurant !== undefined){
                $location.url("/restaurant/edit");
            }
            model.title = "Create My Restaurant";

        }
        init();

        function createRestaurant(res) {
            res.manager = user._id;
            return restaurantService.createRestaurant(res)
                .then(function (newRes) {
                    $location.url("/restaurant/edit");
                })
        }
    }



})();
