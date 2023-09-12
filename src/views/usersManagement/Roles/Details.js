import * as Yup from "yup"

import { Form, Formik } from "formik"

import { CustomCard } from "../../../Components/shared"
import { InputField } from "../../../Components/form"
import { LoadingButton } from "../../../Components"
import React from "react"
import { Trans } from "@lingui/react"

const Details = () => {
  const roleId = ""

  const initialState = () => {
    return {
      id: "",
      name: "",
      permissions: [],
    }
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Role Name is Required"),
  })

  const onSubmit = (_, { resetFrom }) => {
    resetFrom()
  }

  return (
    <>
      <CustomCard
        title={roleId ? <Trans id="edit_role" /> : <Trans id="create_role" />}
        body={
          <Formik
            enableReinitialize={true}
            initialValues={initialState()}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <div className="col-4">
                <InputField
                  name="name"
                  placeholder={"Enter Role Name"}
                  label={<Trans id="name" />}
                />
              </div>
              <br />

              {/* <AppCollapse /> */}

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
          </Formik>
        }
      />
    </>
  )
}

export default Details
