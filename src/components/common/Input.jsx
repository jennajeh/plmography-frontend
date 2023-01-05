/* eslint-disable react/prop-types */
import styled from 'styled-components';

const StyledInput = styled.input`
  width: 100%;
  padding: 1.5em;
  border: ${(props) => (`1px solid${props.error ? '#FF424D' : '#D8D8D8'}`)};
  color: ${((props) => props.theme.text.gray)};
  & + & {
    margin-top: 16px;
  }
  
  :focus {
    outline: none;
    border: ${(props) => (`1px solid${props.error ? '#FF424D' : '#22DAAB'}`)};
    color: #666666;
  }
`;

const Radio = styled.input`
  display: flex;
  gap: 1em;
`;

const Label = styled.label`
  font-weight: 700;
  display: block;
  color: inherit;
`;

const Required = styled.span`
  color: #FF424D;
`;

const Message = styled.p`
  color: inherit;
`;

const Error = styled.p`
  color: #FF424D;
`;

export default function Input({
  name, label, type, value, maxLength = '', onChange, message, errorMessage, required = false,
}) {
  return (
    <>
      <Label htmlFor={`input-${name}`}>
        {label}
        {required
          ? (
            <Required>
              *
            </Required>
          )
          : null}
      </Label>
      <StyledInput
        type={type}
        name={name}
        id={`input-${name}`}
        value={value}
        error={errorMessage}
        maxLength={maxLength}
        onChange={onChange}
      />
      {errorMessage
        ? <Error>{errorMessage}</Error>
        : <Message>{message}</Message>}
    </>
  );
}

export function RadioInput({
  name, label, type, value, onChange,
}) {
  return (
    <>
      <Label htmlFor={`input-${name}`}>{label}</Label>
      <Radio
        type={type}
        name={name}
        id={`input-${name}`}
        value={value}
        onChange={onChange}
      />
    </>
  );
}
