import React from 'react'
import { Card, CardBody, Row } from 'reactstrap'
import RadioButton from '../../Components/RadioButton'
import { useDispatch } from 'react-redux'
import { Form, Formik } from 'formik'
import { addRule } from '../../redux/rules'
import * as Yup from 'yup'
import Inputs from './Inputs'

const RadioOptions = [
  {key: 'Refund', value: 'Refund'},
  {key: 'RefundRequest', value: 'RefundRequest'}
]

const AddRule = () => {
  const dispatch = useDispatch()

  const initialValues = {
    id: '',
    rule: '',
    property: '',
    operator: '',
    value: '',
    activate: false || true
  }

  const validationSchema = Yup.object().shape({
    rule: Yup.string().required(),
    property: Yup.string().required(),
    operator: Yup.string().required(),
    value: Yup.string().required(),
    activate: Yup.string().required()
  })

  const onSubmit = (values, {resetForm}) => {
    dispatch(addRule(values))
    setTimeout(() => {
      resetForm()
    }, 0)
  }

  return (
    <>
    <Card>
      <CardBody>
        <Formik 
          onSubmit={onSubmit}
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({values}) => {
            return (
              <Form>
                <Row className='flex-column'>
                  <RadioButton 
                    name="rule"
                    label="Select Rule"
                    options={RadioOptions}
                  />
                  {values.rule !== '' ? <Inputs values={values} /> : ''}
                </Row>
              </Form>
            )
          }}
        </Formik>
      </CardBody>
    </Card>
    </>
  )
}

export default AddRule