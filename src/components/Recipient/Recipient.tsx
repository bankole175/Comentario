import styles from '../../views/GiveFeedback/giveFeedback.module.css'
import User from '../User'
import Button from '../Button'
import React, { useContext, useEffect, useState } from 'react'
import { UserT } from '../../context/types'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../context/UserProvider'
import { AccountContext } from '../../context/AccountProvider'

type Props = {
  myFeedback: string[]
  setSelectedUser: (user: UserT) => void
  afterSubmission?: boolean
}

const Recipient = (props: Props) => {
  const { myFeedback, setSelectedUser, afterSubmission } = props

  const [users, setUsers] = useState<UserT[]>()

  let navigate = useHistory()
  const allUsers = useContext(UserContext)
  const currentUser = useContext(AccountContext)

  const viewSubmission = (id: string) => {
    navigate.push({
      pathname: '/my-feedback',
      search: `?id=${id}`,
      state: { update: true },
    })
  }
  useEffect(() => {
    let userId = currentUser?.id

    const users = afterSubmission
      ? allUsers?.filter(
          (user) => user.id !== userId && !myFeedback.includes(user.id),
        )
      : allUsers?.filter((user) => user.id !== userId)
    setUsers(users)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myFeedback])

  return (
    <>
      {users && users.length > 0 && (
        <ul className={styles.users}>
          {users.map((user) => (
            <li key={user.id} className={styles.user}>
              <User name={user.name} avatarUrl={user.avatarUrl} />
              <span style={{ flex: 1 }} />

              {!myFeedback.includes(user.id) && (
                <Button onClick={() => setSelectedUser(user)}>Fill out</Button>
              )}

              {!afterSubmission && myFeedback.includes(user.id) && (
                <Button secondary onClick={() => viewSubmission(user.id)}>
                  View Submissions
                </Button>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default Recipient
