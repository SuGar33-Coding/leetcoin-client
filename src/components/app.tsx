import { createRef, FunctionalComponent, h } from "preact";
import { route, Route, Router, getCurrentUrl } from "preact-router";

// import Transaction from "../routes/transaction";
import Transactions from "../routes/transactions";
import Profile from "../routes/profile";
import NotFoundPage from "../routes/notfound";
import Header from "./header";
import Transfer from "../routes/transfer";
import Payment from "../routes/payment";
import Earnings from "../routes/earnings";
import {
    AppBar,
    BottomNavigation,
    BottomNavigationAction,
    createMuiTheme,
    FormControlLabel,
    FormGroup,
    Switch,
    ThemeProvider,
    Toolbar,
    Typography
} from "@material-ui/core";
import { useEffect, useState } from "preact/hooks";
import { disableBodyScroll } from "body-scroll-lock";

const App: FunctionalComponent = () => {
    const [curRoute, setCurRoute] = useState<string>("");
    const [preferDark, setPreferDark] = useState<boolean>(true);

    const ref = createRef();

    useEffect(() => {
        disableBodyScroll(ref.current);
        setCurRoute(getCurrentUrl());
    }, []);

    const theme = createMuiTheme({
        palette: {
            type: preferDark ? "dark" : "light",
            primary: {
                main: "#1976d2"
            },
            secondary: {
                main: "#dc004e"
            }
        }
    });

    return (
        <div id="app">
            <ThemeProvider theme={theme}>
                {/* <Header /> */}
                <AppBar ref={ref} position="static">
                    <Toolbar>
                        <Typography style={{ flexGrow: 1 }} variant="h6">
                            LeetCoin
                        </Typography>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch
                                        edge="end"
                                        checked={preferDark}
                                        onChange={() =>
                                            setPreferDark(!preferDark)
                                        }
                                    />
                                }
                                label={
                                    <span style={{ paddingLeft: 5 }}>🌓</span>
                                }
                            />
                        </FormGroup>
                    </Toolbar>
                </AppBar>
                <Router>
                    <Route path="/" component={Transactions} />
                    <Route path="/profile/" component={Profile} />
                    {/* <Route path="/transaction" component={Transaction} /> */}
                    <Route path="/transfer" component={Transfer} />
                    <Route path="/payment" component={Payment} />
                    <Route path="/earnings/:type" component={Earnings} />
                    <NotFoundPage default />
                </Router>
                <BottomNavigation
                    value={curRoute}
                    onChange={(event, newValue) => {
                        setCurRoute(newValue);
                        route(newValue);
                    }}
                    style={{ position: "fixed", bottom: "0%", width: "100%" }}
                    showLabels
                >
                    <BottomNavigationAction
                        label="Transactions"
                        value="/"
                        icon={<span>📈</span>}
                    />
                    <BottomNavigationAction
                        label="Profile"
                        value="/profile"
                        icon={<span>😬</span>}
                    />
                </BottomNavigation>
            </ThemeProvider>
        </div>
    );
};

export default App;
