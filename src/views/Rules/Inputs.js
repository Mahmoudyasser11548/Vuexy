import React from 'react'
import SelectOption from '../../Components/SelectOption'
import InputField from '../../Components/InputField'
import Checkbox from '../../Components/Checkbox'
import ButtonSubmit from '../../Components/ButtonSubmit'
import { useSelector } from 'react-redux'
import { operatorIntegerOptions, operatorStringOptions, properyNameOptions } from './data'

const Inputs = ({values}) => {
  const {error, loading} = useSelector(state => state.rule)

  return (
    <>
      <SelectOption 
        name="property"
        placeholder='Property Name'
        options={properyNameOptions}
      />
      <SelectOption 
        name="operator"
        placeholder="Operator"
        options={
          values.property === "String" ? operatorStringOptions : operatorIntegerOptions
        }
      />

      <InputField 
        name="value"
        type="text"
        placeholder="Rule Value"
      />

      <Checkbox
        name="activate"
        type="checkbox"
        label="Enable"
        options={[{key: 'enable', value:'enable'}]}
      />
      <ButtonSubmit loading={loading}/>
      {error && !loading && 'Error occurred while submitting the form.'}
    </>
  )
}

export default Inputs