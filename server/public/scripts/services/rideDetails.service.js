myApp.service('RideDetailService', ['$http', '$location', '$mdDialog', function ($http, $location , $mdDialog) {
    console.log('RideDetailService Loaded');
    let self = this;
    self.rides = {
        list: []
    }

    self.getRideDetails = function () {
        return $http.get('/rideDetails')
            .then((response) => {
                console.log(response.data);
                self.rides.list = response.data.details;
            })
            .catch((err) => {
                console.log(err);
            })
    }
    self.getRideDetails();

    self.loadWelcomeModal = function (ride, ev) {
        $mdDialog.show({
            controller: RideDetailController,
            controllerAs: 'vm',
            templateUrl: '../views/partials/ride-detail-modal.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            resolve: {
                item: function () {
                    return ride;
                }
            }
        })

    }

    function RideDetailController($mdDialog, item , RideDetailService) {
        const self = this;
        self.rides = RideDetailService.rides;
        self.ride = item;
        self.user = {
            loggedIn: false
        };
        self.hide = function () {
            $mdDialog.hide();
        };

        self.cancel = function () {
            $mdDialog.cancel();
        };

        self.success = function (answer) {
            // console.log('answer', answer);
            swal(answer, '', {
                className: "success-alert",
            });
            // $mdDialog.hide(answer);
        };
        self.error = function (answer) {
            // console.log('answer', answer);
            swal(answer, '', 'error', {
                className: "error-alert",
            });
            // $mdDialog.hide(answer);
        };
    }
}]);