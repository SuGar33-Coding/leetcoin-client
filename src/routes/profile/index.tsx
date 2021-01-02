import { FunctionalComponent, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import Login from "../../components/login";
import { Api } from "../../utils/api";
import { Local } from "../../utils/local";
import * as style from "./style.css";

const Profile: FunctionalComponent = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
    const [time, setTime] = useState<number>(Date.now());
    const [count, setCount] = useState<number>(0);
    const [name, setName] = useState<string>("Mr. Dr. Prof. Patrick");

    // gets called when this route is navigated to
    useEffect(() => {
        const timer = window.setInterval(() => setTime(Date.now()), 1000);

        setIsLoggedIn(Local.getName() !== null);

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
        const ret = await Api.getUser("Testy McTestface");
        console.log(ret);
        setName(ret[0].name);
    };

    const renderProfile = () => {
        return (
            <div class={style.profile}>
                <h2>Name: {Local.getName()}</h2>

                <div>Current time: {new Date(time).toLocaleString()}</div>

                <p>
                    <button onClick={increment}>Click Me</button> Clicked{" "}
                    {count} times.
                </p>
                <button onClick={async () => await getNameHandler()}>
                    Change name!
                </button>
            </div>
        );
    };

    const renderLogin = () => {
        return (
            <div class={style.profile}>
                <h1>Please login</h1>
                <Login />
            </div>
        );
    };

    return Local.isLoggedIn() ? renderProfile() : renderLogin();
};

export default Profile;
