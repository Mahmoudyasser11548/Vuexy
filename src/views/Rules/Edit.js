import React from 'react'
import { Card, CardBody, Row } from 'reactstrap'
import RadioButton from '../../Components/RadioButton'
import { useDispatch } from 'react-redux'
import { Form, Formik } from 'formik'
import { editRule } from '../../redux/rules'
import * as Yup from 'yup'
import Inputs from './Inputs'

const Edit = ({rule = {}}) => {
  const dispatch = useDispatch()

  const initialValues = (rule) => {
    return {
      rule: rule?.rule || '',
      property: rule?.property || '',
      operator: rule?.operator || '',
      value: rule?.value || '',
      activate: rule?.activate || '' 
    }
  }

  const validationSchema = Yup.object().shape({
    rule: Yup.string().required(),
    property: Yup.string().required(),
    operator: Yup.string().required(),
    value: Yup.string().required(),
    activate: Yup.string().required()
  })

  const onSubmit = (values) => {
    dispatch(editRule({id: rule.id, ...values}))
  }

  return (
    <>
    <Card>
      <CardBody>
        <Formik 
          onSubmit={onSubmit}
          initialValues={initialValues(rule)}
          validationSchema={validationSchema}
        >
          {({values, handleSubmit, isSubmitting}) => {
            return (
              <Form onSubmit={handleSubmit}>
                <Row className='flex-column'>
                  <Inputs isSubmitting={isSubmitting} values={values} />
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

export default Edit