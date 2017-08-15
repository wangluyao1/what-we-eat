/**
 * Created by Luyao on 8/13/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .controller("ResDetailEditController", ResDetailEditController);

    function ResDetailEditController($routeParams,restaurantService,plateService,user) {
        var model = this;

        model.user = user;
        model.addPlate = addPlate;
        model.saveMenu = saveMenu;
        model.updateRestaurant = updateRestaurant;

        model.restaurantKey = $routeParams['restaurantKey'];

        function init() {
            return restaurantService
                .findRestaurantById(model.restaurantKey)
                .then(function (response) {
                    model.res = response.data;
                    return restaurantService
                        .findPlatesByResId(model.restaurantKey)
                        .then(function (response) {
                            model.plates = response.data;
                        });
                });
        }
        init();

        function updateRestaurant(res) {
            return restaurantService
                .updateRestaurant(res._id,res)
                .then(function (response) {
                    model.alert="Save Success!";
                })
        }


        function saveMenu() {
            return model.plates.forEach(function (plate) {
                    return plateService
                        .updatePlate(plate._id,plate)
                        .then(function (response) {
                            model.alert="Save Success";
                        })
                });
        }

        function addPlate(newPlate) {
            var copy = JSON.parse(JSON.stringify(newPlate));
            return plateService
                .createPlate(model.restaurantKey,copy)
                .then(function () {
                    model.alert="Add Plate Success";
                    model.toAddPlate = null;
                    return restaurantService
                        .findPlatesByResId(model.restaurantKey)
                        .then(function (response) {
                            model.plates = response.data;
                        })
                });
        }



        
    }
})();
