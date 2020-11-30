export const idToName =	(fleetTypes, routes, fares) => {
    fares.forEach(element => {

        routes.forEach( el => {
            if (element.trip_route == el.id){
                element.trip_route = el.name
            }
        });

        fleetTypes.forEach( els => {
            if (element.fleet_type === els.id){
                element.fleet_type = els.name
            }
        });
    });
}

export const idToNameTrips = (assignTrips, routes, fleets) => {
    assignTrips.forEach(element => {
        routes.forEach( el => {
            if (element.route_name == parseInt(el.id)){
                element.route_name = el.name
            }
        });

        fleets.forEach( els => {
            if (element.fleet_registration_no === els.id){
                element.fleet_registration_no = els.registration_no
            }
        });
    });

    return assignTrips
}
