import React, { useEffect, useState } from 'react'
import CustomDataTable from '../../Components/customDataTable'
import { FilterMatchMode } from 'primereact/api'
import { Columns } from './Columns'
import { useDispatch, useSelector } from 'react-redux'
import { deleteRule, getRule } from '../../redux/rules'
import CustomModal from '../../Components/CustomModal'
import Edit from './Edit'
import { InputText } from 'primereact/inputtext'
import { Button } from 'reactstrap'
import { Plus } from 'react-feather'
import AddRule from './AddRule'
import RadioButton from '../../Components/RadioButton'
import { Formik } from 'formik'

const List = () => {
  const RadioOptions = [
    {key: 'Refund', value: 'Refund'},
    {key: 'RefundRequest', value: 'RefundRequest'}
  ]

  // List of Rule
  const {rules} = useSelector(state => state.rule) 
  const dispatch = useDispatch()

  // Rule 
  const [entity, setEntity] = useState('')

  const ruleSelected = () => {
    return rules.filter((rule) => rule.rule === entity)
  }

  // Toggle Modals states
  const [modalUpdate, setModalUpdate] = useState(false)
  const [selectedRule, setSelectedRule] = useState()
  const [modalCreate, setModalCreate] = useState(false)

  // Toggle Modals functions
  const createToggle = () => setModalCreate(!modalCreate)
  const updateToggle = () => setModalUpdate(!modalUpdate)

  // Filter Configration
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    rule: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    property: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    operator: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    value: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
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

  // Global Filteration Function in Input Field at Table Header
  const onGlobalFilterChange = (e) => {
    const value = e.target.value
    const _filters = { ...filters }

    _filters['global'].value = value

    setFilters(_filters)
    setGlobalFilterValue(value)
  }

  // Table Header Component
  const renderHeader = () => {
    return (
      <div className='d-flex justify-content-between align-items-center'>
        <h2 className='mb-0'>Rules</h2>
        <div>
          <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
          </span>
          <Button
            color="primary"
            className="btn-primary ml-2 rounded-pill ms-1"
            onClick={() => createToggle()}
          >
            <Plus size={14} />
            <span className="align-middle ml-25 ms-1">
              Create Rule
            </span>
          </Button>
        </div>
      </div>
    )
  }

  // Table Header 
  const header = renderHeader()

  return (
    <>

      <RadioButton 
        name="rule"
        label="Select Rule"
        options={RadioOptions}
        onChange={(e) => setEntity(e.target.value)}
      />

      {entity !== '' ? <CustomDataTable 
        header={header}
        filters={filters} 
        filterDisplay="row" 
        emptyMessage="No Rules found"
        globalFilterFields={['rule', 'property', 'value', 'operator']}
        columns={Columns(deleteHandler, editHandler)}
        data={ruleSelected()}
        dataKey="id"
        tableStyle={{ minWidth: '50rem' }}
        selectionMode="single"
        selection={selectedRule}
        paginator 
        rows={5} 
        rowsPerPageOptions={[5, 10, 25, 50]}
        onSelectionChange={(e) => setSelectedRule(e.value)}
      /> : ''}

      {/* Create Edit Modal */}
      <CustomModal 
        title="Edit Rule"
        toggle={updateToggle}
        modal={modalUpdate}
        body={<Edit 
          rule={selectedRule}
        />}
        modalFooter={false}
      />

      {/* Create Rule Modal */}
      <CustomModal 
        title="Create Rule"
        toggle={createToggle}
        modal={modalCreate}
        body={<AddRule 
          entity={entity}
        />}
        modalFooter={false}
      />
    </>
  )
}

export default List