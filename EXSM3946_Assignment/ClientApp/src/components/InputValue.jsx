import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function InputValue() {
	const { id } = useParams();
	const [manufacturers, setManufacturers] = useState([]);
	const [isError, setIsError] = useState(null);
	const [updateName, setUpdateName] = useState({ name: "" });
	const { name } = manufacturers;
	const fetchData = async () => {
		try {
			const response = await fetch("/api/ManufacturerApi/" + id);
			const data = await response.json();
			console.log(data);
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
	}, [id]);

	const updateOnCLickHandle = () => {
		fetch("/api/ManufacturerApi/" + id + "?" + new URLSearchParams(updateName), { method: "PUT" })
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

	const handleUpdate = (e) => {
		e.preventDefault();
		updateOnCLickHandle();
	};

	const changeHandle = (e) => {
		console.log(e.target.value);
		setUpdateName((oldState) => ({ ...oldState, [e.target.name]: e.target.value }));
	};
	return (
		<section>
			<h1>Edit Manufecturer</h1>
			<h4>{id}</h4>
			<form onSubmit={handleUpdate}>
				<input type="text" name="name" id="name" placeholder={name} value={updateName.name} onChange={changeHandle} />
				<button>Edit</button>
			</form>
			{isError && <p style={{ color: "red" }}>{isError}</p>}
			<button>
				<Link to={"/manufacturer"}>Back to Manufacturer</Link>
			</button>
		</section>
	);
}

export default InputValue;
