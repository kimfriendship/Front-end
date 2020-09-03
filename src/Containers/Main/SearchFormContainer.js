import React, { useState, useCallback, useEffect, useRef } from 'react';
import { debounce } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SearchForm from '../../Components/Main/SearchForm';
import { setSearchData } from '../../Modules/searchForm';
import { getLocationAutoComplete } from '../../Api/searchFormApi';

const SearchFormContainer = ({ isSearchBtnClicked }) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const searchData = useSelector(state => state.searchForm);
  const [locationResult, setLocationResult] = useState([]);
  const [type, setType] = useState(null);

  const changeType = type => {
    setType(() => type);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const {
      location,
      checkIn,
      checkOut,
      dateDiff,
      flexibleDate,
      guests,
    } = searchData;
    const { adult, child, infant } = guests;
    const guestCount = adult + child + infant;
    const url = `/search?location=${location}&checkIn=${checkIn}&checkOut=${checkOut}&dateDiff=${dateDiff}&flexibleDate=${flexibleDate}&guests=${guestCount}&adult=${adult}&child=${child}&infant=${infant}`;
    history.push(url);
    window.scrollTo({ top: 0 });
  };

  const changeSearchData = (name, value) => {
    const data = { name, value };
    dispatch(setSearchData(data));
  };

  const debounceGetAutoCompleteResult = useCallback(
    debounce(async value => {
      const result = await getLocationAutoComplete(value);
      setLocationResult(result || []);
    }, 300),
    [],
  );

  const changeAutoComplete = value => {
    if (!value) {
      dispatch(setSearchData({ name: 'location', value: '' }));
      setLocationResult([]);
      return;
    } else {
      dispatch(setSearchData({ name: 'location', value }));
      debounceGetAutoCompleteResult(value);
      setType('location');
    }
  };

  const setCheckIn = date => {
    console.log('[setCheckIn]: ', date);
    changeSearchData('checkIn', date);
    changeType('checkOut');
  };

  const setCheckOut = date => {
    console.log('[setCheckOut]: ', date);
    changeSearchData('checkOut', date);
    changeType('guests');
  };

  const increaseGuestCount = (guestsData, guestType) => {
    let { adult, child, infant } = guestsData;
    if (guestType === 'adult' || !adult) adult++;
    if (guestType === 'child') {
      child++;
    } else if (guestType === 'infant') {
      infant++;
    }
    const value = { adult, child, infant };
    changeSearchData('guests', value);
  };

  const decreaseGuestCount = (guestsData, guestType) => {
    let { adult, child, infant } = guestsData;
    if (guestType === 'adult') adult--;
    else if (guestType === 'child') child--;
    else if (guestType === 'infant') infant--;
    const value = { adult, child, infant };
    changeSearchData('guests', value);
  };

  const locationWrapperRef = useRef();
  const checkInWrapperRef = useRef();
  const checkOutWrapperRef = useRef();
  const guestsWrapperRef = useRef();

  const locationListRef = useRef();
  const calendarPopupRef = useRef();
  const checkOutPopupRef = useRef();
  const guestsPopupRef = useRef();

  const locationResetBtnRef = useRef();
  const checkInResetBtnRef = useRef();
  const checkOutResetBtnRef = useRef();
  const guestsResetBtnRef = useRef();

  const refObj = {
    locationWrapperRef,
    checkInWrapperRef,
    checkOutWrapperRef,
    guestsWrapperRef,
    locationListRef,
    calendarPopupRef,
    checkOutPopupRef,
    guestsPopupRef,
    locationResetBtnRef,
    checkInResetBtnRef,
    checkOutResetBtnRef,
    guestsResetBtnRef,
  };

  console.log(checkInWrapperRef);
  const changeFocus = () => {
    if (type === 'checkIn') checkInWrapperRef.current.focus();
    else if (type === 'checkOut') checkOutWrapperRef.current.focus();
    else if (type === 'guests') guestsWrapperRef.current.focus();
  };

  const handlePopup = ({ target }) => {
    console.log('handlePopup...', type);
    if (locationListRef.current && locationListRef.current.contains(target)) {
      console.log(1);
      changeType('checkIn');
    } else if (locationWrapperRef.current.contains(target)) {
      console.log(2);
      changeType('location');
    } else if (checkInWrapperRef.current.contains(target)) {
      console.log(3);
      changeType('checkIn');
    } else if (checkOutWrapperRef.current.contains(target)) {
      console.log(4);
      changeType('checkOut');
    } else if (guestsWrapperRef.current.contains(target)) changeType('guests');
    else if (
      (type === 'location' &&
        !locationResetBtnRef.current.contains(target) &&
        !locationWrapperRef.current.contains(target)) ||
      (type === 'checkIn' &&
        !calendarPopupRef.current.contains(target) &&
        !checkInWrapperRef.current.contains(target)) ||
      (type === 'checkOut' &&
        !calendarPopupRef.current.contains(target) &&
        !checkOutWrapperRef.current.contains(target)) ||
      (type === 'guests' &&
        !guestsPopupRef.current.contains(target) &&
        !guestsResetBtnRef.current.contains(target))
    ) {
      console.log(5);
      console.log(
        type === 'location' &&
          !locationResetBtnRef.current.contains(target) &&
          !locationWrapperRef.current.contains(target),
      );
      console.log(
        type === 'checkIn' &&
          !calendarPopupRef.current.contains(target) &&
          !checkInWrapperRef.current.contains(target),
      );
      console.log(
        type === 'checkOut' &&
          !calendarPopupRef.current.contains(target) &&
          !checkOutWrapperRef.current.contains(target),
      );
      console.log(
        type === 'guests' &&
          !guestsPopupRef.current.contains(target) &&
          !guestsResetBtnRef.current.contains(target),
      );
      console.log('close...');
      changeType(null);
    }
  };

  useEffect(() => {
    console.log('2...useEffect...type: ', type);
    document.addEventListener('click', handlePopup);
    type && changeFocus();
    return () => {
      document.removeEventListener('click', handlePopup);
    };
  }, [type, handlePopup]);

  return (
    <SearchForm
      isSearchBtnClicked={isSearchBtnClicked}
      type={type}
      refObj={refObj}
      changeType={changeType}
      searchData={searchData}
      changeSearchData={changeSearchData}
      changeAutoComplete={changeAutoComplete}
      locationResult={locationResult}
      handleSubmit={handleSubmit}
      setCheckIn={setCheckIn}
      setCheckOut={setCheckOut}
      increaseGuestCount={increaseGuestCount}
      decreaseGuestCount={decreaseGuestCount}
    ></SearchForm>
  );
};

export default React.memo(SearchFormContainer);
