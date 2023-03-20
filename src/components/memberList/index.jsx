import styles from './memberList.module.css'
import { useNavigate } from 'react-router';


function MemberList(props) {

    const memberList = props.members? props.members:[]
    const navigate = useNavigate()

    return(
        <div className={styles.container}>
            {memberList.map(member =>
            <div onClick={() => navigate(`/profile/${member.username}`)}className={styles.member}>
                <img className={styles.profilePhoto} src={member.profileImage} alt='avatar' />
                <div className={styles.username}>{member.username}</div>
            </div>
            )}
        </div>
    )
}
export default MemberList