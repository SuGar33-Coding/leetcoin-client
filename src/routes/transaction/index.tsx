import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import { Api } from "../../utils/api";
import { Local } from "../../utils/local";
import style from "./style.css";
import qs from "querystring";
import { route } from "preact-router";
import UserSelect from "../../components/user-select";
import { OptionProps } from "react-select/src/types";

const Transaction: FunctionalComponent = () => {
    const params = qs.parse(location.search);
    const amt = parseFloat(params["?amt"] as string);

    const [isValidInput, setIsValidInput] = useState<boolean>(
        Local.isLoggedIn()
    );
    const [inputName, setInputName] = useState<string>("");

    const inputChangeHandler = (inputValue: string, isUser: boolean) => {
        setInputName(inputValue);
        setIsValidInput(isUser);
    };

    const confirmTransactionHandler = async () => {
        const name = Local.isLoggedIn() ? Local.getName() : inputName;
        const isTransactionOk = await Api.makeTransaction(name as string, amt);
        if (isTransactionOk) {
            alert(`Transaction of ${amt} was good! :3`);
        } else {
            alert(`Oh nOwO the transaction failed! 😰`);
        }
        route("/profile");
    };

    return (
        <div class={style.transaction}>
            <h1>Transaction</h1>
            <h2>Amount: {amt}</h2>
            {/* When the user is not logged in */}
            <form hidden={Local.isLoggedIn()}>
                <label>
                    Choose the wallet owner:
                    <UserSelect onSelectOption={inputChangeHandler} />
                </label>
            </form>
            {/* When the user is logged in */}
            <p hidden={!Local.isLoggedIn()}>
                Confirm transaction for {Local.getName()}?
            </p>
            <button
                onClick={async () => await confirmTransactionHandler()}
                disabled={!isValidInput}
            >
                Confirm Transaction
            </button>
        </div>
    );
};

export default Transaction;
