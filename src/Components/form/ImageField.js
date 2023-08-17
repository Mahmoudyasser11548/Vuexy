import { useField, useFormikContext } from "formik"
import React, { useRef } from "react"
import { Trash2, Upload } from "react-feather"
import { Media, Button } from "reactstrap"
import logoDefault from "../../assets/images/no-image.png"

function ImageField({
  name,
  displayName,
  mode,
  model,
  title,
  width = 280,
  height = 280,
  enableRemove = true,
  ...props
}) {
  const { setFieldValue } = useFormikContext()
  const [field, meta] = useField(name)

  const { error } = meta
  const { value } = field
  const { base64 = '', url, readUrl } = value || {}

  const imageValue =
    base64 ||
    (readUrl &&
      `${process.env.REACT_APP_BASE_URL}/${readUrl}?w=${width}&h=${height}`) ||
    logoDefault
   // ${process.env.REACT_APP_BASE_URL}

  const isValidImage = (file) => {
    return file?.type?.match("image.*") || false
  }

  const logo = useRef(null)
  const handleRemoveImage = () => setFieldValue(name, {
      ...value,
      base64: null,
      readUrl: null,
      fileStatus: 3
    })

  const handleImageChange = (e) => {
    e.preventDefault()
    //console.log("iiii",e.target.files[0]);

    const reader = new FileReader()
    const imgFile = e.target.files[0]
    const validImg = isValidImage(imgFile)

    const fileName = imgFile.name.split(".")[0].toLowerCase()
    const extension = imgFile.name.split(".")[1].toLowerCase()

    if (validImg && validImg !== null) {
      reader.onloadend = () => {
        setFieldValue(name, {
          ...value,
          base64: reader.result,
          readUrl: null,
          fileStatus: url ? 2 : 1,
          name: fileName,
          extension
        })
      }
      reader.readAsDataURL(imgFile)
      
    }
  }

  return (
    <>
    <Media
      className="mb-2 avatar-field d-flex flex-column image-container"
      style={{ width, height }}
    >
      <img
        tag="img"
        className="avatar-shadow rounded"
        src={imageValue}
        alt="user profile image"
        height={height}
        width={width}
        style={{ border: `${mode === "add" ? "dashed 2px grey" : ""}` }}
      />
      {error ? <div className="mx-auto mt-1 text-danger">{error}</div> : null}

      <div className="image-link">
        {enableRemove && imageValue !== logoDefault && (
          <Button
            className="btn-icon mb-1"
            color="danger"
            outline
            size="sm"
            onClick={handleRemoveImage}
          >
            <Trash2 size={20} />
          </Button>
        )}

        <Button
          color="dark"
          size="sm"
          onClick={() => {
            logo.current.click()
          }}
        >
          Upload
        </Button>
        {title && <h4 className="text-center text-warning mt-1">{title}</h4>}

        </div>
        {mode !== "add" && model && (
          <Media className="font-medium-1 text-bold-600" tag="p" heading>
            {displayName}
          </Media>
        )}

        <input
          ref={logo}
          accept="image/*"
          type="file"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
      </Media>
    </>
  )
}

export default ImageField
