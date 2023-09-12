import { FormGroup, Label } from "reactstrap"
import React, { Fragment } from "react"

import { Dropdown } from "primereact/dropdown"
import { useField } from "formik"

const SelectField = ({ label, options, ...props }) => {
    const [field, meta, helpers] = useField(props.name)

    const handleChange = (event) => {
        const selectedOption = event.value
        helpers.setValue(selectedOption)
    }

    const handleBlur = () => {
        helpers.setTouched(true)
    }

    return (
        <Fragment>
            <FormGroup className="d-flex flex-column">
                {label && (
                    <Label className="form-label" for={field.name}>
                        {label}
                    </Label>
                )}
                <Dropdown
                    id={props.name}
                    {...field}
                    {...props}
                    options={options}
                    value={field.value || null}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={meta.touched && meta.error ? "p-invalid" : ""}
                />
                {meta.touched && meta.error && (
                    <small className="p-invalid text-danger">
                        {meta.error}
                    </small>
                )}
            </FormGroup>
        </Fragment>
    )
}

export default SelectField
