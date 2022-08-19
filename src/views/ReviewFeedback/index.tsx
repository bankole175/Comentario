import * as React from 'react'
import MainLayout from '../../layouts/MainLayout'
import styles from './reviewFeedback.module.css'
import { useLocation } from 'react-router-dom'
import { useContext, useMemo } from 'react'
import { AccountContext } from '../../context/AccountProvider'
import { FeedbackContext } from '../../context/FeedbackProvider'
import Feedback from '../../components/Feedback'
import NoFeedback from '../../components/NoFeedback'

const useQuery = () => {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}

const ReviewFeedback = () => {
  const currentUser = useContext(AccountContext)
  const feedback = useContext(FeedbackContext)
  let query = useQuery()
  const receiverId: string | null = query.get('id')

  const giverId = currentUser?.id
  const myFeedback = feedback
    ? feedback.filter((fb) => fb.giver.id === giverId)
    : []

  return (
    <MainLayout loggedIn>
      {myFeedback.length ? (
        <div>
          <h1 className={styles.title}>My Feedback</h1>
          <Feedback
            feedback={myFeedback}
            title={'Feedback Given'}
            type={'given'}
            receiverId={receiverId}
          ></Feedback>
        </div>
      ) : (
        <NoFeedback></NoFeedback>
      )}
    </MainLayout>
  )
}

export default ReviewFeedback
