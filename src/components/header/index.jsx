import styles from './header.module.css'
import ProfileMenu from '../profileMenu'
import { useNavigate } from "react-router-dom"
import keycloak from '../../keycloak'
import Notifications from '../notifications'

//page header
function Header() {

    const navigate = useNavigate()

    return(
        <div className={styles.container}>
            <div className = {`${styles.headerItem} ${styles.logoContainer}`}><img onClick = {() => navigate("/")} className = {styles.logo} alt='Lagalt logo' src={'https://lagaltprojectimages.blob.core.windows.net/images/lagaltlogo.png'}></img></div>
            {keycloak.authenticated && <div className={`${styles.headerItem} ${styles.notificationContainer}`}></div>}
            {keycloak.authenticated? <ProfileMenu /> : <button className = {styles.loginButton} onClick={() => keycloak.login()}>Log in</button>}
        </div>
    )
}
export default Header