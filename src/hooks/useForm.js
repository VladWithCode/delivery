import { useState } from 'react';

export const useForm = (initForm = {}) => {
  const [formValues, setFormValues] = useState(initForm);

  const setValue = (name, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleInputChange = e => {
    const { target } = e;

    if (!target) return;

    setValue(target.name, target.value);
  };

  const reset = () => {
    setFormValues(initForm);
  };

  const result = [
    formValues,
    handleInputChange,
    reset,
    setValue,
    setFormValues,
  ];

  result.formValues = formValues;
  result.handleInputChange = handleInputChange;
  result.reset = reset;
  result.setValue = setValue;
  result.setValues = setFormValues;

  return result;
};
