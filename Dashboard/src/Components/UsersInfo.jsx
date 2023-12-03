  import React from 'react'
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

  const UsersInfo = ({ usersInfo, onDelete, onEdit, onSelect, selectedUsers, selectAll }) => {
    return (
      <>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Sr.No</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Actions</th>
              <th scope='col'>
              <input
                type="checkbox"
                onChange={selectAll}
                checked={selectedUsers.length === usersInfo.length}
              />
              </th>
            </tr>
          </thead>
          <tbody>
            {usersInfo.map((user) => (
              <tr 
              key={user.id} 
              className={selectedUsers.includes(user.id) ? 'bg-secondary' : ''}
              >
                <th scope="row">{user.id}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                <div className='row'>
                  <div className='col'>
                  <FontAwesomeIcon 
                  icon={faPenToSquare}
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => onEdit(user)}
                  >
                  </FontAwesomeIcon>
                  </div>
                  <div className='col'>
                  <FontAwesomeIcon 
                    icon={faTrash}
                    onClick={() => onDelete(user.id)}
                  >
                  </FontAwesomeIcon>
                  </div>
                </div>
                </td>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => onSelect(user.id)}
                    checked={selectedUsers.includes(user.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
  }

  export default UsersInfo
