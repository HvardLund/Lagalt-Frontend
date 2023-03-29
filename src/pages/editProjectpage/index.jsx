import DescriptionTextField from '../../components/descriptionTextField'
import ProgressBar from '../../components/progressBar'
import ProjectTag from '../../components/projectTag'
import SkillList from '../../components/skillList'
import styles from './editProjectpage.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import FeatherIcon from 'feather-icons-react/build/FeatherIcon'
import keycloak from '../../keycloak'

function EditProjectPage(){

    const [project, setProject] = useState({})
    const navigate = useNavigate()
    const [editProgress, setEditProgress] = useState(false)
    const imageNotFound = "https://lagaltprojectimages.blob.core.windows.net/images/noimage.png"
    const [allSkills, setAllSKills] = useState([])
    const [projectStatus, setProjectStatus] = useState('Founding')
    const [imageUrl, setImageUrl] = useState(imageNotFound)
    const [newHeader, setNewHeader] = useState('')
    const [newIntro, setNewIntro] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [selectedSkills, setSelectedSkills] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    const [projectUrl, setProjectUrl] = useState('')
    const [newTag, setNewTag] = useState('')
    const [field, setField] = useState('')
    const {id} = useParams()
    
    const apiURL = `https://lagalt-bckend.azurewebsites.net/api/projects/${id}`
    const skillApiUrl = 'https://lagalt-bckend.azurewebsites.net/api/skills'

    const changeProgress = () => {
        setEditProgress(!editProgress)
    }
    const selectProjectStatus = (newStatus) => {
        setProjectStatus(newStatus)
        setEditProgress(!editProgress)
    }
    const handleUrl = (event) => {
        const value = event.target.value
        value.length > 0? setImageUrl(value): setImageUrl(imageNotFound)
    }
    const handleProjectUrl = (event) => {
        const value = event.target.value
        value.length > 0? setProjectUrl(value): setProjectUrl('')
    }
    const handleHeader = (event) => {
        const value = event.target.value
        setNewHeader(value)
    }
    const handleIntroduction = (event) => {
        const value = event.target.value
        setNewIntro(value)
    }
    const handleDescription = (event) => {
        const value = event.target.value
        setNewDescription(value)
    }
    const handleCheckboxChange = (event) => {
        const itemId = event.target.id;
        const isChecked = event.target.checked;
    
        if (isChecked) {
          setSelectedSkills([...selectedSkills, itemId]);
        } else {
          setSelectedSkills(selectedSkills.filter((id) => id !== itemId));
        }
    }
    const handleTagSelection = (tag) => {
        if (!selectedTags.includes(tag)) {
            setSelectedTags([...selectedTags, tag])
        } else {
            setSelectedTags(selectedTags.filter((tagName) => tagName !== tag))
        }
    }
    const handleNewTag = (event) => {
        const value = event.target.value
        setNewTag(value)
    }
    const pressEnter = (event) => {
        if (event.key === 'Enter') {
            addTag()
        }
    } 
    const addTag = () => {
        if (!selectedTags.includes(newTag) && newTag.length>0) {
            setSelectedTags([...selectedTags, newTag])
            setNewTag('')
        }
    }

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
    
    useEffect(() => {
        const getProject = async () => {
            try{
                const response = await fetch(apiURL)
                if(!response.ok){
                    throw new Error('Could not load project')
                }
                const data = await response.json()
                if(data.owner !== keycloak.tokenParsed.preferred_username){navigate(`/projects/${id}`)}
                setProject(data)
                setProjectStatus(data.progress)
                setImageUrl(data.imageUrls[0]?data.imageUrls[0]:imageNotFound)
                setNewHeader(data.title)
                setNewIntro(data.caption)
                setNewDescription(data.description)
                setSelectedSkills(data.skills)
                setSelectedTags(data.tags)
                setProjectUrl(data.linkUrls[0]?data.linkUrls[0]:'')
                setField(data.field)

            }
            catch(error){
                return[error.message,[]]
            }
        }
        getProject()
    },[apiURL, id, navigate])

    useEffect(() => {
        setProjectStatus(project.progress)
        setImageUrl(project.imageUrls?project.imageUrls[0]:imageNotFound)
        setNewDescription(project.description)
        setSelectedSkills(project.skills)
        setSelectedTags(project.tags)
        setNewHeader(project.title)
        setNewIntro(project.caption)
        setProjectUrl(project.linkUrls?project.linkUrls[0]:'')
        setField(project.field)
    },[project])

    const updateProject = async () => {
        await fetch('https://lagalt-bckend.azurewebsites.net/api/projects/', {
            method: 'PUT',
            headers: {Authorization: `Bearer ${keycloak.token}`, 'Content-Type': 'application/json'},
            body: JSON.stringify({
                "id": id,
                "field": field,
                "title": newHeader,
                "description":newDescription,
                "caption":newIntro,
                "progress": projectStatus,
                "tags": selectedTags,
                "skills": selectedSkills,
                "imageUrls":[imageUrl],
                "links":projectUrl,
                "usersContributed": [],
            })
        }).then(resp => {
            if (!resp.ok) {
                throw new Error(resp.status);
            }
            navigate(`/project/${id}`)
        }).catch(error => {
            console.log(error);
        });
    }

    const publish = () => {
        updateProject()
    }

    return(
        <div>{(project.owner? (project.owner === keycloak.tokenParsed.preferred_username):false)?
        <div className={styles.container}>
            <div className={`${styles.leftColumn} ${styles.column}`}>
            <img 
                className={styles.projectImage}
                src={`${imageUrl}`}
                alt='project foto'
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null
                    currentTarget.src='https://lagaltprojectimages.blob.core.windows.net/images/noimage.png'
                }}
                >
            </img>
                <DescriptionTextField handleChange={handleUrl} edit={true} type='url' content={imageUrl}/>
                <div className={styles.contentCard}>
                    <h2 className={styles.subHeader}>
                        Status
                        <div onClick={changeProgress} className={styles.dropdown}>
                            {editProgress?<FeatherIcon size="20" icon="chevron-up" />:<FeatherIcon size="20" icon="chevron-down" />}
                        </div>
                    </h2>
                    {editProgress?
                    <div className={styles.progressButtonContainer}>
                        <div onClick={() => selectProjectStatus('Founding')} className={styles.progressButton}><ProgressBar stage={'Founding'}/></div>
                        <div onClick={() => selectProjectStatus('In progress')} className={styles.progressButton}><ProgressBar stage={'In progress'}/></div>
                        <div onClick={() => selectProjectStatus('Completed')} className={styles.progressButton}><ProgressBar stage={'Completed'}/></div>
                    </div>
                    :<ProgressBar stage={projectStatus}/>
                    }
                </div>
                <h2 className={styles.subHeader}>Project link</h2>
                <DescriptionTextField handleChange={handleProjectUrl} edit={true} type='url' content={projectUrl}/>
            </div>
            <div className={`${styles.midColumn} ${styles.column}`}>
                <DescriptionTextField handleChange={handleHeader} edit={true} type='header' content={newHeader}/>
                <DescriptionTextField handleChange={handleIntroduction} edit={true} type='introduction' content={newIntro}/>
                <DescriptionTextField handleChange={handleDescription} edit={true} type='description' content={newDescription}/>
            </div>
            <div className={`${styles.rightColumn} ${styles.column}`}>
                <button className = {`${styles.greenButton}`} onClick={publish}>Publish</button>
                <div className={styles.contentCard}>
                    <h2 className={styles.subHeader}>Skills</h2>
                    <SkillList handleCheckboxChange={handleCheckboxChange} selectedItems={selectedSkills} edit={true} skills = {allSkills}/>
                </div>
                <div className={styles.contentCard}>
                    <h2 className={styles.subHeader}>Tags</h2>
                    <div className={styles.tagList}>
                        {selectedTags.map(tag => <ProjectTag onClick={() => handleTagSelection(tag)} key={tag} name={tag}/>)}
                    </div>
                    <div className={styles.addTag}>
                        <input value={newTag} onKeyDown={pressEnter} onChange={handleNewTag} placeholder='add new tag...' maxLength={20} className={styles.newTag} />
                        <div className={styles.addTagButton} onClick={() => addTag()}>+</div >
                    </div> 
                </div>
            </div>
        </div>:<div className={styles.loading}>loading...</div>}
        </div>
    )
}
export default EditProjectPage;