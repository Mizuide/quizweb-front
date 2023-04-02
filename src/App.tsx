import React, { useState } from 'react';
import {
  BrowserRouter as Router, Route,
  Switch
} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Container, Segment } from 'semantic-ui-react';
import Header from "./component/common/Header";
import Confirmation from './component/createQuiz/Confirmation';
import QuizScreen from './component/playQuiz/QuizScreen';
import QuizIndex from './component/searchQuiz/QuizIndex';
import loginUser from './type/loginUser';
// 順番によって変わったり
import CreateQuiz from './component/createQuiz/CreateQuiz';
import EditError from './component/editQuiz/EditError';
import EditQuiz from './component/editQuiz/EditQuiz';
import InputEditPassword from './component/editQuiz/InputEditPassword';

import './App.css';

export const loginUserContext = React.createContext<loginUser | undefined>(undefined);
function App() {
  const [loginUser, setLoginUser] = useState<loginUser>();
  return (
    <loginUserContext.Provider value={loginUser}>
      <Router basename='/quizWeb'>
        <Container>
          <Header setLoginUser={setLoginUser} />
          <Segment>
            <Switch>
              <Route exact path='/search'>
                <QuizIndex />
              </Route>
              <Route exact path='/game/:id' >
                <QuizScreen />
              </Route>
              <Route exact path='/create' >
                <CreateQuiz />
              </Route>
              <Route exact path='/inputpass/:id' >
                <InputEditPassword />
              </Route>
              <Route exact path='/edit/:id/:password?' >
                <EditQuiz />
              </Route>
              <Route exact path='/editerror' >
                <EditError />
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
