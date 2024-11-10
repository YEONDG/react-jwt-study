import { useState } from 'react';

export const useForm = <T extends string | number>(
  initialValue: T = '' as T
) => {
  const [value, setValue] = useState<T>(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const newValue =
      typeof initialValue === 'number' ? Number(inputValue) : inputValue;
    setValue(newValue as T);
  };

  return [value, onChange] as const;
};
