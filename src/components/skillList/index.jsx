import styles from './skillList.module.css'
import { useSelector } from 'react-redux';

//list of skills, displaying skills aquired by the user as green
function SkillList(props) {

    //list of skills
    const skillList = props.skills? props.skills:[]
    const type = props.type? props.type:'default'

    //denotes if the skill list is editable or not
    const edit = props.edit ===true? true: false

    //selected skills when the list is editable 
    const selectedItems = props.selectedItems

    //method passed to the parent that handles functionality when a skill is selected
    const handleCheckboxChange = props.handleCheckboxChange

    //logged in user's skills
    let reduxSkills = useSelector((state) => state.updateUser.skills)
    let mySkills = reduxSkills.length > 0? reduxSkills:[]

    return(
        <div className={`${styles.container} ${styles[type]}`}>
            {skillList.map(skill =>
            <div key={skill} className={`${styles.skill} ${mySkills.includes(skill)?styles['green']:styles['gray']}`}>
                <div className={`${styles.skillName} ${styles[edit?'edit':'notEdit']}`}>{skill}</div>
                {edit &&
                <input 
                    className={styles.checkbox} 
                    type='checkbox'
                    id={skill}
                    checked={selectedItems.includes(skill)}
                    onChange={handleCheckboxChange}
                >
                </input>}
            </div>
            )}
        </div>
    )
}
export default SkillList