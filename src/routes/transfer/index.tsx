import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import UserSelect from "../../components/user-select";
import style from "./style.css";

const Transfer: FunctionalComponent = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const [isValidUser, setIsValidUser] = useState<boolean>(false);

    const handleInputChange = (selectedInput: string, isUser: boolean) => {
        setInputValue(selectedInput);
        setIsValidUser(isUser);
    };

    return (
        <div class={style.transfer}>
            <h1>Transfer LeetCoin! 😳</h1>
            <p>Current Value: {inputValue}</p>
            <p>Is valid user? {isValidUser ? "Yes" : "No"}</p>
            <UserSelect onSelectOption={handleInputChange} />
        </div>
    );
};

export default Transfer;
