import styles from './descriptionTextField.module.css'

function DescriptionTextField(props) {

    const field_type = props.type
    const content = props.content

    return(
        <div className={styles.textCard}>
            {field_type==='header'&&<div className={styles.headerText}>{content}</div>}
            {field_type==='introduction'&&<div className={styles.introduction}>{content}</div>}
            {field_type==='description'&&<div className={styles.description}>{content}</div>}
        </div>
    )
}
export default DescriptionTextField