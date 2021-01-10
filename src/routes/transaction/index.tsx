import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import { Api } from "../../utils/api";
import { Local } from "../../utils/local";
import style from "./style.css";

interface Props {
    amt: number;
}

const Transaction: FunctionalComponent<Props> = (props: Props) => {
    const { amt } = props;

    const [canConfirm, setCanConfirm] = useState<boolean>(Local.isLoggedIn());
    const [inputName, setInputName] = useState<string>("");

    /**
     * So in order to get the while-typing validation for the name,
     * I had to make the async api call using onInput but I can't
     * use any state hooks cause that blurs the input from a view
     * refresh.
     *
     * To get around this, I only call state hooks when the name
     * is valid or changing from valid to invalid. A LITTLE clunky
     * but it works.
     * @param event onInput() event
     */
    const inputChangeHandler = async (event: any) => {
        const name = event.target.value;
        // Check if the username is valid every time input is changed
        try {
            const user = await Api.getUser(name);
            // If that didn't throw an error, call some hooks
            setInputName(user.name);
            setCanConfirm(true);
        } catch (exception) {
            if (canConfirm) {
                // Only call hooks if it thought it was valid already
                setInputName(name);
                setCanConfirm(false);
            }
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
