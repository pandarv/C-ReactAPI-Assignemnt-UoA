import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";

function Vehicle_Modal() {
	const [modals, setModals] = useState([]);
	const [formData, setFormData] = useState({ manufacturerID: "", name: "" });
	const [isError, setIsError] = useState("");
	const [arrLength, setArrLength] = useState(modals.length);

	const fetchData = async () => {
		const response = await fetch("/api/ModelApi");
		const data = await response.json();
		console.log(data);
		setModals(data);
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
		// setArrLength((oldState) => oldState + 1);
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
				<h2>Add new Vehicle Modal</h2>
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="manuID">Manufacturer ID</label>
						<input type="number" name="manufacturerID" id="manuID" value={formData.manufacturerID} onChange={handleChange} />
					</div>
					<div>
						<label htmlFor="name">Name</label>
						<input type="text" name="name" id="name" value={formData.name} onChange={handleChange} />
					</div>
					<button className="but-on-prim">
						<FaPlus /> Add
					</button>
					<div>{isError && <p style={{ color: "red" }}>{isError}</p>}</div>
				</form>
			</section>
		</div>
	);
}

export default Vehicle_Modal;
