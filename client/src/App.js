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
import RemoveCordForm from "./pages/RemoveCordForm";
import RemoveAccountForm from "./pages/RemoveAccountForm";
import AddAccountForm from "./pages/AddAccountForm";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginAccountSection from "./pages/LoginAccountSection";
import { roles } from "./phdAdmDetails";
import axios from "axios";
import DocViewer from "./pages/DocViewer";
import OTP from "./pages/otp";
import Link from "./pages/Link";

function setToken() {
  const token = localStorage.getItem("phd-website-jwt");
  if (token) {
    axios.defaults.headers.common["phd-website-jwt"] = token;
  } else {
    axios.defaults.headers.common["phd-website-jwt"] = null;
    /*if setting null does not remove `Authorization` header then try     
        delete axios.defaults.headers.common['Authorization'];
      */
  }
}
setToken();

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
        <ProtectedRoute
          allowedRoles={[roles.phdCord, roles.admin]}
          path="/coform"
          component={phdCordForm}
          exact
        ></ProtectedRoute>
        <Route path="/register" component={Register} exact></Route>
        <Route path="/login/candidate" component={StudentLogIn} exact></Route>
        <Route path="/login/staff" component={FacLogIn} exact></Route>
        <Route
          path="/login/account-section"
          component={LoginAccountSection}
          exact
        ></Route>
        {/* <Route path="/register" component={Register} exact></Route> */}
        <ProtectedRoute
          allowedRoles={[roles.student]}
          path="/admissionForm"
          component={admissionForm}
        />
        <ProtectedRoute
          allowedRoles={[roles.admin]}
          path="/admin"
          component={Admin}
          exact
        ></ProtectedRoute>
        <ProtectedRoute
          allowedRoles={[roles.accountSec, roles.admin]}
          path="/account"
          component={AccountHome}
          exact
        ></ProtectedRoute>
        <ProtectedRoute
          allowedRoles={[roles.student]}
          path="/candidate"
          component={StudentHome}
          exact
        ></ProtectedRoute>
        <ProtectedRoute
          allowedRoles={[roles.accountSec]}
          path="/accountform"
          component={AccountForm}
          exact
        ></ProtectedRoute>
        <ProtectedRoute
          allowedRoles={[roles.admin]}
          path="/addcord"
          component={AddCordForm}
          exact
        ></ProtectedRoute>
        <ProtectedRoute
          allowedRoles={[roles.admin]}
          path="/removecord"
          component={RemoveCordForm}
          exact
        ></ProtectedRoute>
        <ProtectedRoute
          allowedRoles={[roles.admin]}
          path="/add-account-section"
          component={AddAccountForm}
          exact
        ></ProtectedRoute>
        <ProtectedRoute
          allowedRoles={[roles.admin]}
          path="/remove-account-section"
          component={RemoveAccountForm}
          exact
        ></ProtectedRoute>
        <Route
          path="/doc"
          component={() => (
            <DocViewer
              filename="407e5ec9a35239d9e93b17f7dc5af51c1634111043524.pdf"
              contentType="application/pdf"
              onClose={() => {}}
            />
          )}
          exact
        ></Route>
        <Route path="/candidate-otp" component={OTP} exact></Route>
        <Route path="/link" component={Link} exact></Route>
      </Switch>
    </Router>
  );
}

export default App;
