/**
 * Created by Luyao on 8/15/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .controller("LocalResDetailController", LocalResDetailController);

    function LocalResDetailController($routeParams,restaurantService,user,reviewService,$location,userService) {
        var model = this;

        model.title = "Restaurant Detail";
        model.currentUser = user;
        model.restaurantId = $routeParams['restaurantId'];
        model.star = star;
        model.unstar = unstar;
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
            return restaurantService
                .findRestaurantById(model.restaurantId)
                .then(function (response) {
                    model.restaurant = response.data;
                    checkStar();
                    restaurantService.findPlatesByResId(model.restaurantId)
                        .then(function (response) {
                            model.plates = response.data;
                        })
                });
        }

        init();

        function checkStar() {
            return userService.getStarList(model.currentUser._id)
                .then(function (response) {
                    var list = response.data;
                    if(list.find(sameId)){
                        model.starred = true;
                        model.unstarred = false;
                    } else{
                        model.unstarred = true;
                        model.starred = false;
                    }
                })
        }

        function sameId(restaurant) {
            return restaurant._id === model.restaurantId;
        }


        function writeReview() {
            var newReview = {restaurant:model.restaurantId,user:user};
            return reviewService
                .createReview(newReview)
                .then(function (response) {
                    $location.url("/user/reviews/"+response.data._id+"/create");
                })
        }

        function star() {
            return userService
                .starRes(model.currentUser._id,model.restaurantId)
                .then(function () {
                    checkStar();
                });
        }


        function unstar() {
            return userService
                .unstarRes(model.currentUser._id,model.restaurantId)
                .then(function () {
                    checkStar();
                });
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
