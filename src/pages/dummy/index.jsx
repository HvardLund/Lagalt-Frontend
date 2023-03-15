import styles from './dummy.module.css'
import ProgressBar from '../../components/progressBar';

function DummyPage(){
    return(
        <div className={styles.container}>
            <ProgressBar stage='progress'/>
        </div>
    )
}
export default DummyPage;