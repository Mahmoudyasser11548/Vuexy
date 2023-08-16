import React from 'react'
// import { classNames } from "primereact/utils"
import { Book, Edit2, Gift, Trash2 } from "react-feather"
import { Button } from "reactstrap"
import { TriStateCheckbox } from 'primereact/tristatecheckbox'

export const Columns = () => {
  
  const editAndDeleteTemplate = () => {
    return (
      <>
        
        <Button
          color="flat-warning"
          className="btn-icon"
          size="sm"
          >
          <Gift id="wheel" size={20} />
        </Button>
  
        <Button
          color="flat-warning"
          className="btn-icon"
          size="sm"
        >
          <Book id="wheel" size={20} />
        </Button>

        <Button
          color="flat-primary"
          className="btn-icon"
          size="sm"
          >
          <Edit2 size={20} />
        </Button>
  
        <Button
          color="flat-danger"
          className="btn-icon"
          size="sm"
        >
          <Trash2 size={20} />
        </Button>
      </>
    )
  }

  // const activateTemplate = (rowData) => {
  //   return <i className={classNames('pi', { 'true-icon pi-check-circle': rowData.activate, 'false-icon pi-times-circle': !rowData.activate })}></i>
  // }

  // const activateRowFilterTemplate = (options) => {
  //   return <TriStateCheckbox value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} />
  // }

  return [
    {field: 'name', header: 'Name', style: '22rem', sortable: true},
    {field: 'tenant', header: 'Tenant', style: '22rem', sortable: true},
    {field: 'action', header: 'Actions', bodyTemplate: editAndDeleteTemplate }
  ]
}
