import React from "react";
import Main from "./main";
import "./styles.scss";

const Admin = props => {
  return (
    <main className="admin-container">
      <Main {...props} />
    </main>
  );
};
export default Admin;
