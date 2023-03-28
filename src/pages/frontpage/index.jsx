import ProjectCard from '../../components/projectCard';
import styles from './frontpage.module.css'
import { useEffect, useState } from 'react';
import Search from '../../components/search';
import keycloak from '../../keycloak';

function FrontPage(){
    
    const [projects, setProjects] = useState([])
    const [selected, setSelected] = useState('All')
    const [displayedProjects, setDisplayedProjects] = useState(projects)
    const [searchProjects, setSearchProjects] = useState(projects)
    const [searchPhrase, setSearchPhrase] = useState('')
    const apiURL = keycloak.authenticated? `https://lagalt-bckend.azurewebsites.net/api/projects/skill?id=${keycloak.tokenParsed.sub}`:'https://lagalt-bckend.azurewebsites.net/api/projects'
    const imageNotFound = "https://lagaltprojectimages.blob.core.windows.net/images/noimage.png"
    
    const select = (activity) => {
        setSelected(activity)
    }

    useEffect(() => {
        selected ==='All'?(setDisplayedProjects(projects)):setDisplayedProjects(projects.filter(project => project.field===selected))
    },[selected, projects])
    
    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchPhrase(value);
    }

    useEffect(() => {
        searchPhrase.trim().length > 0?
        setSearchProjects(displayedProjects.filter(project =>
            project.title.toLowerCase().includes(searchPhrase.toLowerCase()))):setSearchProjects(displayedProjects)        
    },[searchPhrase, displayedProjects])

    useEffect(() => {
        const getAllProjects = async () => {
            try{
                const response = await fetch(apiURL+'projects')
                if(!response.ok){
                    throw new Error('Could not load projects')
                }
                const data = await response.json()
                setProjects(data)
            }
            catch(error){
                return[error.message,[]]
            }
        }
        getAllProjects()
    },[apiURL])

    return(
        <div className={styles.container}>
            <div className={styles.navbar}>
                <div onClick={() => select('All')} className={selected==='All'?`${styles.selected} ${styles.allColor}`:styles.navText}>All</div>
                <div onClick={() => select('Games')} className={selected==='Games'?`${styles.selected} ${styles.gamesColor}`:styles.navText}>Game development</div>
                <div onClick={() => select('Web')} className={selected==='Web'?`${styles.selected} ${styles.webColor}`:styles.navText}>Webdesign</div>
                <div onClick={() => select('Music')} className={selected==='Music'?`${styles.selected} ${styles.musicColor}`:styles.navText}>Music</div>
                <div onClick={() => select('Movie')} className={selected==='Movie'?`${styles.selected} ${styles.movieColor}`:styles.navText}>Film production</div>
            </div>
            <div className={styles.columnsContainer}>
            <div className={`${styles.leftColumn} ${styles.column}`}>
                <Search value={searchPhrase} handleSearch={handleSearch}/>
            </div>
            <div className={`${styles.midColumn} ${styles.column}`}>
                {searchProjects.map(project =>
                    <ProjectCard
                        title={project.title} 
                        intro={project.caption}
                        tags={project.tags.length>0?project.images:[]}
                        image={project.imageUrls.length >0?project.images[0]:imageNotFound}
                        owner={project.owner}
                        skills={project.skills}
                        id={project.id}
                        activityType={project.field}
                        progress={project.progress}
                        key={project.id}
                    />
                )}
            </div>
            <div className={`${styles.rightColumn} ${styles.column}`}>
                <div></div>
            </div>
            </div>
        </div>
    )
}
export default FrontPage;