import { Form, Formik } from 'formik'
import * as yup from "yup"
import React from 'react'
import CustomCard from '../../Components/shared/CustomCard'
import { Col, Row } from 'reactstrap'
import SelectField from '../../Components/form/SelectField'
import InputField from '../../Components/form/InputField'
import DatePickerField from '../../Components/form/DatePickerField'
import ImageField from '../../Components/form/ImageField'
import LoadingButton from '../../Components/LoadingButton'
import SwitchField from '../../Components/form/SwitchField'
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
      circleImg: useFile()
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
    type: yup.string().required()
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
                      <Row>
                        <Col lg="8" sm="12">
                          <InputField
                            name="name"
                            label={"Name"}
                          />

                          <DatePickerField
                            name="expiryDate"
                            label="expiry_date"
                            enableTime={true}
                          />

                          <InputField
                            name="bgColor"
                            type="color"
                            label="background_color"
                          />

                          <InputField
                            name="color"
                            type="color"
                            label="color"
                          />

                          <InputField
                            name="textColor"
                            type="color"
                            label="text_color"
                          />

                          <InputField
                            name="topHeader"
                            label="top_header"
                          />

                          <InputField
                            name="bottomHeader"
                            label="bottom_header"
                          />

                          <InputField
                            name="buttonText"
                            label="button_text"
                          />

                          <SelectField
                            options={[
                              { id: "spin", label: "Spin" },
                              { id: "slider", label: "Slider" }
                            ]}
                            label={"Type"}
                            keyValue={"id"}
                            title={"label"}
                            name="type"
                          />

                          <SwitchField 
                            name="active" 
                            label="Active" 
                          />
                          <SwitchField
                            name="showRewardsImages"
                            label="ShowRewardsImages"
                          />
                          <SwitchField
                            name="isAuthorized"
                            label="enableRegistration"
                          />
                        </Col>

                        <Col lg="4" md="12" className="d-flex flex-column ">
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
                      <div className="d-flex">
                        <LoadingButton
                          type="submit"
                          color="primary"
                          className="btn-primary ml-auto"
                        >
                          Save Changes
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