import React from "react";

function Delete({ id, onDelete}) {
    return <button className='data-item_delete' onClick={() => onDelete(id)}>X</button>;
}

export default Delete;
