import './App.css';
import GameScreen, { param } from './component/GameScreen';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import QuizIndex from './component/QuizIndex';


function App() {
  return (
    <Router basename='/quizWeb/react'>
      <Switch>
        <Route exact path='/'>
          <QuizIndex />
        </Route>
        <Route exact path='/game/:id' >
          <GameScreen />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
