import React from 'react'
import { Col, Input, Label } from 'reactstrap'

const RadioButton = (prop) => {
  const { label, options, ...rest} = prop
  
  return (
    <>
      <div>
        <Label className='fs-5'>{label}</Label>
          {options.map(option => {
            return (
              <React.Fragment key={option.key}>
                <Col className='m-1'>
                  <Input 
                    className=''
                    type='radio'
                    id={option.value}
                    {...rest}
                    value={option.value}                    
                  />
                  <Label for={option.value} className='ms-1 fs-5'>{option.key}</Label>
                </Col>
              </React.Fragment>
            )
          })
        }
      </div>
    </>
  )
}

export default RadioButton