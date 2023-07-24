import { Edit, ThumbsDown, ThumbsUp, Trash2 } from "react-feather"
import { useDispatch } from "react-redux"
import { Button } from "reactstrap"
import { deleteRule, editRule } from "../../redux/rules"
import { useParams } from "react-router-dom"

export const Columns = () => {
  const {id} = useParams()
  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch(deleteRule(id))
  }

  const handleEdit = () => {
    dispatch(editRule(id))
  }

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
      selector: row => row.enable,
      cell: (row) => (
        <>
          {
            row.enable === 'enable' ? <ThumbsUp size={20} /> : <ThumbsDown size={20} /> 
          }
        </>
      )
    },
    {
      name: 'Actions',
      cell: () => (
        <>
          <Button
            onClick={() => handleEdit()}
            color="flat-danger"
            className="btn-icon"
            size="sm"
            >
            <Edit size={20} />
          </Button>

          <Button
            onClick={() => handleDelete()}
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