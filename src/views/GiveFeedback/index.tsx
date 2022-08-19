import MainLayout from '../../layouts/MainLayout'
import styles from './giveFeedback.module.css'
import { useContext, useEffect, useState } from 'react'

import { UserT } from '../../context/types'

import { FeedbackContext } from '../../context/FeedbackProvider'
import { QuestionContext } from '../../context/QuestionProvider'
import { AccountContext } from '../../context/AccountProvider'

import Question from '../../components/Question'
import Recipient from '../../components/Recipient'

const GiveFeedback = () => {
  const feedback = useContext(FeedbackContext)
  const questions = useContext(QuestionContext)
  const currentUser = useContext(AccountContext)
  const [selectedUser, setSelectedUser] = useState<UserT | null>()
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [myFeedback, setMyFeedback] = useState<Array<string>>([])

  let userId = currentUser?.id

  const getMyFeedbackId = () => {
    const myFeedbackArray: Array<string> = []
    feedback?.forEach((fb) => {
      if (fb.giver.id === userId) {
        myFeedbackArray.push(fb.receiver.id)
      }
    })
    setMyFeedback(myFeedbackArray)
  }

  const shareFeedback = (user: UserT) => {
    setSelectedUser(user)
    setIsSubmitted(false)
  }

  useEffect(() => {
    getMyFeedbackId()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitted])

  return (
    <MainLayout loggedIn>
      <div className={styles.wrapper}>
        {!selectedUser && !isSubmitted && (
          <div>
            <h1 className={styles.title}>Share Feedback</h1>

            <Recipient
              myFeedback={myFeedback}
              setSelectedUser={setSelectedUser}
            />
          </div>
        )}

        {selectedUser && !isSubmitted && (
          <div>
            <p className={styles.back} onClick={() => setSelectedUser(null)}>
              <img src="/asset/icons/arrow-back.svg" alt="back" />
              <span className={styles.backText}>Back</span>
            </p>
            <Question
              questions={questions}
              {...selectedUser}
              setSubmission={() => setIsSubmitted(true)}
            ></Question>
          </div>
        )}

        {isSubmitted && (
          <div>
            <h3 className={styles.title}>
              Thank you for sharing your feedback!
            </h3>
            <p className={styles.thankYouSubTitle}>
              Continue to give feedback to other team members.
            </p>

            <Recipient
              myFeedback={myFeedback}
              setSelectedUser={shareFeedback}
              afterSubmission={true}
            />
          </div>
        )}
      </div>
    </MainLayout>
  )
}

export default GiveFeedback
