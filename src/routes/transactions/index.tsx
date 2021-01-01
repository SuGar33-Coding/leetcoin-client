import { FunctionalComponent, h } from "preact";
import Button from "preact-material-components/Button";
import "preact-material-components/Button/style.css";
import "preact-material-components/Theme/style.css";
import * as style from "./style.css";

const buttonHandler = () => {
    alert("HEY");
};

const Transactions: FunctionalComponent = () => {
    return (
        <div class={style.home}>
            <h1>Transactions</h1>
            <p>This is the 🅱️ome component.</p>
            <Button ripple raised onClick={buttonHandler}>Pogg</Button>
        </div>
    );
};

export default Transactions;
