import DescriptionTextField from '../descriptionTextField'
import MemberList from '../memberList'
import ProgressBar from '../progressBar'
import ProjectTag from '../projectTag'
import SkillList from '../skillList'
import styles from './projectCard.module.css'
import { useNavigate } from "react-router-dom"

function ProjectCard(props) {

    const projectImage = props.image?props.image: 'assets/lagalt.png'
    const status = props.progress? props.progress: 'Founding'
    const header = props.header? props.header: 'Header'
    const intro = props.intro? props.intro: 'Introduction'
    const owner = props.owner?[props.owner]:[]
    const skills = props.skills?props.skills:[]
    const tags = props.tags?props.tags:[]
    const id = props.id
    const activityType = props.activityType

    const navigate = useNavigate()

    return(
        <div className={styles.container} onClick={() => navigate(`/project/${id}`)}>
            <div className={`${styles.activity} ${styles[activityType.toLowerCase()]}`}>
                {activityType.toLowerCase()==='music'&&<span class="material-symbols-outlined">music_note</span>}
                {activityType.toLowerCase()==='web'&&<span class="material-symbols-outlined">code</span>}
                {activityType.toLowerCase()==='movie'&&<span class="material-symbols-outlined">movie</span>}
                {activityType.toLowerCase()==='games'&&<span class="material-symbols-outlined">stadia_controller</span>}
                <div className={styles.activityName}>{activityType}</div>
            </div>
            <div className={styles.card}>
                <div className={styles.columns}>
                    <div className={`${styles.leftColumn} ${styles.column}`}>
                        <div className={styles.imageContainer}><img className={styles.projectImage} src={projectImage} alt='project foto'></img></div>
                        <ProgressBar stage={status}/>
                    </div>
                    <div className={`${styles.midColumn} ${styles.column}`}>
                        <DescriptionTextField theme='frontpage' type='header' content={header}/>
                        <DescriptionTextField theme='frontpage' type='introduction' content={intro}/>
                    </div>
                    <div className={`${styles.rightColumn} ${styles.column}`}>
                        <div className={styles.contentCard}>
                            <h2 className={styles.subHeader}>Skills</h2>
                            <SkillList type='frontpage' skills ={skills}/>
                        </div>
                        <div className={styles.contentCard}>
                            <h2 className={styles.subHeader}>Owner</h2>
                            <MemberList members={owner}/>
                        </div>
                    </div>
                </div>
                <div className={styles.tagList}>{tags.map(tag => <ProjectTag small={true} name={tag}/>)}</div>
            </div>
        </div>
    )
}
export default ProjectCard