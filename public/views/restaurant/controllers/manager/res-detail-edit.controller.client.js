/**
 * Created by Luyao on 8/13/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .controller("ResDetailEditController", ResDetailEditController);

    function ResDetailEditController(restaurantService,plateService,user) {
        var model = this;


        //model.user = user;
        model.title = "Edit My Restaurant";
        model.restaurantId = user.restaurant;
        model.addPlate = addPlate;
        model.saveMenu = saveMenu;
        model.updateRestaurant = updateRestaurant;
        model.removePlate = removePlate;
        model.refreshPlates = refreshPlates();

        function init() {
            return restaurantService
                .findRestaurantById(model.restaurantId)
                .then(function (response) {
                    model.res = response.data;
                    refreshPlates();
                });
        }
        init();

        function updateRestaurant(res) {
            return restaurantService
                .updateRestaurant(res._id,res)
                .then(function (response) {
                    model.alert="Restaurant Changes Save Success!";
                })
        }


        function saveMenu() {
            return model.plates.forEach(function (plate) {
                    return plateService
                        .updatePlate(plate._id,plate)
                        .then(function (response) {
                            model.alert="Menu Save Success";
                        })
                });
        }

        function addPlate(newPlate) {
            model.saveMenu();
            var copy = JSON.parse(JSON.stringify(newPlate));
            return plateService
                .createPlate(model.restaurantId,copy)
                .then(function () {
                    model.alert="Add Plate Success";
                    model.toAddPlate = null;
                    refreshPlates();
                });
        }

        function refreshPlates() {
            return restaurantService
                .findPlatesByResId(model.restaurantId)
                .then(function (response) {
                    model.plates = response.data;
                })
        }

        function removePlate(plate) {
            return plateService
                .deletePlate(plate._id)
                .then(function () {
                    refreshPlates();
                })
        }
    }
})();
