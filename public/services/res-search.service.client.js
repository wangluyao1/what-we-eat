/**
 * Created by Luyao on 7/20/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .service("resSearchService", resSearchService);

    function resSearchService($http) {
        var ACCESS_TOKEN ='0267164ded1cc6a1';

        var api = {
            "searchWithAddress": searchWithAddress,
            "searchWithKey": searchWithKey,
            "searchMenuWithKey": searchMenuWithKey,
            "searchWithKeywordAndAddress": searchWithKeywordAndAddress
        };

        return api;
        
        function searchWithKeywordAndAddress(address,keyword) {
            return $http({
                method: 'GET',
                url: 'https://api.eatstreet.com/publicapi/v1/restaurant/search',
                params: {
                    'street-address': address,
                    'search':keyword,
                    'access-token' : ACCESS_TOKEN
                }
            });
        }
        
        function searchWithAddress(keyword) {
            return $http({
                method: 'GET',
                url: 'https://api.eatstreet.com/publicapi/v1/restaurant/search',
                params: {
                    'street-address': keyword,
                    'access-token' : ACCESS_TOKEN
                }
            });
        }

        function searchWithKey(restaurantKey) {
            return $http({
                method: 'GET',
                url: 'https://api.eatstreet.com/publicapi/v1/restaurant/'+ restaurantKey,
                params: {
                    'access-token' : ACCESS_TOKEN,
                    'street-address' : "360 Huntington Ave,Boston,MA"
                }
            });
        }

        function searchMenuWithKey(restaurantKey) {
            return $http({
                method: 'GET',
                url: 'https://api.eatstreet.com/publicapi/v1/restaurant/'+ restaurantKey +'/menu',
                params: {
                    'access-token' : ACCESS_TOKEN
                }
            });
        }


    }

})();