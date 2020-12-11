import VueCookie from 'vue-cookie';

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

const reportHeader = () => {
    let timestamp = 'Print Time: ' + (new Date()).toLocaleTimeString();
    let reportWindow = window.open('', '', 'height=650,width=900,top=100,left=150')
    reportWindow.document.write(`<html><head><title>Zawadi Bus Services Report</title>`)
    reportWindow.document.write('<style> table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%;}')
    reportWindow.document.write('td {border: 0px solid #dddddd;text-align: left;padding: 8px;}')
    reportWindow.document.write('tr:nth-child(even) {background-color: #dddddd;}')
    reportWindow.document.write('th {border-top: 2px solid #dddddd;border-bottom: 2px solid #dddddd;text-align: left;padding: 8px;}</style>')
    reportWindow.document.write('</head><body>')
    reportWindow.document.write('<table style="width:100%; border-bottom: 2px solid #dddddd;" id="data">')
    reportWindow.document.writeln(timestamp + '<br>')
    reportWindow.document.writeln('Printed by: ' +
    JSON.parse(VueCookie.get('currentUser')).user.first_name + ' ' +
    JSON.parse(VueCookie.get('currentUser')).user.last_name)
    return reportWindow
}

export const ticketReport = (data)=> {
    let reportWindow = reportHeader();
    reportWindow.document.write('<caption><span style="text-transform:uppercase"><strong>Ticket List<strong></span></caption>')
    reportWindow.document.write("<tr><th>S/N</th><th>Ticket Number</th><th>Trip Route</th>"+
                "<th>Trip Type</th><th>Passenger</th><th>Mobile</th>"+
                "<th>Travel Date</th><th>Departure Time</th><th>Ticket Cost</th></tr>");
    data.forEach((ticket,index) => {
        index += 1;
        reportWindow.document.write("<tr><td>"+ index +"</td>")
        reportWindow.document.write("<td>"+ ticket.ticket_no +"</td>")
        reportWindow.document.write("<td>"+ ticket.ticket_trip +"</td>")
        reportWindow.document.write("<td>"+ ticket.fleet_type +"</td>")
        reportWindow.document.write("<td>"+ ticket.passenger_name +"</td>")
        reportWindow.document.write("<td>"+ ticket.mobile +"</td>")
        reportWindow.document.write("<td>"+ ticket.trip_start_date +"</td>")
        reportWindow.document.write("<td>"+ ticket.departure_time +"</td>")
        reportWindow.document.write("<td>"+ ticket.price +"</td></tr>")
    });
    reportWindow.document.write('</body></html>');
    reportWindow.document.close();
    reportWindow.focus();
    reportWindow.print();
    reportWindow.close();
    return true;
}

