import styles from './progressBar.module.css'


function ProgressBar(props) {

    const stage = props.stage

    const steps = [
        {
            label: 'founding',
            step: 1,
            reached: 'reached'
        },
        {
            label: 'in progress',
            step: 2,
            reached: (stage === 'In progress' || stage ==='Completed')?'reached':'unreached'
        },
        {
            label: 'completed',
            step: 3,
            reached: (stage===('Completed'))?'reached':'unreached'
        },
    ]

    const stagestyle = (stage==='In progress')? 'progress' : stage.toLowerCase()

    return(
        <div className={styles.container}>
            <div className={`${styles.steps} ${styles[stagestyle]}`}>
            {steps.map(({ step, reached }) => (
                <div className={styles.stepWrapper} key = {step}>
                    <div className={`${styles.step} ${styles[reached]}`}>
                        <span className={styles.stepCount}></span>
                    </div>
                </div>
            ))}
            <div className={styles.stepLabelContainer}>
                <span className={styles.stepLabel}>{stage}</span>
            </div>
            </div>
      </div>
    )
}
export default ProgressBar