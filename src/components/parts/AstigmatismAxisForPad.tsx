import { Box, Container } from '@mui/material';
import Image from 'next/image';
import { VRImage, VRText, ASTIGMATISM_AXIS_SIZE_WIDTH } from '../components'
import { getValidObject } from '../utils'
import { AstigmatismAxiseverity } from './AstigmatismAxis';

const EYE_AXIS = ({ RIGHT, LEFT }: { RIGHT: any, LEFT: any }) => {
  const {
    C_11: RIGHT_C_11,
    C_12: RIGHT_C_12,
    AXIS_IMAGE: RIGHT_AXIS_IMAGE
  } = getValidObject(RIGHT, 'refractiveError')
  const {
    C_11: LEFT_C_11,
    C_12: LEFT_C_12,
    AXIS_IMAGE: LEFT_AXIS_IMAGE
  } = getValidObject(LEFT, 'refractiveError')
  const corneaSize = 134
  const showRightAxis = (RIGHT.CV > 0 && RIGHT.AXI > 0)
  const showLeftAxis = (LEFT.CV > 0 && LEFT.AXI > 0)
  return <Box style={{
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    height: 308
  }}
    gap={2}
  >
    <Box style={{
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      paddingTop: 36,
    }}>
      {RIGHT.CV > 0 ?
        <Image
          alt={'ATR.png'}
          src={`/images/astigmatismAxis/${RIGHT_AXIS_IMAGE['CORNEA']}.svg`}
          width={corneaSize}
          height={corneaSize}
          style={{
            position: 'absolute',
            marginTop: 49,
            marginLeft: 33,
            width: corneaSize,
            height: corneaSize,
            transform: `rotate(${180 - RIGHT.AXI}deg)`
          }} /> : null}
      <VRImage name={'axisRightEyePad'} style={{
        marginTop: 24,
        width: 284,
        height: 180,
        position: 'absolute',
      }} />
      {showRightAxis ?
        <Image
          alt={'AXIS'}
          src={`/images/astigmatismAxis/axisSimulation/AXIS.svg`}
          width={corneaSize}
          height={corneaSize}
          style={{
            position: 'absolute',
            marginTop: 49,
            marginLeft: 36,
            width: corneaSize,
            height: corneaSize,
            transform: `rotate(${180 - RIGHT.AXI}deg)`
          }} /> : null}
      {RIGHT.CV > 0 ?
        <Image
          alt={'RIGHT_ATR.png'}
          src={`/images/astigmatismAxis/${RIGHT_AXIS_IMAGE['SIMULATION']}.png`}
          width={90}
          height={90}
          style={{
            position: 'absolute',
            marginLeft: -250,
            marginTop: 156
          }} /> : null}
    </Box>
    <Box style={{
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
    }}>
      <Box style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 36,
      }}>
        {LEFT.CV > 0 ?
          <Image
            alt={'ATR.png'}
            src={`/images/astigmatismAxis/${LEFT_AXIS_IMAGE['CORNEA']}.svg`}
            width={corneaSize}
            height={corneaSize}
            style={{
              position: 'absolute',
              marginTop: 48,
              marginLeft: -40,
              width: corneaSize,
              height: corneaSize,
              transform: `rotate(${180 - LEFT.AXI}deg)`
            }} />
          : null}
        <VRImage name={'axisLeftEyePad'} style={{
          marginTop: 24,
          width: 284,
          height: 180,
          position: 'absolute',
        }} />
        {showLeftAxis ?
          <Image
            alt={'AXIS.png'}
            src={`/images/astigmatismAxis/axisSimulation/AXIS.svg`}
            width={corneaSize}
            height={corneaSize}
            style={{
              position: 'absolute',
              marginTop: 49,
              marginLeft: -37,
              width: corneaSize,
              height: corneaSize,
              transform: `rotate(${180 - LEFT.AXI}deg)`
            }} /> : null}
        {LEFT.CV > 0 ?
          <Image
            alt={'LEFT_ATR.png'}
            src={`/images/astigmatismAxis/${LEFT_AXIS_IMAGE['SIMULATION']}.png`}
            width={90}
            height={90}
            style={{
              position: 'absolute',
              marginLeft: 250,
              marginTop: 156
            }} /> : null}
      </Box>
    </Box>
  </Box>
}

