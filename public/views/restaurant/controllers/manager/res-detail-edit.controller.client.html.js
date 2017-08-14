/**
 * Created by Luyao on 8/13/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .controller("ResDetailEditController", ResDetailEditController);

    function ResDetailEditController($routeParams,restaurantService,plateService) {
        var model = this;

        model.addPlate = addPlate;
        model.saveMenu = saveMenu;

        model.restaurantKey = $routeParams['restaurantKey'];

        function init() {
            return restaurantService
                .findPlatesByResId(model.restaurantKey)
                .then(function (plates) {
                    model.plates = plates;
                });
        }
        init();

        
        function saveMenu() {
                model.plates.forEach(function (plate) {
                    return plateService
                        .updatePlate(plate._id,plate)
                        .then(function (response) {
                            console.log(response);
                        })
                })
        }

        function addPlate(newPlate) {
            var copy = JSON.parse(JSON.stringify(newPlate));
            plateService.createPlate(model.restaurantKey,copy);
            model.toAddPlate = null;
        }



        
    }
})();
