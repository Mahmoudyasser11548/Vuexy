import React from 'react'
import "../@core/scss/base/pages/authentication.scss"
import { Form, Formik } from 'formik'
import themeConfig from '../configs/themeConfig'
import * as Yup from 'yup'
import { Trans } from '@lingui/react'
import { Button, Card, CardBody, FormGroup, Label } from 'reactstrap'
import InputField from '../Components/form/InputField'
import CheckboxField from '../Components/form/CheckBoxField'
import PasswordField from '../Components/form/PasswordField'

const Login = () => {

  const initialValues = {
    username: "",
    password: ""
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required(<Trans id="is_required" />)
      .min(1, <Trans id="min_is_1" />),
    password: Yup.string()
      .required(<Trans id="is_required" />)
      .min(5, <Trans id="min_is_5" />)
  })

  const onSubmit = ({resetForm}) => {
    resetForm()
  }

  return (
    <>  
      <div className="auth-wrapper auth-basic px-2">
        <div className="auth-inner py-2">
          <Card>
            <CardBody>
              <div className="auth-logo my-2 text-center">
                <img src={themeConfig.app.appLogoImage}
                  alt="logo" height={60} />
              </div>
              <h4 className="card-title text-center mb-2">
                <Trans id='Spin & Win' />
              </h4>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize={true}
              >
                {({}) => {
                  return (
                    <>
                      <Form className="auth-login-form mt-4">
                        <InputField
                          label={<Trans id="username" />}
                          name="username"
                        />
                        <FormGroup>
                          <div className="d-flex justify-content-between">
                            <Label className="form-label" for="login-password">
                              <Trans id="Password" />
                            </Label>
                          </div>
                          <PasswordField name="password" id="login-password" />
                        </FormGroup>
                        <FormGroup>
                          <span style={{ color: "#0f6425" }}>
                            <CheckboxField
                              label={<Trans id="Remember me" />}
                              name="remember"
                              id="remember-me"
                            />
                          </span>
                        </FormGroup>
                        <Button type="sumbit" color="primary" block>
                          <Trans id="Log in" />
                        </Button>
                      </Form>
                    </>
                  )
                }}
              </Formik>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  )
}

export default Login