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

  return [
    {field: 'name', header: 'Name', style: '40rem', sortable: true},
    {field: 'action', header: 'Actions', bodyTemplate: editAndDeleteTemplate }
  ] 
}