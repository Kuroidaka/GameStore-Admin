import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { InputText } from 'primereact/inputtext';
import { usePopper } from 'react-popper';
import useDebounce from '~/hook/useDebounce';
import { productApi } from '~/api/product.api';
import Button2 from './Button2.template';



const SearchBar = ({ searchFeature }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const { searchResult, setSearchResult } = searchFeature
 
  const [resultsVisible, setResultsVisible] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setResultsVisible(value.trim().length > 0);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setResultsVisible(false);
    }, 200);
  };

  const handleAction = (value) => {
    console.log("game added", value)
  }

  useEffect(() => {

    const getSearchResult = async () => {
      productApi.getProductByName(debouncedSearchTerm)
        .then(res => {
          console.log("data response", res.data)
          setSearchResult(res.data)
        })
    }

    if (debouncedSearchTerm) {
      getSearchResult()
    }
    else {
      setSearchResult([])
    }

  }, [debouncedSearchTerm]);

  return (
    <SearchBarWrapper className='py-3'>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <SearchInput
          value={searchTerm}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Search..."
          ref={setReferenceElement}
        />
      </span>
      {resultsVisible && (
        <PopperContainer ref={setPopperElement} style={styles.popper} {...attributes.popper}>
          {searchResult &&
            searchResult.map((item, index) => {

              return (
                <SearchResult key={index} onClick={() => handleAction(item)}>
                  <div>{item.game_name}</div>
                  <div>{item.price}</div>
              </SearchResult>
              )

            })
          }
        </PopperContainer>
      )}
    </SearchBarWrapper>
  );
};

export default SearchBar;


const SearchResult = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const SearchInput = styled(InputText)`
  width: 400px; /* Adjust the width as per your requirement */
`;

const PopperContainer = styled.div`
  position: absolute;
  z-index: 999;
  background-color: #fff;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

