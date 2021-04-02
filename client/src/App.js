import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import Layout from "./components/Layout";
import NavigationBar from "./components/NavigationBar";

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "https://localhost:3001/";

function App() {
  return (
    <>
      <Router>
        <NavigationBar />
        <Layout />
      </Router>
    </>
  );
}

export default App;
