
import React from 'react';
import { ChatContext } from '../../context/chatContext';

const UserSelect = () => {
  const { selectedUser, setSelectedUser } = React.useContext(ChatContext);
  return (
    <>
      <label htmlFor="exampleFormControlSelect1">1. Choose your user</label>
      <select
        id="exampleFormControlSelect1"
        className="form-control"
        value={selectedUser}
        onInput={(event) =>
          setSelectedUser!((event.target as HTMLSelectElement).value)
        }
      >
        <option value="Sam">Sam</option>
        <option value="Joyse">Joyse</option>
        <option value="Russell">Russell</option>
      </select>
    </>
  )
}

export default UserSelect;
