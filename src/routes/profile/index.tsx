import { FunctionalComponent, h } from "preact";
import Button from "preact-material-components/Button";
import "preact-material-components/Button/style.css";
import "preact-material-components/Theme/style.css";
import { useEffect, useState } from "preact/hooks";
import api from "../../utils/api";
import * as style from "./style.css";

interface Props {
    user: string;
}

const Profile: FunctionalComponent<Props> = (props: Props) => {
    const { user } = props;
    const [time, setTime] = useState<number>(Date.now());
    const [count, setCount] = useState<number>(0);
    const [name, setName] = useState<string>("<Name>");

    // gets called when this route is navigated to
    useEffect(() => {
        const timer = window.setInterval(() => setTime(Date.now()), 1000);

        // gets called just before navigating away from the route
        return () => {
            clearInterval(timer);
        };
    }, []);

    // update the current time
    const increment = () => {
        setCount(count + 1);
    };

    const getNameHandler = async () => {
        const ret = await api.getUser("Testy McTestface");
        console.log(ret);
        setName(ret[0].name);
    };

    return (
        <div class={style.profile}>
            <h1>Profile: {user}</h1>
            <h2>Name: {name}</h2>
            <p>This is the user profile for a user named {user}.</p>

            <div>Current time: {new Date(time).toLocaleString()}</div>

            <p>
                <button onClick={increment}>Click Me</button> Clicked {count}{" "}
                times.
            </p>
            <Button ripple raised onClick={async () => await getNameHandler()}>
                Change name!
            </Button>
        </div>
    );
};

export default Profile;
