import { Book, Edit2, Gift, Trash2 } from "react-feather"

import { Button } from "reactstrap"
import React from "react"

export const Columns = (deleteHandler, downloadHandler, editHandler) => {
  const editAndDeleteTemplate = (rowData) => {
    return (
      <>
        <Button
          color="flat-warning"
          className="btn-icon"
          size="sm"
          onClick={() =>
            window.open(`displayed-rewards/${rowData?.id}`, "_blank").focus()
          }
        >
          <Gift id="wheel" size={20} />
        </Button>

        <Button
          color="flat-warning"
          className="btn-icon"
          size="sm"
          onClick={() =>
            window.open(`displayed-wheel/${rowData?.id}`, "_blank").focus()
          }
        >
          <Book id="wheel" size={20} />
        </Button>

        <Button
          color="flat-primary"
          className="btn-icon"
          size="sm"
          onClick={() => editHandler()}
        >
          <Edit2 size={20} />
        </Button>

        <Button
          color="flat-danger"
          className="btn-icon"
          size="sm"
          onClick={() => deleteHandler()}
        >
          <Trash2 size={20} />
        </Button>
      </>
    )
  }

  return [
    {
      field: "name",
      header: "Name",
      filter: "filter",
      style: "22rem",
      sortable: true,
    },
    {
      field: "tenant",
      header: "Tenant",
      filter: "filter",
      style: "22rem",
      sortable: true,
    },
    { field: "action", header: "Actions", bodyTemplate: editAndDeleteTemplate },
  ]
}
