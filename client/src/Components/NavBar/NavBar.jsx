import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./NavBar.module.css"
import image from "./../../buscar.png"

class NavBar extends React.Component{
    render(){
        const { pathname } = this.props.unObjeto.location

        return(
            <nav className={styles.navBar}>
                <Link to='/countries' className={styles.tittle}>
                    <span>
                        <img src={image} alt="Countries"  className={styles.image}/>
                        Countries-App
                    </span>
                </Link>
                    {pathname !== '/countries' && <Link to={'/countries'} className={styles.block}><span>Home</span></Link>}
                    {pathname !== '/activity/create' && <Link to={'/activity/create'} className={styles.block1}><span>Create Activity</span></Link>}
                    {pathname !== '/activity/create' && <SearchBar/>}
            </nav>
        );
    };
};

export default NavBar;