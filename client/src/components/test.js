import React from 'react';
import Select from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
];

export default () => (
  <Select
    defaultValue={[options[1], options[2]]}
    isMulti
    name="colors"
    options={options}
    className="basic-multi-select"
    classNamePrefix="select"
  />
);
