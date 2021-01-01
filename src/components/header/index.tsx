import { FunctionalComponent, h } from "preact";
import { Link } from "preact-router/match";
import * as style from "./style.css";

const Header: FunctionalComponent = () => {
    return (
        <header class={style.header}>
            <h1>LeetCoin</h1>
            <nav>
                <Link activeClassName={style.active} href="/">
                    Transactions
                </Link>
                <Link activeClassName={style.active} href="/profile">
                    Profile
                </Link>
            </nav>
        </header>
    );
};

export default Header;
