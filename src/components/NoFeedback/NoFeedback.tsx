import styles from './noFeedback.module.css'
import * as React from 'react'

const NoFeedback = () => {
  return (
    <div className={styles.noFeedback}>
      <div className={styles.noFeedbackMain}>
        <div>
          <h3 className={styles.noFeedbackTitle}>No feedback to display 🔮</h3>
          <p>
            There is no feedback to display at this time - check back in a bit !
          </p>
        </div>
      </div>
    </div>
  )
}

export default NoFeedback
