import styles from './myProfilepage.module.css'
import ProjectCard from '../../components/projectCard';
import DescriptionTextField from '../../components/descriptionTextField';
import SkillList from '../../components/skillList';
import keycloak from '../../keycloak';
import FeatherIcon from 'feather-icons-react'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { updateUser } from './../../redux-parts/userSLice'

//profile page for the currently logged in user
function MyProfilePage(){

    //user description
    let description = useSelector((state) => state.updateUser.description)
    const dispatch = useDispatch();

    //user skills
    let skills = useSelector((state) => state.updateUser.skills)

    //decide if user data is editable or not
    const [edit, setEdit] = useState(false)

    //new skills that are selected
    const [selectedSkills, setSelectedSkills] = useState(skills)
    const [myProjects, setMyProjects] = useState([])
    const [allSkills, setAllSKills] = useState([])
    const [newDescription, setNewDescription] = useState(description)
    const projectApiURL = `https://lagalt-bckend.azurewebsites.net/api/users/${keycloak.tokenParsed.sub}/projects`
    const skillApiUrl = 'https://lagalt-bckend.azurewebsites.net/api/skills'
    const imageNotFound = "https://lagaltprojectimages.blob.core.windows.net/images/noimage.png"
    const profileImage = "https://lagaltprojectimages.blob.core.windows.net/images/profile.svg"

    //handles button click. If in edit mode, post new values
    const buttonClick = () => {
        setEdit(!edit)
        setSelectedSkills(skills)
        if(edit){
            dispatch(updateUser({description:newDescription, skills:selectedSkills}))
            updateProfile()
        }
    }

    let viewedSkills = edit?allSkills:skills

    //handle selection of new skills
    const handleCheckboxChange = (event) => {
        const itemId = event.target.id;
        const isChecked = event.target.checked;
    
        if (isChecked) {
          setSelectedSkills([...selectedSkills, itemId]);
        } else {
          setSelectedSkills(selectedSkills.filter((id) => id !== itemId));
        }
    }

    //fetch all skills
    useEffect(() => {
        const getAllSkills = async () => {
            try{
                const response = await fetch(skillApiUrl)
                if(!response.ok){
                    throw new Error('Could not load projects')
                }
                const data = await response.json()
                setAllSKills(data.map(skill => skill.name))
            }
            catch(error){
                return[error.message,[]]
            }
        }
        getAllSkills()
    },[])

    //fetching all projects
    useEffect(() => {
        const getAllProjects = async () => {
            try{
                const response = await fetch(projectApiURL)
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
    },[projectApiURL])

    //handle changes to description field
    const handleDescription = (event) => {
        const value = event.target.value
        setNewDescription(value)
    }

    //updating user data in the database based on new values
    const updateProfile = async () => {
        await fetch(`https://lagalt-bckend.azurewebsites.net/api/users/${keycloak.tokenParsed.sub}`, {
            method: 'PUT',
            headers: {Authorization: `Bearer ${keycloak.token}`, 'Content-Type': 'application/json'},
            body: JSON.stringify({
                "id": keycloak.tokenParsed.sub,
                "description": newDescription,
                "skills": selectedSkills,
            })
        }).then(resp => {
            if (!resp.ok) {
                throw new Error(resp.status);
            }
        }).catch(error => {
            console.log(error);
        });
    }

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
                <DescriptionTextField handleChange={handleDescription} edit={edit} type='description' content={newDescription}></DescriptionTextField>
                <div className={styles.contentCard}>
                    <h2 className={styles.subHeader}>Skills</h2>
                    <SkillList handleCheckboxChange={handleCheckboxChange} selectedItems={selectedSkills} edit={edit} skills = {viewedSkills}/>
                </div>
                <h2 className={styles.subHeader}>Portfolio</h2>
                {myProjects.map(project =>
                    <ProjectCard
                        title={project.title} 
                        intro={project.caption} 
                        tags={project.tags.length>0?project.tags:[]} 
                        image={project.imageUrls.length >0?project.imageUrls[0]:imageNotFound}
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