import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import coForm from './pages/coForm';
import Home from "./pages/Home"
import StickyHeadTable from './pages/coHome';
import Register from './pages/Register';
import StudentLogIn from './pages/StudentLogIn';
import FacLogIn from './pages/FacLogIn';

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
        </Switch>
      </Router>

  );
}

export default App;
