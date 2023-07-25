import React from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

const CustomModal = (prop) => {
  const {title, modalFooter, confirm, modal, toggle, body, confirmTitle, cancelBtn, confirmBtn} = prop

  return (
      <Modal isOpen={modal} toggle={toggle} className='w-25'>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          {body}
        </ModalBody>
        {
          modalFooter && <ModalFooter>
          {confirmBtn && <Button color="primary" onClick={() => {
            confirm()
            toggle()
          }}>{confirmTitle}</Button>}
          {cancelBtn && <Button color="secondary" onClick={toggle}>Cancel</Button>}
        </ModalFooter>
        }
      </Modal>
  )
}

export default CustomModal