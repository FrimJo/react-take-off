import 'twin.macro'

const FooterView = () => {
  return (
    <footer tw="bg-white dark:bg-gray-800 pt-4 pb-8 xl:pt-8">
      <div tw="max-w-screen-lg xl:max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 text-gray-400 dark:text-gray-300">
        <ul tw="text-lg font-light pb-8 flex flex-wrap justify-center">
          <li tw="w-1/2 md:w-1/3 lg:w-1/3">
            <div tw="text-center">
              <h2 tw="text-gray-500 dark:text-gray-200 text-base uppercase mb-4">Components</h2>
              <ul>
                <li tw="mb-4 hover:text-gray-800 dark:hover:text-white transition-colors duration-200">
                  <a href="#">Elements</a>
                </li>
                <li tw="mb-4 hover:text-gray-800 dark:hover:text-white transition-colors duration-200">
                  <a href="#">Forms</a>
                </li>
                <li tw="mb-4 hover:text-gray-800 dark:hover:text-white transition-colors duration-200">
                  <a href="#">Commerces</a>
                </li>
                <li tw="mb-4 hover:text-gray-800 dark:hover:text-white transition-colors duration-200">
                  <a href="#">Navigation</a>
                </li>
              </ul>
            </div>
          </li>
          <li tw="w-1/2 md:w-1/3 lg:w-1/3">
            <div tw="text-center">
              <h2 tw="text-gray-500 dark:text-gray-200 text-base uppercase mb-4">Contacts</h2>
              <ul>
                <li tw="mb-4 hover:text-gray-800 dark:hover:text-white transition-colors duration-200">
                  <a href="#">Github</a>
                </li>
                <li tw="mb-4 hover:text-gray-800 dark:hover:text-white transition-colors duration-200">
                  <a href="#">Facebook</a>
                </li>
                <li tw="mb-4 hover:text-gray-800 dark:hover:text-white transition-colors duration-200">
                  <a href="#">Twitter</a>
                </li>
                <li tw="mb-4 hover:text-gray-800 dark:hover:text-white transition-colors duration-200">
                  <a href="#">LinkedIn</a>
                </li>
              </ul>
            </div>
          </li>
          <li tw="w-1/2 md:w-1/3 lg:w-1/3">
            <div tw="text-center">
              <h2 tw="text-gray-500 dark:text-gray-200 text-base uppercase mb-4">Customization</h2>
              <ul>
                <li tw="mb-4 hover:text-gray-800 dark:hover:text-white transition-colors duration-200">
                  <a href="#">Settings</a>
                </li>
                <li tw="mb-4 hover:text-gray-800 dark:hover:text-white transition-colors duration-200">
                  <a href="#">Themes</a>
                </li>
                <li tw="mb-4 hover:text-gray-800 dark:hover:text-white transition-colors duration-200">
                  <a href="#">Plugins</a>
                </li>
                <li tw="mb-4 hover:text-gray-800 dark:hover:text-white transition-colors duration-200">
                  <a href="#">LinkedIn</a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default FooterView
