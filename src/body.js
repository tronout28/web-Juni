import React, { useState } from 'react';
import Delete from './delete';

function Body({ judul, keterangan, image, id, onDelete, onEdit, searchQuery, createdAt, editedAt }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedJudul, setEditedJudul] = useState(judul);
  const [editedKeterangan, setEditedKeterangan] = useState(keterangan);
  const [newImage, setNewImage] = useState('');
  const [isContentVisible, setIsContentVisible] = useState(true);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(id, editedJudul, editedKeterangan, newImage);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedJudul(judul);
    setEditedKeterangan(keterangan);
    setNewImage('');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setNewImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  if (searchQuery && !judul.toLowerCase().includes(searchQuery.toLowerCase())) {
    return null;
  }

  return (
    <div className='card'>
      <div className='row'>
        <div className='button'>
          {isContentVisible && (
            <>
              <h2>{judul}</h2>
              {keterangan}
              <img src={image} alt="mengulang" />
              <p>Created At: {createdAt}</p>
              <p>Edited At: {editedAt}</p>
            </>
          )}
          {isEditing ? (
            <div className='edit-form'>
              <input
                type='text'
                value={editedJudul}
                onChange={(e) => setEditedJudul(e.target.value)}
                className='edit-input'
              />
              <textarea
                value={editedKeterangan}
                onChange={(e) => setEditedKeterangan(e.target.value)}
                className='edit-textarea'
              ></textarea>
              <input
                type='text'
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                placeholder='Image URL'
                className='edit-input'
              />
              <input
                type='file'
                accept='image/*'
                onChange={handleImageUpload}
                className='edit-image-upload'
              />
              <div className='edit-btn-group'>
                <button className='save-btn' onClick={handleSave}>Save</button>
                <button className='cancel-btn' onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          ) : (
            <div>
              <button className='edit-btn' onClick={handleEdit}>Edit</button>
            </div>
          )}
        </div>

        <Delete id={id} onDelete={onDelete} />
      </div>
      {isContentVisible ? (
        <button className='hide-btn' onClick={() => setIsContentVisible(false)}>
          Hide Content
        </button>
      ) : (
        <button className='show-btn' onClick={() => setIsContentVisible(true)}>
          Show Content
        </button>
      )}
    </div>
  );
}

export default Body;
