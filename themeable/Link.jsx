import Link from '../Link'
import themeable from '../lib/decorators/themeable'

const Component = themeable(Link, (customizations, props) => ({
  customize: {
    ...props.customize,
    textColor: customizations.color_link
  }
}))

Component.displayName = 'ThemeableLink'

export default Component