/**
 * Created by Luyao on 8/16/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .controller("AdminRelationController", AdminRelationController);

    function AdminRelationController(relationService, $location) {
        var model = this;
        model.title = "Manage Relations";

        model.addRelation = addRelation;
        model.deleteRelation = deleteRelation;
        model.goToEdit = goToEdit;
        model.saveRelation = saveRelation;

        function init() {
            model.notEdit = true;
            refreshRelation();
        }

        init();

        function addRelation(newRelation) {
            return relationService
                .createRelation(newRelation)
                .then(function (response) {
                    refreshRelation();
                })
        }

        function deleteRelation(relationId) {
            return relationService
                .deleteRelation(relationId)
                .then(function (response) {
                    refreshRelation();
                })
        }

        function refreshRelation() {
            return relationService
                .allRelations()
                .then(function (response) {
                    model.relations = response.data;
                })
        }

        function goToEdit(relation) {
            model.notEdit = false;
        }

        function saveRelation(relation) {
            return relationService
                .updateFollow(relation._id,relation)
                .then(function (relation) {
                    model.alert = "Changes Saved";
                })
        }
    }
})();