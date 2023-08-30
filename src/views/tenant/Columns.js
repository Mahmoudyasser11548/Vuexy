import classNames from 'classnames'
import React from 'react'
import { Edit2, Trash2 } from "react-feather"
import { Button } from "reactstrap"

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

  const activateTemplate = (rowData) => {
    return <i className={classNames('pi', { 'true-icon pi-check-circle text-success': rowData.isActive, 'false-icon pi-times-circle text-danger': !rowData.isActive })}></i>
  }

  return [
    {field: 'name', header: 'Name', style: '22rem', sortable: true},
    {field: 'phoneNumber', header: 'Phone Number', style: '22rem', sortable: true},
    {field: 'isActive', header: 'isActive', bodyTemplate: activateTemplate, style: '10rem' },
    {field: 'action', header: 'Actions', bodyTemplate: editAndDeleteTemplate }
  ]
}
