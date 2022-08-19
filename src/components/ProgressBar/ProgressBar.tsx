import styles from './progressBar.module.css'
import { useMemo } from 'react'
import { FeedbackFormPayloadT } from '../../context/types'

type Props = {
  feedbackPayload: FeedbackFormPayloadT[]
  questionLength: number
}

const ProgressBar = (props: Props) => {
  const { questionLength, feedbackPayload } = props

  const getCompletedQuestion = (feedbackPayload: FeedbackFormPayloadT[]) => {
    const questionsWithAnswer = feedbackPayload.filter(
      (feedback) =>
        (feedback.type === 'singleSelect' && feedback.value !== undefined) ||
        (feedback.type === 'scale' && feedback.value !== 0) ||
        (feedback.type === 'text' &&
          feedback.value !== undefined &&
          feedback.value.length),
    )
    return questionsWithAnswer.length
  }

  const completedQuestion = useMemo(
    () => getCompletedQuestion(feedbackPayload),
    [feedbackPayload],
  )

  const progressValueMultiplier = useMemo(() => {
    return 100 / questionLength
  }, [questionLength])

  const getProgressValue = () => {
    return Number((completedQuestion * progressValueMultiplier).toFixed(0))
  }

  const progressValue = useMemo(
    () => getProgressValue(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [completedQuestion],
  )

  return (
    <div className={styles.progressDiv}>
      <progress
        id="question-progress"
        value={progressValue}
        max="100"
        className={styles.progress}
      ></progress>
      <p className={styles.progressTitle}>Questions completed</p>
      <p className={styles.progressCount}>
        {completedQuestion}/{questionLength}
      </p>
    </div>
  )
}

export default ProgressBar
