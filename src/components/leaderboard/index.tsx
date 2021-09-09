import {
	Checkbox,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from "@material-ui/core";
import { FunctionalComponent, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { Api } from "../../utils/api";

const Leaderboard: FunctionalComponent = () => {
	type User = {
		name: string;
		wallet: {
			_id: string;
			balance: {
				$numberDecimal: string;
			};
			createdAt: string;
			updatedAt: string;
		};
	};

	type Row = {
		user: string;
		balance: number;
	};

	interface Data {
		user: string;
		balance: number;
	}

	interface HeadCell {
		id: keyof Data;
		label: string;
		numeric: boolean;
	}

	const [rows, setRows] = useState<Row[]>([]);

	useEffect(() => {
		const getUsers = async () => {
			const dbUsers: User[] = await Api.queryUsers(true);

			const mappedRows: Row[] = dbUsers
				.map((user: User) => {
					return {
						user: user.name,
						balance: parseFloat(
							user.wallet.balance["$numberDecimal"]
						)
					};
				})
				.sort((a, b) => b.balance - a.balance);

			setRows(mappedRows);
		};

		getUsers();
	}, []);

	return (
		<div style={{ marginBottom: 50 }}>
			<h2>Leaderboard</h2>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>User</TableCell>
							<TableCell>Balance</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map(row => (
							<TableRow key={row.user}>
								<TableCell component="th" scope="row">
									{row.user}
								</TableCell>
								<TableCell>
									{row.balance} <small>LC</small>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default Leaderboard;
