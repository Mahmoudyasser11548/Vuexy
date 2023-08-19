import React from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

const CustomModal = (props) => {
  const {title, confirm, modal, toggle, body, confirmTitle, cancelTitle} = props

  return (
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          {body}
        </ModalBody>
        <ModalFooter>
        <Button color="primary" onClick={() => {
          confirm()
          toggle()
        }}>
            {confirmTitle}
        </Button>
        <Button color="secondary" onClick={toggle}>
          {cancelTitle ? cancelTitle : 'Cancel'}
        </Button>
        </ModalFooter>
      </Modal>
  )
}

export default CustomModal