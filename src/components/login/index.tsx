import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import { Api } from "../../utils/api";
import { Local } from "../../utils/local";

const Login: FunctionalComponent = () => {
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleFormSubmit = async (event: any) => {
        event.preventDefault();
        if (await Api.login(userName, password)) {
            Local.setName(userName);
            Local.setPass(password);
        } else {
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
    const handleUsernameFieldChange = (event: any): void => {
        setUserName(event.target.value);
    };

    const handlePasswordFieldChange = (event: any): void => {
        setPassword(event.target.value);
    };

    return (
        <form onSubmit={async event => await handleFormSubmit(event)}>
            <label>
                Username: <br />
                <input type="text" onChange={handleUsernameFieldChange} />
            </label>
            <br />
            <label>
                Password: <br />
                <input type="text" onChange={handlePasswordFieldChange} />
            </label>
            <br />
            <input type="submit" value="Login" />
        </form>
    );
};

export default Login;
