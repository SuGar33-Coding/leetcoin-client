import { FunctionalComponent, h } from "preact";
import { Route, Router, RouterOnChangeArgs } from "preact-router";

import Transactions from "../routes/transactions";
import Profile from "../routes/profile";
import NotFoundPage from "../routes/notfound";
import Header from "./header";
import Transaction from "../routes/transaction";
import Transfer from "../routes/transfer";
import Payment from "../routes/payment";

const App: FunctionalComponent = () => {
    let currentUrl: string;
    const handleRoute = (e: RouterOnChangeArgs) => {
        currentUrl = e.url;
    };

    return (
        <div id="app">
            <Header />
            <Router onChange={handleRoute}>
                <Route path="/" component={Transactions} />
                <Route path="/profile/" component={Profile} />
                <Route path="/transaction" component={Transaction} />
                <Route path="/transfer" component={Transfer} />
                <Route path="/payment" component={Payment} />
                <NotFoundPage default />
            </Router>
        </div>
    );
};

export default App;
