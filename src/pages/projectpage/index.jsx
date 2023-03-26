import DescriptionTextField from '../../components/descriptionTextField';
import MemberList from '../../components/memberList';
import ProgressBar from '../../components/progressBar';
import ProjectTag from '../../components/projectTag';
import SkillList from '../../components/skillList';
import styles from './projectpage.module.css'
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { useNavigate, useParams } from 'react-router-dom';
import keycloak from '../../keycloak';
import { useEffect } from 'react';
import { useState } from 'react';

const owner = ''

const skills = []
const tags = []

function ProjectPage(){
    
    const [project, setProject] = useState(false)
    const {id} = useParams()
    const navigate = useNavigate()
    const imageNotFound = "https://lagaltprojectimages.blob.core.windows.net/images/noimage.png"
    const apiURL = `https://lagalt-bckend.azurewebsites.net/api/projects/${id}`

    useEffect(() => {
        const getProject = async () => {
            try{
                const response = await fetch(apiURL)
                if(!response.ok){
                    throw new Error('Could not load project')
                }
                const data = await response.json()
                setProject(data)
            }
            catch(error){
                return[error.message,[]]
            }
        }
        getProject()
        console.log('project')
    },[apiURL])

    return(
        <div>{project?
        <div className={styles.container}>
            <div className={`${styles.leftColumn} ${styles.column}`}>
                <img className={styles.projectImage} src={project.images[0]??imageNotFound} alt='project foto'></img>
                <div className={styles.contentCard}>
                    <h2 className={styles.subHeader}>Status</h2>
                    <ProgressBar stage={project?project.progress:'Founding'}/>
                </div>
            </div>
            <div className={`${styles.midColumn} ${styles.column}`}>
                <DescriptionTextField type='header' content={project.title}/>
                <DescriptionTextField type='introduction' content={project.caption}/>
                <DescriptionTextField type='description' content={project.description}/>
            </div>
            <div className={`${styles.rightColumn} ${styles.column}`}>
                {keycloak.tokenParsed && keycloak.tokenParsed.preferred_username === owner &&
                    <button className = {styles.editButton} onClick={() => navigate(`/project/${id}/edit`)}><FeatherIcon  cursor='pointer' size="20" icon="edit-3" />Edit</button>
                }
                <div className={styles.contentCard}>
                    <h2 className={styles.subHeader}>Members</h2>
                    <MemberList members={project.contributors}/>
                </div>
                <div className={styles.contentCard}>
                    <h2 className={styles.subHeader}>Skills</h2>
                    <SkillList skills ={skills}/>
                </div>
                <div className={styles.contentCard}>
                    <h2 className={styles.subHeader}>Tags</h2>
                    <div className={styles.tagList}>{tags.map(tag => <ProjectTag key={tag} name={tag}/>)}</div>
                </div>
            </div>       
        </div>:<div className={styles.loading}>loading...</div>}
        </div>
    )
}
export default ProjectPage;