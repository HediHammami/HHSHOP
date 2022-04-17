import React, { useState } from "react";

const brands = [
  {
    _id: 1,
    name: "Samsung",
  },
  {
    _id: 2,
    name: "Apple",
  },
];

function CheckBox(props) {
  const [Checked, setChecked] = useState([]);

  const handleToggle = (value) => {
    const currentIndex = Checked.indexOf(value);
    const newChecked = [...Checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    props.handleFilters(newChecked);
  };

  const renderCheckBoxLists = () =>
    brands.map((value, index) => (
      <React.Fragment key={index}>
        <input
          onChange={() => handleToggle(value._id)}
          type="checkbox"
          checked={Checked.indexOf(value._id) === -1 ? false : true}
        />
        <span>{value.name}</span>
      </React.Fragment>
    ));
  return <div>{renderCheckBoxLists()}</div>;
}

export default CheckBox;
