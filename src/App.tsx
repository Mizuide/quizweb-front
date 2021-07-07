import QuizScreen from './component/QuizScreen';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch
} from 'react-router-dom'
import QuizIndex from './component/QuizIndex';
import CreateQuizForm from './component/createQuiz/CreateQuizForm';
import "./App.css"

function App() {
  return (
    <Router basename='/quizWeb/react'>
      <Switch>
        <Route exact path='/'>
          <QuizIndex />
          <Link to={'/create'} >
            問題作成
          </Link>
        </Route>
        <Route exact path='/game/:id' >
          <QuizScreen />
        </Route>
        <Route exact path='/create' >
          <CreateQuizForm />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
