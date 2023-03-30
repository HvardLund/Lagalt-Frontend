import styles from './notifications.module.css'
import { useState, useEffect, useRef } from 'react';
import keycloak from '../../keycloak';
import FeatherIcon from 'feather-icons-react'
import { useSelector } from 'react-redux';

//notification menu component
function Notifications(props) {
    const [open, setOpen] = useState(false)
    const notifications = props.notifications
    const accept = props.accept
    const deny = props.deny
    const containerRef = useRef(null);

    //make notification menu close on click outside
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

    //Open/close the menu on click
    const handleOpen = () => {
        setOpen(!open)  
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
                            <div className={styles.notificationText}>{notification[0]}</div>
                            <FeatherIcon onClick = {() => deny(notification[1])}size="20px" icon="x" color='#DA5E3F'></FeatherIcon>
                            <FeatherIcon onClick = {() => accept(notification[1], notification[2])} size="20px" icon="check" color='#587D3B'></FeatherIcon>
                        </button>
                    )}
                </div>
            ) : null}
        </div>
    )
}
export default Notifications