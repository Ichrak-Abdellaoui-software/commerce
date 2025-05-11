import {View, Text, Pressable, Image} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../components/Button';
import COLORS from '../consts/colors';
const Welcome = ({navigation}) => {
  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[COLORS.dark, COLORS.gold]}>
      <View style={{flex: 1}}>
        <View>
          <Image
            source={require('../Images/3.jpg')}
            style={{
              height: 100,
              width: 100,
              borderRadius: 20,
              position: 'absolute',
              top: 10,
              transform: [
                {translateX: 20},
                {translateY: 50},
                {rotate: '-15deg'},
              ],
            }}
          />

          <Image
            source={require('../Images/1.jpg')}
            style={{
              height: 100,
              width: 100,
              borderRadius: 20,
              position: 'absolute',
              top: -30,
              left: 100,
              transform: [
                {translateX: 50},
                {translateY: 50},
                {rotate: '-5deg'},
              ],
            }}
          />

          <Image
            source={require('../Images/4.jpg')}
            style={{
              width: 100,
              height: 100,
              borderRadius: 20,
              position: 'absolute',
              top: 130,
              left: -50,
              transform: [
                {translateX: 50},
                {translateY: 50},
                {rotate: '15deg'},
              ],
            }}
          />

          <Image
            source={require('../Images/2.jpg')}
            style={{
              height: 200,
              width: 200,
              borderRadius: 20,
              position: 'absolute',
              top: 110,
              left: 100,
              transform: [
                {translateX: 50},
                {translateY: 50},
                {rotate: '-15deg'},
              ],
            }}
          />
        </View>

        {/* content  */}

        <View
          style={{
            paddingHorizontal: 22,
            position: 'absolute',
            top: 400,
            width: '100%',
          }}>
          <Text
            style={{
              fontSize: 50,
              fontWeight: 800,
              color: COLORS.white,
            }}>
            ​𝐋𝐞𝐭'𝐬 𝐆𝐞𝐭
          </Text>
          <Text
            style={{
              fontSize: 46,
              fontWeight: 800,
              color: COLORS.white,
            }}>
            𝐒𝐭𝐚𝐫𝐭𝐞𝐝
          </Text>

          <View style={{marginVertical: 22}}>
            <Text
              style={{
                fontSize: 22,
                color: COLORS.white,
                marginVertical: 4,
              }}>
              𝕮𝖔𝖓𝖓𝖊𝖈𝖙 𝖜𝖎𝖙𝖍 𝖘𝖍𝖔𝖕𝖕𝖎𝖓𝖌 𝖘𝖊𝖆𝖒𝖑𝖊𝖘𝖘𝖑𝖞, 𝖇𝖑𝖊𝖓𝖉𝖎𝖓𝖌 𝖈𝖔𝖓𝖛𝖊𝖓𝖎𝖊𝖓𝖈𝖊 𝖆𝖓𝖉
              𝖊𝖓𝖏𝖔𝖞𝖒𝖊𝖓𝖙.
            </Text>
          </View>

          <Button
            title="
            𝙎𝙩𝙖𝙧𝙩"
            onPress={() => navigation.navigate('TabsStack')}
            style={{
              marginTop: 5,
              width: '100%',
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              marginTop: 18,
              justifyContent: 'center',
            }}></View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Welcome;
