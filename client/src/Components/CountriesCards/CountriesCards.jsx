import React from "react";
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { getCountries } from "../../Redux/actions";
import styles from "./CountriesCards.module.css"

class CountriesCards extends React.Component{

    componentDidMount(){
        this.props.getCountries()
    };

    
    render(){
        const {countries} = this.props
        return (
            <div className={styles.cards}>
                {countries && countries.map(country => {
                    return (
                    <div className={styles.card}>
                        <Link to={`/country/${country.id}`} className={styles.link}>
                            {country.flag_image && <img className={styles.images} src={country.flag_image} alt={country.name}/>}
                        <div key={country.id} className={styles.text}>
                            {country.name && <p>{country.name}</p>}
                            {country.continent && <p>{country.continent}</p>}
                        </div>
                        </Link>
                    </div>
                    )
                })}
            </div>
        );
    };
};

function mapDispatchToProps(dispatch){
    return {
        getCountries: () => dispatch(getCountries())
    }
};

export default connect(null, mapDispatchToProps)(CountriesCards);