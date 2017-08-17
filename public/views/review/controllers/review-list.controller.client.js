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
                    model.reviews = originReviews;
                },function (err) {
                    console.log(err);
                })
        }

        init();

        // function reArray(reviews) {
        //     var newArray = [];
        //     for(var index in reviews) {
        //         var review = reviews[index];
        //         var name = "";
        //          restaurantService.findRestaurantById(review.restaurant)
        //             .then(function (restaurant) {
        //                 name = restaurant.data.name;
        //             });
        //         var reviewCopy = {
        //             restaurantName: name, content: review.content,
        //             _id: review._id, type: review.type,restaurant:review.restaurant
        //         };
        //         newArray.push(reviewCopy);
        //     }
        //         console.log(newArray);
        //         return newArray;
        // }

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