import { FormFeedback, FormGroup, Label } from "reactstrap"

import React from "react"
import Select from "react-select"
import classnames from "classnames"
import { useField } from "formik"
import { useTranslation } from "react-i18next"

// import { useLanguage } from "@src/utility/hooks/useLanguage";

function SelectField({
  permission,
  label,
  label_key,
  withFeedbackLabel = true,
  customFeedbackLabel,
  showCustomFeedbackLable = false,
  options,
  keyValue = "id",
  title = "name",
  getOptionLabel,
  callBack = () => {},
  ...props
}) {
  const { i18n } = useTranslation()
  const [field, meta, helpers] = useField(props)
  const { touched, error } = meta
  const { onChange, value, ...fieldProps } = field
  const selectedObj =
    options &&
    options?.find((a) =>
      keyValue ? a[keyValue] === field.value : a === field.value
    )

  const handleGetLabel = (o) => {
    if (getOptionLabel) {
      return getOptionLabel(o)
    }
    if (typeof o[title] === "object") {
      return o[title][i18n.language]
    }
    return o[title]
  }

  return (
    <>
      <FormGroup>
        {label && (
          <Label className="form-label" for={field.name}>
            <h6>{label}</h6>
          </Label>
        )}
        <Select
          isClearable
          value={selectedObj || ""}
          className={classnames("react-select", {
            "is-invalid": error && touched,
          })}
          menuPlacement="auto"
          options={options}
          isOptionDisabled={(option) => option.disabled}
          getOptionLabel={handleGetLabel}
          getOptionValue={(option) =>
            option[keyValue] !== undefined ? option[keyValue] : option
          }
          onChange={(option) => {
            helpers.setTouched(true)
            if (option) {
              helpers.setValue(
                option[keyValue] !== undefined ? option[keyValue] : option
              )
              callBack({ name: field.name, value: option })
              return
            }
            callBack({ name: field.name, value: "" })

            helpers.setValue("")
          }}
          {...props}
          classNamePrefix="select"
          {...fieldProps}
        />
        {error && touched && <FormFeedback>{error}</FormFeedback>}
      </FormGroup>
    </>
  )
}

export default SelectField
