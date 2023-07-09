import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { InputText } from 'primereact/inputtext';
import { usePopper } from 'react-popper';
import useDebounce from '~/hook/useDebounce';
import { productApi } from '~/api/product.api';
import Button2 from './Button2.template';
import { icon } from '~/assert/icon/icon';


const SearchBar = (props ) => {

  const { searchFeature, className, setReferenceElement, children, ref, valueSearch, onInput } = props

  const debouncedSearchTerm = useDebounce(valueSearch, 500)

  const { searchResult, setSearchResult } = searchFeature
 
  // const { setResultsVisible  } = popperFeature

  const handleInput = (e) => {
    const value = e.target.value;
    return onInput(value)
  }

  const handleBlur = () => {
    setTimeout(() => {
      // setResultsVisible(false);
    }, 200);
  };

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
    <SearchBarWrapper className={'py-3' + className}>
      <span className="p-input-icon-left w-full">
        <icon.search />
        <SearchInput
          value={valueSearch}
          onChange={handleInput}
          onBlur={handleBlur}
          placeholder="Search..."
          ref={setReferenceElement}
          className={'w-full'}
        />
      </span>
    {children}
    </SearchBarWrapper>
  );
};

export default SearchBar;



const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const SearchInput = styled(InputText)`
  width: 400px; /* Adjust the width as per your requirement */
`;

