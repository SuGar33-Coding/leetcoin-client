import { Button, TextField } from "@material-ui/core";
import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import NotLoggedIn from "../../components/not-logged-in";
import UserSelect from "../../components/user-select";
import { Api } from "../../utils/api";
import { Local } from "../../utils/local";
import { Util } from "../../utils/util";
import style from "./style.css";

const Transfer: FunctionalComponent = () => {
	const [userValue, setUserValue] = useState<string>("");
	const [amountValue, setAmountValue] = useState<number>(0);
	const [isValidUser, setIsValidUser] = useState<boolean>(false);
	const [isValidAmount, setIsValidAmount] = useState<boolean>(true);

	const handleUserInputChange = (selectedInput: string, isUser: boolean) => {
		setUserValue(selectedInput);
		setIsValidUser(isUser);
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleAmountInputChange = (event: any) => {
		const amt = parseFloat(event.target.value);
		setIsValidAmount(isNaN(amt) ? false : true);
		setAmountValue(amt);
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleTransferSubmit = async (event: any) => {
		event.preventDefault();
		console.log(isValidAmount);
		if (!isValidAmount) {
			alert("Not a valid LC amount!");
			window.location.reload();
			return;
		}
		try {
			await Api.makeTransfer(
				Local.getName() as string,
				Local.getPass() as string,
				userValue,
				amountValue
			);
			Util.playDing();
			alert(`Sent ${amountValue} LC to ${userValue}! 😊`);
		} catch (error) {
			alert("Transaction failed for some reason!");
		}
		window.location.reload();
	};

	return (
		<div class={style.transfer}>
			<h1>Transfer LeetCoin! 💸</h1>
			{Local.isLoggedIn() ? "" : <NotLoggedIn page="Transfer" />}
			<form
				onSubmit={async event => await handleTransferSubmit(event)}
				hidden={!Local.isLoggedIn()}
			>
				<label>Receiving User:</label>
				<br />
				<UserSelect
					onSelectOption={handleUserInputChange}
					filterLoggedInUser={true}
				/>
				<br />
				<div>
					<TextField
						margin="normal"
						type="text"
						required
						error={!isValidAmount}
						label="Amount"
						variant="outlined"
						onInput={handleAmountInputChange}
					/>
				</div>
				<Button
					style={{ marginTop: 15 }}
					type="submit"
					variant="contained"
					color="primary"
					disabled={!isValidUser}
				>
					Confirm Transfer
				</Button>
			</form>
		</div>
	);
};

export default Transfer;
