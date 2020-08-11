import Colors from './Colors';
import Fonts from './Fonts';

export default {
  regular: {
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
    color: Colors.primary,

    ...Fonts.Input,

    borderWidth: 2,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
};
