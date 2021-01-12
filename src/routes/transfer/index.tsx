import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import { OptionProps } from "react-select/src/types";
import UserSelect from "../../components/user-select";
import style from "./style.css";

const Transfer: FunctionalComponent = () => {
    const [inputValue, setInputValue] = useState<string>("");

    const handleInputChange = (optionProps: OptionProps) => {
        setInputValue(optionProps.value);
    };

    return (
        <div class={style.transfer}>
            <h1>Transfer LeetCoin! 😳</h1>
            <p>Current Value: {inputValue}</p>
            <UserSelect onSelectOption={handleInputChange} />
        </div>
    );
};

export default Transfer;
