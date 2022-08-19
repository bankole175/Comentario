import styles from './button.module.css'
import * as React from 'react'
import classnames from 'classnames'

type Props = {
  onClick: (se: React.SyntheticEvent) => void
  children: React.ReactNode
  secondary?: boolean
  darkSecondary?: boolean
  disabled?: boolean
}

const Button = (props: Props) => {
  const { children, secondary, darkSecondary, disabled, onClick } = props

  return (
    <button
      disabled={disabled}
      className={classnames(styles.button, {
        [styles.secondaryButton]: secondary,
        [styles.darkSecondaryButton]: darkSecondary,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
