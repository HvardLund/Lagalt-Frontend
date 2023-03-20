import styles from './header.module.css'
import FeatherIcon from 'feather-icons-react'
import ProfileMenu from '../profileMenu'
import { useNavigate } from "react-router-dom"
import keycloak from '../../keycloak'


function Header() {

    const navigate = useNavigate()

    return(
        <div className={styles.container}>
            <div className = {`${styles.headerItem} ${styles.logoContainer}`}><img onClick = {() => navigate("/")} className = {styles.logo} alt='Lagalt logo' src={'assets/lagaltlogo.png'}></img></div>
            {keycloak.authenticated && <div className={`${styles.headerItem} ${styles.notificationContainer}`}><FeatherIcon size="32" icon="bell" /></div>}
            {keycloak.authenticated? <ProfileMenu /> : <button className = {styles.loginButton} onClick={() => keycloak.login()}>Log in</button>}
        </div>
    )
}
export default Header