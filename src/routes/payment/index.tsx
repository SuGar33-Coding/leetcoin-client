import { Button, TextField } from "@material-ui/core";
import { FunctionalComponent, h } from "preact";
import { route } from "preact-router";
import { useState } from "preact/hooks";
import NotLoggedIn from "../../components/not-logged-in";
import { Api } from "../../utils/api";
import { Local } from "../../utils/local";
import style from "./style.css";

const Payment: FunctionalComponent = () => {
	const [amtValue, setAmtValue] = useState<number>(0);
	const [noteValue, setNoteValue] = useState<string>("");

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleAmtValueChange = (event: any) => {
		const amt = parseFloat(event.target.value);
		setAmtValue(amt);
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleNoteValueChange = (event: any) => {
		const note = event.target.value;
		setNoteValue(note);
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleSubmit = async (event: any) => {
		event.preventDefault();
		try {
			await Api.makePayment(
				Local.getName() as string,
				Local.getPass() as string,
				amtValue,
				noteValue
			);
			alert(`Payment of ${amtValue} was good!`);
			route("/profile");
		} catch (error) {
			alert(`Payment failed! 😞`);
			window.location.reload();
		}
	};

	return (
		<div class={style.payment} hidden={!Local.isLoggedIn()}>
			<h1>Make Payment 😎</h1>
			{Local.isLoggedIn() ? "" : <NotLoggedIn page="Payment" />}
			<form onSubmit={async event => await handleSubmit(event)}>
				<div>
					<TextField
						margin="normal"
						type="number"
						required
						label="Amount"
						variant="outlined"
						onInput={handleAmtValueChange}
					/>
				</div>
				<div>
					<TextField
						margin="normal"
						label="Note (optional)"
						variant="outlined"
						multiline
						rowsMax={6}
						value={noteValue}
						onInput={handleNoteValueChange}
					/>
				</div>
				<Button
					style={{ marginTop: 15 }}
					type="submit"
					variant="contained"
					color="primary"
				>
					Submit
				</Button>
			</form>
		</div>
	);
};

export default Payment;
