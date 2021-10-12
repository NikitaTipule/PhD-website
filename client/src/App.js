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
        <ProtectedRoute path="/coform" component={phdCordForm} exact></ProtectedRoute>
        <Route path="/register" component={Register} exact></Route>
        <Route path="/login/candidate" component={StudentLogIn} exact></Route>
        <Route path="/login/staff" component={FacLogIn} exact></Route>
        {/* <Route path="/register" component={Register} exact></Route> */}
        <ProtectedRoute
          path="/admissionForm"
          component={admissionForm} />
        <ProtectedRoute
          allowedRoles={[roles.admin]}
          path="/admin"
          component={Admin}
          exact></ProtectedRoute>
        <ProtectedRoute
          allowedRoles={[roles.accountSec, roles.admin]}
          path="/account"
          component={AccountHome}
          exact></ProtectedRoute>
        <ProtectedRoute
          allowedRoles={[roles.student]}
          path="/candidate"
          component={StudentHome}
          exact
        ></ProtectedRoute>
        <ProtectedRoute path="/accountform" component={AccountForm} exact></ProtectedRoute>
        <ProtectedRoute
          allowedRoles={[roles.admin]}
          path="/addcord"
          component={AddCordForm}
          exact></ProtectedRoute>
        <ProtectedRoute
          allowedRoles={[roles.admin]}
          path="/removestaff"
          component={RemoveStaffForm}
          exact></ProtectedRoute>
        <ProtectedRoute
          path="/add-account-section"
          component={AddAccountForm}
          exact
        ></ProtectedRoute>
      </Switch>
    </Router>
  );
}

export default App;
