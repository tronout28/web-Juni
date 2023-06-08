import React, { useState } from "react";
import './index.css';


function Input({ addData }) {
  
  const [judul, setJudul] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [localImage, setLocalImage] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(true);

  const handleJudulChange = (event) => {
    setJudul(event.target.value);
  };

  const handleKeteranganChange = (event) => {
    setKeterangan(event.target.value);
  };

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleLocalImageChange = (event) => {
    const file = event.target.files[0];
    setLocalImage(URL.createObjectURL(file));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const image = imageUrl || localImage;

    addData({ judul, keterangan, image });

    setJudul("");
    setKeterangan("");
    setImageUrl("");
    setLocalImage(null);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="testing">
      <div className="card-input">

      <button className="button-hide" onClick={toggleFormVisibility}>
        {isFormVisible ? "sembunyikan" : "tambahkan data"}
      </button>
      {isFormVisible && (
        <form className="data-Input" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Judul"
            value={judul}
            onChange={handleJudulChange}
            />

          <input
            type="text"
            placeholder="Keterangan"
            value={keterangan}
            onChange={handleKeteranganChange}
            />

          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={handleImageUrlChange}
            />

          <input
            type="file"
            accept="image/*"
            onChange={handleLocalImageChange}
            />

          <button type="submit">Tambahkan</button>
        </form>
      )}
      </div>
    </div>
  );
}

export default Input;
