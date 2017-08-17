/**
 * Created by Luyao on 8/16/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .controller("ReviewListController", ReviewListController);

    function ReviewListController(userService, $location, user,restaurantService) {
        var model = this;

        model.title = "My reviews";
        model.goToEdit = goToEdit;
        model.goToRestaurant = goToRestaurant;

        function init() {
            return userService.getUserReviews(user._id)
                .then(function (response) {
                    var originReviews = response.data;
                    model.reviews = reArray(originReviews);
                },function (err) {
                    console.log(err);
                })
        }

        init();

        function reArray(reviews) {
            var newArray = [];
            for(var index in reviews){
                var review = reviews[index];
                var reviewCopy = JSON.parse(JSON.stringify(review));
                var name = getName(review.restaurant);
                reviewCopy.restaurantName = name;
                newArray.push(reviewCopy);
            }
            console.log(newArray);
            return newArray;
        }

        function getName(restaurantId) {
            restaurantService.findRestaurantById(restaurantId)
                .then(function (restaurant) {
                    return restaurant.data.name;
                })
        }

        function goToRestaurant(restaurantId) {
            return restaurantService.findRestaurantById(restaurantId)
                .then(function (response) {
                    var restaurant = response.data;
                    if(restaurant.type=== 'LOCAL'){
                        $location.url("/restaurant/details/"+restaurant._id);
                    } else {
                        $location.url("/eatstreet/restaurant/details/"+restaurant.key);
                    }
                });
        }

        function goToEdit(review) {
            $location.url("/restaurant/"+review.restaurant+"/review/"+review._id+"/edit");
        }

    }
})();