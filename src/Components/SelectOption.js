import { ErrorMessage, Field } from 'formik'
import React from 'react'
import { Col, Label } from 'reactstrap'

const SelectOption = (prop) => {
  const {name, options, ...rest} = prop
  return (
    <Col className='mt-1'>  
      <Field 
        as='select' 
        name={name} 
        {...rest} 
        className="w-100 form-control" 
        id='select'

      >
        {
          options.map(option => {
            return (                
              <option 
                className='dropdown-item'
                value={option.value} 
                key={option.value}
              >
                {option.key}
              </option>
            )
          })
        }
        <ErrorMessage name={name} />
      </Field>
    </Col>
  )
}

export default SelectOption