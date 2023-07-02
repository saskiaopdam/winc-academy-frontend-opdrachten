import { BrowserRouter } from "react-router-dom";

import "./App.css";
import ScrollToTop from "./components/ScrollToTop";

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop>
          <Header />
          <Main />
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
}

export default App;
