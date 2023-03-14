import styles from './profileMenu.module.css'
import { useState } from 'react';


function ProfileMenu() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {setOpen(!open);};

    return(
        <div className={styles.container}>
            <div className={styles.profileContainer}><img onClick={handleOpen} className = {styles.profilePicture} src='profile.svg' alt='Profile'></img></div>
            {open ? (
                <div className={styles.menu}>
                    <button className={styles.menuButton}>My profile</button>
                    <button className={styles.menuButton}>My projects</button>
                    <button className={`${styles.menuButton} ${styles.logoutButton}`}>Log out</button>
                </div>
            ) : null}
        </div>
    )
}
export default ProfileMenu