import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import InputValue from "./InputValue";

function Vehicle_Manufacturer() {
	const [manufacturers, setManufacturers] = useState([]);
	const [isError, setIsError] = useState(null);
	const [formData, setFormData] = useState({ name: "" });
	const [isEdit, setIsEdit] = useState(false);

	const inputId = useRef(null);

	const fetchData = async () => {
		try {
			const response = await fetch("/api/ManufacturerApi");
			const data = await response.json();
			if (!response.ok) {
				throw new Error(response.statusText);
			}
			return setManufacturers(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, [formData]);

	const addManufacturer = async () => {
		let requestParam = {
			name: formData.name,
		};
		let requestOptions = {
			method: "POST",
		};
		try {
			const response = await fetch("/api/ManufacturerApi?" + new URLSearchParams(formData), requestOptions);
			if (!response.ok) {
				setIsError(`${response.status} ${response.statusText}`);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addManufacturer();
	};
	const handleChange = (e) => {
		setFormData((prevValue) => ({ ...prevValue, [e.target.name]: e.target.value }));
	};

	const deleteOnCLickHandle = (id) => {
		fetch("/api/ManufacturerApi/" + id, { method: "DELETE" })
			.then((response) => {
				if (!response.ok) {
					// throw new Error("Error");
					console.log(response);
					setIsError(`${response.status} ${response.statusText} `);
					return response;
				}
			})
			.catch((error) => console.log(error));
	};

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
							{/* <td>{isEdit && manufacturer.id ? <InputValue manId={manufacturer.id} manName={manufacturer.name} /> : manufacturer.name}</td> */}
							<td>{manufacturer.name}</td>
							<td>
								{/* <button onClick={() => updateOnCLickHandle(manufacturer.id)}> */}
								<Link to={`/edit/${manufacturer.id}`} {...manufacturer}>
									<FaEdit /> Edit
								</Link>
								{/* <button>
									<FaEdit /> Edit
								</button> */}
								<button onClick={() => deleteOnCLickHandle(manufacturer.id)}>
									<FaTrashAlt /> Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<h2>Add New Manufacturer: </h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor="name">Name</label>
				<input type="text" name="name" id="name" value={formData.name} onChange={handleChange} />
				<button>
					<FaPlus /> Add
				</button>

				<div>{isError && <p style={{ color: "red" }}>{isError}</p>}</div>
			</form>
		</div>
	);
}

export default Vehicle_Manufacturer;
