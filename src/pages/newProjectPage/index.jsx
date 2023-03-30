import DescriptionTextField from '../../components/descriptionTextField'
import ProgressBar from '../../components/progressBar'
import ProjectTag from '../../components/projectTag'
import SkillList from '../../components/skillList'
import styles from './newProjectpage.module.css'
import { useState, useEffect } from 'react'
import FeatherIcon from 'feather-icons-react/build/FeatherIcon'
import keycloak from '../../keycloak'
import { useNavigate } from 'react-router-dom'

//page for adding a new project
function NewProjectPage(){
    
    //porject attributes
    const [allSkills, setAllSKills] = useState([])
    const defaultImage = 'https://lagaltprojectimages.blob.core.windows.net/images/noimage.png'
    const skillApiUrl = 'https://lagalt-bckend.azurewebsites.net/api/skills'
    const [editProgress, setEditProgress] = useState(false)
    const [projectStatus, setProjectStatus] = useState('Founding')
    const [imageUrl, setImageUrl] = useState('')
    const [newHeader, setNewHeader] = useState('')
    const [newIntro, setNewIntro] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [selectedSkills, setSelectedSkills] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    const [newTag, setNewTag] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('Games')
    const [projectUrl, setProjectUrl] = useState('')
    const navigate = useNavigate()

    //handling changes to the various components
    const changeProgress = () => {
        setEditProgress(!editProgress)
    }
    const selectProjectStatus = (newStatus) => {
        setProjectStatus(newStatus)
        setEditProgress(!editProgress)
    }
    const handleUrl = (event) => {
        const value = event.target.value
        value.length > 0? setImageUrl(value): setImageUrl('')
    }
    const handleProjectUrl = (event) => {
        const value = event.target.value
        value.length > 0? setProjectUrl([value]): setProjectUrl([])
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

    const select = (activity) => {
        setSelectedCategory(activity)
    }

    //checking if project has a title before publishing
    const checkValues = () => {
        newHeader.length > 0? createProject() : alert('Your project must have a header')
    }

    //loading all possible skills from the database
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

    //post the new project to the database
    const createProject = async () => {
        await fetch('https://lagalt-bckend.azurewebsites.net/api/projects/', {
            method: 'POST',
            headers: {Authorization: `Bearer ${keycloak.token}`, 'Content-Type': 'application/json'},
            body: JSON.stringify({
                "field":selectedCategory,
                "title": newHeader,
                "description":newDescription,
                "caption":newIntro,
                "progress": projectStatus,
                "tags": selectedTags,
                "skills": selectedSkills,
                "linkUrls":projectUrl,
                "owner": `${keycloak.tokenParsed.sub}`,
                "imageUrls":[imageUrl],
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

    return(
        <div className={styles.container}>
            <div className={`${styles.leftColumn} ${styles.column}`}>
            <img 
                className={styles.projectImage}
                src={`${imageUrl}`}
                alt='project foto'
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null
                    currentTarget.src=defaultImage
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
                <div className={styles.navbar}>
                    <div onClick={() => select('Games')} className={selectedCategory==='Games'?`${styles.selected} `:`${styles.navText}`}>Game dev</div>
                    <div onClick={() => select('Web')} className={selectedCategory==='Web'?`${styles.selected}`:`${styles.navText}`}>Webdesign</div>
                    <div onClick={() => select('Music')} className={selectedCategory==='Music'?`${styles.selected}`:`${styles.navText}`}>Music</div>
                    <div onClick={() => select('Movie')} className={selectedCategory==='Movie'?`${styles.selected}`:`${styles.navText}`}>Film</div>
                </div>
                <DescriptionTextField handleChange={handleHeader} edit={true} type='header' content={newHeader}/>
                <DescriptionTextField handleChange={handleIntroduction} edit={true} type='introduction' content={newIntro}/>
                <DescriptionTextField handleChange={handleDescription} edit={true} type='description' content={newDescription}/>
            </div>
            <div className={`${styles.rightColumn} ${styles.column}`}>
                {newHeader.length > 0 && <button className = {`${styles.greenButton}`} onClick={() => checkValues()}>Publish</button>}
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
        </div>
    )
}
export default NewProjectPage;