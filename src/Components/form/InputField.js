import { useField } from "formik"
import React from "react"
import classnames from "classnames"
import { Label, Input, FormGroup, FormFeedback } from "reactstrap"

function InputField({
  label,
  type = "text",
  size = "default",
  callBack = () => {},
  ...props
}) {
  const [field, meta] = useField(props)
  const { onChange } = field
  const { touched, error } = meta
  return (
    <>
      <FormGroup>
        {label && (
          <Label className="form-label" for={field.name}>
            {label}
          </Label>
        )}
        <Input
          className={classnames({ "is-invalid": error && touched })}
          {...field}
          type={type}
          {...props}
          bsSize={size}
          onChange={(value) => {
            onChange(value)
            callBack(value)
          }}
        />
        {error && touched && <FormFeedback>{error}</FormFeedback>}
      </FormGroup>
    </>
  )
}

export default InputField
