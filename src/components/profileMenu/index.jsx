import styles from './profileMenu.module.css'
import { useState, useEffect, useRef } from 'react';
import keycloak from '../../keycloak';
import { useNavigate } from 'react-router';

function ProfileMenu() {
    const [open, setOpen] = useState(false)
    const handleOpen = () => {setOpen(!open)}
    const containerRef = useRef(null);
    const navigate = useNavigate()

    function useOutsideAlerter(ref) {
        useEffect(() => {
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {setOpen(false)}
          }
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
      }

    useOutsideAlerter(containerRef)

    function handleMyProfile(){
      setOpen(false)
      navigate("/profile/1")
    }
    

    return(
        <div ref={containerRef} className={styles.container}>
            <div className={styles.profileContainer}><img onClick={handleOpen} className = {styles.profilePicture} src={'assets/profile.svg'} alt='Profile'></img></div>
            {open ? (
                <div className={styles.menu}>
                    <button className={styles.menuButton} onClick = {handleMyProfile}>My profile</button>
                    <button className={`${styles.menuButton} ${styles.logoutButton}`} onClick={() => keycloak.logout()}>Log out</button>
                </div>
            ) : null}
        </div>
    )
}
export default ProfileMenu