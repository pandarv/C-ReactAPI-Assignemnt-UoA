import React, { useState, useEffect } from "react";

function Vehicle() {
	const [vehicle, setVehicle] = useState("");

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
			{/* <ul>
				{vehicle.map((vehi, index) => (
					<li key={index}>{vehi.vin}</li>
				))}
			</ul> */}
		</div>
	);
}

export default Vehicle;
