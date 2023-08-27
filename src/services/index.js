import apisauce from "apisauce"

const apiURI = process.env.REACT_APP_BASE_API_URL

const create = (baseURL = apiURI) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      "Cache-Control": "no-cache"
    },
    timeout: 1200000 //30 sec
  })

  api.addAsyncResponseTransform((response) => {
    if (!response.ok) {
      const customeError = {
        errors: response.data.errors || [{ errorMessage: response.data.message }],
        errorMessage: response.data.message,
        status: response.status,
        code: response.data.errorCode
      }
      response.data = customeError
    }
  })

  api.addAsyncRequestTransform((request) => {
    const token = localStorage.getItem("jwtToken")
    const culture = localStorage.getItem("culture")
    const cultureCode = localStorage.getItem("cultureCode")
    const userIp = localStorage.getItem("userIp")
    const tenantId = localStorage.getItem("tenantId")
    request.headers["culture"] = culture || "en"
    request.headers["cultureCode"] = cultureCode || "en-US"
    request.headers["userIp"] = userIp || ""

    if (tenantId) {
      request.headers["tenantId"] = tenantId
    }

    if (token) {
      request.headers["Authorization"] = `Bearer ${token}`
    } else {
      delete request.headers["Authorization"]
    }
  })

  return api
}

export default create