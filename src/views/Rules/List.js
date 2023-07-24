import React, { useEffect } from 'react'
import CustomDataTable from '../../Components/customDataTable'
import { Columns } from './Columns'
import { useDispatch, useSelector } from 'react-redux'
import { getRule } from '../../redux/rules'

const List = () => {
  const {Rule, loading} = useSelector(state => state.rule)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRule())
  }, [])

  return (
    <>
      <CustomDataTable 
        loading={loading || false}
        columns={Columns()}
        data={Rule}
      />
    </>
  )
}

export default List