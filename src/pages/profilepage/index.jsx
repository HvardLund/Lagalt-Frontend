import styles from './profilepage.module.css'
import DescriptionTextField from '../../components/descriptionTextField';
import SkillList from '../../components/skillList';
import { useParams } from 'react-router';

const skills = ['Skillpadde', 'Avoid indecies', 'too cool for school', 'ski ll', 'koding']
const user = { fullname: 'Nils', username: 'Nils...', profileImage: 'https://lagaltprojectimages.blob.core.windows.net/images/profile.svg'}
const about = 'Hei! Jeg er en kreativ person som er lidenskapelig opptatt av å utforske nye ideer og utfordringer. Jeg har en interesse for [sett inn interessefelt] og bruker min tid på å lære og utvikle meg selv innen dette området. Jeg er alltid på utkikk etter nye muligheter til å samarbeide og jobbe med andre mennesker som deler min lidenskap. Jeg er åpen for å delta i hobbyprosjekter og ser frem til å møte likesinnede mennesker her på plattformen!"'

function ProfilePage(){

    const {username} = useParams()

    return(
        <div className={styles.container}>        
            <div className={`${styles.midColumn} ${styles.column}`}>
                <div className={styles.me}>
                    <img className={styles.profileImage} src={user.profileImage} alt='avatar' />
                    <div className={styles.username}>{username.replaceAll('_', ' ')}</div>
                </div>
                <DescriptionTextField type='description' content={about}></DescriptionTextField>
                <div className={styles.contentCard}>
                    <h2 className={styles.subHeader}>Skills</h2>
                    <SkillList skills = {skills}/>
                </div>
            </div>
        </div>
    )
}
export default ProfilePage;