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
			<ul>
				{manufacturers.map((manufacturer) => {
					return (
						<li key={manufacturer.id}>
							<h4>{manufacturer.name}</h4>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default Vehicle_Manufacturer;
