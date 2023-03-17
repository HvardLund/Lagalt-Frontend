import ProjectCard from '../../components/projectCard';
import styles from './frontpage.module.css'

const project1 = {
    id:1,
    skills: ['Skillpadde', 'Avoid indecies', 'too cool for school', 'ski ll', 'koding'],
    tags: ['tag1', 'tag2 med langt navn', 'tagger4', 'tag5'],
    image: 'assets/Prosjektbilde.png',
    owner: { fullname: 'Nils', username: 'Nils...', profileImage: 'assets/profile.svg'},
    intro: 'Bli med på et sci-fi-basert rollespill og utforsk ulike planeter og galakser! Vi er et lidenskapelig team som arbeider med å skape en spennende ny spillopplevelse for spillere over hele verden. Hvis du er interessert i å bli med på denne hobbybaserte utviklingen, kontakt oss for mer informasjon om hvordan du kan bidra til å skape et fantastisk spill!'
}

const project2 = project1
project2.id = 2

const project3 = project1
project3.id = 3

const projects = [project1, project2, project3] 

function FrontPage(){

    return(
        <div className={styles.container}>
            <div className={`${styles.leftColumn} ${styles.column}`}>
                <div></div>
            </div>
            <div className={`${styles.rightColumn} ${styles.column}`}>
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
        </div>
    )
}
export default FrontPage;