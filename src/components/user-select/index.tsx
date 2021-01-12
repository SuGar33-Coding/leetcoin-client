import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import AsyncSelect from "react-select/async";
import { OptionProps } from "react-select/src/types";
import { Api } from "../../utils/api";

const UserSelect: FunctionalComponent = () => {
    const [inputValue, setInputValue] = useState<any>("");

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
        <div>
            <AsyncSelect
                cacheOptions
                loadOptions={loadOptions}
                defaultOptions
                onChange={handleInputChange}
            />
        </div>
    );
};

export default UserSelect;
