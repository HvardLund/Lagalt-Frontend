import styles from './frontpage.module.css'

function FrontPage(){
    return(
        <div className={styles.container}>
            <div className={`${styles.leftColumn} ${styles.column}`}>
                Left Column
            </div>
            <div className={`${styles.rightColumn} ${styles.column}`}>
                Right column
            </div>
        </div>
    )
}
export default FrontPage;