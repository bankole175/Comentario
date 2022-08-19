import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { DispatchUserContext } from '../context/UserProvider'
import { DispatchQuestionContext } from '../context/QuestionProvider'
import ErrorHandler from './ErrorHandler'
import GiveFeedback from '../views/GiveFeedback'
import Home from '../views/Home'
import http from '../common/http'
import NotFound from '../views/NotFound'
import ReviewFeedback from '../views/ReviewFeedback'
import { AccountContext } from '../context/AccountProvider'
import PrivateRoute from '../components/Routing/PrivateRoute'
import { DispatchFeedbackContext } from '../context/FeedbackProvider'
import TeamFeedback from '../views/TeamFeedback'
import { useContext, useEffect } from 'react'

const App = () => {
  const currentUser = useContext(AccountContext)
  const userDispatch = useContext(DispatchUserContext)
  const questionDispatch = useContext(DispatchQuestionContext)
  const feedbackDispatch = useContext(DispatchFeedbackContext)
  const isLoggedIn = currentUser != null

  useEffect(() => {
    Promise.all([http.get('questions'), http.get('people')]).then(
      ([questions, people]) => {
        userDispatch({
          action: 'set',
          payload: people,
        })

        questionDispatch({
          action: 'set',
          payload: questions,
        })
      },
    )
    feedbackDispatch({
      action: 'set',
      payload: [],
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <BrowserRouter>
      <ErrorHandler>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute isLoggedIn={isLoggedIn} exact path="/my-feedback">
            <ReviewFeedback />
          </PrivateRoute>
          <PrivateRoute isLoggedIn={isLoggedIn} exact path="/share-feedback">
            <GiveFeedback />
          </PrivateRoute>
          <PrivateRoute isLoggedIn={isLoggedIn} exact path="/team-feedback">
            <TeamFeedback />
          </PrivateRoute>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </ErrorHandler>
    </BrowserRouter>
  )
}

export default App
