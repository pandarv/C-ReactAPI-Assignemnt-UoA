import React, { useState, useEffect } from "react";

function Vehicle_Manufacturer() {
	const [manufacturers, setManufacturers] = useState([]);

	const fetchData = async () => {
		const response = await fetch("/api/ManufacturerApi");
		const data = await response.json();
		console.log(data);
		setManufacturers(data);
	};

	useEffect(() => {
		fetchData();
	}, []);
	return (
		<div>
			<h1>Vehicle Manufacturer</h1>
			<table className="table table-striped" aria-labelledby="tabelLabel">
				<thead>
					<tr>
						<th>Manufacturer ID</th>
						<th>Name</th>
					</tr>
				</thead>
				<tbody>
					{manufacturers.map((manufacturer) => (
						<tr key={manufacturer.id}>
							<td>{manufacturer.id}</td>
							<td>{manufacturer.name}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Vehicle_Manufacturer;
