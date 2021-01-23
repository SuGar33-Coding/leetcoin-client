import { Button, Paper, Typography } from "@material-ui/core";
import { FunctionalComponent, h } from "preact";
import { route } from "preact-router";
import { useEffect, useState } from "preact/hooks";
import CreateAccount from "../../components/create-account";
import Login from "../../components/login";
import { Api } from "../../utils/api";
import { Local } from "../../utils/local";
import style from "./style.css";

const Profile: FunctionalComponent = () => {
    const [isCreatingAccount, setIsCreatingAccount] = useState<boolean>(false);
    const [balance, setBalance] = useState<number>(Local.getBalance());

    // gets called when this route is navigated to
    useEffect(() => {
        async function fetchBalance() {
            if (Local.isLoggedIn()) {
                const balance = await Api.getUserBalance(
                    Local.getName() as string,
                    Local.getPass() as string
                );
                setBalance(balance);
                Local.setBalance(balance);
            }
        }

        fetchBalance();

        // gets called just before navigating away from the route
    }, []);

    const handleMakeTransfer = () => {
        route("/transfer");
    };

    const handlePayment = () => {
        route("/payment");
    };

    const handleLogout = () => {
        Local.clear();
        window.location.reload();
    };

    const renderProfile = () => {
        return (
            <div>
                <Typography variant="h5">Hello, {Local.getName()}</Typography>

                <Typography variant="h4">Balance: {balance} LC</Typography>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleMakeTransfer}
                >
                    Make Transfer
                </Button>
                <br />
                <br />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePayment}
                >
                    Make Payment
                </Button>
                <br />
                <br />
                <br />
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </div>
        );
    };

    const renderLogin = () => {
        return (
            <div>
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

    return (
        <Paper square className={style.profile}>
            {Local.isLoggedIn() ? renderProfile() : renderLogin()}
        </Paper>
    );
};

export default Profile;
