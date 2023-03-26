import ProjectCard from '../../components/projectCard';
import styles from './frontpage.module.css'
import { useEffect, useState } from 'react';
import Search from '../../components/search';
//import keycloak from '../../keycloak';

const tags = []

function FrontPage(){
    
    const [projects, setProjects] = useState([])
    const [selected, setSelected] = useState('All')
    const [displayedProjects, setDisplayedProjects] = useState(projects)
    const [searchPhrase, setSearchPhrase] = useState('')

    const select = (activity) => {
        setSelected(activity)
    }

    useEffect(() => {
        console.log('front1')
        selected ==='All'?(setDisplayedProjects(projects)):setDisplayedProjects(projects.filter(project => getRightActivityType(project.field)===selected.toLowerCase()))
    },[selected, projects])
    
    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchPhrase(value);
    }

    const apiURL = 'https://lagalt-bckend.azurewebsites.net/api/'

    /*
    const createUser = async () => {
        await fetch(apiURL+'users', {
            method: 'POST',
            headers: {Authorization: `Bearer ${keycloak.token}`, 'Content-Type': 'application/json'},
            body: JSON.stringify({
                "id": `${keycloak.tokenParsed.sub}`,
                "description": 'Jeg er kul', 
            })
        }).then(resp => {
            if (!resp.ok) {
                throw new Error(resp.status);
            }
            console.log(resp);
        }).catch(error => {
            console.log(error);
        });
    }
    */
    
    const getRightActivityType = (activityType) =>{
        if(activityType === 'Webdesign'){
            return 'web'
        }
    }

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
        console.log('front2')
        getAllProjects()
    },[])

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
                {displayedProjects.map(project =>
                    <ProjectCard
                        title={project.title} 
                        intro={project.caption}
                        tags={tags}
                        image={project.images[0]}
                        owner={project.owner}
                        skills={project.skills}
                        id={project.id}
                        activityType={getRightActivityType(project.field)}
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