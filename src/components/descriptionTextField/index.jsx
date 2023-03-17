import styles from './descriptionTextField.module.css'

function DescriptionTextField(props) {

    const field_type = props.type
    const content = props.content
    const theme = props.theme? props.theme:'projectpage'

    return(
        <div className={`${styles.textCard} ${styles[theme]}`}>
            {field_type==='header'&&<div className={`${styles.headerText} ${styles[theme+'header']}`}>{content}</div>}
            {field_type==='introduction'&&<div className={`${styles.introduction} ${styles[theme+'intro']}`}>{content}</div>}
            {field_type==='description'&&<div className={styles.description}>{content}</div>}
        </div>
    )
}
export default DescriptionTextField