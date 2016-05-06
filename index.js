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
  }

  static defaultProps = {
    autoCorrect: false,
    autoCapitalize: 'none',
    inputAlign: 'left',
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

    return (
      <View style={style}>
        {first}
        {second}
      </View>
    )
  }
}
