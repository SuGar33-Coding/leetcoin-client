import { FunctionalComponent, h } from "preact";
import style from "./style.css";

const buttonHandler = () => {
    alert("HEY");
};

const Transactions: FunctionalComponent = () => {
    return (
        <div class={style.home}>
            <h1>Transactions</h1>
            <p>This is the 🅱️ome component.</p>
            <button onClick={buttonHandler}>Pogg</button>
        </div>
    );
};

export default Transactions;
