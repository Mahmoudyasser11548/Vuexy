import React from 'react'
import * as yup from 'yup'
import useFile from "../../utility/hooks/useFile"
import { Button, Col, Row } from 'reactstrap'
import { Form, Formik } from 'formik'
import { Trans } from '@lingui/react'
import InputField from '../../Components/form/InputField'
import ImageField from '../../Components/form/ImageField'
import LoadingButton from '../../Components/LoadingButton'
import SwitchField from '../../Components/form/SwitchField'
import CustomCard from '../../Components/shared/CustomCard'

const Details = () => {

  const initialValues = () => {
    return {
      id: "",
      name: "", 
      phoneNumber: "",
      logo: useFile(),
      isActive: false
    }
  }

  const validationSchema = yup.object().shape({
    name: yup.string().required()
  })

  // ** Function to handle form submit
  const onSubmit = (_, {resetForm}) => {
    resetForm()
  }
  const tenantId = ''
  return (
    <>
      <CustomCard
        title={
          tenantId !== "new" ? (
            <Trans id="edit_tenant" />
          ) : (
            <Trans id="create_tenant" />
          )
        }
        body={
          <Formik
            onSubmit={onSubmit}
            enableReinitialize={true}
            initialValues={initialValues()}
            validationSchema={validationSchema}
          >
            {({  }) => {
              return (
                <Form>
                  <Row>
                    <Col lg="7" md="12">
                      <InputField label={<Trans id="name" />} name="name" />
                      <InputField
                        name="phoneNumber"
                        label={<Trans id="phoneNumber" />}
                      />
                      <SwitchField
                        name="isActive"
                        label={<Trans id="active" />}
                      />
                    </Col>
                
                    <Col lg="4" md="12" className="d-flex justify-content-end">
                      <ImageField
                        name="logo"
                        mode={"add"}
                        width={200}
                        height={200}
                      />
                    </Col>
                  </Row>

                  <div className="d-flex justify-content-end">
                    <LoadingButton
                      type="submit"
                      color="primary"
                      className="btn-primary ml-auto"
                    >
                      {<Trans id="Save Changes" />}
                    </LoadingButton>
                  </div>
                </Form>
              )
            }}
          </Formik>
        }
      />
    </>
  )
}

export default Details