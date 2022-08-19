import * as React from 'react'
import styles from './feedback.module.css'
import User from '../User'
import { FeedbackT } from '../../context/types'
import { useEffect, useState } from 'react'

type Props = {
  feedback: FeedbackT[]
  title: string
  type: string
  receiverId?: string | null
}

const Feedback = (props: Props) => {
  const { feedback, title, receiverId, type } = props
  const scaleOption = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackT>()

  useEffect(() => {
    if (receiverId) {
      const newSelectedFeedback = feedback.find(
        (fb) => fb.receiver.id === receiverId,
      )
      setSelectedFeedback(newSelectedFeedback)
    } else {
      const newSelectedFeedback = feedback[0]
      setSelectedFeedback(newSelectedFeedback)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div>
        <div className={styles.feedbackContainer}>
          <ul className={styles.users}>
            <li className={`${styles.fbText} ${styles.textDark}`}>{title}</li>
            {feedback.map((fb) => (
              <li
                className={`${styles.user} ${
                  selectedFeedback && fb.id === selectedFeedback.id
                    ? styles.activeUser
                    : styles.bgWhite
                }`}
                onClick={() => setSelectedFeedback(fb)}
              >
                <User
                  name={type === 'given' ? fb.receiver.name : fb.giver.name}
                  avatarUrl={
                    type === 'given'
                      ? fb.receiver.avatarUrl
                      : fb.giver.avatarUrl
                  }
                />
              </li>
            ))}
          </ul>

          {selectedFeedback && (
            <ul className={styles.feedback}>
              <li>
                <h4 className={styles.receiverName}>
                  {type === 'given'
                    ? selectedFeedback.receiver.name
                    : selectedFeedback.giver.name}
                  ' Feedback
                </h4>
              </li>
              {selectedFeedback.feedback.map((fbItem) => (
                <li>
                  <div className={styles.feedbackResponse}>
                    <p className={styles.feedbackText}>{fbItem.question}</p>
                    <div>
                      {fbItem.value && fbItem.type === 'scale' && (
                        <div className={styles.scaleFlex}>
                          {scaleOption.map((option, index) => (
                            <div
                              style={{
                                backgroundColor:
                                  option <= fbItem.value
                                    ? '#AB61E5'
                                    : '#F2F3F4',
                              }}
                              key={index}
                              className={styles.scaleBox}
                            ></div>
                          ))}
                        </div>
                      )}
                      {fbItem.value && fbItem.type !== 'scale' && (
                        <p className={styles.feedbackText}>{fbItem.value}</p>
                      )}

                      {(fbItem.value === undefined ||
                        fbItem.value.length === 0) && (
                        <div className={styles.skipped}>
                          <p className={`${styles.fbText} ${styles.textWhite}`}>
                            skipped
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default Feedback
