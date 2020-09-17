import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      name="query"
      className="form-control my-3"
      type="text"
      placeholder="Search..."
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    ></input>
  );
};

export default SearchBox;
