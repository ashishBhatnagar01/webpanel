import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from '../utils/axios';
import '../css/talkGroupCreate.css';

const TalkGroupCreate = () => {
  const [tgname, settgname] = useState('');
  const [newid, setnewid] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('talkgroup/gettalkgroupid');
      console.log(data);
      setnewid(data.talkgroup_id);
    })();
  }, []);
  const reset = () => {
    settgname('');
  };
  const schema = yup.object().shape({
    name: yup
      .string()
      .typeError('Talk-Group name must be string')
      .required('This field is required')
      .matches(/^[a-zA-Z][a-zA-Z ]+$/, 'Invalid Talk-Group name')
      .min(3, 'Username must be 3-40 characters long')
      .max(40, 'Username must be 3-40 characters long'),
  });
  const validate = async (name) => {
    const formData2 = { name };
    await schema.validate(formData2, { abortEarly: false });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);

    const data = {
      name: tgname,
    };

    try {
      await validate(data);

      const response = await axios.post('/talkgroup/', data);
      if (response.data.message) {
        alert(response.data.message);
      }
      reset();
    } catch (error) {
      if (error.inner.length) {
        const validateErrors = error.inner.reduce(
          (acc, err) => ({ ...acc, [err.path]: err.errors[0] }),
          {}
        );
        setErrors(validateErrors);
      } else {
        console.log(error.response.data);
      }
    }

    setDisabled(false);
  };

  const form = () => (
    <form className="passback" onSubmit={onSubmit}>
      <div style={{ fontWeight: 'bolder', fontSize: '4vh' }}>
        NEW TALK-GROUP
      </div>
      <br />
      <div className="formarea">
        <div>
          <span>
            <label htmlFor="username">Talk-Group Name: &nbsp;</label>
          </span>
          <input
            type="text"
            id="username"
            pattern=".{3,40}"
            required
            title="3 to 40 characters"
            onChange={(event) => {
              settgname(event.target.value);
            }}
            value={tgname}
          />
        </div>
        <div className="text-danger fw-600">{errors?.name}</div>
        <br />
        Talkgroup ID (auto-generated) : {newid}
      </div>
      <br />
      <button type="submit" disabled={disabled}>
        Save
      </button>
    </form>
  );

  return <div>{form()}</div>;
};
export default TalkGroupCreate;
