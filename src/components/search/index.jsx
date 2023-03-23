import styles from './search.module.css'
import FeatherIcon from 'feather-icons-react'

function Search(props) {

    const handleSearch = props.handleSearch
    const value=props.value

    return(
        <div className={styles.container}>
            <input value={value} maxLength={40} placeholder= {"Start typing..."} className={styles.inputField} type="text" onChange={handleSearch}></input>
            <FeatherIcon size="24" icon="search" />
        </div>
    )
}
export default Search