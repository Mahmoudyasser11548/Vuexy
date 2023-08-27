import React, { useState, useEffect } from 'react'
import { I18nProvider } from '@lingui/react'
import { i18n } from '@lingui/core'
import { locales } from '../../redux/SupportedLocales'
import { useDispatch } from 'react-redux'
import { changeLocale } from '../../redux/app/appSlice'

// Context
const IntlContext = React.createContext()

const IntlProviderWrapper = ({ children }) => {
  const [locale, setLocale] = useState('en')
  const lang = localStorage.getItem('language')
  const currentLang = lang ? locales[lang] : Object.values(locales).find((l) => l.default)
  const dispatch = useDispatch()

  useEffect(() => {
    setLocale(currentLang.code)
  }, [])

  // Activate the language dynamically
  async function dynamicActivate(locale) {
    const { messages } = await import(`../../locales/${locale}/messages.po`)
    i18n.load(locale, messages)
    i18n.activate(locale)
  }

  useEffect(() => {
    dispatch(changeLocale({ code: currentLang.code }))
    dynamicActivate(currentLang.code)
  }, [])

  // Switches Language
  const switchLanguage = (lang) => {
    setLocale(lang.code)
    dispatch(changeLocale(lang))
    dynamicActivate(lang.code)
  }

  return (
    <IntlContext.Provider value={{ locale, switchLanguage }}>
      <I18nProvider i18n={i18n}>{children}</I18nProvider>
    </IntlContext.Provider>
  )
}

export { IntlProviderWrapper, IntlContext }