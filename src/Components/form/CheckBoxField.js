import { useField } from "formik"
import { CardText, Input } from "reactstrap"

function CheckboxField({ id, label, callBackOnChange = () => {}, ...props }) {
  const [field] = useField(props)
  return (
    
    <div className="d-flex my-2">
        <Input
          type="checkbox" 
          role="checkbox"
          id={id || field.name}
          checked={field.value || false}
          {...field}
          onChange={(e) => {
            callBackOnChange({ name: field.name, value: e.target.checked })
            field.onChange(e)
          }}
          {...props}
        />
        {label && <CardText className="ms-1">{label}</CardText>}
    </div>
  )
}

export default CheckboxField
