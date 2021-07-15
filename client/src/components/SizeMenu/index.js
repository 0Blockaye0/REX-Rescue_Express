import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_SIZE, UPDATE_CURRENT_SIZE } from '../../utils/actions';
import { QUERY_SIZE } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function SizeMenu() {
  const [state, dispatch] = useStoreContext();

  const { size } = state;

  const { loading, data: sizeData } = useQuery(QUERY_SIZE);

  useEffect(() => {
    if (sizeData) {
      dispatch({
        type: UPDATE_SIZE,
        size: sizeData.size
      });
      sizeData.size.forEach(size => {
        idbPromise('size', 'put', size);
      });
    } else if (!loading) {
      idbPromise('size', 'get').then(size => {
        dispatch({
          type: UPDATE_SIZE,
          size: size
        });
      });
    }
  }, [sizeData, loading, dispatch]);

  const handleClick = id => {
    dispatch({
      type: UPDATE_CURRENT_SIZE,
      currentSize: id
    });
  };

  return (
    <div>
      <h2>What Size dog are you looking to Rescue?</h2>
      {size.map(item => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default SizeMenu;
