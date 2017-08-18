/**
 * Created by Luyao on 8/11/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .controller("HomeController", HomeController);

    function HomeController($location,userService,user) {
        var model = this;
        model.user = user;

        model.searchRestaurants = searchRestaurants;
        model.searchUserByUsername = searchUserByUsername;
        //model.searchLocalRes = searchLocalRes;
        model.logout = logout;

        function init() {
            if(user._id){
                model.logged = true;
                model.notLogged = false;
                model.isUser = (model.user.roles === 'USER');
                model.isManager = (model.user.roles === 'MANAGER');
                model.isAdmin = (model.user.roles === 'ADMIN');
            } else{
                model.notLogged = true;
                model.logged = false;
            }
        }

        init();

        function searchRestaurants(address,keyword) {
                if(!address){
                    model.alert = "Please Enter Your Address.";
                    return;
                }
                if(!keyword){
                    model.alert = "Please Enter keyword.";
                    return;
                }
                $location.url("/search/res/address/"+address+"/keyword/"+keyword);
        }

        // function searchRestaurantsByAddress(address) {
        //     resSearchService.searchWithAddress(address)
        //         .then(function (response) {
        //             var result = response.data;
        //             model.restaurants = result['restaurants'];
        //             model.localRestaurants = null;
        //             model.usersResult =null
        //         });
        // }

        // function searchLocalRes(keyword) {
        //     if(!keyword){
        //         model.alert = "Please Enter keyword."
        //     }
        //     $location.url("/search/localRes/address/na/keyword/"+keyword);
        // }

        function searchUserByUsername(username) {
            if(!username){
                model.alert = "Please Enter keyword."
            }
            $location.url("/search/user/address/na/keyword/"+username);
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