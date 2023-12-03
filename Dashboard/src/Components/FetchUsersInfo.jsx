import React, { useEffect, useState } from 'react'
import UsersInfo from './UsersInfo'

export default function UsersData() {
    const [usersInfo, setUsersInfo] = useState([])
    const [editUser, setEditUser] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [usersPerPage] = useState(10)
    const [search, setSearch] = useState('')
    const [selectedUsers, setSelectedUsers] = useState([])

    useEffect(() => {
        const fetchUsersInfo = async () => {
            try {
            let res = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
                let data = await res.json()
                setUsersInfo(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchUsersInfo()
    }, [] )

    let deleteUser = (userId) => {
        setUsersInfo((prevUsers) => prevUsers.filter((user) => user.id !== userId))
    }

    let editUsers = (user) => {
        setEditUser(user)
    }

    let editUserForm = (e) => {
        e.preventDefault()
        setUsersInfo((prevUsers) =>
            prevUsers.map((user) => (user.id === editUser.id ? editUser : user))
        )
        setEditUser([])
    }

    let SearchedUsers = usersInfo.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase())
    )
    
    let indexOfLastUser = currentPage * usersPerPage
    let indexOfFirstUser = indexOfLastUser - usersPerPage
    let totalPage = Math.ceil(usersInfo.length/usersPerPage)
    let currentUsers = SearchedUsers.slice(indexOfFirstUser, indexOfLastUser)

    let handlePageChange = (direction) => {
      if (direction === 'next' && currentPage < totalPage) {
        setCurrentPage((prevPage) => prevPage + 1)
      } else if (direction === 'prev' && currentPage > 1) {
        setCurrentPage((prevPage) => prevPage - 1)
      }
    }

    let selectUsers = (userId) => {
          setSelectedUsers((prevSelected) =>
            prevSelected.includes(userId)
              ? prevSelected.filter((selected) => selected !== userId)
              : [...prevSelected, userId]
          )
      }

    let selectAllUsers = () => {
        if (selectedUsers.length === currentUsers.length) {
            setSelectedUsers([])
        } else {
            setSelectedUsers(currentUsers.map((user) => user.id))
        }
    }

    let deleteAllUsers = () => {
        setUsersInfo((prevUsers) => prevUsers.filter((user) => !selectedUsers.includes(user.id)))
        setSelectedUsers([])
    }

    return (
        <div className='container overflow-x-hidden'>
            <h2 className='text-center'>Dashboard</h2>
            <div className='row'>
                <div className='col'>
                    <div className="m-3">
                        <input
                        type="text"
                        className="form-control w-25"
                        placeholder="Search here"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                <div className='col-auto m-3'>
                    <button 
                    className="btn btn-primary ms-2" 
                    onClick={deleteAllUsers} 
                    disabled={selectedUsers.length === 0}
                    >
                        Delete All
                    </button>
                </div>
            </div>
            {editUser && (
                <div>
                    <div 
                    className="modal fade" 
                    id="exampleModal" 
                    aria-labelledby="exampleModalLabel" 
                    aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                                        Edit User Info
                                    </h1>
                                    <button 
                                    type="button" 
                                    className="btn-close" 
                                    data-bs-dismiss="modal" 
                                    aria-label="Close"
                                    />
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={editUserForm}>
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Name:</label>
                                            <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            value={editUser.name}
                                                onChange = {(e) => 
                                                setEditUser((prevUser) => ({
                                                ...prevUser, name: e.target.value 
                                                }))}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email:</label>
                                            <input
                                            type="text"
                                            className="form-control"
                                            id="email"
                                            value={editUser.email}
                                            onChange={(e) => 
                                                setEditUser((prevUser) => ({
                                                ...prevUser, email: e.target.value 
                                            }))}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="role" className="form-label">Role:</label>
                                            <input
                                            type="text"
                                            className="form-control"
                                            id="role"
                                            value={editUser.role}
                                            onChange={(e) => 
                                                setEditUser((prevUser) => ({ 
                                                ...prevUser, role: e.target.value 
                                                }))}
                                            />
                                        </div>
                                        <button 
                                        type="submit" 
                                        className="btn btn-primary" 
                                        data-bs-dismiss="modal"
                                        >
                                            Save
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <UsersInfo 
                usersInfo={currentUsers} 
                onDelete={deleteUser} 
                onEdit={editUsers}  
                selectedUsers={selectedUsers}  
                onSelect={selectUsers} 
                selectAll={selectAllUsers}
            />
            <nav aria-label="Page navigation">
            <span>Page {currentPage}</span> of <span>{totalPage}</span>
                <ul className="pagination justify-content-center fixed-bottom">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button 
                        className="page-link" 
                        onClick={() => handlePageChange('prev')} 
                        tabIndex="-1" 
                        aria-disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                    </li>
                    <li className="page-item">
                        <button 
                        className="page-link"
                        onClick={() => handlePageChange('next')}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
