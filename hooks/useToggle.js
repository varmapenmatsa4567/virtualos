import { useState } from 'react';

export default function useToggle(defaultValue = false) {
  const [value, setValue] = useState(defaultValue);

  const toggle = (value) => {
    setValue((prev) => (typeof value === 'boolean' ? value : !prev));
  };

  return [value, toggle];

}