import { Trash2 } from "react-feather"
import { Button } from "reactstrap"

export const Columns = (deleteHandler) => {

  const DeleteTemplate = (rowData) => {
    return (
      <>
        <Button
          color="flat-danger"
          className="btn-icon"
          size="sm"
          onClick={() => deleteHandler(rowData?.id)}
        >
          <Trash2 id="Field" size={20} />
        </Button>
      </>
    )
  }

  return [
    {field: 'name', header: 'Name', style: '22rem', sortable: true},
    {field: 'value', header: 'Value', style: '22rem' },
    {field: 'action', header: 'Actions', bodyTemplate: DeleteTemplate }
  ]
}