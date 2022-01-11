import React, { useState, useEffect } from 'react';
import '../css/personalCenterLoginRecord.css'
import axios from '../utils/axios';
const ViewLogin = () => {
    const [fromdate, setfromdate] = useState();
    const [todate, settodate] = useState();
    const [agentloglist, setagentloglist] = useState([]);
  
   
  
    return (
      <div className="viewback">
        <div style={{ fontWeight: 'bolder', fontSize: '4vh' }}>
          LOGIN RECORD
        </div>
  
        <br />
        <div className="filter">
          <div>
            <span>
              <label for="id1">From Date: &nbsp;</label>
            </span>
            <input
              type="date"
              id="id1"
              onChange={(event) => {
                setfromdate(event.target.value);
              }}
              required
            />
          </div>
          <br />
          <br />
          <div>
            <span>
              <label for="id2">To Date : &nbsp;</label>
            </span>
            <input
              type="date"
              id="id2"
              onChange={(event) => {
                settodate(event.target.value);
              }}
              required
            />
          </div>
        </div>
        <div className="mt-3">
          <button
            className="p-1 me-5 font-weight-bold"
            style={{ fontSize: '1vw' }}
          >
            Search
          </button>
  
          <button className="p-1 font-weight-bold" style={{ fontSize: '1vw' }}>
            {' '}
            View All
          </button>
        </div>
        <table className="mt-3">
          <tr className="tableheading">
            <th>S. No</th>
            <th>Date</th>
            <th>Time</th>
            <th>Login Activity Description</th>
            <th>IP Address</th>

           </tr>
          {agentloglist.map((val, index) => {
               index=index+1;
            return (
              <tr>
                
                <th>{index}</th>
                <th>{val.date}</th>
                <th>{val.time}</th>
                <th>{val.activity}</th>
                <th>{val.ipaddress}</th>
              </tr>
            );
          })}
        </table>
      </div>
    );
}
export default ViewLogin;