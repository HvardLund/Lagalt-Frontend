import DescriptionTextField from '../../components/descriptionTextField'
import MemberList from '../../components/memberList'
import ProgressBar from '../../components/progressBar'
import ProjectTag from '../../components/projectTag'
import SkillList from '../../components/skillList'
import styles from './editProjectpage.module.css'
import { useState } from 'react'
import { useEffect } from 'react'

//import { useParams } from 'react-router-dom'
import FeatherIcon from 'feather-icons-react/build/FeatherIcon'

const header = 'Galactic quest'
const intro='Bli med på et sci-fi-basert rollespill og utforsk ulike planeter og galakser! Vi er et lidenskapelig team som arbeider med å skape en spennende ny spillopplevelse for spillere over hele verden. Hvis du er interessert i å bli med på denne hobbybaserte utviklingen, kontakt oss for mer informasjon om hvordan du kan bidra til å skape et fantastisk spill!'
let description='Vi er en gruppe med lidenskapelige spillutviklere som arbeider med å utvikle et spennende nytt spill kalt "Galactic Quest". Dette er et sci-fi-basert rollespill der spillerne kan utforske ulike planeter og galakser, møte forskjellige karakterer og delta i episke kamper. Målet vårt er å lage et spill som både er underholdende og utfordrende, og som vil engasjere spillere over hele verden.\nSom en del av teamet vil du ha muligheten til å bidra til utviklingen av ulike aspekter av spillet, inkludert design av figurer og landskap, opprettelse av historiefortelling og utvikling av gameplay-mekanismer. Vi ser etter personer med forskjellige ferdigheter, fra programmering og kunstnerisk design til historiefortelling og lyddesign.\nProsjektet er hobbybasert, så det vil ikke være noen økonomisk kompensasjon for deltakelse. Men det vil være en fantastisk mulighet til å utvikle ferdighetene dine, samarbeide med lidenskapelige og talentfulle mennesker og bygge en portefølje av arbeid som kan hjelpe deg i din fremtidige karriere.\nHvis du er interessert i å bli med i teamet vårt, kan du kontakte oss for mer informasjon om hvordan du kan delta. Vi ser frem til å høre fra deg og å jobbe sammen for å skape en fantastisk spillopplevelse for spillere over hele verden!'
const description2 = description + description
const status = 'In progress'
const projectImage = 'lagalt.png'

const memberList = [
    {
        fullname: 'Petter Pettersen',
        username: 'Petter sprett',
        profileImage: 'assets/green.svg'
    },
    {
        fullname: 'Hans Hansen',
        username: 'Hansen',
        profileImage: 'assets/blue.svg'
    },
    {
        fullname: 'Ola Nordmann',
        username: 'Bola Ola',
        profileImage: 'assets/pink.svg'
    },
    {
        fullname: 'Nils',
        username: 'Nils...',
        profileImage: 'assets/profile.svg'
    },
]

const skills = ['Skillpadde', 'Avoid indecies', 'too cool for school', 'ski ll', 'koding']
const allSkills = ['Skillpadde', 'Avoid indecies', 'too cool for school', 'ski ll', 'koding', 'sverre', 'kake']
const tags = ['tag1', 'tag2 med langt navn', 'tagger4', 'tag5']

function EditProjectPage(){
    const [editProgress, setEditProgress] = useState(false)

    const [projectStatus, setProjectStatus] = useState(status)
    const [imageUrl, setImageUrl] = useState(projectImage)
    const [newHeader, setNewHeader] = useState(header)
    const [newIntro, setNewIntro] = useState(intro)
    const [newDescription, setNewDescription] = useState(description2)
    const [selectedSkills, setSelectedSkills] = useState(skills)

    const changeProgress = () => {
        setEditProgress(!editProgress)
    }

    const selectProject = (newStatus) => {
        setProjectStatus(newStatus)
        setEditProgress(!editProgress)
    }

    const handleUrl = (event) => {
        const value = event.target.value
        value.length > 0? setImageUrl(value): setImageUrl(projectImage)
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

    //useEffect(() => {console.log(selectedSkills)},[selectedSkills])

    return(
        <div className={styles.container}>
            <div className={`${styles.leftColumn} ${styles.column}`}>
            <img 
                className={styles.projectImage}
                src={`${imageUrl}`}
                alt='project foto'
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null
                    currentTarget.src='./assets/noimage.png'
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
                        <div onClick={() => selectProject('Founding')} className={styles.progressButton}><ProgressBar stage={'Founding'}/></div>
                        <div onClick={() => selectProject('In progress')} className={styles.progressButton}><ProgressBar stage={'In progress'}/></div>
                        <div onClick={() => selectProject('Completed')} className={styles.progressButton}><ProgressBar stage={'Completed'}/></div>
                    </div>
                    :<ProgressBar stage={projectStatus}/>
                    }
                </div>
            </div>
            <div className={`${styles.midColumn} ${styles.column}`}>
                <DescriptionTextField handleChange={handleHeader} edit={true} type='header' content={newHeader}/>
                <DescriptionTextField handleChange={handleIntroduction} edit={true} type='introduction' content={intro}/>
                <DescriptionTextField handleChange={handleDescription} edit={true} type='description' content={description}/>
            </div>
            <div className={`${styles.rightColumn} ${styles.column}`}>
                <div className={styles.contentCard}>
                    <h2 className={styles.subHeader}>Skills</h2>
                    <SkillList handleCheckboxChange={handleCheckboxChange} selectedItems={selectedSkills} edit={true} skills = {allSkills}/>
                </div>
                <div className={styles.contentCard}>
                    <h2 className={styles.subHeader}>Tags</h2>
                    <div className={styles.tagList}>{tags.map(tag => <ProjectTag key={tag} name={tag}/>)}</div>
                </div>
            </div>
        </div>
    )
}
export default EditProjectPage;


/*
import { BlobServiceClient } from '@azure/storage-blob'

const [image, setImage] = useState(null)
    const handleImageChange = e => {
        if (e.target.files[0]) {
            e.target.files[0] > 2000000? alert('Image cant be larger than 2 mb'):
            setImage(URL.createObjectURL(e.target.files[0]))
        }
    }
    
    const handleUpload = async () => {
        alert('not yet implemented')
        //Not yet implemented
    };

                <input type="file" accept="image/png" onChange={handleImageChange} />
                {image && (
                    <img src={image} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '100%' }}/>
                )}
                <button onClick={handleUpload} disabled={!image}>Upload</button>
*/