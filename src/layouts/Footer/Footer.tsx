import styles from './footer.module.css'

const Footer = () => (
  <div className={styles.footer}>
    <p>comentario</p>
    <small>Copyright {new Date().getFullYear()}</small>
  </div>
)

export default Footer