export const printTicket = (ticket) => {
    let printTime = 'Print Time: ' + (new Date()).toLocaleTimeString();
    let ticketwindow = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150');
    ticketwindow.document.write('<style> table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%;}')
    ticketwindow.document.write('td {border: 0px solid #dddddd;text-align: left;padding: 8px;}')
    ticketwindow.document.write('tr:nth-child(even) {background-color: #dddddd;}')
    ticketwindow.document.write('th {border-top: 2px solid #dddddd;text-align: left;padding: 8px;}</style>')
    ticketwindow.document.write('</head><body>')
    ticketwindow.document.write('<table style="width:60%; border-bottom: 2px solid #dddddd;" id="data">')
    ticketwindow.document.write('<caption><span style="text-transform:uppercase"><strong>Passenger Ticket<strong></span></caption>')
    ticketwindow.document.write(`<tr><th colspan=2><i class='fas fa-bus-alt mr-1'></i>ZAWADI BUS SERVICES</th></tr>`)
    ticketwindow.document.write(`<tr><td><small>P.O.Box 770 Arua</small></td><td><small>SEAT NO. <strong> ${ ticket.seat} </strong></small></td></tr>`)
    ticketwindow.document.write(`<tr><td><small>BUS NO.<strong> <br> ${ ticket.fleet_registration_no }
                                    </strong></small></td><td><small>RECEIPT NO. <strong> <br>
                                    ${ ticket.ticket_no } </strong></small></td></tr>`)
    ticketwindow.document.write(`<tr><td colspan=2><hr></td></tr>`)
    ticketwindow.document.write(`<tr><td>
                                    <strong>NAME OF PASSENGER </strong> <br />
                                    ${ ticket.passenger_name }</td>
                                    <td><strong> JOURNEY: </strong>
                                    <br />
                                    ${ ticket.ticket_trip }</td></tr>`)
    ticketwindow.document.write(`<tr><td><strong> BOOKING DATE: </strong> <br>
                                    ${ ticket.trip_start_date }</td>
                                    <td><strong> TRIP TYPE: </strong>
                                    <br />
                                    ${ ticket.fleet_type }</td></tr>`)
    ticketwindow.document.write(`<tr><td><strong> TRAVEL DATE: </strong> <br />
                                    ${ ticket.trip_start_date }</td>
                                    <td><strong> BOOKING CLERK: </strong>
                                    <br />
                                    ${ ticket.created_by }</td></tr>`)
    ticketwindow.document.write(`<tr><td><strong> REPORTING TIME: </strong> <br />
                                    ${ ticket.departure_time }</td>
                                    <td><strong> FARE: </strong><br />
                                    ${ ticket.price }</td></tr>`)
    ticketwindow.document.write(`<tr><td colspan=2>
                                    <strong> DEPARTURE TIME: </strong><br>
                                    ${  ticket.departure_time }</td></tr>`)
    ticketwindow.document.write(`<tr><td colspan=2>
                                    <small><b> Valid Only For The Date of Travel</b></small></td></tr>`)
    ticketwindow.document.writeln(printTime + '<br><br>')
    ticketwindow.document.write('</body></html>')
    ticketwindow.document.close();
    ticketwindow.focus();
    ticketwindow.print();
    ticketwindow.close();
    return true;
}

export const userReport = (data)=> {
    let reportWindow = reportHeader();
    reportWindow.document.write('<caption><span style="text-transform:uppercase"><strong>User List<strong></span></caption>')
    reportWindow.document.write("<tr><th>S/N</th><th>Mobile</th><th>Username</th>"+
                                "<th>Email</th><th>First NAme</th><th>Last Name</th></tr>");
    data.forEach((user,index) => {
        index += 1;
        reportWindow.document.write("<tr><td>"+ index +"</td>");
        reportWindow.document.write("<td>"+ user.mobile +"</td>");
        reportWindow.document.write("<td>"+ user.username +"</td>");
        reportWindow.document.write("<td>"+ user.email +"</td>");
        reportWindow.document.write("<td>"+ user.first_name +"</td>");
        reportWindow.document.write("<td>"+ user.last_name +"</td>");
    });
    reportWindow.document.write('</body></html>');
    reportWindow.document.close();
    reportWindow.focus();
    reportWindow.print();
    reportWindow.close();
    return true;
}

export const agentReport = (data)=> {
    let reportWindow = reportHeader();
    reportWindow.document.write('<caption><span style="text-transform:uppercase"><strong>Agent List<strong></span></caption>')
    reportWindow.document.write("<tr><th>S/N</th><th>Mobile</th><th>Username</th>"+
                                "<th>Email</th><th>First NAme</th><th>Last Name</th><th>Station</th></tr>");
    data.forEach((user,index) => {
        index += 1;
        reportWindow.document.write("<tr><td>"+ index +"</td>");
        reportWindow.document.write("<td>"+ user.mobile +"</td>");
        reportWindow.document.write("<td>"+ user.username +"</td>");
        reportWindow.document.write("<td>"+ user.email +"</td>");
        reportWindow.document.write("<td>"+ user.first_name +"</td>");
        reportWindow.document.write("<td>"+ user.last_name +"</td>");
        reportWindow.document.write("<td>"+ user.station +"</td>");
    });
    reportWindow.document.write('</body></html>');
    reportWindow.document.close();
    reportWindow.focus();
    reportWindow.print();
    reportWindow.close();
    return true;
}

