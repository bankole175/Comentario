import React, { useContext, useState } from 'react'
import { Redirect } from 'react-router-dom'
import Button from '../../components/Button'
import MainLayout from '../../layouts/MainLayout'
import Select from 'react-select'
import styles from './home.module.css'
import {
  AccountContext,
  DispatchAccountContext,
} from '../../context/AccountProvider'
import { UserContext } from '../../context/UserProvider'
import { UserT } from '../../context/types'

const Home = () => {
  const currentUser = useContext(AccountContext)
  const accountDispatch = useContext(DispatchAccountContext)
  const allUsers = useContext(UserContext)
  const [selectedUser, setUserForLogin] = useState<UserT | null>()

  if (currentUser != null) {
    return <Redirect to="/share-feedback" />
  }

  return (
    <MainLayout className={styles.background}>
      <div className={styles.wrapper}>
        <div className={styles.loginBox}>
          <h1 className={styles.heading}>Comentario</h1>
          <div className={styles.loginAs}>
            <label htmlFor="loginNames">Login as:</label>
            <Select<UserT>
              id="loginNames"
              options={allUsers!!}
              getOptionLabel={(user: UserT) => user.name}
              getOptionValue={(user: UserT) => user.id}
              value={selectedUser}
              onChange={setUserForLogin}
            />
          </div>
          <div>
            <Button
              onClick={() => {
                accountDispatch({
                  action: 'login',
                  payload: selectedUser,
                })
              }}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Home
