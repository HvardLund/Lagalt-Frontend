import styles from './header.module.css'
import ProfileMenu from '../profileMenu'
import { useNavigate } from "react-router-dom"
import keycloak from '../../keycloak'
import Notifications from '../notifications'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

//page header
function Header() {

    const navigate = useNavigate()
    const [notifications, setNotifications] = useState([])
    let ownedProjects = useSelector((state) => state.addProjects.projects)

    //load applications for a project
    const getApplications = async (project) => {
        try{
            const response = await fetch(`https://lagalt-bckend.azurewebsites.net/api/projects/${project.id}/notapproved`, {
                headers: {Authorization: `Bearer ${keycloak.token}`, 'Content-Type': 'application/json'},
            })
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
        ownedProjects.forEach(project => {
            getApplications(project)
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

    //accept application
    const accept = (applicationId, projectId) => {
        console.log(projectId)
        reviewApplication(applicationId)
        addContributors(projectId)
        getAllApplications()
    }

    //deny application
    const deny = (id) => {
        reviewApplication(id)
        getAllApplications()
    }

    useEffect(() => {
        getAllApplications()
    },[])

    return(
        <div className={styles.container}>
            <div className = {`${styles.headerItem} ${styles.logoContainer}`}><img onClick = {() => navigate("/")} className = {styles.logo} alt='Lagalt logo' src={'https://lagaltprojectimages.blob.core.windows.net/images/lagaltlogo.png'}></img></div>
            {keycloak.authenticated && <div className={`${styles.headerItem} ${styles.notificationContainer}`}><Notifications notifications = {notifications} accept={() => accept} deny={() => deny} /></div>}
            {keycloak.authenticated? <ProfileMenu /> : <button className = {styles.loginButton} onClick={() => keycloak.login()}>Log in</button>}
        </div>
    )
}
export default Header