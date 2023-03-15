import styles from './memberList.module.css'

function MemberList(props) {

    const memberList = props.members? props.members:[]

    return(
        <div className={styles.container}>
            {memberList.map(member =>
            <div className={styles.member}>
                <img className={styles.profilePhoto} src={member.profileImage} alt='avatar' />
                <div className={styles.username}>{member.username}</div>
            </div>
            )}
        </div>
    )
}
export default MemberList