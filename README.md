# react-native-pure-input

pure text input, without any style.


## Installation

```shell
npm install --save react-native-pure-input
```

## Example

```javascript
import Input from 'react-native-pure-input'

class Example extends Component {

    render() {
        return (
            <Input
                style={{borderTopWidth: 1, borderTopColor: '#CCC'}}
                inputStyle={{backgroundColor: '#FFF', fontSize: 14}}
                inputAlign="left: input + icon or right: icon + input"
            >
                <Icon ... />
            </Input>
        )
    }
}
```