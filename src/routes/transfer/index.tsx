import { FunctionalComponent, h, render } from "preact";
import { useState } from "preact/hooks";
import UserSelect from "../../components/user-select";
import { Api } from "../../utils/api";
import { Local } from "../../utils/local";
import style from "./style.css";

const Transfer: FunctionalComponent = () => {
    const [userValue, setUserValue] = useState<string>("");
    const [amountValue, setAmountValue] = useState<number>(0);
    const [isValidUser, setIsValidUser] = useState<boolean>(false);

    const handleUserInputChange = (selectedInput: string, isUser: boolean) => {
        setUserValue(selectedInput);
        setIsValidUser(isUser);
    };

    const handleAmountInputChange = (event: any) => {
        const amt = event.target.value;
        setAmountValue(amt);
    };

    const handleTransferSubmit = async (event: any) => {
        event.preventDefault();
        const isTransferGood = await Api.makeTransfer(
            Local.getName() as string,
            Local.getPass() as string,
            userValue,
            amountValue
        );
        if (isTransferGood) {
            alert(`Sent ${amountValue} LC to ${userValue}! 😊`);
        } else {
            alert("Transaction failed for some reason!");
        }
        window.location.reload();
    };

    const RenderNotLoggedIn: FunctionalComponent = () => {
        return (
            <div>
                <h4>Please Log In before you transfer LeetCoin</h4>
            </div>
        );
    };

    return (
        <div class={style.transfer}>
            <h1>Transfer LeetCoin! 💸</h1>
            {Local.isLoggedIn() ? "" : <RenderNotLoggedIn />}
            <div hidden={!Local.isLoggedIn()}>
                <label>Receiving User:</label>
                <br />
                <UserSelect
                    onSelectOption={handleUserInputChange}
                    filterLoggedInUser={true}
                />
                <br />
                <form
                    onSubmit={async event => await handleTransferSubmit(event)}
                >
                    <label>Amount:</label>
                    <br />
                    <input
                        type="number"
                        step="any"
                        onInput={handleAmountInputChange}
                    />
                    <br />
                    <br />
                    <input
                        type="submit"
                        value="Confirm Transfer"
                        disabled={!isValidUser || !(amountValue > 0)}
                    />
                </form>
            </div>
        </div>
    );
};

export default Transfer;
