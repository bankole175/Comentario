import styles from './input.module.css'
import React from 'react'

type Props = {
  value: string | number
  handleFormChange: (se: React.SyntheticEvent) => void
}

export const TextArea = (props: Props) => {
  const { value, handleFormChange } = props

  return (
    <textarea
      value={value}
      onChange={handleFormChange}
      className={styles.textAreaBox}
    ></textarea>
  )
}
