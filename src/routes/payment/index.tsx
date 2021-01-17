import { FunctionalComponent, h } from "preact";
import style from "./style.css";

const Payment: FunctionalComponent = () => {
    return (
        <div class={style.payment}>
            <h1>Make Payment 😎</h1>
            <form>
                <label>
                    Amount:
                    <br />
                    <input type="number" step="any" />
                </label>
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default Payment;
