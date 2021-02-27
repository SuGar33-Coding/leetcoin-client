import { Button, TextField } from "@material-ui/core";
import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import { Api } from "../../utils/api";
import { Local } from "../../utils/local";

const CreateAccount: FunctionalComponent = () => {
	const [userName, setUserName] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleFormSubmit = async (event: any) => {
		event.preventDefault();
		try {
			await Api.createAccount(userName, password);
			Local.setName(userName);
			Local.setPass(password);
			window.location.reload();
		} catch (error) {
			alert(`${userName}, your account creation has failed.
            \nReason: ${error.message}`);
		}
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleUsernameFieldChange = (event: any): void => {
		setUserName(event.target.value);
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handlePasswordFieldChange = (event: any): void => {
		setPassword(event.target.value);
	};

	return (
		<form onSubmit={async event => await handleFormSubmit(event)}>
			<div>
				<TextField
					label="Username"
					variant="outlined"
					onChange={handleUsernameFieldChange}
				/>
			</div>
			<div>
				<TextField
					margin="normal"
					type="password"
					autoComplete="current-password"
					label="Password"
					variant="outlined"
					onChange={handlePasswordFieldChange}
				/>
			</div>
			<Button type="submit" variant="contained" color="primary">
				Create Account
			</Button>
		</form>
	);
};

export default CreateAccount;
