import styles from './profileMenu.module.css'
import { useState, useEffect, useRef } from 'react';
import keycloak from '../../keycloak';
import { useNavigate } from 'react-router';

//navigation menu used in the page header
function ProfileMenu() {
    const [open, setOpen] = useState(false)
    const handleOpen = () => {setOpen(!open)}
    const containerRef = useRef(null);
    const navigate = useNavigate()

    //make sure outside clicks close the menu
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

    //sends user to profile page
    const handleMyProfile = () => {
      setOpen(false)
      navigate("/profile/me")
    }

    //sends user to new project page
    const handleNewProject = () => {
      setOpen(false)
      navigate("/project/new")
    }
    
    return(
        <div ref={containerRef} className={styles.container}>
            <div className={styles.profileContainer}><img onClick={handleOpen} className = {styles.profilePicture} src={'https://lagaltprojectimages.blob.core.windows.net/images/profile.svg'} alt='Profile'></img></div>
            {open ? (
                <div className={styles.menu}>
                    <button className={styles.menuButton} onClick = {handleMyProfile}>My profile</button>
                    <button className={styles.menuButton} onClick = {handleNewProject}>New Project</button>
                    <button className={`${styles.menuButton} ${styles.logoutButton}`} onClick={() => keycloak.logout()}>Log out</button>
                </div>
            ) : null}
        </div>
    )
}
export default ProfileMenu