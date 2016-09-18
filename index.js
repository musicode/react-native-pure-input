'use strict'

import React, {
  Component,
  PropTypes,
} from 'react'

import {
  StyleSheet,
  TextInput,
  Platform,
  View,
} from 'react-native'

const isAndroid = Platform.OS === 'android'

function getVerticalPaddings(style) {

  let {
    paddingTop,
    paddingBottom,
    paddingVertical,
  } = style

  if (paddingVertical) {
    if (!paddingTop) {
      paddingTop = paddingVertical
    }
    if (!paddingBottom) {
      paddingBottom = paddingVertical
    }
  }

  return {
    paddingTop: paddingTop || 0,
    paddingBottom: paddingBottom || 0,
  }
}

function flattenStyle(style) {
  let result = {}
  if (Array.isArray(style)) {
    style.forEach(style => {
      Object.assign(result, flattenStyle(style))
    })
  }
  else {
    if (typeof style === 'number') {
      style = StyleSheet.flatten(style)
    }
    if (style && typeof style === 'object') {
      Object.assign(result, style)
    }
  }
  return result
}

export default class Input extends Component {

  static propTypes = {
    ...TextInput.propTypes,
    inputStyle: TextInput.propTypes.style,
    inputAlign: PropTypes.string,
    onHeightChange: PropTypes.func,
  }

  static defaultProps = {
    autoCorrect: false,
    autoCapitalize: 'none',
    underlineColorAndroid: 'rgba(0,0,0,0)',
    placeholderTextColor: 'rgba(0,0,0,0.2)',
    inputAlign: 'left',
    inputStyle: {
      backgroundColor: '#FFF',
      fontSize: 14,
      paddingHorizontal: 14,
    }
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

  setNativeProps(props) {
    this.refs.input.setNativeProps(props)
  }

  handleContentSizeChange = event => {

    let {
      onHeightChange,
      onContentSizeChange,
    } = this.props

    if (this.needAutoExpand()) {
      let { height } = event.nativeEvent.contentSize
      if (this.height !== height) {
        this.height = height
        onHeightChange(height)
      }
    }

    if (typeof onContentSizeChange === 'function') {
      onContentSizeChange(event)
    }
  }

  needAutoExpand() {

    let {
      multiline,
      onHeightChange,
    } = this.props

    return multiline
      && typeof onHeightChange === 'function'

  }

  render() {

    let {
      children,
      style,
      inputStyle,
      inputAlign,
      ...props
    } = this.props

    let styles = flattenStyle(style)
    let inputStyles = flattenStyle([
      {
        flex: 1,
      },
      inputStyle
    ])

    if (isAndroid) {

        let paddings = getVerticalPaddings(styles)
        let inputPaddings = getVerticalPaddings(inputStyles)

        styles.paddingTop = paddings.paddingTop + inputPaddings.paddingTop
        styles.paddingBottom = paddings.paddingBottom + inputPaddings.paddingBottom

        inputStyles.paddingVertical =
        inputStyles.paddingTop =
        inputStyles.paddingBottom = 0

        if (!props.textAlignVertical && props.multiline) {
          props.textAlignVertical = 'top'
        }
    }

    let input = (
      <TextInput
        {...props}
        ref="input"
        style={inputStyles}
        onContentSizeChange={this.handleContentSizeChange}
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
      <View style={styles}>
        {first}
        {second}
      </View>
    )
  }
}
