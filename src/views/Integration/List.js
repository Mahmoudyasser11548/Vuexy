import { CustomCard, CustomModal } from "../../Components/shared"
import React, { useState } from "react"

import { Button } from "bootstrap"
import { CustomDataTable } from "../../Components/Datatable"
import { FilterMatchMode } from "primereact/api"
import { Plus } from "react-feather"
import { Trans } from "@lingui/react"
import { useNavigate } from "react-router-dom"

const data = []

const List = () => {
  const navigate = useNavigate()
  const [config, setConfig] = useState()
  const [modalDelete, setModalDelete] = useState(false)

  // Toggle Modals functions
  const deleteToggle = () => setModalDelete(!modalDelete)

  // Filter Table
  const filterFieldsSet = {
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    type: { value: null, matchMode: FilterMatchMode.CONTAINS },
  }

  // handlers
  const deleteHandler = () => {
    deleteToggle()
  }

  const editHandler = () => {}

  return (
    <>
      <CustomCard
        title={<Trans id="configs" />}
        showBackButton={false}
        cardHeaderToolbar={
          <Button
            //permission="add_user"
            color="primary"
            className="btn-icon"
            outline
            onClick={() => navigate("/configs/details/new")}
          >
            <Plus size={14} />
            <span className="align-middle ml-25">
              <Trans id="create_config" />
            </span>
          </Button>
        }
        body={
          <CustomDataTable
            dataKey="id"
            headerSearch={true}
            filterDisplay={true}
            filterFieldsSet={filterFieldsSet}
            globalFilterFields={["name", "type"]}
            columns={Columns(deleteHandler, editHandler)}
            data={data}
            selectionMode="single"
            selection={config}
            onSelectionChange={(e) => setConfig(e.value)}
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            emptyMessage={<Trans id="No Configs found" />}
            tableStyle={{ minWidth: "50rem" }}
          />
        }
      />
      <CustomModal
        title={<Trans id="Delete Config" />}
        toggle={deleteToggle}
        modal={modalDelete}
        confirmTitle={<Trans id="Yes" />}
        cancelTitle={<Trans id="No" />}
        body={
          <h3>{<Trans id="Are you sure you want to delete this item ? " />}</h3>
        }
      />
    </>
  )
}

export default List
