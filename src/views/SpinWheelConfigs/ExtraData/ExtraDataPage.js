import React from 'react'
import { useState } from 'react'
import * as yup from 'yup'
import { FilterMatchMode } from 'primereact/api'
import { Form, Formik } from 'formik'
import UiBlocker from '../../../Components/shared/UiBlocker'
import { Button, Col, Row } from 'reactstrap'
import InputField from '../../../Components/form/InputField'
import { Trans, useLingui } from '@lingui/react'
import { Plus } from 'react-feather'
import CustomDataTable from '../../../Components/Datatable/customDataTable'
import CustomModal from '../../../Components/shared/CustomModal'
import {Columns} from './Columns'

const data = []

const ExtraDataPage = () => {
  const { i18n } = useLingui()
  const [extraData, setExtraData] = useState()
  const [modalDelete, setModalDelete] = useState(false)

  // Toggle Modals functions
  const deleteToggle = () => setModalDelete(!modalDelete)

  // handlers 
  const deleteHandler = () => {
    deleteToggle()
  }

  // Filter Table
  const filterFieldsSet = {
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    value: { value: null, matchMode: FilterMatchMode.CONTAINS }
  }

  const initialValues = () => {
    return {
      id: "",
      name: "",
      value: "",
      rewardId: ''
    }
  }

  const validationSchema = yup.object().shape({
    // name: yup.string().required(),
    name: yup.string().required(),
    value: yup.string().required()
  })

  // ** Function to handle form submit
  const onSubmit = (_, { resetForm }) => {
    resetForm()
  }

  return (
    <>
      <Formik
        onSubmit={onSubmit}
        enableReinitialize={true}
        initialValues={initialValues()}
        validationSchema={validationSchema}
      >
        {({ }) => {
          return (
            <Form>
              <UiBlocker>
                <div>
                  <Row>
                    <Col md="5">
                      <InputField
                        name="name"
                        placeHolder={i18n._("name")}
                        //    callBack={clearInput}
                      />
                    </Col>
                    <Col md="5">
                      <InputField
                        name="value"
                        placeHolder={i18n._("value")}
                        //    callBack={clearInput}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Button
                        type="submit"
                        color="primary"
                        className="btn-icon w-10 m-1"
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
          )
        }}
      </Formik>

      <CustomDataTable 
        dataKey="id"
        headerSearch={true}
        filterDisplay={false} 
        filterFieldsSet={filterFieldsSet}
        globalFilterFields={['name', 'value']}
        columns={Columns(deleteHandler)}
        data={data}
        selectionMode='single'
        selection={extraData} 
        onSelectionChange={(e) => setExtraData(e.value)}
        rows={5} 
        rowsPerPageOptions={[5, 10, 25, 50]}
        emptyMessage={<Trans id="No Extra Data found" />}
        tableStyle={{ minWidth: '50rem' }}
      /> 
      
      <CustomModal
        title={<Trans id='delete_extra_data' />}
        toggle={deleteToggle}
        modal={modalDelete}
        body={
          <h3>
            <Trans id="are_you_sure_you_want_to_delete" />
          </h3>
        }
        cancelTitle={<Trans id='No' />}
        confirmTitle={<Trans id='Yes' />}
      />
    </>
  )
}

export default ExtraDataPage