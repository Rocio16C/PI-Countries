import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountryName, clearNameError } from '../../Redux/actions/index.js';
import styles from "./SearchBar.module.css";
import lupa from "./../../lupa.png"

function SearchBar({setCurrentPage, setMinPageNumberLimit, setMaxPageNumberLimit}){

    const [countrySearch, setCountrySearch] = useState({
        countryName:'',
    })

    const dispatch = useDispatch();

    const handleInputChange = (event) => {
        setCountrySearch({countryName: event.target.value})
        dispatch(clearNameError())
    };

    const handleInputSubmit = (event) => {
        event.preventDefault()
        dispatch(getCountryName(countrySearch.countryName))
        setCurrentPage(1)
        setMinPageNumberLimit(0)
        setMaxPageNumberLimit(5)
    };
   
    return (
        <div className={styles.searchBar}>
            <form onSubmit={(event) => handleInputSubmit(event)}>
                <input
                className={styles.search}
                type='search'
                placeholder="Country..."
                id="countryName"
                value={countrySearch.countryName}
                onChange={(event) => handleInputChange(event)}
                />
                <button type='submit' className={styles.searchBtn} >
                    <img src={lupa} alt="Search"/>
                </button>
            </form>
        </div>
    );
};

export default SearchBar;