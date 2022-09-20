import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaEdit, FaLongArrowAltLeft } from "react-icons/fa";

function DealershipEdit() {
	const { id } = useParams();
	const [dealership, setDealership] = useState([]);
	const [isError, setIsError] = useState(null);
	const [updateName, setUpdateName] = useState({ name: "", manufacturerID: "", address: "", phoneNumber: "" });
	const { name, manufacturerID, address, phoneNumber } = dealership;

	const fetchData = async () => {
		try {
			const response = await fetch("/api/DealershipApi/" + id);
			const data = await response.json();
			console.log(data);
			if (!response.ok) {
				throw new Error(response.statusText);
			}
			return setDealership(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, [id]);

	const updateOnCLickHandle = () => {
		fetch("/api/DealershipApi/" + id + "?" + new URLSearchParams(updateName), { method: "PUT" })
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
		setUpdateName({ name: "", manufacturerID: "", address: "", phoneNumber: "" });
	};

	const changeHandle = (e) => {
		console.log(e.target.value);
		setUpdateName((oldState) => ({ ...oldState, [e.target.name]: e.target.value }));
	};

	return (
		<section className="form-section-edit">
			<h1>Edit Dealership</h1>
			<h4>{id}</h4>
			<form onSubmit={handleUpdate}>
				<div>
					<label htmlFor="name">Name</label>
					<input type="text" name="name" id="name" placeholder={name} value={updateName.name} onChange={changeHandle} />
				</div>
				<div>
					<label htmlFor="manuID">Manufacturer ID</label>
					<input type="number" name="manufacturerID" id="manuID" placeholder={manufacturerID} value={updateName.manufacturerID} onChange={changeHandle} />
				</div>
				<div>
					<label htmlFor="address">Address</label>
					<input type="text" name="address" id="address" placeholder={address} value={updateName.address} onChange={changeHandle} />
				</div>
				<div>
					<label htmlFor="phoneNumber">Phone Number</label>
					<input maxLength={10} type="text" name="phoneNumber" id="phoneNumber" placeholder={phoneNumber} value={updateName.phoneNumber} onChange={changeHandle} />
				</div>
				<div className="center-hori">
					<button className="buton but-edit-page">
						<div>
							<FaEdit /> Edit
						</div>
					</button>
				</div>
			</form>
			{isError && <p style={{ color: "red" }}>{isError}</p>}
			<button className="buton but-edit-page-back">
				<Link to={"/dealership"}>
					<FaLongArrowAltLeft /> Back to Dealership
				</Link>
			</button>
		</section>
	);
}

export default DealershipEdit;
