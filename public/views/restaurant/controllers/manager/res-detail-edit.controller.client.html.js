/**
 * Created by Luyao on 8/13/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .controller("ResDetailEditController", ResDetailEditController);

    function ResDetailEditController($routeParams) {
        var model = this;

        model.plates = [{name:"plate",description:"description",price:"s"}];

        model.addPlate = addPlate;
        model.saveMenu = saveMenu;

        model.restaurantKey = $routeParams['restaurantKey'];

        function init() {

        }
        init();

        
        function saveMenu() {

        }

        function addPlate(newPlate) {
            var copy = JSON.parse(JSON.stringify(newPlate));
            model.plates.push(copy);
            model.toAddPlate = null;
        }



        
    }
})();
