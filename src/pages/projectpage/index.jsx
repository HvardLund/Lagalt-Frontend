import DescriptionTextField from '../../components/descriptionTextField';
import MemberList from '../../components/memberList';
import ProgressBar from '../../components/progressBar';
import ProjectTag from '../../components/projectTag';
import SkillList from '../../components/skillList';
import styles from './projectpage.module.css'

const intro='Bli med på et sci-fi-basert rollespill og utforsk ulike planeter og galakser! Vi er et lidenskapelig team som arbeider med å skape en spennende ny spillopplevelse for spillere over hele verden. Hvis du er interessert i å bli med på denne hobbybaserte utviklingen, kontakt oss for mer informasjon om hvordan du kan bidra til å skape et fantastisk spill!'
const description='Vi er en gruppe med lidenskapelige spillutviklere som arbeider med å utvikle et spennende nytt spill kalt "Galactic Quest". Dette er et sci-fi-basert rollespill der spillerne kan utforske ulike planeter og galakser, møte forskjellige karakterer og delta i episke kamper. Målet vårt er å lage et spill som både er underholdende og utfordrende, og som vil engasjere spillere over hele verden.\nSom en del av teamet vil du ha muligheten til å bidra til utviklingen av ulike aspekter av spillet, inkludert design av figurer og landskap, opprettelse av historiefortelling og utvikling av gameplay-mekanismer. Vi ser etter personer med forskjellige ferdigheter, fra programmering og kunstnerisk design til historiefortelling og lyddesign.\nProsjektet er hobbybasert, så det vil ikke være noen økonomisk kompensasjon for deltakelse. Men det vil være en fantastisk mulighet til å utvikle ferdighetene dine, samarbeide med lidenskapelige og talentfulle mennesker og bygge en portefølje av arbeid som kan hjelpe deg i din fremtidige karriere.\nHvis du er interessert i å bli med i teamet vårt, kan du kontakte oss for mer informasjon om hvordan du kan delta. Vi ser frem til å høre fra deg og å jobbe sammen for å skape en fantastisk spillopplevelse for spillere over hele verden!'
const projectImage = 'Prosjektbilde.png'
const status = 'In progress'

const memberList = [
    {
        fullname: 'Petter Pettersen',
        username: 'Petter sprett',
        profileImage: 'Green.svg'
    },
    {
        fullname: 'Hans Hansen',
        username: 'Hansen',
        profileImage: 'Blue.svg'
    },
    {
        fullname: 'Ola Nordmann',
        username: 'Bola Ola',
        profileImage: 'Pink.svg'
    },
    {
        fullname: 'Nils',
        username: 'Nils...',
        profileImage: 'Profile.svg'
    },
]

const skills = ['Skillpadde', 'Avoid indecies', 'too cool for school', 'ski ll', 'koding']
const tags = ['tag1', 'tag2 med langt navn', 'tagger4', 'tag5']

function ProjectPage(){

    return(
        <div className={styles.container}>
            <div className={`${styles.leftColumn} ${styles.column}`}>
                <img className={styles.projectImage} src={projectImage} alt='project foto'></img>
                <div className={styles.contentCard}>
                    <h2 className={styles.subHeader}>Status</h2>
                    <ProgressBar stage={status}/>
                </div>
            </div>
            <div className={`${styles.midColumn} ${styles.column}`}>
                <DescriptionTextField type='header' content={'Galactic quest'}/>
                <DescriptionTextField type='introduction' content={intro}/>
                <DescriptionTextField type='description' content={description}/>
            </div>
            <div className={`${styles.rightColumn} ${styles.column}`}>
                <div className={styles.contentCard}>
                    <h2 className={styles.subHeader}>Members</h2>
                    <MemberList members={memberList}/>
                </div>
                <div className={styles.contentCard}>
                    <h2 className={styles.subHeader}>Skills</h2>
                    <SkillList skills ={skills}/>
                </div>
                <div className={styles.contentCard}>
                    <h2 className={styles.subHeader}>Tags</h2>
                    <div className={styles.tagList}>{tags.map(tag => <ProjectTag name={tag}/>)}</div>
                </div>
            </div>
        </div>
    )
}
export default ProjectPage;