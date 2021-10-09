import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import phdCordForm from "./pages/PhdCordForm";
import Home from "./pages/Home";
import PhdCordHome from "./pages/PhdCordHome";
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
import ProtectedRouteStudent from "./components/ProtectedRouteStudent";
import ProtectedRouteCoordinator from "./components/ProtectedRouteCoordinator"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact></Route>
        <ProtectedRouteCoordinator path="/coordinator" component={PhdCordHome} exact></ProtectedRouteCoordinator>
        <Route path="/coform" component={phdCordForm} exact></Route>
        <Route path="/register" component={Register} exact></Route>
        <Route path="/login/candidate" component={StudentLogIn} exact></Route>
        <Route path="/login/staff" component={FacLogIn} exact></Route>
        <Route path="/register" component={Register} exact></Route>
        <Route path="/admissionForm" component={admissionForm} />
        <Route path="/admin" component={Admin} exact></Route>
        <Route path="/account" component={AccountHome} exact></Route>
        <ProtectedRouteStudent
          path="/candidate"
          component={StudentHome}
          exact
        ></ProtectedRouteStudent>
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
