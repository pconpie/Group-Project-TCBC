myApp.controller('AdminController', ['AdminService', 'RideDetailService', function (AdminService, RideDetailService) {
    console.log('AdminController created');
    let self = this;
    self.pendingApprovals = {};

    self.loadRidesForApproval = function () {
        AdminService.getPendingApprovedRides().then((response) => {
            console.log('Controller, got the rides pending approval: ', response);
            self.pendingApprovals.list = response;
        })
    }
    self.loadRidesForApproval();

    self.rideDetailReveal = function (ride) {
        console.log('ride to edit: ', ride);

        RideDetailService.adminEditRideDetailModal(ride);
    }
    self.approveRide = function (rideId) {
        console.log('ride to be approved: ', rideId);
        AdminService.approveRide(rideId).then((response) => {
                console.log('service back after successully approving ride: ', response);
                swal("Ride has been Approved", '', "success");
                self.loadRidesForApproval();
            })
            .catch((err) => {
                console.log('failure to approve ride: ', err);

            })
    }

    self.getRoles = function () {
        console.log('in get roles');
        AdminService.getRoles().then((response) => {
                console.log('service back with roles:', response);
                self.getUserRoles = AdminService.getUserRoles;

            })
            .catch((err) => {
                console.log('did not get user roles', err);
            })
    }
    self.getRoles();

    self.findRider = function (rider) {
        console.log('in find rider', rider);
        AdminService.findRider(rider).then((response) => {
                self.riderInfo = AdminService.riderInfo;
                console.log(self.riderInfo);
                // self.rider = '';
            })
            .catch((err) => {
                console.log('did not get rider', err);
            })
    }

    self.changeRole = function (roles) {
        console.log('in change role ', roles);
        AdminService.changeRole(roles).then((response) => {
                self.roleChange = AdminService.roleChange;
                console.log(self.roleChange);
            })
            .catch((err) => {
                console.log('did not change role', err);
            })

    }
}]);