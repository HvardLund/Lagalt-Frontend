import styles from './descriptionTextField.module.css'

//Component for displaying and editing text
function DescriptionTextField(props) {

    //what type of field it is, header, introduction, description and URL is supported
    const field_type = props.type

    //the text content that is displayed in the field
    const content = props.content

    //component theme
    const theme = props.theme? props.theme:'projectpage'

    //denotes wether the component is editable or not
    const edit = props.edit===true? true:false

    //method that is passed to the parent to handle input data
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
                {field_type==='description'&&<textarea value = {content} placeholder='provide a description...' onChange={updateInputContent} className={`${styles.commonInput} ${styles.descriptionInput}`}></textarea>}
                {field_type==='url'&&<input value = {content} placeholder='provide an url' onChange={updateInputContent} className={`${styles.commonInput} ${styles.descriptionInput}`}></input>}
            </>}
        </div>
    )
}
export default DescriptionTextField