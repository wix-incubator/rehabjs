import Colors from './Colors';
import Fonts from './Fonts';

const primary = {
  bg: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
    borderWidth: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...Fonts.Button,
    color: Colors.white,
    textAlign: 'center',
  },
};

const outline = {
  bg: {
    ...primary.bg,
    backgroundColor: Colors.white,
    paddingVertical: 12,
  },
  text: {
    ...primary.text,
    color: Colors.primary,
  },
};

export default {
  primary,
  outline,
};
