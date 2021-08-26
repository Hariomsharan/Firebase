import React, { useState } from "react";
import { storage } from '../../Utils/Fairbase'

function UserContent(props) {
  const { user, details, deleteDetails } = props;
  const [form, setform] = useState(user);

  // console.log(form)

  const onChangehandler = (e) => {
    e.persist();
    setform((prevstate) => ({ ...prevstate, [e.target.name]: e.target.value }));
  };

  const sendDetails = (e) => {
    e.preventDefault();
    details(form);
  };

  const sendDelete = (e) => {
    deleteDetails(form);
  };

  const onChangeMedia = async (e) => {
    if (form.avatar) {
      const urlRef = storage.refFromURL(form.avatar);
      await urlRef.delete();
    }
    const file = e.target.files[0];
    const fileRef = storage.ref(file.name);
    fileRef.put(file).on(
      "state_changed",
      (snapshot) => {
        const persantage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setform({ progress: persantage });
      },
      (error) => console.log(error),
      async () => {
        const uploadedImageUrl = await fileRef.getDownloadURL()
        setform((prevstate) => ({ ...prevstate, avatar: uploadedImageUrl }));
        console.log(uploadedImageUrl, form)
      }
    );
  };

  return (
    <form onSubmit={sendDetails} className="mt-2 container">
      <h3>Firebase Cloud Storage</h3>
      <img
        style={{ height: "500px" }}
        src={form.avatar}
        className="img-thumbnail"
        alt={form._id}
      ></img>
      <div className="form-group">
        <label>Username</label>
        <input
          name="username"
          onChange={onChangehandler}
          type="text"
          value={form.username}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Desc</label>
        <input
          name="desc"
          onChange={onChangehandler}
          type="text"
          value={form.desc}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Avatar</label>
        <input
          name="avatar"
          onChange={onChangeMedia}
          type="file"
          className="form-control"
        />
        <div className="progress mt-2" style={{ height: "10px" }}>
          <div
            className="progress-bar progress-bar-striped bg-success"
            role="progressbar"
            style={{ width: `${form.progress}% ` }}
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>
      <button type="submit" className="btn btn-primary mr-2">
        Update
      </button>
      <button onClick={sendDelete} type="submit" className="btn btn-danger">
        Delete
      </button>
    </form>
  );
}

export default UserContent;
