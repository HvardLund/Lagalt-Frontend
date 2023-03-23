import styles from './descriptionTextField.module.css'

function DescriptionTextField(props) {

    const field_type = props.type
    const content = props.content
    const theme = props.theme? props.theme:'projectpage'
    const edit = props.edit===true? true:false
    const updateInputContent = props.handleChange

    return(
        <div className={`${styles.textCard} ${styles[theme]} ${edit&&styles.editBorder}`}>
            {!edit?<>
                {field_type==='header'&&<div className={`${styles.headerText} ${styles[theme+'header']}`}>{content}</div>}
                {field_type==='introduction'&&<div className={`${styles.introduction} ${styles[theme+'intro']}`}>{content}</div>}
                {field_type==='description'&&<div className={styles.description}>{content}</div>}
            </>: <>
                {field_type==='header'&&<input value = {content} type='text' placeholder='Project name...' onChange={updateInputContent} className={`${styles.commonInput} ${styles.headerInput}`}></input>}
                {field_type==='introduction'&&<textarea value = {content} placeholder='write a short project caption...' onChange={updateInputContent} className={`${styles.commonInput} ${styles.introductionInput}`}></textarea>}
                {field_type==='description'&&<textarea value = {content} placeholder='write about your project...' onChange={updateInputContent} className={`${styles.commonInput} ${styles.descriptionInput}`}></textarea>}
                {field_type==='url'&&<input value = {content} placeholder='provide an url to your new image' onChange={updateInputContent} className={`${styles.commonInput} ${styles.descriptionInput}`}></input>}
            </>}
        </div>
    )
}
export default DescriptionTextField