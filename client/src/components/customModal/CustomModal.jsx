import styles from './CustomModal.module.css'

export default function CustomModal({
    action,
    onConfirm,
    onClose
}) {
    return (
        <div className={styles.overlay}>
            <div className={styles.backdrop} onClick={() => onClose(null)}></div>
            <div className={styles.modal}>
                <div className="confirm-container">
                    <header className={styles.headers}>
                        <h2 className={styles['head-text']}>{`Are you sure you want to ${action} your report?`}</h2>
                        <button className="btn close">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark"
                                className="svg-inline--fa fa-xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                <path fill="currentColor"
                                    d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z">
                                </path>
                            </svg>
                        </button>
                    </header>
                    <div className="actions">
                        <div className='row mt-3'>
                            <div className='col-lg-6'>
                                <button onClick={() => onClose(null)} className="nav-link text-uppercase text-center w-50 bg-dark" type="button">Cancel</button>
                            </div>
                            <div className='col-lg-6 d-flex justify-content-end'>
                                <button onClick={onConfirm} className="nav-link text-uppercase text-center w-50 active" type="submit">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}