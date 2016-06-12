const Colors = require('material-ui/styles/colors');
const ColorManipulator = require('material-ui/utils/colorManipulator');
const Spacing = require('material-ui/styles/spacing');

/*
  Theme for google material ui
 */
export default {
  spacing: Spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: Colors.blue500,
    primary2Color: Colors.blue700,
    primary3Color: Colors.lightBlack,
    accent1Color: Colors.redA200,
    accent2Color: Colors.grey100,
    accent3Color: Colors.grey500,
    textColor: Colors.darkBlack,
    alternateTextColor: Colors.white,
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
  },
  userAgent: 'all',
};
