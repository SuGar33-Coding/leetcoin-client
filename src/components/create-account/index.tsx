import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import { Api } from "../../utils/api";
import { Local } from "../../utils/local";

const CreateAccount: FunctionalComponent = () => {
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleFormSubmit = async (event: any) => {
        event.preventDefault();
        if (await Api.createAccount(userName, password)) {
            Local.setName(userName);
            Local.setPass(password);
        } else {
            alert(`${userName}, your account creation has failed.`);
        }
    };

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
            <input type="submit" value="Create Account" />
        </form>
    );
};

export default CreateAccount;
