/* eslint-disable react/display-name */
import React, { Children, cloneElement } from 'react';
import { FilterList, FilterButton } from '../../Components/Search/FilterList';
import { useSelector, useDispatch } from 'react-redux';
import { closePopup, openPopup, showMap } from '../../Modules/search';

const FilterButtonContainer = React.memo(({ name, text, children }) => {
  const { popupState, filterApplied } = useSelector(state => state.search);
  const keys = Object.keys(filterApplied);
  const filters = keys.filter(key => key.includes(name));
  const isApplied = filters.every(filter => !filterApplied[filter]);

  const dispatch = useDispatch();
  const onClick = () =>
    dispatch(popupState[name] ? closePopup(name) : openPopup(name));

  return (
    <FilterButton text={text} isApplied={isApplied} onClick={onClick}>
      {children}
    </FilterButton>
  );
});

const FilterListContainer = React.memo(({ mapState }) => {
  const { dateDiff } = useSelector(state => state.search.searchForm);
  const dispatch = useDispatch();
  const onShowMap = () => dispatch(showMap());

  return (
    <FilterList mapState={mapState} onShowMap={onShowMap} dateDiff={dateDiff} />
  );
});

export { FilterButtonContainer, FilterListContainer };
