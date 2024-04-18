import React, { FC, PropsWithChildren } from 'react';
import styles from './Styles/style.module.css';
import Image from 'next/image';
import logo from '../../../public/logo.png';
import {useRouter} from 'next/navigation';

const LandingNavbar: React.FC = () => {

    const router = useRouter();

    return (
        <div className={styles.nav}>
            <div className={styles.logoAndName}>
                <div className={styles.logoContainer}>
                    <Image onClick={() => { router.push('/') }} className={styles.logo} src={logo} alt="logo" />
                </div>
                <div className={styles.nameContainer}>
                    <div className={styles.name}>
                        <a href="/">BudgeFast</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingNavbar