import styles from './notifications.module.css'
import { useState, useEffect, useRef } from 'react';
import keycloak from '../../keycloak';
import FeatherIcon from 'feather-icons-react'
import { useSelector } from 'react-redux';

function Notifications() {
    const [open, setOpen] = useState(false)
    const [notifications, setNotifications] = useState([]) 
    const containerRef = useRef(null);
    let ownedProjects = useSelector((state) => state.addProjects.projects)
    const dummyNotifications = ["Hansen want to join your project", "Norasb wants to join your project"]

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

    const getApplications = async (project) => {
        try{
            const response = await fetch(`https://lagalt-bckend.azurewebsites.net/api/projeycts/${project.id}/notapproved`)
            if(!response.ok){
                throw new Error('Could not load projects')
            }
            const data = await response.json()
            setNotifications([...notifications, ...data.map(user => `${user.userName} wants to join ${project.title}`)])
        }
        catch(error){
            return[error.message,[]]
        }
    }

    const getAllApplications = () => {
        ownedProjects.map(project => 
            getApplications(project)
        )
    }

    const handleOpen = () => {
        setOpen(!open)   
    }

    const accept = () => {
        alert('ok')
    }

    const deny = () => {
        alert('ok')
    }
    
    useEffect(() => {
        setNotifications([])
        getApplications(ownedProjects[0])
    },[ownedProjects])

    return(
        <div ref={containerRef} className={styles.container}>
            <div onClick={handleOpen} className={styles.profileContainer}>
                <span><FeatherIcon size="32" icon="bell" /></span>
                {dummyNotifications.length>0 &&<span className={styles.badge}>{dummyNotifications.length}</span>}
            </div>
            {open ? (
                <div className={styles.menu}>
                    {dummyNotifications.map(notification => 
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