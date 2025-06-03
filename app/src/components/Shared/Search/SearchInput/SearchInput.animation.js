import { Animated } from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

export const AnimatedIcon = Animated.createAnimatedComponent(AwesomeIcon);

const animValue = new Animated.Value(0);

const arrowAnimation = {
  transform: [
    {
      translateX: animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-100, 5],
      }),
    },
  ],
};

const inputAnimationWidth = animValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['100%', '97%'],
});

const inputAnimation = {
  transform: [
    {
      translateX: animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0],
      }),
    },
  ],
};

const animatedTransition = Animated.spring(animValue, {
  toValue: 1,
  useNativeDriver: false,
});

const animatedTransitionReset = Animated.spring(animValue, {
  toValue: 0,
  useNativeDriver: false,
});

export const searchAnimation = {
  arrow: arrowAnimation,
  inputWidth: inputAnimationWidth,
  input: inputAnimation,
  transition: animatedTransition,
  transitionReset: animatedTransitionReset,
};
