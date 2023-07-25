import { ErrorMessage, Field } from 'formik'
import React from 'react'
import { Col } from 'reactstrap'

const InputField = (prop) => {
  const {name, ...rest} = prop

  return (
    <Col className='mt-1'>
      <Field name={name} id={name} {...rest} className="form-control"/>
      <ErrorMessage name={name} />
    </Col>
  )
}

export default InputField