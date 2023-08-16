import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  UncontrolledTooltip
} from "reactstrap"
import { ChevronLeft } from "react-feather"
import { useNavigate } from "react-router-dom"

function CustomCard({
  title,
  showBackButton = true,
  cardHeaderToolbar,
  body,
  backUrl = "",
  showHeader = true,
  style = null
}) {
  const navigate = useNavigate()

  return (
    <Card
    style={style}
    >
    { showHeader && <CardHeader className="border-bottom mb-2">
        <CardTitle className=" d-flex align-items-center">
          {showBackButton && (
            <>
              <Button
                id="back"
                size="sm"
                color="flat-secondary"
                className="btn-icon"
                onClick={() => {
                  backUrl ? navigate(backUrl) : navigate('/home')
                }}
              >
                <ChevronLeft size={18} />
              </Button>
              <UncontrolledTooltip placement="top" target="back">
                back
              </UncontrolledTooltip>
            </>
          )}
          <span className="mx-1">{title}</span>
        </CardTitle>
        {cardHeaderToolbar}
      </CardHeader>}

    {body && <CardBody>{body}</CardBody>}
    </Card>
  )
}

export default CustomCard
