import { useState, useEffect, ChangeEventHandler } from 'react';

export type Input = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  isValid: boolean;
  setValue: Function;
};

type Validator = (arg: string) => boolean;

const useInput = (initialValue: string, validator?: Validator): Input => {
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
