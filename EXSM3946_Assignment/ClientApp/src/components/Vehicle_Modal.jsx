import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import Loading from "./Loading";
import Error from "./Error";

function Vehicle_Modal() {
	const [modals, setModals] = useState([]);
	const [manufacturers, setManufacturers] = useState([]);
	const [formData, setFormData] = useState({ manufacturerID: "", name: "" });
	const [isError, setIsError] = useState("");
	const [arrLength, setArrLength] = useState(modals.length);
	const [loading, setLoading] = useState(true);

	const fetchData = async () => {
		setLoading(true);
		const response = await fetch("/api/ModelApi");
		const responseManu = await fetch("/api/ManufacturerApi");
		const data = await response.json();
		const dataManu = await responseManu.json();
		setLoading(false);
		setModals(data);
		setManufacturers(dataManu);
	};

	useEffect(() => {
		fetchData();
	}, [arrLength]);

	const handleChange = (e) => {
		setFormData((oldState) => ({ ...oldState, [e.target.name]: e.target.value }));
	};
	const addModal = async () => {
		try {
			const response = await fetch("/api/ModelApi?" + new URLSearchParams(formData), { method: "POST" });
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
		addModal();
		setFormData({ manufacturerID: "", name: "" });
	};

	const deleteOnCLickHandle = (id) => {
		console.log(id);
		fetch("/api/ModelApi/" + id, { method: "DELETE" })
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
			<h1>Modal</h1>
			<table className="table table-striped" aria-labelledby="tabelLabel">
				<thead>
					<tr>
						<th>Modal ID</th>
						<th>Manufacturer ID</th>
						<th>Name</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{modals.map((modal) => (
						<tr key={modal.id}>
							<td>{modal.id}</td>
							<td>{modal.manufacturerID}</td>
							<td>{modal.name}</td>
							<td className="right-align">
								<button className="buton but-edit">
									<Link to={`/modalEdit/${modal.id}`} {...modal}>
										<FaEdit /> Edit
									</Link>
								</button>
								<button className="buton but-delete" onClick={() => deleteOnCLickHandle(modal.id)}>
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
				<h2>Add New Modal</h2>
				<form onSubmit={handleSubmit}>
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
						<label htmlFor="name">Name</label>
						<input type="text" name="name" id="name" value={formData.name} onChange={handleChange} />
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

export default Vehicle_Modal;
