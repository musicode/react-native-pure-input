'use strict'

import React, {
  Component,
  PropTypes,
} from 'react'

import {
  StyleSheet,
  TextInput,
  View,
} from 'react-native'

import objectIsChange from 'object-is-change'

const styles = StyleSheet.create({
  input: {
    flex: 1,
  }
})

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

  setNativeProps(props) {
    this.refs.input.setNativeProps(props)
  }

  shouldComponentUpdate(props) {
    return objectIsChange(props, this.props)
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
    } = this.props

    let input = (
      <TextInput
        {...this.props}
        ref="input"
        children={null}
        style={[styles.input, inputStyle]}
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
      <View style={style}>
        {first}
        {second}
      </View>
    )
  }
}
