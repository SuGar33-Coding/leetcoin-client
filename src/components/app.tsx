import { FunctionalComponent, h } from "preact";
import { Route, Router } from "preact-router";

// import Transaction from "../routes/transaction";
import Transactions from "../routes/transactions";
import Profile from "../routes/profile";
import NotFoundPage from "../routes/notfound";
import Header from "./header";
import Transfer from "../routes/transfer";
import Payment from "../routes/payment";
import Earnings from "../routes/earnings";

const App: FunctionalComponent = () => {
    return (
        <div id="app">
            <Header />
            <Router>
                <Route path="/" component={Transactions} />
                <Route path="/profile/" component={Profile} />
                {/* <Route path="/transaction" component={Transaction} /> */}
                <Route path="/transfer" component={Transfer} />
                <Route path="/payment" component={Payment} />
                <Route path="/earnings/:type" component={Earnings} />
                <NotFoundPage default />
            </Router>
        </div>
    );
};

export default App;
