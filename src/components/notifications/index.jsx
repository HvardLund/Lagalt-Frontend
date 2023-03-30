import styles from './notifications.module.css'
import { useState, useEffect, useRef } from 'react';
import keycloak from '../../keycloak';
import FeatherIcon from 'feather-icons-react'
import { useSelector } from 'react-redux';

//notification menu component
function Notifications() {
    const [open, setOpen] = useState(false)
    const [notifications, setNotifications] = useState([]) 
    const containerRef = useRef(null);
    let ownedProjects = useSelector((state) => state.addProjects.projects)

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

    //load applications for a project
    const getApplications = async (project) => {
        try{
            const response = await fetch(`https://lagalt-bckend.azurewebsites.net/api/projects/${project.id}/notapproved`)
            if(!response.ok){
                throw new Error('Could not load projects')
            }
            const data = await response.json()
            setNotifications([...notifications, ...data.map(application => [`${application.userName} wants to join ${project.title}`, application.id, project.id])])
        }
        catch(error){
            return[error.message,[]]
        }
    }

    //get all applications for all projects where the logged in user is the owner
    const getAllApplications = () => {
        ownedProjects.array.forEach(project => {
            console.log(project)
            getApplications(project.id)
        })
    }

    //sets approved status to true
    const reviewApplication = async (id) => {
        await fetch(`https://lagalt-bckend.azurewebsites.net/api/applications/${id}/approve`, {
            method: 'PUT',
            headers: {Authorization: `Bearer ${keycloak.token}`, 'Content-Type': 'application/json'},
        }).then(resp => {
            if (!resp.ok) {
                throw new Error(resp.status);
            }
        }).catch(error => {
            console.log(error);
        });
    }

    const addContributors = async (id) => {
        await fetch(`https://lagalt-bckend.azurewebsites.net/api/projects/${id}/contributors`, {
            method: 'PUT',
            headers: {Authorization: `Bearer ${keycloak.token}`, 'Content-Type': 'application/json'},
        }).then(resp => {
            if (!resp.ok) {
                throw new Error(resp.status);
            }
        }).catch(error => {
            console.log(error);
        });
    }

    //Open/close the menu on click
    const handleOpen = () => {
        setOpen(!open)
        console.log(ownedProjects[0])
        getAllApplications()  
    }

    const accept = (applicationId, projectId) => {
        reviewApplication(applicationId)
        addContributors(projectId)
    }

    const deny = (id) => {
        reviewApplication(id)
    }

    useEffect(() => {
        console.log(notifications)
    },[notifications])

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
                            <FeatherIcon onClick = {deny(notification[1])}size="20px" icon="x" color='#DA5E3F'></FeatherIcon>
                            <FeatherIcon onClick = {accept(notification[1], notification[2])} size="20px" icon="check" color='#587D3B'></FeatherIcon>
                        </button>
                    )}
                </div>
            ) : null}
        </div>
    )
}
export default Notifications