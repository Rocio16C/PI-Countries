import React, { useState } from "react";
import { useSelector } from "react-redux";
import CountriesCards from "../CountriesCards/CountriesCards";
import styles from "./Pagination.module.css";
import SearchBar from "../SearchBar/SearchBar";
import ButtonFilter from "../ButtonFilter/ButtonFilter";

function Pagination(){

    const totalCountries = useSelector(state => state.countries);
    
    const [currentPage, setCurrentPage] = useState(1);
    const countriesPerPage = 10;

    const pageNumberLimit = 5;
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    const handleOnClick = (event) => {
        const currentPage = Number(event.target.id);
        setCurrentPage(currentPage);

        if (currentPage >= maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + 1);
            setMinPageNumberLimit(minPageNumberLimit + 1);
        }
        if (currentPage <= minPageNumberLimit + 1) {
            setMaxPageNumberLimit(maxPageNumberLimit - 1);
            setMinPageNumberLimit(minPageNumberLimit - 1);
        }
    };

    const numberPages = [];
    for(let i = 1; i <= Math.ceil(totalCountries.length/countriesPerPage); i++){
        numberPages.push(i);
    }

    const indexOfLastCountry = currentPage * countriesPerPage; //es el ultimo pais a mostrar en esa pagina
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage; //es el primer pais a mostrar en esa pagina
    const currentCountries = totalCountries.slice(indexOfFirstCountry, indexOfLastCountry)
    
    const pages = numberPages.map(number => {
        if(number < maxPageNumberLimit + 1 && number > minPageNumberLimit){
            return (
                <li 
                key={number} 
                id={number} 
                onClick={handleOnClick} 
                className={currentPage === number ? styles.active : null}
                >
                    {number}
                </li>
            );
        } else {
            return null;
        }
    });

    const handlePrevClick = () => {
        if (currentPage === 1) {
            return;
        }
          
        setCurrentPage(currentPage - 1);
        
        if((currentPage - 1) % pageNumberLimit === 0 && currentPage !== numberPages[0]){
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };

    const handleNextClick = () => {
        if (currentPage === numberPages.length) {
            return;
        }
          
        setCurrentPage(currentPage + 1);
          
        if(currentPage + 1 > maxPageNumberLimit && currentPage !== numberPages[numberPages.length - 1]){
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };

    let decrement = null;
    if(minPageNumberLimit >= 1){
        decrement = <li onClick={handlePrevClick}>&laquo;</li>
    };

    let increment = null;
    if(numberPages.length > maxPageNumberLimit){
        increment = <li onClick={handleNextClick}>&raquo;</li>
    };

    return (
        <div>
            <SearchBar 
            setCurrentPage={setCurrentPage} 
            setMinPageNumberLimit={setMinPageNumberLimit} 
            setMaxPageNumberLimit={setMaxPageNumberLimit}
            />
            <ButtonFilter
            setCurrentPage={setCurrentPage} 
            setMinPageNumberLimit={setMinPageNumberLimit}
            setMaxPageNumberLimit={setMaxPageNumberLimit} 
            />
            <CountriesCards countries={currentCountries}/>
            <ul className={styles.numberPages}>
                <li>
                    <button className={styles.buttons} onClick={handlePrevClick}><span className={currentPage === numberPages[0] ? styles.font : styles.font2}>PREV</span></button>
                </li>
                {currentPage !== numberPages[0] && <>{decrement}</>}
                {pages}
                {currentPage !== numberPages[numberPages.length - 1] && <>{increment}</>}
                <li>
                    <button className={styles.buttons} onClick={handleNextClick}><span className={currentPage === numberPages[numberPages.length - 1] ? styles.font : styles.font2}>NEXT</span></button>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;