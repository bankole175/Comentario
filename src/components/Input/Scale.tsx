import styles from './input.module.css'

type Props = {
  value: number
  handleFormChange: (option: number) => void
}
export const Scale = (props: Props) => {
  const { value, handleFormChange } = props

  const scaleOption = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    <div>
      <div className={styles.scaleFlex}>
        {scaleOption.map((option, optionIndex) => (
          <div
            style={{
              backgroundColor: option <= value ? '#AB61E5' : '#F2F3F4',
            }}
            key={optionIndex}
            onClick={() => handleFormChange(option)}
            className={styles.scaleBox}
          ></div>
        ))}
      </div>
      <p className={styles.scaleCount}>{value}/10</p>
    </div>
  )
}
