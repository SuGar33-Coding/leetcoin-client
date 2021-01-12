import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import AsyncSelect from "react-select/async";
import { OptionProps } from "react-select/src/types";
import { Api } from "../../utils/api";
import style from "./style.css";

const Transfer: FunctionalComponent = () => {
    const [inputValue, setInputValue] = useState<any>("");

    const opts = [
        { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
        { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true }
    ];

    const loadOptions = (inputValue: string, callback: Function) => {
        Api.queryUsers().then(res => {
            const options = [];
            for (const key in res) {
                options.push({
                    value: res[key]._id,
                    label: res[key].name,
                    color: "#AF682F"
                });
            }
            callback(options);
        });
    };

    const handleInputChange = (newOptionProps: OptionProps) => {
        setInputValue(newOptionProps.value);
    };

    return (
        <div class={style.transfer}>
            <h1>Transfer LeetCoin! 😳</h1>
            <AsyncSelect
                cacheOptions
                loadOptions={loadOptions}
                defaultOptions
                onChange={handleInputChange}
            />
        </div>
    );
};

export default Transfer;
