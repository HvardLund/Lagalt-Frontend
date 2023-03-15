import styles from './skillList.module.css'

function SkillList(props) {

    const skillList = props.skills? props.skills:[]

    return(
        <div className={styles.container}>
            {skillList.map(skill =>
            <div className={styles.skill}>
                <div className={styles.skillName}>{skill}</div>
            </div>
            )}
        </div>
    )
}
export default SkillList