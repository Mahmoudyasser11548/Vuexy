import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import * as yup from "yup"
import UiBlocker from '../../Components/shared/UiBlocker'
import { Button, Col, Row } from 'reactstrap'
import InputField from '../../Components/form/InputField'
import CheckboxField from '../../Components/form/CheckBoxField'
import ImageField from '../../Components/form/ImageField'
import ExportDataToExcel from '../../Components/form/ExportDataToExcel'
import { Plus } from 'react-feather'
import { Columns } from './RewardsColumns'
import CustomDataTable from '../../Components/Datatable/customDataTable'
import { FilterMatchMode } from 'primereact/api'

const data = [
  {
    id: 1,
    name: 'Reward1',
    quantity: 22,
    remainning: 22,
    consumed: 22,
    win: true
    // image: '../../assets/images/logo/iMakaseb.png'
  },
  {
    id: 2,
    name: 'Reward2',
    quantity: 50,
    remainning: 50,
    consumed: 22,
    win: true
    // image: '../../assets/images/logo/iMakaseb.png'
  },
  {
    id: 3,
    name: 'Reward3',
    quantity: 80,
    remainning: 80,
    consumed: 22,
    win: false
    // image: '../../assets/images/logo/iMakaseb.png'
  }
]

const Rewards = () => {
  const [selectedReward, setSelectedReward] = useState()

  const filterFieldsSet = {
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    quantity: { value: null, matchMode: FilterMatchMode.CONTAINS },
    remainning: { value: null, matchMode: FilterMatchMode.CONTAINS },
    consumed: { value: null, matchMode: FilterMatchMode.CONTAINS },
    win: { value: null, matchMode: FilterMatchMode.EQUALS }
  }

  const initialValues = () => {
    return {
      id: "",
      name: "",
      quantity: "",
      consumed: "",
      image: useFile(),
      lose: false,
      isTryAgain: false
    }
  }

  const validationSchema = yup.object().shape({
    name: yup.string().required(),
    quantity: yup.string().required()
  })

  const onSubmit = (values, { resetForm }) => { 
    resetForm()
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
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
                      <Col md='9'>

                        <Row>
                          <Col md="5">
                            <InputField
                              name="name"
                              placeholder="name"
                            />
                          </Col>

                          <Col md="5">
                            <InputField
                              name="quantity"
                              placeholder="quantity"
                            />
                          </Col>

                          <Col md="5">
                            <CheckboxField
                              label="Lose"
                              name="lose"
                            />
                          </Col>

                          <Col md="5">
                            <CheckboxField
                              label="try_again"
                              name="isTryAgain"
                            />
                          </Col>
                        </Row>

                      </Col>

                      <Col md="3">
                        <div className="d-flex justify-content-end">
                          <ImageField
                            name="image"
                            mode="add"
                            width={100}
                            height={100}
                          />
                        </div>
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
                          <span>confirm</span>
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

      <div className="d-flex justify-content-end">
        <div>
          <ExportDataToExcel
            defaultFileName={"Rewards Report"}
          />
        </div>
        <Button
          className="m-1"
          color="primary"
        >
          reset_quantities
        </Button>
      </div>

      <CustomDataTable 
        dataKey="id"
        headerSearch={true}
        filterDisplay={true} 
        filterFieldsSet={filterFieldsSet}
        globalFilterFields={['name', 'quantity', 'remainning', 'consumed']}
        columns={Columns()}
        data={data}
        selectionMode='single'
        selection={selectedReward} 
        onSelectionChange={(e) => setSelectedReward(e.value)}
        rows={5} 
        rowsPerPageOptions={[5, 10, 25, 50]}
        emptyMessage="No Rewards found"
        tableStyle={{ minWidth: '50rem' }}
      /> 
    </>
  )
}

export default Rewards