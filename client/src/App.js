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
import AccountForm from "./pages/AccountForm";
import AddCordForm from "./pages/AddCordForm";
import RemoveStaffForm from "./pages/RemoveStaffForm";
import AddAccountForm from "./pages/AddAccountForm.js";

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
        <Route path="/accountform" component={AccountForm} exact></Route>
        <Route path="/addcord" component={AddCordForm} exact></Route>
        <Route path="/removestaff" component={RemoveStaffForm} exact></Route>
        <Route
          path="/add-account-section"
          component={AddAccountForm}
          exact
        ></Route>
      </Switch>
    </Router>
  );
}

export default App;
