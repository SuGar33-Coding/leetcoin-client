import { FunctionalComponent, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { Api } from "../../utils/api";
import { Local } from "../../utils/local";

interface Props {
    /**
     * Send the input selected and whether it's in the list of fetched users
     */
    onSelectOption: (input: string, isUser: boolean) => void;
    /**
     * Whether to filter out the logged-in user's name from the list
     */
    filterLoggedInUser?: boolean;
}

const UserSelect: FunctionalComponent<Props> = (props: Props) => {
    /* Set default prop values */
    if (!props.filterLoggedInUser) {
        props.filterLoggedInUser = false;
    }

    const [userOptions, setUserOptions] = useState<string[]>([]);

    useEffect(() => {
        const fetchUserOptions = async () => {
            const users = await Api.queryUsers();
            const opts = [];
            for (const key in users) {
                if (
                    !props.filterLoggedInUser ||
                    users[key].name != Local.getName()
                )
                    opts.push(users[key].name);
            }
            setUserOptions(opts);
        };

        fetchUserOptions();
    }, [props.filterLoggedInUser]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
