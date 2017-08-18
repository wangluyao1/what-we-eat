/**
 * Created by Luyao on 8/14/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .controller("StarListEditController", StarListEditController);

    function StarListEditController(userService,user,$location,reviewService) {
        var model = this;
        model.title = "Favorite Restaurants";

        model.userId = user._id;
        model.currentUser = user;
        model.logout = logout;
        model.unStarRes = unStarRes;
        model.goToRestaurant = goToRestaurant;
        model.writeReview = writeReview;
        model.logout = logout;

        function init() {
            if(user._id){
                model.logged = true;
                model.isUser = (user.roles === 'USER');
                model.isManager = (user.roles === 'MANAGER');
                model.isAdmin = (user.roles === 'ADMIN');
            } else{
                model.logged = false;
            }
            if(user._id) {
                model.logged = true;
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

        function unStarRes(resId) {
            return userService.
                unstarRes(model.currentUser._id,resId)
                .then(function (response) {
                    refreshStarList();
                });

        }

        function goToRestaurant(restaurant) {
            if(restaurant.type=== 'LOCAL'){
                $location.url("/restaurant/details/"+restaurant._id);
            } else {
                $location.url("/eatstreet/restaurant/details/"+restaurant.key);
            }
        }

        function writeReview(restaurant) {
            var newReview = {restaurant:restaurant._id,user:user};
            return reviewService
                .createReview(newReview)
                .then(function (response) {
                    $location.url("/user/reviews/"+response.data._id+"/create");
                })
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }
    }
})();