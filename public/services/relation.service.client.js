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
            //find
            //1.follow
            "findFollow":findFollow,
            "findFollowByTo":findFollowByTo,
            "findFollowByFrom":findFollowByFrom,

            "updateFollow":updateFollow,

            "deleteRelation":deleteRelation
        };

        return api;

        function createRelation(relation) {
            var url = "/api/relation";
            $http.post(url,relation);
        }

        function findFollowByTo(toUserId) {
            var url = "/api/relation/follower/"+toUserId;
            $http.get(url);
        }

        function findFollowByFrom(fromUserId) {
            var url = "/api/relation/following/"+fromUserId;
            $http.get(url);
        }

        function findFollow(fromUserId,toUserId) {
            var url ="/api/relation/follow?from="+fromUserId+"&toUser="+toUserId;
            $http.get(url);
        }

        function updateFollow(followId) {
            var url ="/api/relation/follow/"+followId;
            $http.put(url);
        }

        function deleteRelation(relationId) {
            var url ="/api/relation/"+relationId;
            $http.delete(url);
        }
    }

})();