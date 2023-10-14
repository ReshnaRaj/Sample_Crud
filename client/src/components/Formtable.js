import React from 'react'
import '../App.css'
import { MdClose } from 'react-icons/md'

const formtable = ({handleSubmit,handleChange,handleclose,rest}) => {
  return (
    <div className="addcontainer">
            <form onSubmit={handleSubmit}>
              <div className="close-btn" onClick={ handleclose}>
                <MdClose />
              </div>
              <lable htmlFor="name">Name:</lable>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                value={rest.name}
              ></input>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                value={rest.email}
              ></input>
              <label htmlFor="mobile">Mobile</label>
              <input
                type="number"
                name="mobile"
                id="mobile"
                onChange={handleChange}
                value={rest.mobile}
              ></input>
              <button className="btn">Submitt</button>
            </form>
          </div>
  )
}

export default formtable