'use strict';
import React from 'react-native';
import RadioButtons from './';

const {
  Text,
  TouchableWithoutFeedback,
  View,
  Platform
} = React;

class SegmentedControlsMaterial extends React.Component {

  render(){
    const config = this.getConfig();

    return (
      <RadioButtons {...this.props}
        renderOption={ this.renderOption.bind(this, config) }
        renderContainer={ this.renderContainer.bind(this, config) }
      />
    );
  }

  getConfig(){
    return {
      ...DEFAULTS,
      ...this.props,
    };
  }

  renderContainer(config, options){
    var containerStyle = {
      flexDirection: config.direction,
      backgroundColor: config.backgroundColor,
      overflow: 'hidden',
      ...this.props.containerStyle,
    };

    // overflow hidden does not clip subviews: https://github.com/facebook/react-native/issues/3198
    if (Platform.OS !== "android") {
      containerStyle.borderRadius = config.containerBorderRadius;
    }

    return <View style={ containerStyle }>{options}</View>;
  }

  renderOption(config, option, selected, onSelect, index){
    const baseTextStyle = {
      textAlign: config.textAlign,
      color: config.textTint,
      backgroundColor: config.backgroundColor,
    };

    const selectedTextStyle = [baseTextStyle, {
      color: config.selectedTextTint,
    }]

    const textStyle = selected ? selectedTextStyle : baseTextStyle;

    const baseColor = selected ? config.selectedBackgroundColor: config.backgroundColor;

    const baseOptionContainerStyle = {
      flex: 1,
      justifyContent: 'center',
      paddingTop: 5,
      paddingBottom: 5,
      height: 48,
      backgroundColor: config.backgroundColor,
    };

    console.log('backgroundColor', config.backgroundColor);

    const containerStyle = selected ? [baseOptionContainerStyle, {
      borderColor: config.selectedTabTint,
      borderBottomWidth: 2,
    }] : baseOptionContainerStyle;

    const label = (this.props.extractText ? this.props.extractText(option) : option).toUpperCase();

    // Default to true for undefined - like RN currently does
    const scaleFont = (this.props.allowFontScaling === false) ? false : true;

    return (
      <TouchableWithoutFeedback onPress={onSelect} key={index}>
        <View style={containerStyle}>
          {typeof this.props.renderOption === 'function' ? this.props.renderOption.call(this, option, selected) : (
            <Text allowFontScaling={scaleFont} style={textStyle}>{label}</Text>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}


const DEFAULTS = {
  direction: 'row',

  textTint: '#69d7e5',
  selectedTextTint: '#f8fdfd',
  backgroundColor: '#00bcd4',
  selectedTabTint: '#ffff98',

  paddingTop: 5,
  paddingBottom: 5,
  textAlign: 'center',
};

export default SegmentedControlsMaterial;
