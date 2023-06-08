import React from "react";
import DataList from "./listdata";
import { nikke } from "./utils/data";
import Headers from './header'
import Input from "./input";

class ContainerData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      NikkeList: nikke(),
      searchQuery: ''
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onAddDataHandler = this.onAddDataHandler.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  onDeleteHandler(id) {
    const NikkeList = this.state.NikkeList.filter((nikke) => nikke.id !== id);
    this.setState({ NikkeList });
  }

  onAddDataHandler({ judul, keterangan, image }) {
    const createdAt = new Date().toLocaleDateString();

    this.setState((prevState) => {
      return {
        NikkeList: [
          ...prevState.NikkeList,
          {
            id: +new Date(),
            judul,
            keterangan,
            image,
            createdAt
          },
        ],
      };
    });
  }

  handleSearch(event) {
    this.setState({ searchQuery: event.target.value });
  }

  handleEdit(id, editedJudul, editedKeterangan, newImage) {
    const editedAt = new Date().toLocaleDateString();

    const updatedNikkeList = this.state.NikkeList.map((nikke) => {
      if (nikke.id === id) {
        return {
          ...nikke,
          judul: editedJudul,
          keterangan: editedKeterangan,
          image: newImage,
          editedAt
        };
      }
      return nikke;
    });
    this.setState({ NikkeList: updatedNikkeList });
  }

  render() {
    const { NikkeList, searchQuery } = this.state;

    const filteredNikkeList = NikkeList.filter((nikke) =>
      nikke.judul.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="data app">
        <Headers className="kepala" />
        <Input addData={this.onAddDataHandler} />
        <input
          className='search-input'
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={this.handleSearch}
        />
        <DataList
          className='nikke-list'
          NikkeList={filteredNikkeList}
          onDelete={this.onDeleteHandler}
          onEdit={this.handleEdit}
          searchQuery={searchQuery}
        />
      </div>
    );
  }
}

export default ContainerData;
