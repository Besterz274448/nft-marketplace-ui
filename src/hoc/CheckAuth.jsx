import React from "react";

function CheckAuth({ children }) {
  const [success, setStatus] = React.useState(false);
  React.useEffect(async () => {
    const storage = await window.localStorage.getItem("login-with-metamask:auth");
    let token = storage && JSON.parse(storage);
    if (!auth && !token) {
      navigate("/");
    }
  }, []);

  return <>{success ? chlidren : <div>Loading . . . </div>}</>;
}

export default CheckAuth;
