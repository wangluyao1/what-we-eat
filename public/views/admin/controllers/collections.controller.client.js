/**
 * Created by Luyao on 8/15/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .controller("AdminCollectionsController", AdminCollectionsController);

    function AdminCollectionsController($location) {
        var model = this;
        model.title = "Collections";
    }
})();
