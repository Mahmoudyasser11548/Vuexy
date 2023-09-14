import { Controller, useFormContext } from "react-hook-form"
import { FormFeedback, Input, Label } from "reactstrap"

import { AutoComplete } from "primereact/autocomplete"
import classnames from "classnames"
import { useDebouncedCallback } from "use-debounce"

function AutoCompleteInput({
  label,
  name,
  options = [],
  optionLabel = "",
  callBack = () => {},
  ...props
}) {
  const { control, setValue, watch } = useFormContext()

  const debounced = useDebouncedCallback(
    // function
    ({ query }) => {
      callBack(query)
    },
    // delay in ms
    1000
  )

  return (
    <>
      {label && (
        <Label className="form-label" for={name}>
          <h6>{label}</h6>
        </Label>
      )}
      <Controller
        id={name}
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          const value = watch(name)
          return (
            <>
              <div className="p-inputgroup">
                <AutoComplete
                  className={classnames({
                    "p-invalid": error && true,
                  })}
                  placeholder={label}
                  value={value}
                  suggestions={options}
                  completeMethod={debounced}
                  onChange={(e) => {
                    setValue(name, e.value)
                  }}
                  field={optionLabel}
                  forceSelection
                  {...field}
                  {...props}
                />
              </div>
              {error && <FormFeedback>{error?.message}</FormFeedback>}
            </>
          )
        }}
      />
    </>
  )
}

export default AutoCompleteInput
