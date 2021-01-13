import { FunctionalComponent, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import AsyncSelect from "react-select/async";
import { OptionProps } from "react-select/src/types";
import { Api } from "../../utils/api";

interface Props {
    /**
     * Send the input selected and whether it's in the list of fetched users
     */
    onSelectOption: (input: string, isUser: boolean) => void;
}

const UserSelect: FunctionalComponent<Props> = (props: Props) => {
    const [userOptions, setUserOptions] = useState<string[]>([]);

    useEffect(() => {
        const fetchUserOptions = async () => {
            const users = await Api.queryUsers();
            const opts = [];
            for (const key in users) {
                opts.push(users[key].name);
            }
            setUserOptions(opts);
        };

        fetchUserOptions();
    }, []);

    const handleInputChange = (event: any) => {
        const input = event.target.value;
        props.onSelectOption(input, userOptions.includes(input));
    };

    return (
        <div>
            <input
                type="text"
                id="users-list-input"
                list="users-list"
                onInput={handleInputChange}
            />
            <datalist id="users-list">
                {userOptions.map((value, index) => {
                    return <option key={index} value={value} />;
                })}
            </datalist>
        </div>
    );
};

export default UserSelect;
