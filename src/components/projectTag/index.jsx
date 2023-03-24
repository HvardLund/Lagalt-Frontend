import styles from './tag.module.css'

function ProjectTag(props) {

    const tag = props.name
    const size = props.small===true? 'small':'default'
    const onclick = props.onClick
    const clickable = props.onClick?'clickable':'unclickable'

    return(
        <div onClick={onclick} className={`${styles.container} ${styles[size]} ${styles[clickable]}`}>
            <h4 className={styles.tagText}>{tag}</h4>
        </div>
    )
}
export default ProjectTag