
import styles from './PageLoader.module.css';
import {Loader} from "../Loader/Loader";



export const PageLoader = () => (
    <div className={styles.pageLoader}>
        <Loader />
    </div>
);
