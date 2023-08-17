import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import * as yup from "yup"
import UiBlocker from '../../Components/shared/UiBlocker'
import { Button, Col, Row } from 'reactstrap'
import InputField from '../../Components/form/InputField'
import SwitchField from '../../Components/form/SwitchField'
import CustomDataTable from '../../Components/Datatable/customDataTable'
import { Plus } from 'react-feather'
import { Columns } from './FieldsColumns'

const data = [
  {
    id: 1,
    name: 'Field1',
    isRequired: true
  },
  {
    id: 2,
    name: 'Field2',
    isRequired: false
  },
  {
    id: 3,
    name: 'Field3',
    isRequired: true
  }
]

const Fields = () => {
  const [selectedField, setSelectedField] = useState()

  const initialValues = () => {
    return {
      id: "",
      name: "",
      isRequired: false
    }
  }

  const onSubmit = (values, {resetForm}) => {
    resetForm()
  }

  const validationSchema = yup.object().shape({
    name: yup.string().required()
  })

  return (
    <>
      <Formik
        onSubmit={onSubmit}
        enableReinitialize={true}
        initialValues={initialValues()}
        validationSchema={validationSchema}
      >
        {({  }) => {
          return (
            <Form>
              <UiBlocker>
                <div>
                  <Row>

                    <Col md='8'>

                      <Row>
                        <Col md='8'>
                          <InputField name="name" label="name" />
                        </Col>
                        <Col md='8'>
                          <SwitchField name="isRequired" label="isRequired" />
                        </Col>
                      </Row>

                    </Col>

                    <Col md="4">
                      <Button
                        type="submit"
                        color="primary"
                        className="btn-icon w-10 mt-1"
                        outline
                      >
                        <Plus size={14} />
                        <span>{"confirm"}</span>
                      </Button>
                    </Col>
                  </Row>
                </div>
              </UiBlocker>
            </Form>
          )
        }}
      </Formik>

      <CustomDataTable 
        dataKey="id"
        headerSearch={true}
        filterDisplay={false} 
        globalFilterFields={['name']}
        columns={Columns()}
        data={data}
        selectionMode='single'
        selection={selectedField} 
        onSelectionChange={(e) => setSelectedField(e.value)}
        rows={5} 
        rowsPerPageOptions={[5, 10, 25, 50]}
        emptyMessage="No Fields found"
        tableStyle={{ minWidth: '50rem' }}
      /> 
    </>
  )
}

export default Fields