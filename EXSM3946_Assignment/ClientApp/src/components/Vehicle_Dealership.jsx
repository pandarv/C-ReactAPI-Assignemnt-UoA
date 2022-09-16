import React, { useState, useEffect } from "react";

function Vehicle_Dealership() {
	const [dealership, setDealership] = useState([]);
	const fetchData = async () => {
		const response = await fetch("/api/DealershipApi");
		const data = await response.json();
		console.log(data);
		setDealership(data);
	};
	useEffect(() => {
		fetchData();
	}, []);
	return (
		<div>
			<h1>Vehicle Dealership</h1>
			<table className="table table-striped" aria-labelledby="tabelLabel">
				<thead>
					<tr>
						<th>Dealership ID</th>
						<th>Name</th>
						<th>Manufacturer ID</th>
						<th>Address</th>
						<th>Phone Number</th>
					</tr>
				</thead>
				<tbody>
					{dealership.map((deal) => (
						<tr key={deal.id}>
							<td>{deal.id}</td>
							<td>{deal.name}</td>
							<td>{deal.manufacturerID}</td>
							<td>{deal.address}</td>
							<td>{deal.phoneNumber}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Vehicle_Dealership;
