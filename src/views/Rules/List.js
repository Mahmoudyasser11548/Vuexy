import React, { useEffect, useState } from 'react'
import CustomDataTable from '../../Components/customDataTable'
import { FilterMatchMode, FilterOperator } from 'primereact/api'
import { Columns } from './Columns'
import { useDispatch, useSelector } from 'react-redux'
import { deleteRule, getRule } from '../../redux/rules'
import CustomModal from '../../Components/CustomModal'
import Edit from './Edit'
import { InputText } from 'primereact/inputtext'

const List = () => {
  const {rules} = useSelector(state => state.rule)
  const dispatch = useDispatch()
  const [modalUpdate, setModalUpdate] = useState(false)
  const [selectedRule, setSelectedRule] = useState()
  const updateToggle = () => setModalUpdate(!modalUpdate)

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    rule: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    property: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    operator: { value: null, matchMode: FilterMatchMode.IN },
    value: { value: null, matchMode: FilterMatchMode.EQUALS },
    activate: { value: null, matchMode: FilterMatchMode.EQUALS }
  })
  const [globalFilterValue, setGlobalFilterValue] = useState('')

  const deleteHandler = () => {
    dispatch(deleteRule(selectedRule.id))
  }

  const editHandler = () => {
    updateToggle()
  }

  useEffect(() => {
    dispatch(getRule())
  }, [])

  const onGlobalFilterChange = (e) => {
    const value = e.target.value
    const _filters = { ...filters }

    _filters['global'].value = value

    setFilters(_filters)
    setGlobalFilterValue(value)
  }

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
          <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
          </span>
      </div>
    )
  }

  const header = renderHeader()

  return (
    <>
      <CustomDataTable 
        header={header}
        filters={filters} 
        filterDisplay="row" 
        emptyMessage="No Rules found"
        globalFilterFields={['rule', 'property', 'value', 'operator']}
        columns={Columns(deleteHandler, editHandler)}
        data={rules}
        dataKey="id"
        tableStyle={{ minWidth: '50rem' }}
        selectionMode="single"
        selection={selectedRule}
        paginator 
        rows={5} 
        rowsPerPageOptions={[5, 10, 25, 50]}
        onSelectionChange={(e) => setSelectedRule(e.value)}
      />

      <CustomModal 
        title="Edit Rule"
        toggle={updateToggle}
        modal={modalUpdate}
        body={<Edit 
          rule={selectedRule}
          toggleModal={modalUpdate}
        />}
        modalFooter={false}
      />
    </>
  )
}

export default List