import React from 'react'
import { classNames } from "primereact/utils"
import { Edit2, FolderPlus, Trash2 } from "react-feather"
import { Button } from "reactstrap"
import { TriStateCheckbox } from 'primereact/tristatecheckbox'
import Avatar from '../../Components/shared/Avatar'
export const Columns = (deleteHandler) => {

  const editAndDeleteTemplate = () => {
    return (
      <>
        <Button
          color="flat-warning"
          className="btn-icon"
          size="sm"
        >
          <FolderPlus id="wheel" size={20} />
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

  const activateTemplate = (rowData) => {
    return <i className={classNames('pi', { 'true-icon pi-check-circle text-success': rowData.win, 'false-icon pi-times-circle text-danger': !rowData.win })}></i>
  }

  const activateRowFilterTemplate = (options) => {
    return <TriStateCheckbox value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} />
  }

  const imageBodyTemplate = () => {
    return <Avatar />
  }
  return [
      {field: 'name', header: 'Name', filter: 'filter', style: '12rem', sortable: true},
      {field: 'quantity', header: 'Quantity', filter: 'filter', style: '10rem', sortable: true},
      {field: 'remainning', header: 'Remainning', filter: 'filter', style: '10rem', sortable: true},
      {field: 'consumed', header: 'Consumed', filter: 'filter', style: '10rem', sortable: true},
      {field: 'win', header: 'Win', bodyTemplate: activateTemplate, filterElement: activateRowFilterTemplate, filter: 'filter', style: '4rem' },
      {field: 'image', header: 'Image', bodyTemplate: imageBodyTemplate, style: '6rem' },
      {field: 'action', header: 'Actions', bodyTemplate: editAndDeleteTemplate,  style: '12rem' }
  ]
}