import { NavLink } from 'react-router-dom'
import styles from './header.module.css'
import {
  AccountContext,
  DispatchAccountContext,
} from '../../context/AccountProvider'
import { useContext } from 'react'

const Header = () => {
  const currentUser = useContext(AccountContext)
  const logoutUser = useContext(DispatchAccountContext)

  console.log('current user', currentUser)

  const handleLogout = () => {
    logoutUser({ action: 'logout' })
  }

  return (
    <div className={styles.header}>
      <h1>comentario</h1>
      <NavLink exact to="/share-feedback" activeClassName={styles.active}>
        Share Feedback
      </NavLink>
      <NavLink exact to="/my-feedback" activeClassName={styles.active}>
        My Feedback
      </NavLink>
      <NavLink exact to="/team-feedback" activeClassName={styles.active}>
        Team Feedback
      </NavLink>
      <span className={styles.spacer} />
      <NavLink exact to="/" onClick={handleLogout}>
        Logout {currentUser && `${currentUser.name}`}
      </NavLink>
    </div>
  )
}
export default Header
