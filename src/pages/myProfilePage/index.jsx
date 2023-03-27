import styles from './myProfilepage.module.css'
import ProjectCard from '../../components/projectCard';
import DescriptionTextField from '../../components/descriptionTextField';
import SkillList from '../../components/skillList';
import keycloak from '../../keycloak';
import FeatherIcon from 'feather-icons-react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const allSkills = ['Skillpadde', 'Avoid indecies', 'too cool for school', 'ski ll', 'koding', 'sverre', 'kake']



const tags=[]

function MyProfilePage(){

    const description = useSelector((state) => state.updateUser.description)
    const skills = useSelector((state) => state.updateUser.skills)
    const [edit, setEdit] = useState(false)
    const [selectedSkills, setSelectedSkills] = useState(skills)
    const [myProjects, setMyProjects] = useState([])
    const apiURL = `https://lagalt-bckend.azurewebsites.net/api/users/${keycloak.tokenParsed.sub}/projects`
    const imageNotFound = "https://lagaltprojectimages.blob.core.windows.net/images/noimage.png"
    const profileImage = "https://lagaltprojectimages.blob.core.windows.net/images/profile.svg"

    const buttonClick = () => {
        setEdit(!edit)
    }

    let viewedSkills = edit?allSkills:skills

    const handleCheckboxChange = (event) => {
        const itemId = event.target.id;
        const isChecked = event.target.checked;
    
        if (isChecked) {
          setSelectedSkills([...selectedSkills, itemId]);
        } else {
          setSelectedSkills(selectedSkills.filter((id) => id !== itemId));
        }
    }

    useEffect(() => {
        const getAllProjects = async () => {
            try{
                const response = await fetch(apiURL)
                if(!response.ok){
                    throw new Error('Could not load projects')
                }
                const data = await response.json()
                setMyProjects(data)
            }
            catch(error){
                return[error.message,[]]
            }
        }
        getAllProjects()
    },[apiURL])

    return(
        <div className={styles.container}>
            <div className={styles.topBar}>
                <div onClick= {() => buttonClick()} className={styles.editButton}>{edit?'Save':<>Edit<FeatherIcon cursor='pointer' size="20" icon="edit-3" /></>}</div>
            </div>        
            <div className={`${styles.column}`}>
                <div className={styles.me}>
                    <div className={styles.profileInfo}>
                        <img className={styles.profileImage} src={profileImage} alt='avatar' />
                        <div className={styles.username}>{keycloak.tokenParsed.preferred_username}<div className={styles.name}>{keycloak.tokenParsed.name}</div></div>
                    </div>
                </div>
                <DescriptionTextField edit={edit} type='description' content={description}></DescriptionTextField>
                <div className={styles.contentCard}>
                    <h2 className={styles.subHeader}>Skills</h2>
                    <SkillList handleCheckboxChange={handleCheckboxChange} selectedItems={selectedSkills} edit={edit} skills = {viewedSkills}/>
                </div>
                <h2 className={styles.subHeader}>Portfolio</h2>
                {myProjects.map(project =>
                    <ProjectCard 
                        intro={project.caption} 
                        tags={tags} 
                        image={project.images[0]??imageNotFound}
                        skills={project.skills}
                        owner={project.owner}
                        id={project.id}
                        activityType={project.field}
                        key={project.id}
                    />
                )}
            </div>   
        </div>
    )
}
export default MyProfilePage;