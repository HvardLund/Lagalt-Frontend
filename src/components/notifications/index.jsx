import styles from './notifications.module.css'
import { useState, useEffect, useRef } from 'react';
import keycloak from '../../keycloak';
import FeatherIcon from 'feather-icons-react'

function Notifications() {
    const [open, setOpen] = useState(false)
    const [notifications, setNotifications] = useState(['test1', 'test2', 'test3'])
    const handleOpen = () => {setOpen(!open)}
    const containerRef = useRef(null);
    //const apiURL = `https://lagalt-bckend.azurewebsites.net/api/${keycloak.tokenParsed.sub}/applications`

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

    /*
    useEffect(() => {
      const getApplications = async () => {
          try{
              const response = await fetch(apiURL)
              if(!response.ok){
                  throw new Error('Could not load projects')
              }
              const data = await response.json()
              setNotifications(data)
          }
          catch(error){
              return[error.message,[]]
          }
      }
      console.log('front2')
      getApplications()
    },[apiURL])
    */

    const accept = () => {
      alert('ok')
    }

    const deny = () => {
        alert('ok')
      }
    
    return(
        <div ref={containerRef} className={styles.container}>
            <div onClick={handleOpen} className={styles.profileContainer}>
                <span><FeatherIcon size="32" icon="bell" /></span>
                {notifications.length>0 &&<span className={styles.badge}>{notifications.length}</span>}
            </div>
            {open ? (
                <div className={styles.menu}>
                    {notifications.map(notification => 
                        <button className={styles.menuButton}>
                            <div className={styles.notificationText}>{notification}</div>
                            <FeatherIcon onClick = {deny}size="20px" icon="x" color='#DA5E3F'></FeatherIcon>
                            <FeatherIcon onClick = {accept} size="20px" icon="check" color='#587D3B'></FeatherIcon>
                        </button>
                    )}
                </div>
            ) : null}
        </div>
    )
}
export default Notifications