import React, {Component} from 'react'
import {Motion, spring} from 'react-motion'
import PropTypes from 'prop-types'

export default class Collapsible extends Component {
  constructor (props) {
    super()

    this.state = {
      height: 0
    }
  }

  componentDidMount () {
    if (!this.props.collapsed) {
      this.setState({ height: calculateHeight(this.content) })
      this.props.onStartFPSCollection()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.collapsed && this.props.collapsed) {
      this.setState({ height: calculateHeight(this.content) })
      this.props.onStartFPSCollection()
      if (this.props.lowFPS && this.props.onSizeChanged) {
        setTimeout(this.props.onSizeChanged, 500)
      }
    } else if (nextProps.collapsed && !this.props.collapsed) {
      this.props.onStartFPSCollection()
    }
  }

  render () {
    const {children, collapsed, defaultCollapsed, onEndFPSCollection, minimumHeight} = this.props

    return <div ref={(div) => { this.content = div }}>
      {
        this.props.lowFPS
          ? this.renderRegular(children, collapsed, minimumHeight)
          : this.renderAnimation(children, defaultCollapsed, collapsed, onEndFPSCollection, minimumHeight)
      }
    </div>
  }

  renderRegular (children, collapsed, minimumHeight) {
    return <div
      style={{
        display: 'block',
        height: collapsed ? minimumHeight : 'auto',
        opacity: collapsed ? 0 : 1,
        overflow: collapsed ? 'hidden' : 'auto'
      }}>
      {children}
    </div>
  }

  renderAnimation (children, defaultCollapsed, collapsed, onEndFPSCollection, minimumHeight) {
    return <Motion
      style={{
        height: spring(collapsed ? minimumHeight : this.state.height),
        opacity: spring(collapsed ? 0 : 1)
      }}
      onRest={onEndFPSCollection}>
      {({height, opacity}) => <div
        style={{
          height: getHeight(
            collapsed,
            height + (collapsed
              ? 0
              : calculateHeight(this.content) - this.state.height
            ),
            calculateHeight(this.content)
          ),
          opacity,
          overflow: shouldOverflow(collapsed, height, this.state.height)
        }}>
        {children}
      </div>}
    </Motion>
  }
}

Collapsible.propTypes = {
  minimumHeight: PropTypes.number
}

Collapsible.defaultProps = {
  minimumHeight: 0
}

/**
 * Overflow rule to enable content to overflow outside the collapsible
 * once the animation is close to be complete (the last few pixels take a while
 * to be expanded). '10' is a magic number 🎩
 */
const shouldOverflow = (collapsed, animatedHeight, actualHeight) => {
  const notYetAlmostExpanded = actualHeight - animatedHeight > 10
  return (collapsed || notYetAlmostExpanded) ? 'hidden' : 'visible'
}

/**
 * Once it is fully expanded, we set the heigh to auto
 * and let the browser take care of the size
 */
const getHeight = (collapsed, animatedHeight, actualHeight) => {
  if (collapsed) { return animatedHeight }
  return animatedHeight === actualHeight ? 'auto' : animatedHeight
}

const calculateHeight = (node) => {
  if (!node) { return 0 }

  const container = node.children[0]
  if (!container) { return 0 }

  const content = container.children[0]
  if (!content) { return 0 }

  return content.getBoundingClientRect().height
}
