import { Field } from 'formik'
import React from 'react'
import { Input, Label } from 'reactstrap'

const Checkbox = (prop) => {
  const {name, label, ...rest} = prop

  return (
    <>
      <div  className='mt-1'>
        <Field name={name} {...rest}>
          {({field}) => {
              return (
                <>
                  <Input
                    className=''
                    type='checkbox'
                    id={name}
                    {...field}
                  />
                  <Label for={label} className='ms-1 fs-5'>{label}</Label>
                </>
              )
            }
          }
        </Field>
      </div>
    </>
  )
}

export default Checkbox