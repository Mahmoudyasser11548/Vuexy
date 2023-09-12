import { CustomCard, CustomModal } from "../../Components/shared"
import React, { useState } from "react"

import { Button } from "reactstrap"
import { Columns } from "./Columns"
import { CustomDataTable } from "../../Components/Datatable"
import { FilterMatchMode } from "primereact/api"
import { Plus } from "react-feather"
import { Trans } from "@lingui/react"
import { useNavigate } from "react-router-dom"

const data = [
  {
    id: 1,
    name: "spin1",
    tenant: "spin1",
  },
  {
    id: 2,
    name: "spin2",
    tenant: "spin2",
  },
  {
    id: 3,
    name: "spin3",
    tenant: "spin3",
  },
]

const List = () => {
  const navigate = useNavigate()
  const [selectedSpin, setSelectedSpin] = useState({})
  const [modalToggle, setModalToggle] = useState(false)

  // Toggle Modals functions
  const toggle = () => setModalToggle(!modalToggle)

  // handlers
  const deleteHandler = () => {
    toggle()
  }

  const downloadHandler = () => {
    toggle()
  }

  const editHandler = () => {}

  const filterFieldsSet = {
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    tenant: { value: null, matchMode: FilterMatchMode.CONTAINS },
  }

  return (
    <CustomCard
      title={<Trans id="Spinning Wheels" />}
      cardHeaderToolbar={
        <>
          <Button
            color="primary"
            className="btn-icon"
            outline
            onClick={() => navigate("/spinWheel/tabs/new")}
          >
            <Plus size={14} />
            <span className="align-middle ml-25 ms-1">
              <Trans id="Add Spinning Wheel" />
            </span>
          </Button>
        </>
      }
      body={
        <>
          <CustomDataTable
            dataKey="id"
            headerSearch={true}
            filterFieldsSet={filterFieldsSet}
            filterDisplay={true}
            globalFilterFields={["name", "tenant"]}
            columns={Columns(deleteHandler, downloadHandler, editHandler)}
            data={data}
            selectionMode="single"
            selection={selectedSpin}
            onSelectionChange={(e) => setSelectedSpin(e.value)}
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            emptyMessage={<Trans id="No Spinning wheels found" />}
            tableStyle={{ minWidth: "50rem" }}
          />
          <CustomModal
            title={<Trans id="delete_spinning_wheel" />}
            toggle={toggle}
            modal={modalToggle}
            body={
              <h3>
                <Trans id="are_you_sure_you_want_to_delete" />
              </h3>
            }
            cancelTitle={<Trans id="no" />}
            confirmTitle={<Trans id="yes" />}
          />
        </>
      }
    />
  )
}

export default List
