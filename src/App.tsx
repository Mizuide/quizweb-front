import React, { useState } from 'react';
import {
  BrowserRouter as Router, Route,
  Switch
} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Container, Segment } from 'semantic-ui-react';
import Header from "./component/common/Header";
import Confirmation from './component/createQuiz/Confirmation';
import CreateQuizForm from './component/createQuiz/CreateQuizForm';
import QuizScreen from './component/playQuiz/QuizScreen';
import LinkToQuiz from './component/searchQuiz/LinkToQuiz';
import QuizIndex from './component/searchQuiz/QuizIndex';
import loginUser from './type/loginUser';
// 順番によって変わったり
import './App.css';

export const loginUserContext = React.createContext<loginUser | undefined>(undefined);
function App() {
  const [loginUser, setLoginUser] = useState<loginUser>();
  return (
    <loginUserContext.Provider value={loginUser}>
      <Router basename='/'>
        <Container>
          <Header setLoginUser={setLoginUser} />
          <Segment>
            <Switch>
              <Route exact path='/search' component={LinkToQuiz}>
                <QuizIndex />
              </Route>
              <Route exact path='/game/:id' >
                <QuizScreen />
              </Route>
              <Route exact path='/create' >
                <CreateQuizForm />
              </Route>
              <Route exact path='/create/done' >
                <Confirmation />
              </Route>
            </Switch>
          </Segment>
        </Container>
      </Router>
    </loginUserContext.Provider>
  );
}

export default App;
