import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import * as yup from "yup"
import UiBlocker from '../../Components/shared/UiBlocker'
import CustomModal from '../../Components/shared/CustomModal'
import InputField from  '../../Components/form/InputField'
import SelectField from  '../../Components/form/SelectField'
import { Button, Col, Row } from 'reactstrap'
import { Plus } from 'react-feather'
import { Columns } from './SegmantsColumns'
import { FilterMatchMode } from 'primereact/api'
import CustomDataTable from '../../Components/Datatable/customDataTable'
import { Trans } from '@lingui/react'

const data = [
  {
    id: 1,
    name: 'Segmant1',
    color: '#ff0000'
  },
  {
    id: 2,
    name: 'Segmant2',
    color: '#00ff00'
  },
  {
    id: 3,
    name: 'Segmant3',
    color: '#0000ff'
  }
]

const Segmants = () => {
  const [selectedSegmant, setSelectedSegmant] = useState()
  // const [segmant, setSegment] = useState()
  const [modalDelete, setModalDelete] = useState(false)

  // Toggle Modals functions
  const deleteToggle = () => setModalDelete(!modalDelete)

  // Filter Table
  const filterFieldsSet = {
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    color: { value: null, matchMode: FilterMatchMode.CONTAINS }
  }
  
  // handlers 
  const deleteHandler = () => {
    deleteToggle()
  }

  const editHandler = () => {}

  // Formik Values
  const initialValues = () => {
    return {
      id: "",
      label: "",
      color: "",
      textColor: "",
      rewardId: ""
    }
  }

  const validationSchema = yup.object().shape({
    label: yup.string().required(),
    color: yup.string().required()
  })

  const onSubmit = (values, {resetForm}) => {
      resetForm()
  }
  return (
    <>
      <Formik
        initialValues={initialValues()}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {({}) => {
          return (
            <>
              <Form>
                <UiBlocker>
                  <div>
                    <Row>

                      <Col>
                        <InputField name="label" label={<Trans id="title" />} />
                      </Col>

                      <Col>
                        <SelectField
                          name="rewardId"
                          label={<Trans id="reward" />}
                          options={[
                            {label: 'Prize1', value: 'prize1'},
                            {label: 'Prize2', value: 'prize2'},
                            {label: 'Prize3', value: 'prize3'}
                          ]}
                        />
                      </Col>

                      <Col>
                        <InputField
                          name="color"
                          type="color"
                          label={<Trans id="color" />}
                        />
                      </Col>

                      <Col>
                        <InputField
                          name="textColor"
                          type="color"
                          label={<Trans id="textColor" />}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button
                          type="submit"
                          color="primary"
                          className="btn-icon w-10"
                          outline
                        >
                          <Plus size={14} />
                          <span>{<Trans id="confirm" />}</span>
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </UiBlocker>
              </Form>
            </>
          )
        }}
      </Formik>
      <CustomDataTable 
        dataKey="id"
        headerSearch={true}
        filterDisplay={false} 
        filterFieldsSet={filterFieldsSet}
        globalFilterFields={['name', 'color']}
        columns={Columns(deleteHandler, editHandler)}
        data={data}
        selectionMode='single'
        selection={selectedSegmant} 
        onSelectionChange={(e) => setSelectedSegmant(e.value)}
        rows={5} 
        rowsPerPageOptions={[5, 10, 25, 50]}
        emptyMessage={<Trans id="No Segmants found" />}
        tableStyle={{ minWidth: '50rem' }}
      /> 
      <CustomModal
        title={<Trans id="delete segment" />}
        toggle={deleteToggle}
        modal={modalDelete}
        confirmTitle={<Trans id='Yes' />}
        cancelTitle={<Trans id='No' />}
        body={<h3>{<Trans id='are_you_sure_you_want_to_delete seg?' />}</h3>}
      />
    </>
  )
}

export default Segmants