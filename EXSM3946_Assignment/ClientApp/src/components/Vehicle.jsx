import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import Loading from "./Loading";
import Error from "./Error";

function Vehicle() {
	const [vehicle, setVehicle] = useState([]);
	const [modals, setModals] = useState([]);
	const [dealerships, setDealerships] = useState([]);
	const [formData, setFormData] = useState({ vin: "", modelID: "", dealershipID: "", trimLevel: "" });
	const [isError, setIsError] = useState("");
	const [arrLength, setArrLength] = useState(vehicle.length);
	const [loading, setLoading] = useState(true);

	const fetchData = async () => {
		setLoading(true);
		const response = await fetch("/api/VehicleApi");
		const responseMod = await fetch("/api/ModelApi");
		const responseDeal = await fetch("/api/DealershipApi");
		const data = await response.json();
		const dataMod = await responseMod.json();
		const dataDeal = await responseDeal.json();
		setLoading(false);
		setVehicle(data);
		setModals(dataMod);
		setDealerships(dataDeal);
	};
	useEffect(() => {
		fetchData();
	}, [arrLength]);

	const handleChange = (e) => {
		setFormData((oldState) => ({ ...oldState, [e.target.name]: e.target.value }));
	};

	const addVehicle = async () => {
		try {
			const response = await fetch("/api/VehicleApi?" + new URLSearchParams(formData), { method: "POST" });
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
		addVehicle();
		setFormData({ vin: "", modelID: "", dealershipID: "", trimLevel: "" });
	};

	const deleteOnCLickHandle = (id) => {
		fetch("/api/VehicleApi/" + id, { method: "DELETE" })
			.then((response) => {
				if (!response.ok) {
					setIsError(`${response.status}  ${response.statusText}`);
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
			<h1>Vehicle</h1>
			<table className="table table-striped" aria-labelledby="tabelLabel">
				<thead>
					<tr>
						<th>VIN</th>
						<th>Model ID</th>
						<th>Dealership ID</th>
						<th>Trim Level</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{vehicle.map((vehi, index) => (
						<tr key={index}>
							<td>{vehi.vin}</td>
							<td>{vehi.modelID}</td>
							<td>{vehi.dealershipID}</td>
							<td>{vehi.trimLevel}</td>
							<td className="right-align">
								<button className="buton but-edit">
									<Link to={`/vehicleEdit/${vehi.vin}`} {...vehi}>
										<FaEdit /> Edit
									</Link>
								</button>
								<button className="buton but-delete" onClick={() => deleteOnCLickHandle(vehi.vin)}>
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
				<h2>Add New Vehicle</h2>
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="vin">VIN</label>
						<input type="text" name="vin" id="vin" value={formData.vin.toUpperCase()} onChange={handleChange} />
					</div>
					{/* <div>
						<label htmlFor="modID">Modal ID</label>
						<input type="number" name="modelID" id="modID" value={formData.modelID} onChange={handleChange} />
					</div> */}
					<div>
						<label htmlFor="mod-name">Modal Name</label>
						{/* <input type="number" name="modelID" id="modID" value={formData.modelID} onChange={handleChange} /> */}
						<select name="modelID" id="mod-name" value={formData.modelID} onChange={handleChange}>
							<option value="">--- Choose ---</option>
							{modals.map((modal) => {
								return (
									<option key={modal.id} value={modal.id}>
										{modal.name}
									</option>
								);
							})}
						</select>
					</div>
					<div>
						<label htmlFor="dealer-name">Dealership Name</label>
						<select name="dealershipID" id="dealer-name" value={formData.dealershipID} onChange={handleChange}>
							<option value="">--- Choose ---</option>
							{dealerships.map((dealership) => {
								return (
									<option key={dealership.id} value={dealership.id}>
										{dealership.name}
									</option>
								);
							})}
						</select>
					</div>

					<div>
						<label htmlFor="trimLevel">Trim Level</label>
						<input type="text" name="trimLevel" id="trimLevel" value={formData.trimLevel} onChange={handleChange} />
					</div>
					<div className="fixed-height">{isError && <Error isError={isError} />}</div>
					<button className="but-on-prim">
						<FaPlus /> Add
					</button>
				</form>
			</section>
		</section>
	);
}

export default Vehicle;
