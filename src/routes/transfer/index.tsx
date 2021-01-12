import { FunctionalComponent, h } from "preact";
import UserSelect from "../../components/user-select";
import style from "./style.css";

const Transfer: FunctionalComponent = () => {
    const opts = [
        { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
        { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true }
    ];

    return (
        <div class={style.transfer}>
            <h1>Transfer LeetCoin! 😳</h1>
            <UserSelect />
        </div>
    );
};

export default Transfer;
