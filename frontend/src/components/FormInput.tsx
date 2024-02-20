import { FormControl, FormLabel } from 'react-bootstrap';

interface FormInputProps {
  label: string
  type: string
  value: string
  setValue: (value: string) => void
}

const FormInput = ({ label, type, value, setValue }: FormInputProps) => {
  return (
    <FormLabel>
      {label}:
      <FormControl
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </FormLabel>
  );
};

export default FormInput;
