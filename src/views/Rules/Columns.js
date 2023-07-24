import { Edit, ThumbsDown, ThumbsUp, Trash2 } from "react-feather"
import { Button } from "reactstrap"

export const Columns = (deleteHandler, editHandler) => {

  return [
    {
      name: 'Rule',
      selector: row => row.rule
    },
    {
      name: 'Property',
      selector: row => row.property
    },
    {
      name: 'Operator',
      selector: row => row.operator
    },
    {
      name: 'Value',
      selector: row => row.value
    },
    {
      name: 'Activate',
      selector: row => row.avtivateRule,
      cell: (row) => (
        <>
          {
            row.avtivateRule === 'enable' ? <ThumbsUp size={20} /> : <ThumbsDown size={20} /> 
          }
        </>
      )
    },
    {
      name: 'Actions',
      cell: (row) => (
        <>
          <Button
            onClick={() => editHandler(row)}
            color="flat-danger"
            className="btn-icon"
            size="sm"
            >
            <Edit size={20} />
          </Button>

          <Button
            onClick={() => deleteHandler(row.id)}
            color="flat-success"
            className="btn-icon"
            size="sm"
          >
            <Trash2 size={20} />
          </Button>
        </>
      )
    }
  ]
}