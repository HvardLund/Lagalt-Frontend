import ProjectCard from '../../components/projectCard';
import styles from './frontpage.module.css'
import { useEffect, useState } from 'react';
import Search from '../../components/search';
import keycloak from '../../keycloak';

//landing page for the website
function FrontPage(){
    
    //all projects
    const [projects, setProjects] = useState([])

    //selected category
    const [selected, setSelected] = useState('All')

    //projects that are displayed based on category filtering
    const [displayedProjects, setDisplayedProjects] = useState(projects)

    //projects that are displayed when filtering by search term these are the ones displayed when searching
    const [searchProjects, setSearchProjects] = useState(projects)

    //content of the search bar
    const [searchPhrase, setSearchPhrase] = useState('')

    //api for fetching projects. When logged in, projects with matching skills to the user skills are prioritized
    const apiURL = keycloak.authenticated? `https://lagalt-bckend.azurewebsites.net/api/projects/skill?id=${keycloak.tokenParsed.sub}`:'https://lagalt-bckend.azurewebsites.net/api/projects'
    
    //default image when project has no image
    const imageNotFound = "https://lagaltprojectimages.blob.core.windows.net/images/noimage.png"
    
    //filtering based on activity
    const select = (activity) => {
        setSelected(activity)
    }

    //make sure displayed projects are updated when a category is selected, or the list of all projects are changed
    useEffect(() => {
        selected ==='All'?(setDisplayedProjects(projects)):setDisplayedProjects(projects.filter(project => project.field===selected))
    },[selected, projects])
    
    //updating the search phrase hook based on what is in the search field
    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchPhrase(value);
    }

    //handles filtering when the search phrase is changed
    useEffect(() => {
        searchPhrase.trim().length > 0?
        setSearchProjects(displayedProjects.filter(project =>
            project.title.toLowerCase().includes(searchPhrase.toLowerCase()))):setSearchProjects(displayedProjects)        
    },[searchPhrase, displayedProjects])

    useEffect(() => {
        const getAllProjects = async () => {
            try{
                const response = await fetch(apiURL)
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
                        tags={project.tags.length>0?project.tags:[]}
                        image={project.imageUrls.length >0?project.imageUrls[0]:imageNotFound}
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
