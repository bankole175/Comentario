import styles from './question.module.css'
import ProgressBar from '../ProgressBar/ProgressBar'
import { useContext, useEffect, useState } from 'react'
import { FeedbackFormPayloadT, QuestionT } from '../../context/types'
import { AccountContext } from '../../context/AccountProvider'
import { DispatchFeedbackContext } from '../../context/FeedbackProvider'
import Initial from '../Initial'
import {
  DispatchProgressContext,
  ProgressContext,
} from '../../context/ProgressProvider'
import { TextArea } from '../Input'
import { Scale } from '../Input'
import { SingleSelect } from '../Input'
import { QuestionNavigation } from './QuestionNavigation'

type Props = {
  questions: QuestionT[] | null
  name: string
  avatarUrl?: string
  id: string
  setSubmission: (se: boolean) => void
}

const Question = (props: Props) => {
  const { name, avatarUrl, id, setSubmission, questions } = props

  const currentUser = useContext(AccountContext)
  const feedbackDispatch = useContext(DispatchFeedbackContext)
  const currentQuestionIndex = useContext(ProgressContext)
  const progressDispatch = useContext(DispatchProgressContext)

  const [feedbackPayload, setFeedbackPayload] = useState<
    FeedbackFormPayloadT[]
  >([])

  const receiver = { name, avatarUrl, id }

  const submit = () => {
    const id = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)
    let payload
    if (currentUser) {
      payload = {
        id,
        giver: {
          name: currentUser.name,
          avatarUrl: currentUser.avatarUrl,
          id: currentUser.id,
        },
        receiver,
        feedback: feedbackPayload,
      }
    }
    feedbackDispatch({
      action: 'update',
      payload,
    })
    progressDispatch({
      action: 'set',
    })
    initializeFeedbackForm()
    setSubmission(true)
  }

  const handleFormChange = (id: string, type: string, event: any) => {
    let feedbacks = [...feedbackPayload]
    feedbacks.forEach((feedback) => {
      if (feedback.id === id) {
        switch (type) {
          case 'scale':
            feedback.value = event
            return
          case 'singleSelect':
            feedback.value = event
            return
          default:
            feedback.value = event.target.value
        }
      }
    })

    setFeedbackPayload(feedbacks)
  }

  const initializeFeedbackForm = () => {
    const initialPayload: FeedbackFormPayloadT[] = []
    questions?.forEach((question) => {
      initialPayload.push({
        id: question.id,
        question: question.label,
        type: question.type,
        value: question.type === 'scale' ? 0 : undefined,
      })
    })
    setFeedbackPayload(initialPayload)
  }

  useEffect(() => {
    initializeFeedbackForm()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      <form>
        {questions?.map((question: QuestionT, questionIndex) => (
          <div key={question.id}>
            {currentQuestionIndex === questionIndex && feedbackPayload.length && (
              <div>
                <div className={styles.question}>
                  <div>
                    <h3 className={styles.questionTitle}>{question.label}</h3>
                    <p className={styles.questionSubTitle}>
                      Share your feedback for {name}
                    </p>
                  </div>
                  {avatarUrl ? (
                    <img className={styles.avatar} alt={name} src={avatarUrl} />
                  ) : (
                    <Initial name={name} />
                  )}
                </div>

                <div className={styles.answerBox}>
                  <div className={styles.questionTypeBox}>
                    {question.type === 'singleSelect' && (
                      <SingleSelect
                        question={question}
                        value={feedbackPayload[currentQuestionIndex].value}
                        handleFormChange={(label) =>
                          handleFormChange(question.id, question.type, label)
                        }
                      />
                    )}

                    {question.type === 'scale' && (
                      <Scale
                        value={feedbackPayload[currentQuestionIndex].value}
                        handleFormChange={(option: number) =>
                          handleFormChange(question.id, question.type, option)
                        }
                      />
                    )}

                    {question.type !== 'scale' &&
                      question.type !== 'singleSelect' && (
                        <TextArea
                          value={feedbackPayload[currentQuestionIndex].value}
                          handleFormChange={(event) =>
                            handleFormChange(question.id, question.type, event)
                          }
                        />
                      )}
                  </div>

                  <QuestionNavigation
                    feedbackPayload={feedbackPayload}
                    question={question}
                    submit={submit}
                  ></QuestionNavigation>

                  <ProgressBar
                    feedbackPayload={feedbackPayload}
                    questionLength={questions?.length}
                  ></ProgressBar>
                </div>
              </div>
            )}
          </div>
        ))}
      </form>
    </div>
  )
}

export default Question
