import styles from './profileMenu.module.css'
import { useState, useEffect, useRef } from 'react';


function ProfileMenu() {
    const [open, setOpen] = useState(false)
    const handleOpen = () => {setOpen(!open)}
    const containerRef = useRef(null);

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
    

    return(
        <div ref={containerRef} className={styles.container}>
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