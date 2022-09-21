import React, { useState, useEffect } from "react";

const Error = ({ isError }) => {
	const [errMsg, setErrMsg] = useState(true);
	useEffect(() => {
		setTimeout(() => setErrMsg(false), 10000);
	}, [isError]);
	return <>{errMsg ? <p className="error">{isError}</p> : <p className="error"></p>}</>;
};

export default Error;
