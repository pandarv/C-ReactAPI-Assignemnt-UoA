import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaEdit, FaLongArrowAltLeft } from "react-icons/fa";
import Error from "./Error";

const ModalEdit = () => {
	const { id } = useParams();
	const [modal, setModal] = useState([]);
	const [isError, setIsError] = useState(null);
	const [updateData, setUpdateData] = useState({ manufacturerID: "", name: "" });
	const { manufacturerID, name } = modal;

	const fetchData = async () => {
		try {
			const response = await fetch("/api/ModelApi/" + id);
			const data = await response.json();
			console.log(data);
			if (!response.ok) {
				throw new Error(response.statusText);
			}
			return setModal(data);
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
	});

	const updateOnCLickHandle = () => {
		fetch("/api/ModelApi/" + id + "?" + new URLSearchParams(updateData), { method: "PUT" })
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
		setUpdateData({ manufacturerID: "", name: "" });
	};

	const handleChange = (e) => {
		setUpdateData((oldState) => ({ ...oldState, [e.target.name]: e.target.value }));
	};

	return (
		<section className="form-section-edit">
			<h1>ModalEdit</h1>
			<h4>{id}</h4>
			<form onSubmit={handleUpdate}>
				<div>
					<label htmlFor="manuID">Manufacturer ID</label>
					<input type="number" name="manufacturerID" id="manuID" placeholder={manufacturerID} value={updateData.manufacturerID} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="name">Name</label>
					<input type="text" name="name" id="name" placeholder={name} value={updateData.name} onChange={handleChange} />
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
				<Link to={"/modal"}>
					<FaLongArrowAltLeft /> Back to Modal
				</Link>
			</button>
		</section>
	);
};

export default ModalEdit;
