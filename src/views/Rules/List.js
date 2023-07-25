import React, { useEffect, useState } from 'react'
import CustomDataTable from '../../Components/customDataTable'
import { Columns } from './Columns'
import { useDispatch, useSelector } from 'react-redux'
import { deleteRule, getRule } from '../../redux/rules'
import CustomModal from '../../Components/CustomModal'
import Edit from './Edit'

const List = () => {
  const {Rule, loading} = useSelector(state => state.rule)
  const dispatch = useDispatch()
  const [modalDelete, setModalDelete] = useState(false)
  const [modalUpdate, setModalUpdate] = useState(false)
  const [ruleId, setRuleId] = useState()
  const [rule, setRule] = useState()
  
  const deleteToggle = () => setModalDelete(!modalDelete)
  const updateToggle = () => setModalUpdate(!modalUpdate)

  const deleteHandler = (id) => {
    setRuleId(id)
    deleteToggle()
  }

  const editHandler = (row) => {
    setRule(row)
    updateToggle()
  }

  const confirmDelete = () => {
    dispatch(deleteRule(ruleId))
  }

  useEffect(() => {
    dispatch(getRule())
  }, [])

  return (
    <>
      <CustomDataTable 
        loading={loading || false}
        columns={Columns(deleteHandler, editHandler)}
        data={Rule}
        pagination
      />
      <CustomModal 
        title="Delete Rule"
        toggle={deleteToggle}
        modal={modalDelete}
        body={<h3>Are you sure you want to delete this item ?</h3>}
        confirm={confirmDelete}
        confirmTitle='Delete'
        confirmBtn={true}
        cancelBtn={true}
        modalFooter={true}
        />

      <CustomModal 
        title="Edit Rule"
        toggle={updateToggle}
        modal={modalUpdate}
        body={<Edit 
          rule={rule}
        />}
        modalFooter={false}
      />
    </>
  )
}

export default List