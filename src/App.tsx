import './App.css';
import GameScreen,{param} from './component/GameScreen';
import {
  BrowserRouter as Router,
  Route,
  Link,
  useParams,
  Switch
} from 'react-router-dom'


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <GameScreen/>
        </Route>
        <Route exact path='/game/:id' >
          <GameScreen />
        </Route>
       </Switch>
    </Router>
  );
}

export default App;
