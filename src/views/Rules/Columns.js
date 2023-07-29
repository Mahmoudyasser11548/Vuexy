import React from 'react'
import { classNames } from "primereact/utils"
import { Edit2, Trash2 } from "react-feather"
import { Button } from "reactstrap"
import { TriStateCheckbox } from 'primereact/tristatecheckbox'

export const Columns = (deleteHandler, editHandler) => {
  
  const editAndDeleteTemplate = () => {
    return (
      <>
        <Button
          onClick={() => editHandler()}
          color="flat-danger"
          className="btn-icon"
          size="sm"
          >
          <Edit2 size={20} />
        </Button>
  
        <Button
          onClick={() => deleteHandler()}
          color="flat-success"
          className="btn-icon"
          size="sm"
        >
          <Trash2 size={20} />
        </Button>
      </>
    )
  }

  const activateTemplate = (rowData) => {
    return <i className={classNames('pi', { 'true-icon pi-check-circle': rowData.activate, 'false-icon pi-times-circle': !rowData.activate })}></i>
  }

  const activateRowFilterTemplate = (options) => {
    return <TriStateCheckbox value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} />
  }

  return [
    {field: 'rule', header: 'Rule', filter: 'filter', style: '12rem' },
    {field: 'property', header: 'Property', filter: 'filter', style: '14rem' },
    {field: 'operator', header: 'Operator', filter: 'filter', style: '14rem' },
    {field: 'value', header: 'Value', filter: 'filter', style: '12rem' },
    {field: 'activate', header: 'Activate', bodyTemplate: activateTemplate, filterElement: activateRowFilterTemplate, filter: 'filter',  style: '6rem' },
    {field: 'action', header: 'Actions', bodyTemplate: editAndDeleteTemplate,  style: '10rem'}
  ]
}
