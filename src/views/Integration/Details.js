import { Trans, useLingui } from '@lingui/react'
import React from 'react'
import * as yup from 'yup'
import CustomCard from '../../Components/shared/CustomCard'
import { Form, Formik } from 'formik'
import { Col, Row } from 'reactstrap'
import InputField from '../../Components/form/InputField'
import SelectField from '../../Components/form/SelectField'
import LoadingButton from '../../Components/LoadingButton'

const Details = () => {
  const { i18n } = useLingui()
  const configId = ''

  const initialValues = () => {
    return {
      id: "",
      name: "",
      type: "",
      ////api
      apiInfoId: "",
      url: "",
      method: "",
      /////////////mq
      rabbitMqInfoId: "",
      hostUrl: "",
      port: "",
      username: "",
      password: "",
      exchangeName: "",
      queueName: "",
      hostname: ""
    }
  }

  const validationSchema = yup.object().shape({
    name: yup.string().required()
  })

  // ** Function to handle form submit
  const onSubmit = (_, {resetForm}) => {
    resetForm()
  }

  return (
    <>
    <CustomCard
      title={
        configId !== "new" ? (
          <Trans id="edit_config" />
        ) : (
          <Trans id="create_config" />
        )
      }
      body={
        <Formik
          onSubmit={onSubmit}
          enableReinitialize={true}
          initialValues={initialValues()}
          validationSchema={validationSchema}
        >
          {({ values }) => {
            return (
              <Form autoComplete="nope">
                <Row>
                  <Col lg="4" md="4">
                    <InputField
                      label={<Trans id="name" />}
                      name="name"
                      placeHolder={i18n._("name")}
                    />
                  </Col>
                  <Col lg="4" md="4">
                    <SelectField
                      options={[
                        { label: "RabbitMq", value: "RabbitMq" },
                        { label: "Api", value: "Api" }
                      ]}
                      label={<Trans id="Type" />}
                      name="type"
                    />
                  </Col>
                </Row>
                {values?.type === "RabbitMq" && (
                  <>
                    <Row>
                      <Col lg="4" md="4">
                        <InputField
                          label={<Trans id="hostUrl" />}
                          name="hostUrl"
                          placeHolder={i18n._("hostUrl")}
                        />
                      </Col>
                      <Col lg="4" md="4">
                        <InputField
                          label={<Trans id="hostname" />}
                          name="hostname"
                          placeHolder={i18n._("hostname")}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4" md="4">
                        <InputField
                          label={<Trans id="port" />}
                          name="port"
                          placeHolder={i18n._("port")}
                        />
                      </Col>
                      <Col lg="4" md="4">
                        <InputField
                          label={<Trans id="exchangeName" />}
                          name="exchangeName"
                          placeHolder={i18n._("exchangeName")}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4" md="4">
                        <InputField
                          label={<Trans id="username" />}
                          name="username"
                          placeHolder={i18n._("username")}
                        />
                      </Col>
                      <Col lg="4" md="4">
                        <InputField
                          label={<Trans id="password" />}
                          name="password"
                          placeHolder={i18n._("password")}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4" md="4">
                        <InputField
                          label={<Trans id="queueName" />}
                          name="queueName"
                          placeHolder={i18n._("queueName")}
                        />
                      </Col>
                    </Row>
                  </>
                )}
                {values?.type === "Api" && (
                  <Row>
                    <Col lg="4" md="4">
                      <InputField
                        label={<Trans id="Url" />}
                        name="url"
                        placeHolder={i18n._("Url")}
                      />
                    </Col>
                    <Col lg="4" md="4">
                      <InputField
                        label={<Trans id="Method" />}
                        name="method"
                        placeHolder={i18n._("Method")}
                      />
                    </Col>
                  </Row>
                )}
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