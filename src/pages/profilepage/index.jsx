import styles from './profilepage.module.css'
import ProjectCard from '../../components/projectCard';
import DescriptionTextField from '../../components/descriptionTextField';
import SkillList from '../../components/skillList';

const skills = ['Skillpadde', 'Avoid indecies', 'too cool for school', 'ski ll', 'koding']

const project1 = {
    id:1,
    skills: skills,
    tags: ['tag1', 'tag2 med langt navn', 'tagger4', 'tag5'],
    image: 'assets/Prosjektbilde.png',
    owner: { fullname: 'Nils', username: 'Nils...', profileImage: 'assets/profile.svg'},
    intro: 'Bli med på et sci-fi-basert rollespill og utforsk ulike planeter og galakser! Vi er et lidenskapelig team som arbeider med å skape en spennende ny spillopplevelse for spillere over hele verden. Hvis du er interessert i å bli med på denne hobbybaserte utviklingen, kontakt oss for mer informasjon om hvordan du kan bidra til å skape et fantastisk spill!'
}

const me = { fullname: 'Nils', username: 'Nils...', profileImage: 'assets/profile.svg'}

const project2 = project1
project2.id = 2

const project3 = project1
project3.id = 3

const projects = [project1, project2, project3]

const about = 'Hei! Jeg er en kreativ person som er lidenskapelig opptatt av å utforske nye ideer og utfordringer. Jeg har en interesse for [sett inn interessefelt] og bruker min tid på å lære og utvikle meg selv innen dette området. Jeg er alltid på utkikk etter nye muligheter til å samarbeide og jobbe med andre mennesker som deler min lidenskap. Jeg er åpen for å delta i hobbyprosjekter og ser frem til å møte likesinnede mennesker her på plattformen!"'

function ProfilePage(){
    return(
        <div className={styles.container}>            
            <div className={`${styles.leftColumn} ${styles.column}`}>
                <div className={styles.me}>
                    <img className={styles.profileImage} src={me.profileImage} alt='avatar' />
                    <div className={styles.username}>{me.username}</div>
                </div>
                <DescriptionTextField type='description' content={about}></DescriptionTextField>
                <h2 className={styles.subHeader}>Portfolio</h2>
                {projects.map(project =>
                    <ProjectCard 
                        intro={project.intro} 
                        tags={project.tags} 
                        image={project.image}
                        owner={project.owner}
                        skills={project.skills}
                        id={project.id}
                    />
                )}
            </div>
            <div className={`${styles.rightColumn} ${styles.column}`}>
                <div className={styles.contentCard}>
                    <h2 className={styles.subHeader}>Skills</h2>
                    <SkillList skills = {skills}/>
                </div>
            </div>
        </div>
    )
}
export default ProfilePage;