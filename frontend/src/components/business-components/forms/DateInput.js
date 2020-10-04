import React from "react";
import styled from "styled-components";
import classNames from "classnames";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import fr from "date-fns/locale/fr";
registerLocale("fr", fr);

const DateInput = (props) => {
  const wrapper1ClassNames = classNames("flex flex-col", {
    errorStatus: props.errors[props.id] && props.touched[props.id],
  });
  return (
    <Wrapper1 className={wrapper1ClassNames}>
      <DatePicker
        dateFormat="dd/MM/yyyy"
        dropdownMode="select"
        id={props.id}
        isClearable={props.isClearable}
        locale="fr"
        maxDate={new Date()}
        minDate={new Date(1900, 1, 1)}
        name={props.id}
        onChange={(date) => props.setFieldValue(props.id, date)}
        selected={props.values[props.id]}
        showMonthDropdown
        showPopperArrow={false}
        showYearDropdown
      />
    </Wrapper1>
  );
};

export default DateInput;

const Wrapper1 = styled.div`
  .react-datepicker-wrapper {
    display: flex;
    flex-direction: column;

    .react-datepicker__input-container {
      display: flex;
      flex-direction: column;

      input {
        padding: 6px;
        border: 1px solid var(--text-color);
        border-radius: 2px;
      }
    }
  }

  &.errorStatus {
    .react-datepicker-wrapper {
      .react-datepicker__input-container {
        input {
          border: 1px solid var(--color-error);
        }

        input:focus {
          outline: 1px dashed var(--color-error);
        }
      }
    }
  }
`;
