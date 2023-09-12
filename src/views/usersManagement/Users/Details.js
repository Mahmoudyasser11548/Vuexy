import * as yup from "yup"

import { Button, Col, Row } from "reactstrap"
import { Form, Formik } from "formik"
import {
  InputField,
  PasswordField,
  PhoneField,
  SwitchField,
} from "../../../Components/form"
import { Trans, useLingui } from "@lingui/react"

import { CustomCard } from "../../../Components/shared"
import { LoadingButton } from "../../../Components"
import React from "react"
import { generatePassword } from "../../../utility/Utils"

const Details = () => {
  const { i18n } = useLingui()

  const userId = ""

  const initialValues = () => {
    return {
      username: "",
      password: "",
      email: "",
      phoneNumber: "",
      active: false,
      roles: ["Admin"],
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
    phoneNumber: yup.string().required(),
  })

  // ** Function to handle form submit
  const onSubmit = (_, { resetForm }) => {
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
                            setFieldValue("password", generatePassword(), false)
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
