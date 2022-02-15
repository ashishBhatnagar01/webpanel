import '../css/contactlistModify.css';

import React, { useEffect, useState, useRef } from 'react';

import axios from '../utils/axios';
import { useAuth } from '../hooks/useAuth';

export default function ContactListCreate() {
 const [loading , setLoading]=useState(false);
 const [contactList,setContactList]=useState("");
 const [disabled,setDisabled]=useState(false);
 const [contactlistarr,setcontactlistarr]=useState([]);
 const [selectedUsers, setSelectedUsers] = useState([]);
 const [userlist ,setuserlist]=useState([]);
 const [contactlistName,setcontactlistName]=useState("");
 const selectedUserIds = useRef(new Set());

 const reset = () => {
    setContactList('');
   
  };
  function onSelect(users) {
    let selected = [];
    selectedUserIds.current.forEach((id) => {
      selected.push(users.filter((user) => user.id === id)[0]);
    });
    setSelectedUsers(selected);
  }
 const onSubmit = async (e) => {
    e.preventDefault();
reset();
  };


  const SelectAcc = ( {users} ) => {
    return (
      <div>
          <span>
         PTT User Accounts
        </span>
        <br/>
        <div className="comp">
          <div className="accbox">
            {users.map((val, index) => {
              return (
                <div key={val.id}>
                  <input
                    type="checkbox"
                    id="subitem"
                    name="selection"
                    defaultChecked={selectedUserIds.current.has(val.id)}
                    onClick={() => {
                      selectedUserIds.current.has(val.id)
                        ? selectedUserIds.current.delete(val.id)
                        : selectedUserIds.current.add(val.id);
                    }}
                  />
                  <label for="selection">{val.display_name}</label>
                </div>
              );
            })}
          </div>
          <button type="button" onClick={() => onSelect(users)}>
            &nbsp;&nbsp; &gt; &gt; &nbsp;&nbsp;
          </button>
          <div className="accbox">
            {(selectedUsers.length &&
              selectedUsers.map((val) => {
                return <div key={val.id}>{val.display_name}</div>;
              })) ||
              null}
          </div>
        </div>
      </div>
    );
  };

if (loading) {
    return (
      <div className="passback">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
}
return (
    <form className="passback" >
      <div style={{ fontWeight: 'bolder', fontSize: '4vh' }}>
        MODIFY CONTACT LIST
      </div>
      <br />
      <div className="formarea">
      <div>
          <span>
            <label htmlFor="username">Contact list Name: &nbsp;</label>
          </span>
          <input
            type="text"
            id="username"
            onChange={(event) => {
              setcontactlistName(event.target.value);
            }}
            value={contactlistName}
            required
          />
        </div>
        <br/>
      <div>
          <span>
            <label htmlFor="company">
              Select Contact-List :&nbsp;&nbsp;&nbsp;{' '}
            </label>
          </span>
          <select
            id="company"
            onChange={(event) => {
              setContactList(event.target.value);
            }}
            value={contactList}
            required
          >
            <option value={0}>Select Talk-Group</option>
            {contactlistarr.map((val) => {
              return (
                <option key={val.id} value={val.id}>
                  {val.cl_name}
                </option>
              );
            })}
          </select>
        </div>
        <br />
      <SelectAcc users={userlist}/>
      

      </div>
      <br />
      <button type="submit" disabled={disabled}>
        Save
      </button>
    </form>
  );

}