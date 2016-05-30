'use strict'

import React, {
  Component,
} from 'react'

import {
  StyleSheet,
  PropTypes,
  TextInput,
  View,
  Text,
} from 'react-native'

const styles = StyleSheet.create({
  fakeText: {
    position: 'absolute',
    left: 3000,
  }
})

function diffObject(newObject, oldObject) {
  for (let key in newObject) {
    let newValue = newObject[key]
    let oldValue = oldObject[key]
    if (newValue !== oldValue) {
      let type = typeof newValue

      if (type === 'string'
        || type === 'number'
        || type === 'boolean'
      ) {
        return true
      }

      try {
        newValue = JSON.stringify(newValue)
        oldValue = JSON.stringify(oldValue)
        if (newValue !== oldValue) {
          return true
        }
      }
      catch (e) {
        return true
      }
    }
  }
  return false
}

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

  state = {
    inputWidth: 0,
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

  componentDidMount() {
    this.measureTextInput()
  }
  componentDidUpdate() {
    this.measureTextInput()
  }
  shouldComponentUpdate(props, state) {
    return diffObject(props, this.props)
      || diffObject(state, this.state)
  }

  measureTextInput() {
    if (!this.needAutoExpand()) {
      return
    }
    this.refs.input.measure((ox, oy, width, height) => {
      let { inputWidth } = this.state
      if (width != inputWidth) {
        this.setState({
          inputWidth: width
        })
      }
      else {
        this.measureFakeText()
      }
    })
  }

  measureFakeText() {
    this.refs.fakeText.measure((ox, oy, width, height) => {
      let { lineHeight, onLineChange } = this.props
      let lines = Math.round(height / lineHeight)
      if (lines !== this.inputLines
        && height !== this.inputHeight
      ) {
        this.inputHeight = height
        this.inputLines = lines
        onLineChange(lines)
      }
    })
  }

  needAutoExpand() {

    let {
      multiline,
      lineHeight,
      onLineChange,
    } = this.props

    return multiline
      && lineHeight > 0
      && typeof onLineChange === 'function'

  }

  render() {

    let {
      value,
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

    let fakeText
    if (inputStyle && this.needAutoExpand()) {

      let textStyle = StyleSheet.flatten(inputStyle)
      if ('height' in textStyle) {
        delete textStyle.height
      }

      let { inputWidth } = this.state
      textStyle.width = inputWidth

      fakeText = (
        <Text
          ref="fakeText"
          style={[styles.fakeText, textStyle]}
        >
          {value}
        </Text>
      )
    }

    return (
      <View style={style}>
        {first}
        {second}
        {fakeText}
      </View>
    )
  }
}
