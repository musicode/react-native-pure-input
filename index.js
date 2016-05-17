'use strict'

import React, {
  Component,
  PropTypes,
  TextInput,
  View,
} from 'react-native'

export default class Input extends Component {

  static propTypes = {
    ...TextInput.propTypes,
    inputStyle: TextInput.propTypes.style,
    inputAlign: PropTypes.string,
    lineHeight: PropTypes.number,
    onLineChange: PropTypes.func,
  }

  static defaultProps = {
    autoCorrect: false,
    autoCapitalize: 'none',
    inputAlign: 'left',
  }

  isFocused() {
    this.refs.input.isFocused()
  }

  focus() {
    this.refs.input.focus()
  }

  blur() {
    this.refs.input.blur()
  }

  clear() {
    this.refs.input.clear()
  }

  handleChange = event => {

    let {
      multiline,
      lineHeight,
      onChange,
      onLineChange,
    } = this.props

    if (typeof onLineChange === 'function'
      && lineHeight > 0
      && multiline
    ) {
      let { height } = event.nativeEvent.contentSize
      let lines = Math.round(height / lineHeight)
      onLineChange(lines)
    }

    if (typeof onChange === 'function') {
      return onChange(event)
    }

  }

  render() {

    let {
      children,
      style,
      inputStyle,
      inputAlign,
    } = this.props

    let input = (
      <TextInput
        {...this.props}
        ref="input"
        children={null}
        style={inputStyle}
        onChange={this.handleChange}
      />
    )

    let first = input
    let second

    if (children && typeof children !== 'string') {
      if (inputAlign === 'left') {
        second = children
      }
      else {
        first = children
        second = input
      }
    }

    return (
      <View style={style}>
        {first}
        {second}
      </View>
    )
  }
}
