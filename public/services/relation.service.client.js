/**
 * Created by Luyao on 7/20/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .service("relationService", relationService);

    function relationService($http) {

        var api = {
            "createRelation": createRelation,
            "findRelation":findRelation,
            "findRelationByTo":findRelationByTo,
            "findRelationByFrom":findRelationByFrom,
            "findRelationByToAndFrom":findRelationByToAndFrom,
            "deleteRelation":deleteRelation
        };

        return api;

        function createRelation(from,to) {
            var url = "/relation";
            $http.post(url,{from:from,toUser:to});
        }

        function findRelationByTo(toUser) {
            var url = "/relation?toUser="+toUser;
            $http.get(url);
        }

        function findRelationByFrom(from) {
            var url = "/relation?from="+from;
            $http.get(url);
        }

        function findRelationByToAndFrom(from,to) {
            var url ="/relation?from="+from+"&toUser="+to;
            $http.get(url);
        }

        function deleteRelation(from,to) {
            var url ="/relation?from="+from+"&toUser="+to;
            $http.delete(url);
        }



    }

})();