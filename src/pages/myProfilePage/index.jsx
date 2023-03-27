import styles from './myProfilepage.module.css'
import ProjectCard from '../../components/projectCard';
import DescriptionTextField from '../../components/descriptionTextField';
import SkillList from '../../components/skillList';
import keycloak from '../../keycloak';
import FeatherIcon from 'feather-icons-react'
import { useState } from 'react';
import { useSelector } from 'react-redux';

const allSkills = ['Skillpadde', 'Avoid indecies', 'too cool for school', 'ski ll', 'koding', 'sverre', 'kake']

const project1 = {
    id:1,
    skills: allSkills,
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

function MyProfilePage(){

    const description = useSelector((state) => state.updateUser.description)
    const skills = useSelector((state) => state.updateUser.skills)
    const [edit, setEdit] = useState(false)
    const [selectedSkills, setSelectedSkills] = useState(skills)

    const buttonClick = () => {
        setEdit(!edit)
    }

    let viewedSkills = edit?allSkills:skills

    const handleCheckboxChange = (event) => {
        const itemId = event.target.id;
        const isChecked = event.target.checked;
    
        if (isChecked) {
          setSelectedSkills([...selectedSkills, itemId]);
        } else {
          setSelectedSkills(selectedSkills.filter((id) => id !== itemId));
        }
    }

    return(
        <div className={styles.container}>
            <div className={styles.topBar}>
                <div onClick= {() => buttonClick()} className={styles.editButton}>{edit?'Save':<>Edit<FeatherIcon cursor='pointer' size="20" icon="edit-3" /></>}</div>
            </div>        
            <div className={`${styles.column}`}>
                <div className={styles.me}>
                    <div className={styles.profileInfo}>
                        <img className={styles.profileImage} src={me.profileImage} alt='avatar' />
                        <div className={styles.username}>{keycloak.tokenParsed.preferred_username}<div className={styles.name}>{keycloak.tokenParsed.name}</div></div>
                    </div>
                </div>
                <DescriptionTextField edit={edit} type='description' content={description}></DescriptionTextField>
                <div className={styles.contentCard}>
                    <h2 className={styles.subHeader}>Skills</h2>
                    <SkillList handleCheckboxChange={handleCheckboxChange} selectedItems={selectedSkills} edit={edit} skills = {viewedSkills}/>
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