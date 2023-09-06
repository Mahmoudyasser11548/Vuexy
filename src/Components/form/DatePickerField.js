import { Fragment } from "react"
import { useField } from "formik"
import classnames from "classnames"
import { Label, FormFeedback } from "reactstrap"
import Flatpickr from "react-flatpickr"

import "@styles/react/libs/flatpickr/flatpickr.scss"

const DatePickerField = ({
  label,
  callBack = () => {},
  enableTime = false,
  ...props
}) => {
  const [field, meta, helpers] = useField(props)
  const { touched, error } = meta

  return (
    <Fragment>
      <Label for="default-picker">{label}</Label>
      <Flatpickr
        id="default-picker"
        className={classnames("form-control mb-1", {
          "is-invalid": error && touched
        })}
        options={{
          enableTime: enableTime
        }}
        {...field}
        onChange={(date) => {
          helpers.setValue(date[0])
          callBack({ name: field.name, value: date[0] })
        }}
      />
      {error && touched && <FormFeedback>{error}</FormFeedback>}
    </Fragment>
  )
}

export default DatePickerField
