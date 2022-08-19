import MainLayout from '../../layouts/MainLayout'
import Feedback from '../../components/Feedback'
import { useContext } from 'react'
import { FeedbackContext } from '../../context/FeedbackProvider'
import { AccountContext } from '../../context/AccountProvider'
import NoFeedback from '../../components/NoFeedback'

const TeamFeedback = () => {
  const currentUser = useContext(AccountContext)
  const feedback = useContext(FeedbackContext)
  const userId = currentUser?.id
  const myFeedback = feedback
    ? feedback.filter((fb) => fb.receiver.id === userId)
    : []
  return (
    <MainLayout loggedIn>
      {myFeedback.length ? (
        <div>
          <h1>Team Feedback</h1>
          <Feedback
            feedback={myFeedback}
            title={'Feedback Received'}
            type={'received'}
          ></Feedback>
        </div>
      ) : (
        <NoFeedback></NoFeedback>
      )}
    </MainLayout>
  )
}

export default TeamFeedback
