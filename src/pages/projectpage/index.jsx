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
    },[apiURL])

    const createApplication = async () => {
        await fetch('https://lagalt-bckend.azurewebsites.net/api/applications', {
            method: 'POST',
            headers: {Authorization: `Bearer ${keycloak.token}`, 'Content-Type': 'application/json'},
            body: JSON.stringify({
                "id":0,
                "motivation":"not available",
                "approvedStatus":false,
                "userId":keycloak.tokenParsed.sub,
                "projectId":id,
            })
        }).then(resp => {
            if (!resp.ok) {
                throw new Error(resp.status);
            }
            navigate('/')
        }).catch(error => {
            console.log(error);
        });
      }

    const newApplication = () => {createApplication()}

    return(
        <div>{project?
        <div className={styles.container}>
            <div className={`${styles.leftColumn} ${styles.column}`}>
                <img className={styles.projectImage} src={project.imageUrls[0]??imageNotFound} alt='project foto'></img>
                <div className={styles.contentCard}>
                    <h2 className={styles.subHeader}>Status</h2>
                    <ProgressBar stage={project?project.progress:'Founding'}/>
                </div>
                <div className={styles.contentCard}>
                    <h2 className={styles.subHeader}>Urls</h2>
                    <DescriptionTextField type='description' content={project.linkUrls}/>
                </div>
                {keycloak.authenticated && keycloak.tokenParsed.preferred_username !== project.owner && !project.contributors.includes(keycloak.tokenParsed.preferred_username) && <button className = {`${styles.greenButton} ${styles.applyButton}`} onClick={newApplication}>Apply now</button>}
            </div>
            <div className={`${styles.midColumn} ${styles.column}`}>
                <DescriptionTextField type='header' content={project.title}/>
                <DescriptionTextField type='introduction' content={project.caption}/>
                <DescriptionTextField type='description' content={project.description}/>
            </div>
            <div className={`${styles.rightColumn} ${styles.column}`}>
                {keycloak.tokenParsed && keycloak.tokenParsed.preferred_username === project.owner &&
                    <button className = {styles.greenButton} onClick={() => navigate(`/project/${id}/edit`)}><FeatherIcon  cursor='pointer' size="20" icon="edit-3" />Edit</button>
                }
                <div className={styles.contentCard}>
                    <h2 className={styles.subHeader}>Owner</h2>
                    <MemberList members={[project.owner]}/>
                </div>
                <div className={styles.contentCard}>
                    <h2 className={styles.subHeader}>Members</h2>
                    <MemberList members={project.contributors}/>
                </div>
                <div className={styles.contentCard}>
                    <h2 className={styles.subHeader}>Skills</h2>
                    <SkillList skills ={project.skills}/>
                </div>
                <div className={styles.contentCard}>
                    <h2 className={styles.subHeader}>Tags</h2>
                    <div className={styles.tagList}>{project.tags.map(tag => <ProjectTag key={tag} name={tag}/>)}</div>
                </div>
            </div>       
        </div>:<div className={styles.loading}>loading...</div>}
        </div>
    )
}
export default ProjectPage;