import styles from './skillList.module.css'

function SkillList(props) {

    const skillList = props.skills? props.skills:[]
    const type = props.type? props.type:'default'

    return(
        <div className={`${styles.container} ${styles[type]}`}>
            {skillList.map(skill =>
            <div className={styles.skill}>
                <div className={styles.skillName}>{skill}</div>
            </div>
            )}
        </div>
    )
}
export default SkillList