import React, { Component } from "react";
import axios from "axios";
import { firestore, storage, database } from "../../Utils/Fairbase";
import UserContent from "./UserContent";

const Axios = axios.create({
  baseURL: "https://reactfirebase-b0789-default-rtdb.firebaseio.com/",
});

export default class CloudStorage extends Component {
  state = {
    firebaseprac: [],
    username: "",
    desc: "",
    avatar: "",
    progress: 0,
  };

  componentDidMount() {
    this.fetchfirebaseprac();
  }

  fetchfirebaseprac = async () => {
    const data = await firestore.collection("firebaseprac").get();
    this.setState({
      firebaseprac: data.docs.map((d) => ({ ...d.data(), _id: d.id })),
    });
  };

  onChangehandler = (e) => {
    e.persist();
    this.setState((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  };

  onChangeMedia = (e) => {
    e.persist();
    const file = e.target.files[0];
    const fileRef = storage.ref(file.name);
    fileRef.put(file).on(
      "state_changed",
      (snapshot) => {
        const persantage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.setState({ progress: persantage });
      },
      (error) => console.log(error),
      async () => {
        this.setState({ avatar: await fileRef.getDownloadURL() });
      }
    );
  };

  //READ FIRESTORE
  // fetchfirebaseprac = async () => {
  //   const data = await firestore.collection("firebaseprac").get();
  //   this.setState({
  //     firebaseprac: data.docs.map((doc) => ({ ...doc.data(), _id: doc.id })),
  //   });
  // };

  //READ REALTIMEDATABASE
  fetchfirebaseprac = async () => {
    // database.ref("users").on("value", (snapshot) => {
    //   const data = snapshot.val();
    //   // console.log(data);
    //   let docs = [];
    //   for (const key in data) {
    //     docs.push({ ...data[key], _id: key });
    //   }

    //   this.setState({ firebaseprac: docs });
    // });
    Axios.get("/users.json")
      .then(({ data }) => {
        let docs = [];
        for (const key in data) {
          docs.push({ ...data[key], _id: key });
        }
        localStorage.setItem('user', JSON.stringify(docs));
        this.setState({ firebaseprac: docs });
      })
      .catch((err) => {
        this.setState({firebaseprac: JSON.parse(localStorage.user)});
        console.log(err);
      });
  };

  //CREATE FIRESTORE
  // onSubmitHandler = async (e) => {
  //   e.preventDefault();
  //   await firestore.collection("firebaseprac").add({
  //     username: this.state.username,
  //     desc: this.state.desc,
  //     avatar: this.state.avatar,
  //   });
  //   this.fetchfirebaseprac();
  //   this.setState({ username: "", desc: "", avatar: "", progress: 0 });
  //   console.log(this.state);
  // };

  //CREATE REALTIMEDATABASE
  onSubmitHandler = async (e) => {
    e.preventDefault();
    // await database.ref("users").push().set({
    //   username: this.state.username,
    //   desc: this.state.desc,
    //   avatar: this.state.avatar,
    // });
    // this.fetchfirebaseprac();
    // this.setState({ username: "", desc: "", avatar: "", progress: 0 });
    await Axios.post("/users.json", {
      username: this.state.username,
      desc: this.state.desc,
      avatar: this.state.avatar,
    })
      .then((response) => {
        this.fetchfirebaseprac();
        this.setState({ username: "", desc: "", avatar: "", progress: 0 });
      })
      .catch((error) => console.log(error));
  };

  //UPDATE FIRESTORE
  // updateDetails = async (details) => {
  //   const { username, desc, avatar } = details;
  //   await firestore
  //     .collection("firebaseprac")
  //     .doc(details._id)
  //     .set({ username, desc, avatar });
  //   this.fetchfirebaseprac();
  // };

  //UPDATE REAL TIME DATABASE
  updateDetails = async (details) => {
    const { username, desc, avatar } = details;
    // await database.ref("users/" + details._id).set({ username, desc, avatar });
    // this.fetchfirebaseprac();

    await Axios.put("/users/" + details._id + ".json", {
      username,
      desc,
      avatar,
    })
      .then((response) => this.fetchfirebaseprac())
      .catch((error) => console.log(error));
  };

  //DELETE FIRESTORE
  // deleteDetails = async (details) => {
  //   if (details.avatar) {
  //     const urlRef = storage.refFromURL(details.avatar);
  //     await urlRef.delete();
  //   }

  //   firestore
  //     .collection("firebaseprac")
  //     .doc(details._id)
  //     .delete()
  //     .then(() => {
  //       console.log("deleted");
  //     }, this.fetchfirebaseprac())
  //     .catch((err) => err);
  // };

  //DELETE REALTIMEDATABASE
  deleteDetails = async (details) => {
    if (details.avatar) {
      const urlRef = storage.refFromURL(details.avatar);
      await urlRef.delete();
    }

    // database.ref("users/" + details._id).remove();
    // this.fetchfirebaseprac();

    await Axios.delete("/users/" + details._id + ".json")
      .then((response) => this.fetchfirebaseprac())
      .catch((error) => console.log(error));
  };

  render() {
    let tableIndex;
    let tableContent;
    if (this.state.firebaseprac.length > 0) {
      tableIndex = this.state.firebaseprac.map((user) => (
        <a
          key={user._id}
          className="list-group-item list-group-item-action"
          id={`list-${user._id}-list`}
          href={`#list-${user._id}`}
          data-toggle="list"
          role="tab"
          aria-controls={user._id}
        >
          {user.username}
        </a>
      ));

      tableContent = this.state.firebaseprac.map((user) => (
        <div
          key={user._id}
          className="tab-pane fade show"
          id={`list-${user._id}`}
          role="tabpanel"
          aria-labelledby={`list-${user._id}-list`}
        >
          <UserContent
            details={(details) => this.updateDetails(details)}
            deleteDetails={(details) => this.deleteDetails(details)}
            user={user}
          />
        </div>
      ));
    }

    return (
      <div className="container">
        <div className="row mt-3">
          <div className="col-2">
            <div className="list-group" id="list-tab" role="tablist">
              <a
                className="list-group-item list-group-item-action"
                id="list-home-list"
                href="#list-home"
                data-toggle="list"
                role="tab"
                aria-controls="home"
              >
                Create new
              </a>
              {tableIndex}
            </div>
          </div>
          <div className="col-6">
            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade show "
                id="list-home"
                role="tabpanel"
                aria-labelledby="list-home-list"
              >
                <form onSubmit={this.onSubmitHandler}>
                  <h3>Firebase Cloud Storage</h3>
                  <div className="form-group">
                    <label>Username</label>
                    <input
                      name="username"
                      onChange={this.onChangehandler}
                      type="text"
                      value={this.state.username}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Desc</label>
                    <input
                      name="desc"
                      onChange={this.onChangehandler}
                      type="text"
                      value={this.state.desc}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Avatar</label>
                    <input
                      name="avatar"
                      onChange={this.onChangeMedia}
                      type="file"
                      className="form-control"
                    />
                    <div className="progress mt-2" style={{ height: "10px" }}>
                      <div
                        className="progress-bar progress-bar-striped bg-success"
                        role="progressbar"
                        style={{ width: `${this.state.progress}% ` }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-success">
                    Create
                  </button>
                </form>
              </div>
              {tableContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
