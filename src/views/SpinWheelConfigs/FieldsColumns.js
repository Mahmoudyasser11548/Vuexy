import { classNames } from "primereact/utils"
import { Trash2 } from "react-feather"
import { Button } from "reactstrap"

export const Columns = () => {

  const DeleteTemplate = () => {
    return (
      <>
        <Button
          color="flat-danger"
          className="btn-icon"
          size="sm"
          >
          <Trash2 id="Field" size={20} />
        </Button>
      </>
    )
  }

  const activateTemplate = (rowData) => {
    return <i className={classNames('pi', { 'true-icon pi-check-circle text-success': rowData.isRequired, 'false-icon pi-times-circle text-danger': !rowData.isRequired })}></i>
  }

  return [
    {field: 'name', header: 'Name', style: '22rem', sortable: true},
    {field: 'isRequired', header: 'isRequired', bodyTemplate: activateTemplate, style: '22rem' },
    {field: 'action', header: 'Actions', bodyTemplate: DeleteTemplate }
  ]
}