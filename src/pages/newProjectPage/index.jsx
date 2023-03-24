import DescriptionTextField from '../../components/descriptionTextField'
import ProgressBar from '../../components/progressBar'
import ProjectTag from '../../components/projectTag'
import SkillList from '../../components/skillList'
import styles from './newProjectpage.module.css'
import { useState } from 'react'
import FeatherIcon from 'feather-icons-react/build/FeatherIcon'

const allSkills = ['Skillpadde', 'Avoid indecies', 'too cool for school', 'ski ll', 'koding', 'sverre', 'kake']

function NewProjectPage(){
    
    const defaultImage = 'https://lagaltprojectimages.blob.core.windows.net/images/noimage.png'
    const [editProgress, setEditProgress] = useState(false)
    const [projectStatus, setProjectStatus] = useState('Founding')
    const [imageUrl, setImageUrl] = useState(defaultImage)
    const [newHeader, setNewHeader] = useState('')
    const [newIntro, setNewIntro] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [selectedSkills, setSelectedSkills] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    const [newTag, setNewTag] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')

    const changeProgress = () => {
        setEditProgress(!editProgress)
    }
    const selectProjectStatus = (newStatus) => {
        setProjectStatus(newStatus)
        setEditProgress(!editProgress)
    }
    const handleUrl = (event) => {
        const value = event.target.value
        value.length > 0? setImageUrl(value): setImageUrl(defaultImage)
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

    return(
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