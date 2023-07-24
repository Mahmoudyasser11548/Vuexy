import React from 'react'
import { Card, CardBody, Row } from 'reactstrap'
import RadioButton from '../../Components/RadioButton'
import SelectOption from '../../Components/SelectOption'
import InputField from '../../Components/InputField'
import Checkbox from '../../Components/Checkbox'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Formik } from 'formik'
import { addRule, editRule } from '../../redux/rules'
import * as Yup from 'yup'

const Edit = ({rule = {}}) => {
  const dispatch = useDispatch()
  const {loading, error} = useSelector(state => state.rule)

  const properyNameOptions = [
    {key: 'String', value: 'String'},
    {key: 'Integer', value: 'Integer'}
  ]

  const operatorStringOptions = [
    {key: 'Equals', value: 'Equals'},
    {key: 'Contains', value: 'Contains'},
    {key: 'Not Contains', value: 'Not Contains'},
    {key: 'Ends With', value: 'Ends With'},
    {key: 'Starts With', value: 'Starts With'}
  ]

  const operatorIntegerOptions = [
    {key: 'Equals', value: 'Equals'},
    {key: 'Greater than', value: 'Greater than'},
    {key: 'Less than', value: 'Less than'},
    {key: 'Maximum', value: 'Maximum'},
    {key: 'Minimum', value: 'Minimum'}
  ]

  const RadioOptions = [
    {key: 'Refund', value: 'Refund'},
    {key: 'RefundRequest', value: 'RefundRequest'}
  ]

  const initialValues = (rule) => {
    return {
      rule: rule.rule || '',
      property: rule.property || '',
      operator: rule.operator || '',
      value: rule.value || '',
      avtivateRule: rule.avtivateRule || '' 
    }
  }

  const validationSchema = Yup.object().shape({
    rule: Yup.string().required(),
    property: Yup.string().required(),
    operator: Yup.string().required(),
    value: Yup.string().required(),
    avtivateRule: Yup.string().required()
  })

  const onSubmit = (values) => {
    if (values.id) {
      dispatch(editRule({ ...values, id: rule.id }))
    } else {
      dispatch(addRule({ ...values }))
    }
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
          {({values}) => {
            return (
              <Form>
                <Row className='flex-column'>
                  <RadioButton 
                    name="rule"
                    label="Select Rule"
                    options={RadioOptions}
                  />
                  <SelectOption 
                    name="property"
                    label='Property Name'
                    options={properyNameOptions}
                  />
                  <SelectOption 
                    name="operator"
                    label="Operator"
                    options={
                      values.property === "String" ? operatorStringOptions : operatorIntegerOptions
                    }
                  />

                  <InputField 
                    name="value"
                    type="text"
                    label="Rule Value"
                    placeholder="value"
                  />

                  <Checkbox
                    name="activateRule"
                    options={[{key: 'enable', value:'enable'}]}
                  />
                </Row>
                { loading ? <div className='w-100 my-2'>
                    <button type="submit" className="btn btn-primary text-center">Loading..</button>
                  </div> : <div className='w-100 my-2'>
                    <button type="submit" className="btn btn-primary text-center">Apply</button>
                  </div>
                }

                { error && loading === false && 'error ....' }
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