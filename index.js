
import React, {
  Component,
} from 'react'

import {
  StyleSheet,
  TextInput,
  View,
  Platform,
} from 'react-native'

import PropTypes from 'prop-types'

const inputStyle = {
  flex: 1,
}

if (Platform.OS === 'android') {
  inputStyle.paddingVertical = 0
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: inputStyle,
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
    underlineColorAndroid: 'rgba(0,0,0,0)',
    placeholderTextColor: 'rgba(0,0,0,0.2)',
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

    let inputStyles = [ styles.input ]
    if (props.multiline) {
      inputStyles.push({
        textAlignVertical: 'top'
      })
    }
    if (inputStyle) {
      inputStyles.push(inputStyle)
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
      <View style={[styles.view, style]}>
        {first}
        {second}
      </View>
    )
  }
}
