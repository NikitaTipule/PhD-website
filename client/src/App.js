import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import coForm from './pages/coForm';
import Home from "./pages/Home"
import StickyHeadTable from './pages/coHome';
import Register from './pages/Register';
import LogIn from './pages/LogIn';
import Admin from './pages/Admin'

function App() {
  return (

      <Router>
        <Switch>
          <Route path="/" component={Home} exact></Route>
          <Route path="/co-home" component={StickyHeadTable} exact></Route>
          <Route path="/coform" component={coForm} exact></Route>
          <Route path="/register" component={Register} exact></Route>
          <Route path="/login" component={LogIn} exact></Route>
          <Route path="/admin" component={Admin} exact></Route>
        </Switch>
      </Router>

  );
}

export default App;
