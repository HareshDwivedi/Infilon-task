import React from "react";
import { Container } from "reactstrap";
import { Provider } from "react-redux";
import Dashboard from "./components/Dashboard";
import store from "../src/redux/store";


const App = () => {
  return (
    <Provider store={store}>
      <Container>
        <Dashboard />
      </Container>
    </Provider>

  );
};

export default App;