import styles from './skillList.module.css'

function SkillList(props) {

    const skillList = props.skills? props.skills:[]
    const type = props.type? props.type:'default'
    const edit = props.edit ===true? true: false
    const selectedItems = props.selectedItems
    const handleCheckboxChange = props.handleCheckboxChange

    return(
        <div className={`${styles.container} ${styles[type]}`}>
            {skillList.map(skill =>
            <div key={skill} className={styles.skill}>
                <div className={styles.skillName}>{skill}</div>
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