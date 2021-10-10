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
import ProtectedRoute from "./components/ProtectedRoute";
import { roles } from "./phdAdmDetails";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact></Route>
        <ProtectedRoute
          allowedRoles={[roles.phdCord, roles.admin]}
          path="/coordinator"
          component={PhdCordHome}
          exact
        ></ProtectedRoute>
        <Route path="/coform" component={phdCordForm} exact></Route>
        <Route path="/register" component={Register} exact></Route>
        <Route path="/login/candidate" component={StudentLogIn} exact></Route>
        <Route path="/login/staff" component={FacLogIn} exact></Route>
        <Route path="/register" component={Register} exact></Route>
        <Route path="/admissionForm" component={admissionForm} />
        <Route path="/admin" component={Admin} exact></Route>
        <Route path="/account" component={AccountHome} exact></Route>
        <ProtectedRoute
          allowedRoles={[roles.student]}
          path="/candidate"
          component={StudentHome}
          exact
        ></ProtectedRoute>
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
