import React from 'react';
import Body from './body';

function DataList({ NikkeList, onDelete, onEdit, searchQuery }) {
  return (
    <div className='list-data'>
      {NikkeList.map((data) => (
        <Body
          key={data.id}
          id={data.id}
          judul={data.judul}
          keterangan={data.keterangan}
          image={data.image}
          createdAt={data.createdAt}
          editedAt={data.editedAt}
          onDelete={onDelete}
          onEdit={onEdit}
          searchQuery={searchQuery}
        />
      ))}
    </div>
  );
}

export default DataList;
