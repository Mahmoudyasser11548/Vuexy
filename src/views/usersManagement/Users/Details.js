import React from 'react'
import * as yup from "yup"
import CustomCard from '../../../Components/shared/CustomCard'
import { Trans, useLingui } from '@lingui/react'
import { Form, Formik } from 'formik'
import { Button, Col, Row } from 'reactstrap'
import InputField from '../../../Components/form/InputField'
import SwitchField from '../../../Components/form/SwitchField'
import PasswordField from '../../../Components/form/PasswordField'
import PhoneField from '../../../Components/form/PhoneField'
import { generatePassword } from "../../../utility/Utils"
import LoadingButton from '../../../Components/LoadingButton'

const Details = () => {
  const { i18n } = useLingui()

  const userId = ''

  const initialValues = () => {
    return {
      username: "",
      password: "",
      email: "",
      phoneNumber: "",
      active: false,
      roles: ["Admin"]
    }
  }

  const validationSchema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email(),
    password: yup
      .string()
      .min(6)
      .test("isNew", "Password is required", function (value) {
        if (userId === "new") {
          return !!value
        } else {
          return true
        }
      }),
    phoneNumber: yup.string().required()
  })

  // ** Function to handle form submit
  const onSubmit = (_, {resetForm}) => {
    resetForm()
  }

  return (
    <CustomCard
      title={
        userId !== "new" ? <Trans id="edit_user" /> : <Trans id="create_user" />
      }
      body={
        <Formik
          onSubmit={onSubmit}
          enableReinitialize={true}
          initialValues={initialValues()}
          validationSchema={validationSchema}
        >
          {({ setFieldValue }) => {
            return (
              <Form autoComplete="nope">
                
                <Row>
                  <Col lg="9" sm="12">
                    <Row>
                    
                      <Col lg="6" sm="12">
                        <InputField
                          label={<Trans id="user_name" />}
                          name="username"
                          placeholder={i18n._("user_name")}
                        />
                      </Col>
                  
                      <Col lg="6" sm="12">
                        <PhoneField 
                          label={<Trans id="Phone Number" />} 
                          name="phoneNumber" 
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6" sm="12">
                        <PasswordField
                          label={<Trans id="password" />}
                          name="password"
                          autoComplete={"new-password"}
                        />
                      </Col>
                      <Col lg="6" sm="12">
                        <Button
                          className="mt-2"
                          color="flat-warning"
                          onClick={(e) => {
                            e.preventDefault()
                            setFieldValue(
                              "password",
                              generatePassword(),
                              false
                            )
                          }}
                        >
                          {<Trans id="generate_password" />}
                        </Button>
                      </Col>

                      <Col lg="6" sm="12">
                        <SwitchField
                          name="active"
                          label={<Trans id="active_user" />}
                        />
                      </Col>
                    </Row>
              
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
  )
}

export default Details