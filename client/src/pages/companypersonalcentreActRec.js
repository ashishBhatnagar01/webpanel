import '../css/personalCenterviewUseract.css';

import React, { useState, useEffect } from 'react';
import moment from 'moment';

import axios from '../utils/axios';

const CompanyViewActivity = () => {
  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const [companyactlist, setcompanyactlist] = useState([]);
  const [updatedactlist, setupdatedactlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/company/activity-logs');
      setcompanyactlist(data);
      setupdatedactlist(data);
      setLoading(false);
    })();
  }, []);

  const filterlist = () => {
    if (fromdate.length && todate.length) {
      setupdatedactlist(
        companyactlist.filter((val) => (
            moment(val.timestamp).isSameOrAfter(fromdate) &&
            moment(val.timestamp).isSameOrBefore(todate)
          ))
      );
    }
  };

  const reset = () => {
    setfromdate('');
    settodate('');
  };

  const unfilterlist = () => {
    setupdatedactlist(companyactlist);
    reset();
  };

  const table = () => (
    <div className="viewback">
      <div style={{ fontWeight: 'bolder', fontSize: '4vh' }}>
        VIEW ACTIVITY LOG
      </div>

      <br />
      <div>
        <div>
          <span>
            <label htmlFor="id1">From Date: &nbsp;</label>
          </span>
          <input
            type="date"
            id="id1"
            onChange={(event) => {
              setfromdate(event.target.value);
            }}
            value={fromdate}
            required
          />
        </div>
        <br />

        <div>
          <span>
            <label htmlFor="id2">To Date : &nbsp;</label>
          </span>
          <input
            type="date"
            id="id2"
            onChange={(event) => {
              settodate(event.target.value);
            }}
            value={todate}
            required
          />
        </div>
      </div>
      <div className="mt-3">
        <button
          className="p-1 me-5 font-weight-bold"
          style={{ fontSize: '1vw' }}
          onClick={filterlist}
        >
          Search
        </button>

        <button
          className="p-1 font-weight-bold"
          style={{ fontSize: '1vw' }}
          onClick={unfilterlist}
        >
          {' '}
          View All
        </button>
      </div>
      <table className="mt-3">
        <tr className="tableheading">
          <th>S. No</th>
          <th>Date</th>
          <th>Time</th>
          <th>Account Name</th>
          <th>User Activity Description</th>
        </tr>
        {updatedactlist.map((val, index) => {
          // eslint-disable-next-line no-param-reassign
          index+=1;
          return (
            <tr key={val.id} >
              <th>{index}</th>
              <th>{moment(val.timestamp).format('DD-MM-YYYY')}</th>
              <th>{moment(val.timestamp).format('HH:mm')}</th>
              <th>{val.display_name}</th>
              <th>{val.activity_desc}</th>
            </tr>
          );
        })}
      </table>
    </div>
  );

  if (loading) {
    return (
      <div className="viewback">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return <div>{!loading && table()}</div>;
};

export default CompanyViewActivity;
