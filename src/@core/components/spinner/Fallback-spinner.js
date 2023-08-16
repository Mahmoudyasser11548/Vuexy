import themeConfig from '../../../configs/themeConfig'

const SpinnerComponent = () => {
  return (
    <div className='fallback-spinner vh-100 d-flex flex-column'>
      <img className='fallback-logo mb-1' src={themeConfig.app.appLogoImage} alt='logo' width={120} />
      <div className='loading'>
        <div className='effect-1 effects'></div>
        <div className='effect-2 effects'></div>
        <div className='effect-3 effects'></div>
      </div>
    </div>
  )
}

export default SpinnerComponent
