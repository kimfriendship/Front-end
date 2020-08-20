import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideMap } from '../../Modules/search';
import SearchMap from '../../Components/Search/SearchMap';

const SearchMapContainer = ({ view, closeMap }) => {
  const { mapState } = useSelector(state => state.search);
  const dispatch = useDispatch();
  const onHideMap = () => dispatch(hideMap());

  return (
    <SearchMap
      mapState={mapState}
      onHideMap={onHideMap}
      closeMap={closeMap}
      view={view}
    />
  );
};

export default SearchMapContainer;