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
			<ul>
				{dealership.map((deal) => {
					return (
						<li key={deal.id}>
							<h4>{deal.name}</h4>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default Vehicle_Dealership;
