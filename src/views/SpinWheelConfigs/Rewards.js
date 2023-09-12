import * as yup from "yup"

import { Button, Col, Row } from "reactstrap"
import {
  CheckBoxField,
  ExportDataToExcel,
  ImageField,
  InputField,
} from "../../Components/form"
import { CustomModal, UiBlocker } from "../../Components/shared"
import { Form, Formik } from "formik"
import React, { useState } from "react"
import { Trans, useLingui } from "@lingui/react"

import { Columns } from "./RewardsColumns"
import { CustomDataTable } from "../../Components/Datatable"
import { FilterMatchMode } from "primereact/api"
import { Plus } from "react-feather"
import useFile from "../../utility/hooks/useFile"

const data = [
  {
    id: 1,
    name: "Reward1",
    quantity: 22,
    remainning: 22,
    consumed: 22,
    win: true,
    // image: '../../assets/images/logo/iMakaseb.png'
  },
  {
    id: 2,
    name: "Reward2",
    quantity: 50,
    remainning: 50,
    consumed: 22,
    win: true,
    // image: '../../assets/images/logo/iMakaseb.png'
  },
  {
    id: 3,
    name: "Reward3",
    quantity: 80,
    remainning: 80,
    consumed: 22,
    win: false,
    // image: '../../assets/images/logo/iMakaseb.png'
  },
]

const Rewards = () => {
  const [selectedReward, setSelectedReward] = useState()
  const [modalDelete, setModalDelete] = useState(false)
  const [modalQuantities, setModalQuantities] = useState(false)
  const { i18n } = useLingui()

  // Toggle Modals functions
  const deleteToggle = () => setModalDelete(!modalDelete)
  const quantityToggle = () => setModalQuantities(!modalQuantities)

  // handlers
  const deleteHandler = () => {
    deleteToggle()
  }

  const editHandler = () => {}
  const extraData = () => {}

  // Filter Table
  const filterFieldsSet = {
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    quantity: { value: null, matchMode: FilterMatchMode.CONTAINS },
    remainning: { value: null, matchMode: FilterMatchMode.CONTAINS },
    consumed: { value: null, matchMode: FilterMatchMode.CONTAINS },
    win: { value: null, matchMode: FilterMatchMode.EQUALS },
  }

  // Formik Values
  const initialValues = () => {
    return {
      id: "",
      name: "",
      quantity: "",
      consumed: "",
      image: useFile(),
      lose: false,
      isTryAgain: false,
    }
  }

  const validationSchema = yup.object().shape({
    name: yup.string().required(),
    quantity: yup.string().required(),
  })

  const onSubmit = (values, { resetForm }) => {
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
                      <Col md="9">
                        <Row>
                          <Col md="5">
                            <InputField
                              name={i18n._("name")}
                              placeholder="name"
                            />
                          </Col>

                          <Col md="5">
                            <InputField
                              name={i18n._("quantity")}
                              placeholder="quantity"
                            />
                          </Col>

                          <Col md="5">
                            <CheckBoxField
                              label={<Trans id="Lose" />}
                              name="lose"
                            />
                          </Col>

                          <Col md="5">
                            <CheckBoxField
                              label={<Trans id="try_again" />}
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
                          <span>
                            <Trans id="Confirm" />
                          </span>
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
          <ExportDataToExcel defaultFileName={"Rewards Report"} />
        </div>
        <Button
          className="m-1"
          color="primary"
          onClick={() => quantityToggle()}
        >
          <Trans id="reset_quantities" />
        </Button>
      </div>

      <CustomDataTable
        dataKey="id"
        headerSearch={true}
        filterDisplay={false}
        filterFieldsSet={filterFieldsSet}
        globalFilterFields={["name", "quantity", "remainning", "consumed"]}
        columns={Columns(deleteHandler, editHandler, extraData)}
        data={data}
        selectionMode="single"
        selection={selectedReward}
        onSelectionChange={(e) => setSelectedReward(e.value)}
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        emptyMessage={<Trans id="No Rewards found" />}
        tableStyle={{ minWidth: "50rem" }}
      />
      <CustomModal
        title={<Trans id="Delete Reward" />}
        toggle={deleteToggle}
        modal={modalDelete}
        body={
          <h3>
            <Trans id="are_you_sure_you_want_to_delete?" />
          </h3>
        }
        cancelTitle={<Trans id="No" />}
        confirmTitle={<Trans id="Yes" />}
      />
      <CustomModal
        title={<Trans id="Delete Reward" />}
        toggle={quantityToggle}
        modal={modalQuantities}
        body={
          <h3>
            <Trans id="are_you_sure_you_want_to_reset_quantities" />
          </h3>
        }
        cancelTitle={"No"}
        confirmTitle={"Yes"}
      />
    </>
  )
}

export default Rewards
