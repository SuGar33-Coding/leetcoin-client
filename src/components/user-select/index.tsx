import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import AsyncSelect from "react-select/async";
import { Option } from "react-select/src/filters";
import { OptionProps } from "react-select/src/types";
import { Api } from "../../utils/api";

interface Props {
    /**
     * Send the option props of the option back through this callback prop
     */
    onSelectOption: (optionProps: OptionProps) => void;
}

const UserSelect: FunctionalComponent<Props> = (props: Props) => {
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
        props.onSelectOption(newOptionProps);
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
