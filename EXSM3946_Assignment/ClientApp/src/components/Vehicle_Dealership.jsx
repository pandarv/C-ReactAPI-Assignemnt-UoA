import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";

function Vehicle_Dealership() {
	const [dealership, setDealership] = useState([]);
	const [formData, setFormData] = useState({ name: "", manufacturerID: "", address: "", phoneNumber: "" });
	const [isError, setIsError] = useState("");
	const [arrLength, setArrLength] = useState(dealership.length);

	const fetchData = async () => {
		const response = await fetch("/api/DealershipApi");
		const data = await response.json();
		console.log(data);
		setDealership(data);
	};
	useEffect(() => {
		fetchData();
	}, [arrLength]);

	const handleChange = (e) => {
		// console.log(e.target.value);

		setFormData((oldState) => ({ ...oldState, [e.target.name]: e.target.value }));
	};

	const addDealership = async () => {
		try {
			const response = await fetch("/api/DealershipApi?" + new URLSearchParams(formData), { method: "POST" });
			if (!response.ok) {
				setIsError(`${response.status} ${response.statusText}`);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		!formData.name.match(/^[\w\s'.,-]{1,30}$/) ? setIsError("Name is not in correct format") : !formData.manufacturerID.match(/^[\d]{1,11}$/) ? setIsError("Manufacture ID is not in correct format") : !formData.address.match(/^[\w\s'.,-]{1,50}$/) ? setIsError("Address is not in correct format") : !formData.phoneNumber.match(/^[2-9][\d]{9}$/) ? setIsError("Phone number is not in correct format") : addDealership();
		setArrLength((oldState) => oldState + 1);
		setFormData({ name: "", manufacturerID: "", address: "", phoneNumber: "" });
	};

	const deleteOnCLickHandle = (id) => {
		console.log(id);
		fetch("/api/DealershipApi/" + id, { method: "DELETE" })
			.then((response) => {
				if (!response.ok) {
					// throw new Error("Error");
					console.log(response);
					setIsError(`${response.status} ${response.statusText} `);
					// return response;
				}
			})
			.catch((error) => console.log(error));
		setArrLength((oldState) => oldState - 1);
	};

	return (
		<main>
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
							<td>
								<Link to={`/dealerEdit/${deal.id}`} {...deal}>
									<FaEdit /> Edit
								</Link>
								<button onClick={() => deleteOnCLickHandle(deal.id)}>
									<FaTrashAlt /> Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<h2>Add New Manufacturer: </h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="name">Name</label>
					<input type="text" name="name" id="name" value={formData.name} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="manuID">Manufacturer ID</label>
					<input type="number" name="manufacturerID" id="manuID" value={formData.manufacturerID} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="address">Address</label>
					<input type="text" name="address" id="address" value={formData.address} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="phoneNumber">Phone Number</label>
					<input maxLength={10} type="text" name="phoneNumber" id="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
				</div>
				{/* <p>{formData.phoneNumber.match(/^[2-9][\d]{9}$/)}</p> */}
				<button>
					<FaPlus /> Add
				</button>
				<div>{isError && <p style={{ color: "red" }}>{isError}</p>}</div>
			</form>
		</main>
	);
}

export default Vehicle_Dealership;
