import { useMemo } from 'react'
import styles from './initial.module.css'
type Props = {
  name: string
}
const Initial = (props: Props) => {
  const { name } = props

  const initials = (name: string) => {
    console.log(name, 'name')
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
  }

  const memoizedInitial = useMemo(() => initials(name), [name])

  return <span className={styles.initials}>{memoizedInitial}</span>
}

export default Initial
