import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Animated } from 'react-native';
import { PanGestureHandler, State }  from 'react-native-gesture-handler'

import Header from '../../Components/Header';
import Tabs from '../../Components/Tabs';
import Menu from '../../Components/Menu';

import  { Container, Content, Card, CardHeader, CardContent, Title, Description, CardFooter, Annotation } from './styles'


export default function Main() {
  let offset = 0;
  const translateY = new Animated.Value(0);
  const animatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        }
      }
    ],
    { useNativeDriver: true },
  )
  function onHandlerStateChanged(event) {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let opened = false;
      const { translationY } = event.nativeEvent;
      offset += translationY;
      if ( translationY >= 20) {
        opened = true;
      } else {
          translateY.setValue(offset);
          translateY.setOffset(0);
          offset = 0;
      }
        Animated.timing(translateY, {
          toValue: opened ? 380: 0,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          offset = opened ? 380: 0;
          translateY.setOffset(offset);
          translateY.setValue(0);
        });
    }
  }

  return(
    <Container>
      <Header />

        <Content>
          <Menu translateY={translateY}/>
          <PanGestureHandler
            onGestureEvent={animatedEvent}
            onHandlerStateChange={onHandlerStateChanged}
          >
            <Card style={{
              transform: [{
                translateY: translateY.interpolate({
                  inputRange: [-200, 0, 325],
                  outputRange: [-20, 0, 325],
                  extrapolate: 'clamp',
                }
                ),
              }],
            }}>
              <CardHeader>
                  <Icon name="attach-money" size={28} color="#666" />
                  <Icon name="visibility-off" size={28} color="#666" />
              </CardHeader>
              <CardContent>
                  <Title>Saldo disponível</Title>
                  <Description>R$ 198.223,89</Description>
              </CardContent>
              <CardFooter>
                  <Annotation>
                    Transferência de R$ 879,00 recebida de Iury Felipe hoje às 07:34h
                  </Annotation>
              </CardFooter>
            </Card>
            </PanGestureHandler>
        </Content>

      <Tabs translateY={translateY}/>

    </Container>
  )
};