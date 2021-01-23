import { FunctionalComponent, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { Api } from "../../utils/api";
import { Local } from "../../utils/local";
import style from "./style.css";
import { route } from "preact-router";
import UserSelect from "../../components/user-select";

interface Props {
    type: string;
}

const Earnings: FunctionalComponent<Props> = (props: Props) => {
    const { type } = props;

    const [isValidInput, setIsValidInput] = useState<boolean>(
        Local.isLoggedIn()
    );
    const [inputName, setInputName] = useState<string>("");
    const [amt, setAmt] = useState<number>(0);
    const [typeDescription, setTypeDescription] = useState<string>("");

    const inputChangeHandler = (inputValue: string, isUser: boolean) => {
        setInputName(inputValue);
        setIsValidInput(isUser);
    };

    useEffect(() => {
        switch (type) {
            case "dishes-small":
                setTypeDescription("small dishes load 💦🍽💦");
                setAmt(5);
                break;
            case "dishes-big":
                setTypeDescription("large dishes load 💦🍽🍽🍽💦🥵");
                setAmt(10);
                break;
            default:
                route("/notfound");
                break;
        }
    }, [type]);

    const confirmEarningsHandler = async () => {
        const name = Local.isLoggedIn() ? Local.getName() : inputName;
        const isTransactionOk = await Api.makeEarnings(
            name as string,
            amt,
            type
        );
        if (isTransactionOk) {
            alert(`Earnings of ${amt} was good! :3`);
        } else {
            alert(`Oh nOwO the earnings failed! 😰`);
        }
        if (Local.isLoggedIn()) {
            route("/profile");
        } else {
            route("/");
        }
    };

    return (
        <div class={style.earnings}>
            <h1>Earnings</h1>
            <h2>For: {typeDescription}</h2>
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
                Confirm earnings for{" "}
                <span style={{ fontWeight: "bold" }}>{Local.getName()}</span>?
            </p>
            <button
                onClick={async () => await confirmEarningsHandler()}
                disabled={!isValidInput}
            >
                Confirm Earnings
            </button>
        </div>
    );
};

export default Earnings;
