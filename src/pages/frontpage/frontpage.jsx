import styles from './frontpage.module.css'

function FrontPage(){
    return(
        <div className={styles.container}>
            <div className={styles.header}>Lagalt</div>
            <div className={styles.coming}>Coming soon...</div>
        </div>
    )
}
export default FrontPage;