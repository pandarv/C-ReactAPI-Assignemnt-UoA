import React, { useState, useEffect } from "react";

function Vehicle_Modal() {
	const [modals, setModals] = useState([]);

	const fetchData = async () => {
		const response = await fetch("/api/ModelApi");
		const data = await response.json();
		console.log(data);
		setModals(data);
	};

	useEffect(() => {
		fetchData();
	}, []);
	return (
		<div>
			<h1>Vehicle Modal</h1>
			<ul>
				{modals.map((modal) => {
					return (
						<li key={modal.id}>
							<h4>{modal.name}</h4>{" "}
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default Vehicle_Modal;
