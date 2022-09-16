import React, { useState, useEffect } from "react";

function Vehicle() {
	const [vehicle, setVehicle] = useState([]);

	const fetchData = async () => {
		const response = await fetch("/api/VehicleApi");
		const data = await response.json();
		console.log(data);
		setVehicle(data);
	};
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div>
			<h1>Vehicle</h1>
			<table className="table table-striped" aria-labelledby="tabelLabel">
				<thead>
					<tr>
						<th>VIN</th>
						<th>Model ID</th>
						<th>Dealership ID</th>
						<th>Trim Level</th>
					</tr>
				</thead>
				<tbody>
					{vehicle.map((vehi, index) => (
						<tr key={index}>
							<td>{vehi.vin}</td>
							<td>{vehi.modelID}</td>
							<td>{vehi.dealershipID}</td>
							<td>{vehi.trimLevel}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Vehicle;
