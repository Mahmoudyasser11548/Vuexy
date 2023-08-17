import { useState } from "react"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormGroup
} from "reactstrap"
import { Download } from "react-feather"
import XLSX from "xlsx/dist/xlsx.full.min.js"
import * as FileSaver from "file-saver"
import LoadingButton from "../LoadingButton"

const ExportDataToExcel = ({
  exportedData,
  handleDispatch,
  exportedData_loading,
  defaultFileName,
  text = "export",
  color = "success",
  icon = <Download size="14" />
}) => {
  const [modal, setModal] = useState(false)
  const [fileName, setFileName] = useState("")
  const [fileFormat, setFileFormat] = useState("xlsx")
  const toggleModal = () => {
    if (!modal) handleDispatch && handleDispatch()
    setModal(!modal)
  }
  const handleExport = () => {
    setModal(!modal)
    const bookType = fileFormat
    const fileType = "application/octet-stream"
    const ws = XLSX.utils.json_to_sheet(exportedData || [], {
      sheet: "Sheet JS"
    })
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] }
    const wbout = XLSX.write(wb, { bookType, type: "array" })
    const data = new Blob([wbout], { type: fileType })
    const file = fileName.length ? `${fileName}.${fileFormat}` : `${defaultFileName}.${fileFormat}`

    //return FileSaver.saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), file
    return FileSaver.saveAs(data, file)
  }

  return (
    <>
      <Button
        className="w-100 mt-1 mb-1"
        color={color}
        outline
        onClick={() => toggleModal()}
      >
        {icon && icon}
        <span className="align-middle ml-25">
          {text}
        </span>
      </Button>
      <Modal
        isOpen={modal}
        toggle={() => toggleModal()}
        className="modal-dialog-centered"
        onClosed={() => setFileName("")}
      >
        <ModalHeader toggle={() => toggleModal()}>Export To Excel</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="Enter File Name"
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="select"
              id="selectFileFormat"
              name="customSelect"
              value={fileFormat}
              onChange={(e) => setFileFormat(e.target.value)}
            >
              <option>xlsx</option>
              <option>csv</option>
              <option>txt</option>
            </Input>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <LoadingButton
            loading={exportedData_loading}
            className="btn-info"
            onClick={() => handleExport()}
          >
            {text}
          </LoadingButton>
          <Button color="flat-danger" onClick={() => toggleModal()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default ExportDataToExcel
