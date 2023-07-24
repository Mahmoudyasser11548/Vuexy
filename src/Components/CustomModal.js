import React from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

const CustomModal = (prop) => {
  const {title, modalFooter, confirm, modal, toggle, body, confirmTitle, cancelBtn, confirmBtn} = prop
  return (
    <div className='basic-modal'>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          {body}
        </ModalBody>
        {
          modalFooter && <ModalFooter>
          {confirmBtn && <Button color="primary" onClick={confirm}>{confirmTitle}</Button>}
          {cancelBtn && <Button color="secondary" onClick={toggle}>Cancel</Button>}
        </ModalFooter>
        }
      </Modal>
    </div>
  )
}

export default CustomModal