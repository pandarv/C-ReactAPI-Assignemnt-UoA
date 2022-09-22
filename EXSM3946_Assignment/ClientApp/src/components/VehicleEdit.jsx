import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaEdit, FaLongArrowAltLeft } from "react-icons/fa";
import Error from "./Error";

const VehicleEdit = () => {
	const { id } = useParams();
	const [vehicle, setVehicle] = useState([]);
	const [isError, setIsError] = useState(null);
	const [updateData, setUpdateData] = useState({ modelID: "", dealershipID: "", trimLevel: "" });
	const { modelID, dealershipID, trimLevel } = vehicle;

	const fetchData = async () => {
		try {
			const response = await fetch("/api/VehicleApi/" + id);
			const data = await response.json();
			console.log(data);
			if (!response.ok) {
				throw new Error(response.statusText);
			}
			return setVehicle(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, [updateData]);

	useEffect(() => {
		setTimeout(() => {
			setIsError(null);
		}, 10000);
	}, [isError]);

	const updateOnCLickHandle = () => {
		fetch("/api/VehicleApi/" + id + "?" + new URLSearchParams(updateData), { method: "PUT" })
			.then((response) => {
				if (!response.ok) {
					setIsError(`${response.status} ${response.statusText} `);
					return response;
				}
			})
			.catch((error) => console.log(error));
	};

	const handleUpdate = (e) => {
		e.preventDefault();
		updateOnCLickHandle();
		setUpdateData({ modelID: "", dealershipID: "", trimLevel: "" });
	};

	const handleChange = (e) => {
		setUpdateData((oldState) => ({ ...oldState, [e.target.name]: e.target.value }));
	};
	return (
		<section className="form-section-edit">
			<h1>VehicleEdit</h1>
			<h4>{id}</h4>

			<form onSubmit={handleUpdate}>
				<div>
					<label htmlFor="modID">Modal ID</label>
					<input type="number" name="modelID" id="modID" placeholder={modelID} value={updateData.modelID} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="dealerID">Dealership ID</label>
					<input type="number" name="dealershipID" id="modID" placeholder={dealershipID} value={updateData.dealershipID} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="trimLevel">Trim Level</label>
					<input type="text" name="trimLevel" id="trimLevel" placeholder={trimLevel} value={updateData.trimLevel} onChange={handleChange} />
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
				<Link to={"/vehicle"}>
					<FaLongArrowAltLeft /> Back to Vehicle
				</Link>
			</button>
		</section>
	);
};

export default VehicleEdit;
