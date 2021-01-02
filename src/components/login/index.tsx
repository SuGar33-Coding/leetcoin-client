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
        }
    };

    // React.ChangeEventHandler<HTMLInputElement>
    const handleUsernameFieldChange = (event: any): void => {
        setUserName(event.target.value);
    };

    const handlePasswordFieldChange = (event: any): void => {
        setPassword(event.target.value);
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <label>
                Username
                <input type="text" onChange={handleUsernameFieldChange} />
            </label>
            <label>
                Password
                <input type="text" onChange={handlePasswordFieldChange} />
            </label>
            <input type="submit" value="Login" />
        </form>
    );
};

export default Login;
