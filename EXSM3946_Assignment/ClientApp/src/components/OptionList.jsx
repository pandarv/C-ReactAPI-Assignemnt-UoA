import React from "react";

const OptionList = ({ option }) => {
	return (
		<>
			<option value={option.id}>{option.name}</option>
		</>
	);
};

export default OptionList;
