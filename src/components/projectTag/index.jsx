import styles from './tag.module.css'

function ProjectTag(props) {

    const tag = props.name

    return(
        <div className={styles.container}>
            <h4 className={styles.tagText}>{tag}</h4>
        </div>
    )
}
export default ProjectTag