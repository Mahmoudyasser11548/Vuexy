import * as yup from "yup"

import { Col, Row } from "reactstrap"
import {
  DatePickerField,
  ImageField,
  InputField,
  SelectField,
  SwitchField,
} from "../../Components/form"
import { Form, Formik } from "formik"

import { CustomCard } from "../../Components/shared"
import { LoadingButton } from "../../Components"
import React from "react"
import { Trans } from "@lingui/react"
import useFile from "../../utility/hooks/useFile"

const Wheel = () => {
  const initialValues = () => {
    return {
      id: "",
      name: "",
      active: false,
      showRewardsImages: false,
      isAuthorized: false,
      expiryDate: "",
      bgColor: "",
      color: "",
      textColor: "",
      topHeader: "",
      bottomHeader: "",
      buttonText: "",
      type: "",
      logo: useFile(),
      circleImg: useFile(),
    }
  }

  const validationSchema = yup.object({
    name: yup.string().required(),
    bgColor: yup.string().required(),
    color: yup.string().required(),
    textColor: yup.string().required(),
    topHeader: yup.string().required(),
    bottomHeader: yup.string().required(),
    buttonText: yup.string().required(),
    type: yup.string().required(),
  })

  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <>
      <CustomCard
        showHeader={false}
        body={
          <>
            <Formik
              onSubmit={onSubmit}
              initialValues={initialValues()}
              enableReinitialize={true}
              validationSchema={validationSchema}
            >
              {({}) => {
                return (
                  <>
                    <Form>
                      <Row className="justify-content-between">
                        <Row className="w-75">
                          <Col md="4">
                            <InputField
                              name="name"
                              label={<Trans id="Name" />}
                            />
                          </Col>
                          <Col md="4">
                            <DatePickerField
                              name="expiryDate"
                              label={<Trans id="expiry_date" />}
                              enableTime={true}
                            />
                          </Col>
                          <Col md="4">
                            <InputField
                              name="buttonText"
                              label={<Trans id="button_text" />}
                            />
                          </Col>
                          <Col md="4">
                            <InputField
                              name="bgColor"
                              type="color"
                              label={<Trans id="background_color" />}
                            />
                          </Col>
                          <Col md="4">
                            <InputField
                              name="color"
                              type="color"
                              label={<Trans id="color" />}
                            />
                          </Col>
                          <Col md="4">
                            <InputField
                              name="textColor"
                              type="color"
                              label={<Trans id="text_color" />}
                            />
                          </Col>
                          <Col md="4">
                            <InputField
                              name="topHeader"
                              label={<Trans id="top_header" />}
                            />
                          </Col>
                          <Col md="4">
                            <InputField
                              name="bottomHeader"
                              label={<Trans id="bottom_header" />}
                            />
                          </Col>
                          <Col md="4">
                            <SelectField
                              options={[
                                { label: "Spin", value: "spin" },
                                { label: "Slider", value: "slider" },
                              ]}
                              label={<Trans id="Type" />}
                              name="type"
                            />
                          </Col>
                          <Col md="4">
                            <SwitchField
                              name="active"
                              label={<Trans id="Active" />}
                            />
                            <SwitchField
                              name="showRewardsImages"
                              label={<Trans id="ShowRewardsImages" />}
                            />
                            <SwitchField
                              name="isAuthorized"
                              label={<Trans id="enableRegistration" />}
                            />
                          </Col>
                        </Row>
                        <Row className="w-25">
                          <Col md="3" className="d-flex flex-column">
                            <ImageField
                              title="logo"
                              name="logo"
                              mode="add"
                              width={200}
                              height={200}
                            />
                            <ImageField
                              title="Circle Image"
                              name="circleImg"
                              mode="add"
                              width={200}
                              height={200}
                            />
                          </Col>
                        </Row>
                      </Row>
                      <div className="d-flex">
                        <LoadingButton
                          type="submit"
                          color="primary"
                          className="btn-primary ml-auto"
                        >
                          {<Trans id="Save Changes" />}
                        </LoadingButton>
                      </div>
                    </Form>
                  </>
                )
              }}
            </Formik>
          </>
        }
      />
    </>
  )
}

export default Wheel
