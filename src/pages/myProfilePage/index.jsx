import styles from './myProfilepage.module.css'
import ProjectCard from '../../components/projectCard';
import DescriptionTextField from '../../components/descriptionTextField';
import SkillList from '../../components/skillList';
import keycloak from '../../keycloak';
import FeatherIcon from 'feather-icons-react'
import ToggleSwitch from '../../components/toggleSwitch';

const skills = ['Skillpadde', 'Avoid indecies', 'too cool for school', 'ski ll', 'koding']

const project1 = {
    id:1,
    skills: skills,
    tags: ['tag1', 'tag2 med langt navn', 'tagger4', 'tag5'],
    image: 'assets/Prosjektbilde.png',
    owner: { fullname: 'Nils', username: 'Nils...', profileImage: 'assets/profile.svg'},
    activityType: 'music',
    intro: 'Bli med på et sci-fi-basert rollespill og utforsk ulike planeter og galakser! Vi er et lidenskapelig team som arbeider med å skape en spennende ny spillopplevelse for spillere over hele verden. Hvis du er interessert i å bli med på denne hobbybaserte utviklingen, kontakt oss for mer informasjon om hvordan du kan bidra til å skape et fantastisk spill!'
}

const me = { fullname: 'Nils', username: 'Nils...', profileImage: 'assets/profile.svg'}

const project2 = Object.assign({},project1)
project2.id = 2
project2.activityType='games'

const project3 = Object.assign({},project1)
project3.id = 3
project3.activityType = 'web'

const projects = [project1, project2, project3]

const about = 'Hei! Jeg er en kreativ person som er lidenskapelig opptatt av å utforske nye ideer og utfordringer. Jeg har en interesse for [sett inn interessefelt] og bruker min tid på å lære og utvikle meg selv innen dette området. Jeg er alltid på utkikk etter nye muligheter til å samarbeide og jobbe med andre mennesker som deler min lidenskap. Jeg er åpen for å delta i hobbyprosjekter og ser frem til å møte likesinnede mennesker her på plattformen!"'

function MyProfilePage(){
    return(
        <div className={styles.container}>        
            <div className={`${styles.midColumn} ${styles.column}`}>
                <div className={styles.me}>
                    <div className={styles.profileInfo}>
                        <img className={styles.profileImage} src={me.profileImage} alt='avatar' />
                        <div className={styles.username}>{keycloak.tokenParsed.preferred_username}<div className={styles.name}>{keycloak.tokenParsed.name}</div></div>
                    </div>
                    <div className={styles.editContainer}>
                        <div className={styles.edit}><ToggleSwitch /><div>Hidden mode</div></div>
                        <div className={styles.edit}><FeatherIcon cursor='pointer' size="25" icon="edit-3" /><div>Edit profile</div></div>
                    </div>
                </div>
                <DescriptionTextField type='description' content={about}></DescriptionTextField>
                <div className={styles.contentCard}>
                    <h2 className={styles.subHeader}>Skills</h2>
                    <SkillList skills = {skills}/>
                </div>
                <h2 className={styles.subHeader}>Portfolio</h2>
                {projects.map(project =>
                    <ProjectCard 
                        intro={project.intro} 
                        tags={project.tags} 
                        image={project.image}
                        skills={project.skills}
                        id={project.id}
                        activityType={project.activityType}
                        key={project.id}
                    />
                )}
            </div>
        </div>
    )
}
export default MyProfilePage;