const EYE_AXIS_TEXT = (EYE: any) => {
  const {
    C_11,
    C_12,
  } = getValidObject(EYE, 'refractiveError')

  return <Box style={{
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
  }}>
    <VRText
      weight="600"
      style={{
        backgroundColor: "#113287",
        padding: 5,
        borderRadius: 4,
        color: "#ffffff",
        fontSize: 12,
        textAlign: 'center',
        paddingLeft: 24,
        paddingRight: 24,
        marginRight: 8
      }}>{EYE.CV === 0 ? '측정불가' : C_11}</VRText>
    <VRText
      weight="500"
      style={{
        backgroundColor: "#F3F6FF",
        padding: 6,
        borderRadius: 4,
        color: "#113287",
        fontSize: 10,
        textAlign: 'center',
        paddingLeft: 24,
        paddingRight: 24,
        minWidth: 80
      }}>{EYE.CV > 0 ? C_12 : ''}</VRText>
  </Box>
}

export const AstigmatismAxisForPad = ({
  userData,
  style = {}
}: {
  // name: string,
  // date: string
  userData: any
  style?: any
}) => {
  const { EYES: { LEFT, RIGHT }, AGE_INFO } = userData
  const titleColor = '#020F50'
  return (
    <Box style={{
      ...style
    }}>
      <Box style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 8,
      }}
        gap={2}
      >
        <Box style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
        >
          <Box style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}>
            <VRText size={24} color={titleColor} weight={'500'}>오른눈</VRText>
            <VRText size={16} color={titleColor} weight={'500'} style={{
              marginLeft: 8,
              marginBottom: 4
            }}>right eye</VRText>
          </Box>
          <Box style={{
            display: 'flex',
            marginTop: 12,
            height: 1,
            background: titleColor
          }} />
        </Box>
        <Box style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}>
          <Box style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}>
            <VRText size={24} color={titleColor} weight={'500'}>왼눈</VRText>
            <VRText size={16} color={titleColor} weight={'500'} style={{
              marginLeft: 8,
              marginBottom: 4
            }}>left eye</VRText>
          </Box>
          <Box style={{
            display: 'flex',
            marginTop: 12,
            height: 1,
            background: titleColor
          }} />
        </Box>
      </Box>
      <EYE_AXIS RIGHT={RIGHT} LEFT={LEFT} />
      <Box style={{
        display: 'flex',
        // flex:1,
        position: 'absolute',
        marginTop: -284,
        left: 0,
        right: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Box style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          borderColor: "#E2E6F6",
          padding: 4,
        }}
          sx={{
            width: 190,
            flexDirection: 'row',
            justifyContent: 'center',
            // paddingRight:16,
            borderTop: 1,
            borderBottom: 1
          }}
        >
          <VRImage name={'eyeParts2'}
            style={{
              width: 128,
              height: 15,
              objectFit: 'contain'
            }} />
        </Box>
        <Image
          alt={'NM.png'}
          src={`/images/astigmatismAxis/axisSimulation/NM.png`}
          width={90}
          height={90}
          style={{
            // position: 'absolute',
            // marginLeft: -250,
            marginTop: 8,
            marginBottom: 104
          }} />
        <Box style={{
          display: 'flex',
          left: 0,
          right: 0,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
          <Box style={{
            paddingLeft: 8,
            paddingRight: 8,
            borderColor: "#E2E6F6",
          }}
            sx={{
              borderTop: 1,
              borderBottom: 1
            }}
          ><VRText
            weight="500"
            style={{
              // flexGrow: 1,
              // backgroundColor: "#0000ff33",
              // flex:1,
              flexShrink: 0,
              padding: 6,
              color: "#113287",
              fontSize: 10,
              textAlign: 'center',
            }}>{RIGHT.refractiveError.C_08 || LEFT.refractiveError.C_08}</VRText></Box></Box>
      </Box>
      <Box style={{
        display: 'flex',
        marginTop: -6,
        height: 1,
        background: titleColor,
        marginBottom: 24
      }} />
      <Box
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginBottom: 8,
          marginLeft: 21,
          width: 723,
        }}
        gap={2}
      >
        {EYE_AXIS_TEXT(RIGHT)}
        {EYE_AXIS_TEXT(LEFT)}
      </Box>
      <AstigmatismAxiseverity
        RIGHT={RIGHT} LEFT={LEFT}
        AGE_INFO={AGE_INFO} style={{
          width: ASTIGMATISM_AXIS_SIZE_WIDTH,
          marginTop: 16,
          marginBottom: 12
        }} />
    </Box>
  )
}
