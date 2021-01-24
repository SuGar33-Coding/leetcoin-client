import { Button, TextField } from "@material-ui/core";
import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import { Api } from "../../utils/api";
import { Local } from "../../utils/local";

const Login: FunctionalComponent = () => {
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFormSubmit = async (event: any) => {
        event.preventDefault();
        try {
            await Api.login(userName, password);
            Local.setName(userName);
            Local.setPass(password);
        } catch (error) {
            alert(
                `${userName}, your login attempt has failed.` +
                    "\n\nI would really appreciate it if you checked your credentials and tried logging in again." +
                    "\n\nThank you for your consideration." +
                    "\n - ur mom"
            );
        }
        window.location.reload();
    };

    // React.ChangeEventHandler<HTMLInputElement>
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
                Login
            </Button>
        </form>
    );
};

export default Login;
