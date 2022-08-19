import styles from './input.module.css'
import { QuestionT } from '../../context/types'

type Props = {
  question: QuestionT
  value: string
  handleFormChange: (label: string) => void
}
export const SingleSelect = (props: Props) => {
  const { question, value, handleFormChange } = props

  return (
    <div>
      {question.options?.map((option) => (
        <div
          key={option.value}
          onClick={() => handleFormChange(option.label)}
          className={`${styles.optionDiv} ${
            value === option.label ? styles.optionSelected : styles.option
          }`}
        >
          {option.label}
        </div>
      ))}
    </div>
  )
}
