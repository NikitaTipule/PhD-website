import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import coForm from "./pages/coForm";
import Home from "./pages/Home";
import StickyHeadTable from "./pages/coHome";
import Register from "./pages/Register";
import StudentLogIn from "./pages/StudentLogIn";
import FacLogIn from "./pages/FacLogIn";
import admissionForm from "./pages/admissionForm";
import Admin from "./pages/Admin";
import AccountHome from "./pages/AccountHome";
import StudentHome from "./pages/StudentHome";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact></Route>
        <Route path="/co-home" component={StickyHeadTable} exact></Route>
        <Route path="/coform" component={coForm} exact></Route>
        <Route path="/Register" component={Register} exact></Route>
        <Route path="/StudentLogIn" component={StudentLogIn} exact></Route>
        <Route path="/FacLogIn" component={FacLogIn} exact></Route>
        <Route path="/register" component={Register} exact></Route>
        <Route path="/admissionForm" component={admissionForm} />
        <Route path="/admin" component={Admin} exact></Route>
        <Route path="/account" component={AccountHome} exact></Route>
        <Route path="/studenthome" component={StudentHome} exact></Route>
      </Switch>
    </Router>
  );
}

export default App;
