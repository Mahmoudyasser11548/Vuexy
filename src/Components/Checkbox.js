import { Field } from 'formik'
import React from 'react'
import { Input, Label } from 'reactstrap'

const Checkbox = (prop) => {
  const {name, label, options, ...rest} = prop
  
  return (
    <>
      <div  className='mt-1'>
        <Label className='fs-3'>{label}</Label>
        <Field name={name} {...rest}>
          {({field}) => {
              return options.map(option => {
                return (
                  <React.Fragment key={option.key}>
                    <Input 
                      className=''
                      type='checkbox'
                      id={option.value}
                      {...field}
                      value={option.value}
                    />
                    <Label for={option.value} className='ms-1 fs-5'>{option.key}</Label>
                  </React.Fragment>
                )
              })
            }
          }
        </Field>
      </div>
    </>
  )
}

export default Checkbox