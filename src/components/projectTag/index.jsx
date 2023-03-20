import styles from './tag.module.css'

function ProjectTag(props) {

    const tag = props.name
    const size = props.small===true? 'small':'default'

    return(
        <div className={`${styles.container} ${styles[size]}`}>
            <h4 className={styles.tagText}>{tag}</h4>
        </div>
    )
}
export default ProjectTag