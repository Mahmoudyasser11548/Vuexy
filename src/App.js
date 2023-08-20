import React, { Suspense } from "react"

// ** Router Import
import Router from "./router/Router"
import { messages as enMessages } from "./locales/en/messages.po"
import { messages as arMessages } from "./locales/ar/messages.po"
import { I18nProvider } from "@lingui/react"
import { i18n } from "@lingui/core"

i18n.load({
  en: enMessages,
  ar: arMessages
})
i18n.activate("en")

const App = () => {
  return (
    <Suspense fallback={null}>
      <I18nProvider i18n={i18n}>
        <Router /> 
      </I18nProvider>
    </Suspense>
  )
}

export default App
