import { useState, useEffect } from 'react';

type Validator = (arg: string) => boolean;

const useInput = (initialValue: string, validator?: Validator) => {
  const [value, setValue] = useState(initialValue || '');
  const [isValid, setValid] = useState(false);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: changedValue } = event.target;

    if (typeof validator === 'function') {
      const valid = validator(changedValue);
      setValid(valid);
    }

    setValue(changedValue);
  };

  return { value, onChange, isValid, setValue };
};

export default useInput;
