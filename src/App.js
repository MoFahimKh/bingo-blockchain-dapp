import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import ConnectWallet from "./components/home-page/ConnectWallet";
import HomePage from "./components/home-page/HomePage";
import { WalletContext } from "./context/WalletContext";

const App = () => {
  const { address } = useContext(WalletContext);

  return (
    <Router>
      <div className="app">
        {!address ? (
          <Switch>
            <Route exact path="/" component={ConnectWallet} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={HomePage} />
          </Switch>
        )}
      </div>
    </Router>
  );
};

export default App;
