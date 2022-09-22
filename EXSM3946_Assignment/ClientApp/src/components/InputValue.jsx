import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaEdit, FaLongArrowAltLeft } from "react-icons/fa";
import Error from "./Error";

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
	}, [updateName]);

	useEffect(() => {
		setTimeout(() => {
			setIsError(null);
		}, 10000);
	}, [isError]);

	const updateOnCLickHandle = () => {
		fetch("/api/ManufacturerApi/" + id + "?" + new URLSearchParams(updateName), { method: "PUT" })
			.then((response) => {
				if (!response.ok) {
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
		<section className="form-section-edit">
			<h1>Edit Manufecturer</h1>
			<h4>{id}</h4>
			<form onSubmit={handleUpdate}>
				<div>
					<input type="text" name="name" id="name" placeholder={name} value={updateName.name} onChange={changeHandle} />
				</div>
				<div className="fixed-height">{isError && <Error isError={isError} />}</div>
				<div className="center-hori">
					<button className="buton but-edit-page">
						<div>
							<FaEdit /> Edit
						</div>
					</button>
				</div>
			</form>
			<button className="buton but-edit-page-back">
				<Link to={"/manufacturer"}>
					<FaLongArrowAltLeft /> Back to Manufacturer
				</Link>
			</button>
		</section>
	);
}

export default InputValue;
