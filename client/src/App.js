import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import coHome from "./pages/coHome"
import Home from "./pages/Home"

function App() {
  return (

      <Router>
        <Switch>
          <Route path="/" component={Home} exact></Route>
          <Route path="/co-home" component={coHome} exact></Route>
        </Switch>
      </Router>

  );
}

export default App;
