import './App.css';
import QuizScreen from './component/QuizScreen';
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
          <QuizScreen />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
