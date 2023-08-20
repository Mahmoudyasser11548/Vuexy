// ** Third Party Components
import { useTranslation } from "react-i18next"
import ReactCountryFlag from "react-country-flag"

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from "reactstrap"

import { locales } from '../../../../redux/SupportedLocales'


const IntlDropdown = () => {
  // ** Hooks
  const { i18n } = useTranslation()

  // ** Vars
  const langObj = locales

  // ** Function to switch Language
  const handleLangUpdate = (e, lang) => {
    e.preventDefault()
    i18n.changeLanguage(lang)
  }

  return (
    <UncontrolledDropdown href='/' tag='li' className='dropdown-language nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link' onClick={e => e.preventDefault()}>
        <ReactCountryFlag
          className='country-flag flag-icon'
          countryCode={locales.en.code }
          svg
        />
        <span className='selected-language'>{langObj.en.name}</span>
      </DropdownToggle>
      <DropdownMenu className='mt-0' end>
        {locales && Object.keys(locales).map((key, i) => {
          return (
          <DropdownItem key={i} href='/' tag='a' onClick={e => handleLangUpdate(e, locales[key])}>
            <ReactCountryFlag className='country-flag' countryCode={locales[key].flag} svg />
            <span className='ml-1 ms-1'>{locales[key].name}</span>
          </DropdownItem>
        )})}
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default IntlDropdown
