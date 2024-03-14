import { useState } from "react";

const FullInput = ({ localType, placeholder, propsName, value, onChangeProps }) => {
 
  switch (localType) {
    case "date":
      return (
        <>
          <input
            type="date"
            name={propsName}
            value={value}
            placeholder={placeholder}
          />
        </>
      );
    case "password":
      return (
        <input
          name={propsName}
          type="password"
          placeholder={placeholder}
          value={value}
        />
      );
    case "textarea":
      return (
        <textarea
          name={propsName}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChangeProps(e)}
        />
      );
  }
};

export default FullInput;
