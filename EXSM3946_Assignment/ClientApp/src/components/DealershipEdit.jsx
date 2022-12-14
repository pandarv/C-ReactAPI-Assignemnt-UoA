import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaEdit, FaLongArrowAltLeft } from "react-icons/fa";
import Error from "./Error";
import OptionList from "./OptionList";

function DealershipEdit() {
	const { id } = useParams();
	const [dealership, setDealership] = useState([]);
	const [manufacturers, setManufacturers] = useState([]);
	const [isError, setIsError] = useState("");
	const [updateName, setUpdateName] = useState({ name: "", manufacturerID: "", address: "", phoneNumber: "" });
	const { name, manufacturerID, address, phoneNumber } = dealership;

	const fetchData = async () => {
		try {
			const response = await fetch("/api/DealershipApi/" + id);
			const responseManu = await fetch("/api/ManufacturerApi/");
			const data = await response.json();
			const dataManu = await responseManu.json();
			if (!response.ok) {
				throw new Error(`Error Dealership: ${response.statusText}`);
			} else if (!responseManu.ok) {
				throw new Error(`Error Manufacturer: ${responseManu.statusText}`);
			}
			setDealership(data);
			setManufacturers(dataManu);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, [updateName]);

	useEffect(() => {
		setTimeout(() => {
			setIsError("");
		}, 10000);
	}, [isError]);

	const changeHandle = (e) => {
		setUpdateName((oldState) => ({ ...oldState, [e.target.name]: e.target.value }));
	};

	const updateOnCLickHandle = async () => {
		try {
			const response = await fetch("/api/DealershipApi/" + id + "?" + new URLSearchParams(updateName), { method: "PUT" });
			if (!response.ok) {
				setIsError(`${response.status} ${response.statusText}`);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdate = (e) => {
		e.preventDefault();
		updateOnCLickHandle();
		setUpdateName({ name: "", manufacturerID: "", address: "", phoneNumber: "" });
	};

	return (
		<section className="form-section-edit">
			<h1>Edit Dealership</h1>
			<h4>The dealership ID is: {id}</h4>
			<form onSubmit={handleUpdate}>
				<div>
					<label htmlFor="name">Name</label>
					<input type="text" name="name" id="name" placeholder={name} value={updateName.name} onChange={changeHandle} />
				</div>
				<div>
					<label htmlFor="manu-name">Manufacturer Name</label>
					{/* <input type="number" name="manufacturerID" id="manuID" placeholder={manufacturerID} value={updateName.manufacturerID} onChange={changeHandle} /> */}
					<select name="manufacturerID" id="manu-name" value={updateName.manufacturerID} onChange={changeHandle}>
						<option value="">--- Choose ---</option>
						{manufacturers.map((manufacturer) => {
							return <OptionList key={manufacturer.id} option={manufacturer} />;
						})}
					</select>
				</div>
				<div>
					<label htmlFor="address">Address</label>
					<input type="text" name="address" id="address" placeholder={address} value={updateName.address} onChange={changeHandle} />
				</div>
				<div>
					<label htmlFor="phoneNumber">Phone Number</label>
					<input maxLength={10} type="text" name="phoneNumber" id="phoneNumber" placeholder={phoneNumber} value={updateName.phoneNumber} onChange={changeHandle} />
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
				<Link to={"/dealership"}>
					<FaLongArrowAltLeft /> Back to Dealership
				</Link>
			</button>
		</section>
	);
}

export default DealershipEdit;