export const fleetReport = (data)=> {
    let reportWindow = reportHeader();
    reportWindow.document.write('<caption><span style="text-transform:uppercase"><strong>Bus List<strong></span></caption>')
    reportWindow.document.write("<tr><th>S/N</th><th>Registration No</th><th>Engine No</th>"+
                                "<th>Chasis No</th><th>Model _no</th><th>Bus Type</th><th>Layout</th><th>Total Seat</th></tr>");
    data.forEach((fleet,index) => {
        index += 1;
        reportWindow.document.write("<tr><td>"+ index +"</td>");
        reportWindow.document.write("<td>"+ fleet.registration_no +"</td>");
        reportWindow.document.write("<td>"+ fleet.engine_no +"</td>");
        reportWindow.document.write("<td>"+ fleet.chasis_no +"</td>");
        reportWindow.document.write("<td>"+ fleet.model_no +"</td>");
        reportWindow.document.write("<td>"+ fleet.fleet_type +"</td>");
        reportWindow.document.write("<td>"+ fleet.layout +"</td>");
        reportWindow.document.write("<td>"+ fleet.seat_nos +"</td>");
    });
    reportWindow.document.write('</body></html>');
    reportWindow.document.close();
    reportWindow.focus();
    reportWindow.print();
    reportWindow.close();
    return true;
}

export const fareReport = (data)=> {
    let reportWindow = reportHeader();
    reportWindow.document.write('<caption><span style="text-transform:uppercase"><strong>Fare List<strong></span></caption>')
    reportWindow.document.write("<tr><th>S/N</th><th>Bus Type</th><th>Route</th><th>Fare Per Person</th></tr>");
    data.forEach((fare,index) => {
        index += 1;
        reportWindow.document.write("<tr><td>"+ index +"</td>");
        reportWindow.document.write("<td>"+ fare.fleet_type +"</td>");
        reportWindow.document.write("<td>"+ fare.trip_route +"</td>");
        reportWindow.document.write("<td>"+ fare.price_per_person +"</td>");
    });
    reportWindow.document.write('</body></html>');
    reportWindow.document.close();
    reportWindow.focus();
    reportWindow.print();
    reportWindow.close();
    return true;
}

export const tripReport = (data)=> {
    let reportWindow = reportHeader();
    reportWindow.document.write('<caption><span style="text-transform:uppercase"><strong>Trip List<strong></span></caption>')
    reportWindow.document.write("<tr><th>S/N</th><th>Registration No</th><th>Route</th><th>Start Date</th><th>End Date</th><th>Departure</th></tr>");
    data.forEach((trip,index) => {
        index += 1;
        reportWindow.document.write("<tr><td>"+ index +"</td>");
        reportWindow.document.write("<td>"+ trip.fleet_registration_no +"</td>");
        reportWindow.document.write("<td>"+ trip.route_name +"</td>");
        reportWindow.document.write("<td>"+ trip.trip_start_date +"</td>");
        reportWindow.document.write("<td>"+ trip.trip_end_date +"</td>");
        reportWindow.document.write("<td>"+ trip.departure_time +"</td>");
    });
    reportWindow.document.write('</body></html>');
    reportWindow.document.close();
    reportWindow.focus();
    reportWindow.print();
    reportWindow.close();
    return true;
}

export const routeReport = (data)=> {
    let reportWindow = reportHeader();
    reportWindow.document.write('<caption><span style="text-transform:uppercase"><strong>Route List<strong></span></caption>')
    reportWindow.document.write("<tr><th>S/N</th><th>Route Name</th><th>Start Point</th><th>End Point</th><th>Stopage Points</th><th>Description</th></tr>");
    data.forEach((route,index) => {
        index += 1;
        reportWindow.document.write("<tr><td>"+ index +"</td>");
        reportWindow.document.write("<td>"+ route.name +"</td>");
        reportWindow.document.write("<td>"+ route.start_point +"</td>");
        reportWindow.document.write("<td>"+ route.end_point +"</td>");
        reportWindow.document.write("<td>"+ route.stopage_points +"</td>");
        reportWindow.document.write("<td>"+ route.description +"</td>");

    });
    reportWindow.document.write('</body></html>');
    reportWindow.document.close();
    reportWindow.focus();
    reportWindow.print();
    reportWindow.close();
    return true;
}