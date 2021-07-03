import { Button } from "@material-ui/core";
import { FunctionalComponent, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { Api } from "../../utils/api";

const Leaderboard: FunctionalComponent = () => {
	const [users, setUsers] = useState<any[]>([]);

	const columns = [
		{
			field: "user",
			headerName: "User",
			width: 70
		},
		{
			field: "balance",
			headerName: "Balance",
			width: 130
		}
	];

	const rows = users.map(user => {
		return {
			user: user.name,
			balance: parseFloat(user.wallet.balance["$numberDecimal"])
		};
	});

	useEffect(() => {
		const getUsers = async () => {
			const dbUsers = await Api.queryUsers(true);

			console.log(dbUsers);

			setUsers(dbUsers);
		};

		getUsers();
	}, []);

	return <div style={{ height: 400, width: "100%" }}></div>;
};

export default Leaderboard;
