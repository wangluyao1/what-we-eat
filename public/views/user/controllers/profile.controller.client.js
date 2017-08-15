/**
 * Created by Luyao on 7/21/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .controller("ProfileController", ProfileController);

    function ProfileController(userService, $location, user) {
        var model = this;
        //model.userId = $routeParams["uid"];
        model.currentUser = user;
        model.userId = user._id;

        model.updateUser = updateUser;
        model.unregister = unregister;
        model.goToStore = goToStore;
        model.goToStarList = goToStarList;

        function init() {
            //model.user = userService.findUserById(model.userId);
            var promise = userService.findUserById(model.userId);
            promise.then(function (response) {
                model.user = response.data;
            })

        }

        init();

        function updateUser(user) {
            var promise = userService.updateUser(model.userId, user);
            promise.then(function (response) {
                //todo: remind update success
            });
        }

        function unregister() {
            userService.deleteUser(model.userId)
                .then(function (response) {
                    console.log(response.status);
                    if (response.status === 200) {
                        $location.url("/login");
                    }
                });

        }

        function goToStore() {
            if(!model.currentUser.restaurant){
                $location.url("/restaurant/create");
            } else{
                $location.url("/restaurant/details/"+user.restaurant+"/edit");
            }
        }

        function goToStarList() {
            $location.url("/user/starlist/"+user._id);
        }
    }
})();