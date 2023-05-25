import React from "react";
import { useDispatch, useSelector } from "react-redux";


const Home = () => {
  const { user } = useSelector((state) => ({ ...state.user }));
  const dispatch = useDispatch();
  const handleAuth = () => {

  };
  return (
    <div>
      <h2>Welcome to Our Site</h2>
      <br />
      <button className="btn btn-danger" onClick={handleAuth}>
        Logout
      </button>
    </div>
  );
};

export default Home;
