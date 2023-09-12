import { Edit2, Trash2 } from "react-feather"

import { Button } from "reactstrap"
import React from "react"

export const Columns = (deleteHandler, editHandler) => {
  const editAndDeleteTemplate = (rowData) => {
    return (
      <>
        <Button
          color="flat-primary"
          className="btn-icon"
          size="sm"
          onClick={() => editHandler(rowData?.id)}
        >
          <Edit2 size={20} />
        </Button>

        <Button
          color="flat-danger"
          className="btn-icon"
          size="sm"
          onClick={() => deleteHandler(rowData?.id)}
        >
          <Trash2 size={20} />
        </Button>
      </>
    )
  }

  return [
    { field: "name", header: "Name", style: "22rem", sortable: true },
    { field: "email", header: "Email", style: "22rem" },
    { field: "action", header: "Actions", bodyTemplate: editAndDeleteTemplate },
  ]
}
