import * as React from 'react';
import styles from "styles/components.css";

type Props = {
    children: React.ReactNode;
}
export const PageWrapper: React.FC<Props> = ({children}): JSX.Element => (
    <div className={styles.scrollContainer}>
        {children}
    </div>
)