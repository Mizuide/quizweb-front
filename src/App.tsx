import React, { useState } from 'react';
import {
  BrowserRouter as Router, Route,
  Switch,
  useHistory
} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Container, Grid, Segment } from 'semantic-ui-react';
import Header from "./component/common/Header";
import CreateQuizForm from './component/createQuiz/CreateQuizForm';
import LinkToQuiz from './component/LinkToQuiz';
import QuizIndex from './component/QuizIndex';
import QuizScreen from './component/QuizScreen';
import loginUser from './type/loginUser';

export const loginUserContext = React.createContext<loginUser | undefined>(undefined);
function App() {
  const [loginUser, setLoginUser] = useState<loginUser>();
  return (
    <loginUserContext.Provider value={loginUser}>
      <Router basename='/quizWeb/react'>
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
                <CreateQuizForm loginUser={loginUser}/>
              </Route>
            </Switch>
          </Segment>
        </Container>
      </Router>
    </loginUserContext.Provider>
  );
}

export default App;
