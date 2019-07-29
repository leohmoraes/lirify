import React from "react";

import Routes from "./routes";
import GlobalStyle from "./styles/Global";

require("dotenv").config();

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes />;
    </>
  );
}

export default App;
