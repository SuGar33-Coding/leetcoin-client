import { FunctionalComponent, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import CreateAccount from "../../components/create-account";
import Login from "../../components/login";
import { Api } from "../../utils/api";
import { Local } from "../../utils/local";
import style from "./style.css";

const Profile: FunctionalComponent = () => {
    const [isCreatingAccount, setIsCreatingAccount] = useState<boolean>(false);
    const [balance, setBalance] = useState<number>(0.0);

    // gets called when this route is navigated to
    useEffect(() => {
        async function fetchBalance() {
            if (Local.isLoggedIn()) {
                const balance = await Api.getUserBalance(
                    Local.getName() as string,
                    Local.getPass() as string
                );
                setBalance(balance);
            }
        }

        fetchBalance();

        // gets called just before navigating away from the route
    }, []);

    const handleLogout = () => {
        Local.clear();
    };

    const renderProfile = () => {
        return (
            <div class={style.profile}>
                <h4>Hello, {Local.getName()}</h4>

                <h2>Balance: {balance} LC</h2>

                <button onClick={handleLogout}>Logout</button>
            </div>
        );
    };

    const renderLogin = () => {
        return (
            <div class={style.profile}>
                {isCreatingAccount ? (
                    <h1>Please input credentials</h1>
                ) : (
                    <h1>Please login</h1>
                )}
                {isCreatingAccount ? <CreateAccount /> : <Login />}
                <br />
                <button
                    onClick={() => setIsCreatingAccount(!isCreatingAccount)}
                >
                    {isCreatingAccount
                        ? "Log in instead"
                        : "Create new account"}
                </button>
            </div>
        );
    };

    return Local.isLoggedIn() ? renderProfile() : renderLogin();
};

export default Profile;
