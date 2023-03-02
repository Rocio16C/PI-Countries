import React from "react";
import { Link } from "react-router-dom";
import banderaM from "./../../mexico.jpg"
import banderaA from "./../../argentina.jpg"
import banderaEU from "./../../EU.jpg"
import banderaT from "./../../turquia.jpg"
import banderaC from "./../../colombia.jpg"
import banderaCh from "./../../china.jpg"
import styles from "./Landing.module.css"


function Landing(){
    return (
        <div className={styles.container}>
          
            <div className={styles.cards}>
                <img src={banderaM} alt='Mexico'/>
            </div>

            <div className={styles.cards}>
                <img src={banderaA} alt='Argentina'/>
            </div>

            <div className={styles.cards}>
                <img src={banderaEU} alt='E.U'/>
            </div>

            <div className={styles.cards}>
                <img src={banderaT} alt='Turquia'/>
            </div>

            <div className={styles.cards}>
                <img src={banderaC} alt='Colombia'/>
            </div>

            <div className={styles.cards}>
                <img src={banderaCh} alt='China'/>
            </div>
            
            <button className={styles.button}>
                <Link to={'/countries'} className={styles.link}><span className={styles.titlebutton}>ENTER TO COUNTRIES!</span></Link>
            </button>

        </div>
    );
};


export default Landing;