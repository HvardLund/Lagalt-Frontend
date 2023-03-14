import styles from './header.module.css'
import FeatherIcon from 'feather-icons-react';
import ProfileMenu from '../profileMenu';

function Header() {

    return(
        <div className={styles.container}>
            <div className = {`${styles.headerItem} ${styles.logoContainer}`}><img className = {styles.logo} alt='Lagalt logo' src='lagalt logo.png'></img></div>
            <div className={`${styles.headerItem} ${styles.notificationContainer}`}><FeatherIcon size="32" icon="bell" /></div>
            <ProfileMenu />
        </div>
    )
}
export default Header