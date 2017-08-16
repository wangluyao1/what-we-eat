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
            "findFollow":findFollow,
            "findFollowByTo":findFollowByTo,
            "findFollowByFrom":findFollowByFrom,

            "updateFollow":updateFollow,
            "deleteRelation":deleteRelation,
            "allRelations":allRelations
        };

        return api;

        function allRelations() {
            var url = "/api/allRelations";
            return $http.get(url);
        }

        function createRelation(relation) {
            var url = "/api/relation";
            return $http.post(url,relation);
        }

        function findFollowByTo(toUserId) {
            var url = "/api/relation/follower/"+toUserId;
            return $http.get(url);
        }

        function findFollowByFrom(fromUserId) {
            var url = "/api/relation/following/"+fromUserId;
            return $http.get(url);
        }

        function findFollow(fromUserId,toUserId) {
            var url ="/api/relation/follow?from="+fromUserId+"&toUser="+toUserId;
            return $http.get(url);
        }

        function updateFollow(followId,follow) {
            var url ="/api/relation/follow/"+followId;
            return $http.put(url,follow);
        }

        function deleteRelation(relationId) {
            var url ="/api/relation/"+relationId;
            return $http.delete(url);
        }
    }

})();