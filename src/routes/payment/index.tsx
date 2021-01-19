import { FunctionalComponent, h } from "preact";
import { route } from "preact-router";
import { useState } from "preact/hooks";
import NotLoggedIn from "../../components/not-logged-in";
import { Api } from "../../utils/api";
import { Local } from "../../utils/local";
import style from "./style.css";

const Payment: FunctionalComponent = () => {
    const [amtValue, setAmtValue] = useState<number>(0);
    const [noteValue, setNoteValue] = useState<string>("");

    const handleAmtValueChange = (event: any) => {
        const amt = parseFloat(event.target.value);
        setAmtValue(amt);
    };

    const handleNoteValueChange = (event: any) => {
        const note = event.target.value;
        setNoteValue(note);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const isPayOk = await Api.makePayment(
            Local.getName() as string,
            Local.getPass() as string,
            amtValue,
            noteValue
        );
        if (isPayOk) {
            alert(`Payment of ${amtValue} was good!`);
            route("/profile");
        } else {
            alert(`Payment failed! 😞`);
            window.location.reload();
        }
    };

    return (
        <div class={style.payment} hidden={!Local.isLoggedIn()}>
            <h1>Make Payment 😎</h1>
            {Local.isLoggedIn() ? "" : <NotLoggedIn page="Payment" />}
            <form onSubmit={async event => await handleSubmit(event)}>
                <label>
                    Amount:
                    <br />
                    <input
                        type="number"
                        step="any"
                        onInput={handleAmtValueChange}
                    />
                </label>
                <br />
                <br />
                <label>
                    Note (optional):
                    <br />
                    <textarea
                        value={noteValue}
                        onInput={handleNoteValueChange}
                    ></textarea>
                </label>
                <br />
                <br />
                <input type="submit" value="Submit" disabled={amtValue <= 0} />
            </form>
        </div>
    );
};

export default Payment;
