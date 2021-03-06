/**
 * Created by Luyao on 8/14/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .service("plateService", plateService);

    function plateService($http) {

        var api = {
            "createPlate":createPlate,
            "findPlateById":findPlateById,
            "updatePlate":updatePlate,
            "deletePlate":deletePlate,
            'allPlates':allPlates
        };
        return api;

        function allPlates() {
            var url = "api/allPlates";
            return $http.get(url);
        }

        function createPlate(resId,plate) {
            var url = "/api/plate";
            plate.restaurant = resId;
            return $http.post(url,plate);
        }

        function findPlateById(plateId) {
            var url = "/api/plate/"+plateId;
            return $http.get(url);
        }

        function updatePlate(plateId,plate) {
            var url = "/api/plate/"+plateId;
            return $http.put(url,plate);
        }

        function deletePlate(plateId) {
            var url = "/api/plate/"+plateId;
            return $http.delete(url);
        }
    }
})();
