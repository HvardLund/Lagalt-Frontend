import styles from './memberList.module.css'
import { useNavigate } from 'react-router';


function MemberList(props) {

    const memberList = props.members? props.members:[]
    const navigate = useNavigate()
    const profilePhoto = "https://lagaltprojectimages.blob.core.windows.net/images/profile.svg"

    return(
        <div className={styles.container}>
            {memberList.map(member =>
            <div key={member} onClick={() => navigate(`/profile/${member.replaceAll(' ', '_')}`)}className={styles.member}>
                <img className={styles.profilePhoto} src={profilePhoto} alt='avatar' />
                <div className={styles.username}>{member}</div>
            </div>
            )}
        </div>
    )
}
export default MemberList