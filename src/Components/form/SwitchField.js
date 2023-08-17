import React from 'react'
import { CardText, FormGroup, Input } from 'reactstrap'
import { Check, X } from 'react-feather'
import { useField } from 'formik'

function SwitchField({ 
  id,
  label,
  color = 'primary',
  ...props
  }) {

  const [field] = useField(props)

  return (
    <div className="d-flex my-2">
      <FormGroup switch>
        <Input
          type="switch" 
          role="switch"
          id={id || field.name}
          className={`custom-control-${color}`}
          checked={field.value || false}
          {...field}
        />
        {label && <CardText className="mr-1">{label}</CardText>}
      </FormGroup>
    </div>
  )
}

export default SwitchField