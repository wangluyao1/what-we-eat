/**
 * Created by Luyao on 8/14/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .controller("ResCreateController", ResCreateController);

    function ResCreateController(restaurantService,user,$location,userService) {
        var model = this;
        model.createRestaurant = createRestaurant;
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
            if(user.restaurant !== undefined){
                $location.url("/restaurant/edit");
            }
            model.title = "Create My Restaurant";

        }
        init();

        function createRestaurant(res) {
            res.manager = user._id;
            return restaurantService.createRestaurant(res)
                .then(function (newRes) {
                    $location.url("/restaurant/edit");
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
