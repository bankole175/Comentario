import * as React from 'react'
import styles from './user.module.css'
import Initial from '../Initial/Initial'

type Props = {
  name: string
  avatarUrl?: string
}

const User = (props: Props) => {
  const { name, avatarUrl } = props

  return (
    <div className={styles.user}>
      {avatarUrl ? (
        <img className={styles.avatar} alt={name} src={avatarUrl} />
      ) : (
        <Initial name={name} />
      )}
      {name}
    </div>
  )
}

export default User
