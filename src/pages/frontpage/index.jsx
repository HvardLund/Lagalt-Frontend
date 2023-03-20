import ProjectCard from '../../components/projectCard';
import styles from './frontpage.module.css'
import { useEffect, useState } from 'react';

const project1 = {
    id:1,
    skills: ['Skillpadde', 'Avoid indecies', 'too cool for school', 'ski ll', 'koding'],
    tags: ['tag1', 'tag2 med langt navn', 'tagger4', 'tag5'],
    image: 'assets/Prosjektbilde.png',
    owner: { fullname: 'Nils', username: 'Nils...', profileImage: 'assets/profile.svg'},
    activityType: 'music',
    intro: 'Bli med på et sci-fi-basert rollespill og utforsk ulike planeter og galakser! Vi er et lidenskapelig team som arbeider med å skape en spennende ny spillopplevelse for spillere over hele verden. Hvis du er interessert i å bli med på denne hobbybaserte utviklingen, kontakt oss for mer informasjon om hvordan du kan bidra til å skape et fantastisk spill!'
}

const project2 = Object.assign({},project1)
project2.id = 2
project2.activityType='games'

const project3 = Object.assign({},project1)
project3.id = 3
project3.activityType = 'web'

const projects = [project1, project2, project3] 

function FrontPage(){

    const [selected, setSelected] = useState('All')
    const [displayedProjects, setDisplayedProjects] = useState(projects) 

    const select = (activity) => {
        setSelected(activity)
    }

    useEffect(() => {
        selected==='All'?(setDisplayedProjects(projects)):setDisplayedProjects(projects.filter(projects => projects.activityType===selected.toLowerCase()))
    }, [selected])

    return(
        <div className={styles.container}>
            <div className={`${styles.leftColumn} ${styles.column}`}>
                <div></div>
            </div>
            <div className={`${styles.rightColumn} ${styles.column}`}>
                <div className={styles.navbar}>
                    <div onClick={() => select('All')} className={selected==='All'?styles.selected:styles.navText}>All</div>
                    <div onClick={() => select('Games')} className={selected==='Games'?styles.selected:styles.navText}>Game development</div>
                    <div onClick={() => select('Web')} className={selected==='Web'?styles.selected:styles.navText}>Webdesign</div>
                    <div onClick={() => select('Music')} className={selected==='Music'?styles.selected:styles.navText}>Music</div>
                    <div onClick={() => select('Film')} className={selected==='Film'?styles.selected:styles.navText}>Film production</div>
                </div>
                {displayedProjects.map(project =>
                    <ProjectCard 
                        intro={project.intro} 
                        tags={project.tags} 
                        image={project.image}
                        owner={project.owner}
                        skills={project.skills}
                        id={project.id}
                        activityType={project.activityType}
                    />
                )}
            </div>
        </div>
    )
}
export default FrontPage;