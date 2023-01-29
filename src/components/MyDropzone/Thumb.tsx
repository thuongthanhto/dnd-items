import React, { useState } from 'react';
import cn from 'classnames';

import { IThumbProps } from './types';

const Thumb: React.FC<IThumbProps> = ({ file, removeFile }) => {
  const [isRemoving, setRemoving] = useState<boolean>(false);

  const handleConfirmRemove = () => {
    setRemoving(true);
  };

  return (
    <div
      className={cn('d-flex flex-column me-3 card-thumb', {
        removing: isRemoving,
      })}
    >
      <div className="thumb mb-3">
        <div className="thumb-inner">
          <img src={file.preview} alt={file.name} className="img" />
        </div>
      </div>
      {!isRemoving && (
        <button className="btn btn-success" onClick={handleConfirmRemove}>
          Remove
        </button>
      )}

      {isRemoving && (
        <>
          <button className="btn btn-success" onClick={() => removeFile(file)}>
            Save
          </button>
          <button
            className="btn btn-danger mt-2"
            onClick={() => setRemoving(false)}
          >
            Keep
          </button>
        </>
      )}
    </div>
  );
};

export default Thumb;
