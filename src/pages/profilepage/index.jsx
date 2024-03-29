import styles from './profilepage.module.css'
import DescriptionTextField from '../../components/descriptionTextField';
import SkillList from '../../components/skillList';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';

//simple page displaying user data for user that are not logged in
function ProfilePage(){

    const {username} = useParams()
    const [user, setUser] = useState({description: 'not found', skills: []})
    const apiURL = 'https://lagalt-bckend.azurewebsites.net/api/users'
    const profileImage = "https://lagaltprojectimages.blob.core.windows.net/images/profile.svg"

    //fetching all users and filtering out the one from the url/useParams
    useEffect(() => {
        const getAllUsers = async () => {
            try{
                const response = await fetch(apiURL)
                if(!response.ok){
                    throw new Error('Could not load users')
                }
                const data = await response.json()
                setUser(data.filter(user => (user.userName === username.replaceAll('_', ' ')))[0])
            }
            catch(error){
                return[error.message,[]]
            }
        }
        getAllUsers()
    },[username])

    return(
        <div className={styles.container}>        
            <div className={`${styles.midColumn} ${styles.column}`}>
                <div className={styles.me}>
                    <img className={styles.profileImage} src={profileImage} alt='avatar' />
                    <div className={styles.username}>{username.replaceAll('_', ' ')}</div>
                </div>
                <DescriptionTextField type='description' content={user.description}></DescriptionTextField>
                <div className={styles.contentCard}>
                    <h2 className={styles.subHeader}>Skills</h2>
                    <SkillList skills = {user.skills}/>
                </div>
            </div>
        </div>
    )
}
export default ProfilePage;