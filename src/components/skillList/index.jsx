import styles from './skillList.module.css'
import { useSelector } from 'react-redux';

function SkillList(props) {

    const skillList = props.skills? props.skills:[]
    const type = props.type? props.type:'default'
    const edit = props.edit ===true? true: false
    const selectedItems = props.selectedItems
    const handleCheckboxChange = props.handleCheckboxChange
    let mySkills = useSelector((state) => state.updateUser.skills)

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