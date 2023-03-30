import styles from './memberList.module.css'
import { useNavigate } from 'react-router';

//component that is displaying a list of members/contributors
function MemberList(props) {

    //the actual list of members
    const memberList = props.members? props.members:[]
    const navigate = useNavigate()

    //link to profile photo hosted on azure
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