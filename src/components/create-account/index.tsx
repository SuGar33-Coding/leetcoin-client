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
        if (await Api.createAccount(userName, password)) {
            Local.setName(userName);
            Local.setPass(password);
        } else {
            alert(`${userName}, your account creation has failed.`);
        }
        window.location.reload();
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
            <label>
                Username: <br />
                <input
                    type="text"
                    // eslint-disable-next-line react/no-unknown-property
                    autocomplete="username"
                    onChange={handleUsernameFieldChange}
                />
            </label>
            <br />
            <label>
                Password: <br />
                <input
                    type="password"
                    // eslint-disable-next-line react/no-unknown-property
                    autocomplete="new-password"
                    onChange={handlePasswordFieldChange}
                />
            </label>
            <br />
            <input type="submit" value="Create Account" />
        </form>
    );
};

export default CreateAccount;
