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
			<table className="table table-striped" aria-labelledby="tabelLabel">
				<thead>
					<tr>
						<th>Modal ID</th>
						<th>Manufacturer ID</th>
						<th>Name</th>
					</tr>
				</thead>
				<tbody>
					{modals.map((modal) => (
						<tr key={modal.id}>
							<td>{modal.id}</td>
							<td>{modal.manufacturerID}</td>
							<td>{modal.name}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Vehicle_Modal;
