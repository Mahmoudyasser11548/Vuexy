import { Edit2, Trash2 } from "react-feather"
import { Button } from "reactstrap"

export const Columns = () => {

  const editAndDeleteTemplate = () => {
    return (
      <>
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

  return [
    {field: 'name', header: 'Name', filter: 'filter', style: '22rem', sortable: true},
    {field: 'color', header: 'Color', filter: 'filter', style: '22rem' },
    {field: 'action', header: 'Actions', bodyTemplate: editAndDeleteTemplate }
  ]
}