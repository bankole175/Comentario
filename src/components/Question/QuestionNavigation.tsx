import styles from './question.module.css'
import Button from '../Button'
import React, { useContext, useEffect, useState } from 'react'
import {
  DispatchProgressContext,
  ProgressContext,
} from '../../context/ProgressProvider'
import { QuestionContext } from '../../context/QuestionProvider'
import { FeedbackFormPayloadT, QuestionT } from '../../context/types'

type Props = {
  feedbackPayload: FeedbackFormPayloadT[]
  question: QuestionT
  submit: () => void
}

export const QuestionNavigation = (props: Props) => {
  const { submit, feedbackPayload, question } = props

  const currentQuestionIndex = useContext(ProgressContext)
  const questions = useContext(QuestionContext)
  const progressDispatch = useContext(DispatchProgressContext)

  const [questionState, setQuestionState] = useState<boolean>(false)

  const previous = () => {
    if (currentQuestionIndex === 0) return
    progressDispatch({
      action: 'decrement',
    })
  }

  const next = () => {
    if (questions && currentQuestionIndex === questions.length - 1) return
    progressDispatch({
      action: 'increment',
    })
  }

  useEffect(() => {
    const currentState =
      feedbackPayload[currentQuestionIndex].value === undefined
        ? true
        : question.type === 'scale' &&
          feedbackPayload[currentQuestionIndex].value === 0
        ? true
        : question.type === 'text' &&
          feedbackPayload[currentQuestionIndex].value !== undefined &&
          feedbackPayload[currentQuestionIndex].value.length === 0
    setQuestionState(currentState)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feedbackPayload])

  return (
    <div className={styles.action}>
      {currentQuestionIndex !== 0 ? (
        <Button secondary onClick={previous}>
          Previous
        </Button>
      ) : (
        <div></div>
      )}

      {questions && !questions[currentQuestionIndex].required && (
        <Button secondary onClick={next}>
          Skip
        </Button>
      )}

      {questions && currentQuestionIndex !== questions.length - 1 && (
        <Button
          disabled={questionState}
          darkSecondary={questionState}
          onClick={next}
        >
          Next
        </Button>
      )}

      {questions && currentQuestionIndex === questions.length - 1 && (
        <Button
          darkSecondary={questions[currentQuestionIndex].required}
          disabled={questions[currentQuestionIndex].required}
          onClick={submit}
        >
          Submit
        </Button>
      )}
    </div>
  )
}
