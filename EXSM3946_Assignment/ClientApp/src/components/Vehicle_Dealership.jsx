import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import Loading from "./Loading";
import Error from "./Error";

function Vehicle_Dealership() {
	const [dealership, setDealership] = useState([]);
	const [manufacturers, setManufacturers] = useState([]);
	const [formData, setFormData] = useState({ name: "", manufacturerID: "", address: "", phoneNumber: "" });
	const [isError, setIsError] = useState("");
	const [arrLength, setArrLength] = useState(dealership.length);
	const [loading, setLoading] = useState(true);

	const fetchData = async () => {
		setLoading(true);
		const response = await fetch("/api/DealershipApi");
		const responseManu = await fetch("/api/ManufacturerApi");
		const data = await response.json();
		const dataManu = await responseManu.json();
		setLoading(false);
		setDealership(data);
		setManufacturers(dataManu);
	};
	useEffect(() => {
		fetchData();
	}, [arrLength]);

	const handleChange = (e) => {
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
		setArrLength((oldState) => oldState + 1);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		!formData.name.match(/^[\w\s'.,-]{1,30}$/) ? setIsError("Name is either empty or not in correct format") : !formData.manufacturerID.match(/^[\d]{1,11}$/) ? setIsError("Manufacture ID is not in correct format") : !formData.address.match(/^[\w\s'#.,-]{1,50}$/) ? setIsError("Address is not in correct format") : !formData.phoneNumber.match(/^[2-9][\d]{9}$/) ? setIsError("Phone number is not in correct format") : addDealership();
		setArrLength((oldState) => oldState + 1);
		setFormData({ name: "", manufacturerID: "", address: "", phoneNumber: "" });
	};

	const deleteOnCLickHandle = (id) => {
		fetch("/api/DealershipApi/" + id, { method: "DELETE" })
			.then((response) => {
				if (!response.ok) {
					setIsError(`${response.status} ${response.statusText} `);
				}
			})
			.catch((error) => console.log(error));
		setArrLength((oldState) => oldState - 1);
	};

	if (loading) {
		return <Loading />;
	}

	return (
		<section>
			<h1>Dealership</h1>
			<table className="table table-striped" aria-labelledby="tabelLabel">
				<thead>
					<tr>
						<th>Dealership ID</th>
						<th>Name</th>
						<th>Manufacturer ID</th>
						<th>Address</th>
						<th>Phone Number</th>
						<th></th>
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
								<button className="buton but-edit">
									<Link to={`/dealerEdit/${deal.id}`} {...deal}>
										<FaEdit /> Edit
									</Link>
								</button>
								<button className="buton but-delete" onClick={() => deleteOnCLickHandle(deal.id)}>
									<div>
										<FaTrashAlt /> Delete
									</div>
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<section className="form-section">
				<h2>Add New Dealership: </h2>
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="name">Name</label>
						<input type="text" name="name" id="name" value={formData.name} onChange={handleChange} />
					</div>
					{/* <div>
						<label htmlFor="manuID">Manufacturer ID</label>
						<input type="number" name="manufacturerID" id="manuID" value={formData.manufacturerID} onChange={handleChange} />
					</div> */}
					<div>
						<label htmlFor="manu-name">Manufacturer Name</label>
						<select name="manufacturerID" id="manu-name" value={formData.manufacturerID} onChange={handleChange}>
							<option value="">--- Choose ---</option>
							{manufacturers.map((manufacturer) => {
								return (
									<option key={manufacturer.id} value={manufacturer.id}>
										{manufacturer.name}
									</option>
								);
							})}
						</select>
					</div>
					<div>
						<label htmlFor="address">Address</label>
						<input type="text" name="address" id="address" value={formData.address} onChange={handleChange} />
					</div>
					<div>
						<label htmlFor="phoneNumber">Phone Number</label>
						<input maxLength={10} type="text" name="phoneNumber" id="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
					</div>
					<div className="fixed-height">{isError && <Error isError={isError} />}</div>
					<button className="but-on-prim">
						<div>
							<FaPlus /> Add
						</div>
					</button>
				</form>
			</section>
		</section>
	);
}

export default Vehicle_Dealership;
