/**
 * Created by Luyao on 8/14/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .controller("StarListViewController", StarListViewController);

    function StarListViewController($routeParams,userService,$location,user) {
        var model = this;
        model.title = "Favorite Restaurants";

        model.userId = $routeParams["uid"];
        model.logout = logout;
        model.goToRestaurant = goToRestaurant;

        function init() {
            if(user._id){
                model.logged = true;
                model.isUser = (user.roles === 'USER');
                model.isManager = (user.roles === 'MANAGER');
                model.isAdmin = (user.roles === 'ADMIN');
            } else{
                model.logged = false;
            }
            refreshStarList();
        }

        function refreshStarList() {
            return userService
                .getStarList(model.userId)
                .then(function (response) {
                    model.restaurants = response.data;
                });
        }
        
        init();

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

        function goToRestaurant(restaurant) {
            if(restaurant.type=== 'LOCAL'){
                $location.url("/restaurant/details/"+restaurant._id);
            } else {
                $location.url("/eatstreet/restaurant/details/"+restaurant.key);
            }
        }
    }
})();