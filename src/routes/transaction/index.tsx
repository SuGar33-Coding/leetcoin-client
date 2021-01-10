import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import { Api } from "../../utils/api";
import { Local } from "../../utils/local";
import * as style from "./style.css";

interface Props {
    amt: number;
}

const Transaction: FunctionalComponent<Props> = (props: Props) => {
    const { amt } = props;

    const [canConfirm, setCanConfirm] = useState<boolean>(Local.isLoggedIn());
    const [inputName, setInputName] = useState<string>("");

    const inputChangeHandler = async (event: any) => {
        const name = event.target.value;
        console.log(event);
        try {
            const user = await Api.getUser(name);
            setInputName(user.name);
            setCanConfirm(true);
        } catch (exception) {
            if (canConfirm) {
                setInputName(name);
                setCanConfirm(false);
            }
            console.error(exception);
        }
    };

    const confirmTransactionHandler = async () => {
        const name = Local.isLoggedIn() ? Local.getName() : inputName;
        await Api.makeTransaction(name as string, amt);
    };

    const LoggedInComp: FunctionalComponent = () => {
        return <p>Confirm transaction for {Local.getName()}?</p>;
    };

    const NotLoggedInComp: FunctionalComponent = () => {
        return (
            <form>
                <label>
                    Enter name of wallet owner:
                    <input
                        type="text"
                        value={inputName}
                        onInput={inputChangeHandler}
                    />
                </label>
            </form>
        );
    };

    return (
        <div class={style.transaction}>
            <h1>Transaction</h1>
            <h2>Amount: {amt}</h2>
            {Local.isLoggedIn() ? <LoggedInComp /> : <NotLoggedInComp />}
            <button
                onClick={async () => await confirmTransactionHandler()}
                disabled={!canConfirm}
            >
                Confirm Transaction
            </button>
        </div>
    );
};

export default Transaction;
