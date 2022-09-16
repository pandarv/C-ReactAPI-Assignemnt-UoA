// import { Modal } from "reactstrap";
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import Vehicle from "./components/Vehicle";
import Vehicle_Dealership from "./components/Vehicle_Dealership";
import Vehicle_Manufacturer from "./components/Vehicle_Manufacturer";
import Vehicle_Modal from "./components/Vehicle_Modal";

const AppRoutes = [
	{
		index: true,
		element: <Home />,
	},
	{
		path: "/counter",
		element: <Counter />,
	},
	{
		path: "/fetch-data",
		element: <FetchData />,
	},
	{
		path: "/vehicle",
		element: <Vehicle />,
	},
	{
		path: "/dealership",
		element: <Vehicle_Dealership />,
	},
	{
		path: "/modal",
		element: <Vehicle_Modal />,
	},
	{
		path: "/manufacturer",
		element: <Vehicle_Manufacturer />,
	},
];

export default AppRoutes;
