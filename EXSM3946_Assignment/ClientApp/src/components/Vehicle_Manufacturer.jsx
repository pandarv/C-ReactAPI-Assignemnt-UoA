import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import Loading from "./Loading";

function Vehicle_Manufacturer() {
	const [manufacturers, setManufacturers] = useState([]);
	const [isError, setIsError] = useState(null);
	const [formData, setFormData] = useState({ name: "" });
	const [arrLength, setArrLength] = useState(manufacturers.length);
	const [loading, setLoading] = useState(true);

	const fetchData = async () => {
		setLoading(true);
		try {
			const response = await fetch("/api/ManufacturerApi");
			const data = await response.json();
			if (!response.ok) {
				throw new Error(response.statusText);
			}
			setLoading(false);
			setManufacturers(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, [arrLength]);

	const addManufacturer = async () => {
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
		setArrLength((oldState) => oldState + 1);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addManufacturer();
		setArrLength((oldState) => oldState + 1);
		setFormData({ name: "" });
	};
	const handleChange = (e) => {
		setFormData((prevValue) => ({ ...prevValue, [e.target.name]: e.target.value }));
	};

	const deleteOnCLickHandle = (id) => {
		fetch("/api/ManufacturerApi/" + id, { method: "DELETE" })
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
							<td>{manufacturer.name}</td>
							<td className="right-align">
								<button className="buton but-edit">
									<Link to={`/edit/${manufacturer.id}`} {...manufacturer}>
										<FaEdit /> Edit
									</Link>
								</button>
								<button className="buton but-delete" onClick={() => deleteOnCLickHandle(manufacturer.id)}>
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
				<h2>Add New Manufacturer: </h2>
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="name">Name</label>
						<input type="text" name="name" id="name" value={formData.name} onChange={handleChange} />
					</div>
					<button className="but-on-prim">
						<FaPlus /> Add
					</button>
					<div>{isError ? <p style={{ color: "red" }}>{isError}</p> : <p></p>}</div>
				</form>
			</section>
		</section>
	);
}

export default Vehicle_Manufacturer;
