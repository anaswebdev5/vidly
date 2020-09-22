import React from "react";
import { Redirect, Route } from "react-router-dom";
import auth from "../../services/authService";

const ProtectedRoute = ({ path, componenet: Componenet, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.getCurrentUser()) return <Redirect to="/login" />;
        return Componenet ? <Componenet {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
