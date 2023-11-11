import { Box, Container } from '@mui/material';
import Image from 'next/image';
import {
  CONTENT_WIDTH, VRIndicator, VRImage, VRText, GetIndicatorPosition,
  ASTIGMATISM_AXIS_SIZE_WIDTH,
  ASTIGMATISM_AXIS_SIZE_HEIGHT
} from '../components'
import { getValidObject, Sprintf } from '../utils'

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
  return <Box style={{
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 16,
    // backgroundColor: "#00ff0033",

    // paddingLeft:4,
    // paddingRight:4
  }}>
    <Box style={{
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
    }}>
      <Box >
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
          }}>{RIGHT.CV === 0 ? '측정불가' : RIGHT_C_11}</VRText>
      </Box>
      <Box style={{
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
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
            minWidth: 88,
            height: 28,
          }}>{RIGHT.CV > 0 ? RIGHT_C_12 : '  '}</VRText>
        <Box style={{
          display: 'flex',
          justifyContent: 'center',
        }}>
          {RIGHT.CV > 0 ?
            <Image
              alt={'ATR.png'}
              src={`/images/astigmatismAxis/${RIGHT_AXIS_IMAGE['SIMULATION']}.png`}
              width={40}
              height={40}
              style={{
                marginTop: 12,
                width: 40,
                height: 40
              }} /> : null}
        </Box>
      </Box>
      <Box style={{
        flex: 1,
        display: 'flex',
        // flexDirection: 'row',
        justifyContent: 'center',
      }}>
        {RIGHT.CV > 0 ?
          <Image
            alt={'ATR.png'}
            src={`/images/astigmatismAxis/${LEFT_AXIS_IMAGE['CORNEA']}.svg`}
            width={62}
            height={62}
            style={{
              position: 'absolute',
              marginTop: 19,
              marginLeft: 17,
              width: 62,
              height: 62,
              transform: `rotate(${180 - RIGHT.AXI}deg)`
            }} /> : null}
        <VRImage name={'axisRightEye'} style={{
          width: 134,
          height: 89,
          position: 'absolute',
        }} />
        {(RIGHT.CV > 0 && RIGHT.AXI > 0) ?
          <Image
            alt={'AXIS'}
            src={`/images/astigmatismAxis/axisSimulation/AXIS.svg`}
            width={62}
            height={62}
            style={{
              position: 'absolute',
              marginTop: 19,
              marginLeft: 18,
              width: 62,
              height: 62,
              transform: `rotate(${180 - RIGHT.AXI}deg)`
            }} /> : null}
        {RIGHT.AXI > 0?<VRImage name={'indicator/RU'} style={{
          position: 'absolute',
          marginLeft: -132,
          marginTop: 2,
          width: 20,
          height: 21
        }} />:null}
      </Box>
    </Box>
    <Box style={{
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
    }}>
      <Box >
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
          }}>{LEFT.CV === 0 ? '측정불가' : LEFT_C_11}</VRText>
      </Box>
      <Box style={{
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
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
            minWidth: 88,
            height: 28
          }}>{LEFT.CV > 0 ? LEFT_C_12 : ''}</VRText>
        <Box style={{
          display: 'flex',
          justifyContent: 'center',
        }}>
          {LEFT.CV > 0 ?
            <Image
              alt={'ATR.png'}
              src={`/images/astigmatismAxis/${LEFT_AXIS_IMAGE['SIMULATION']}.png`}
              width={40}
              height={40}
              style={{
                marginTop: 12,
                width: 40,
                height: 40
              }} /> : <Box style={{
                marginTop: 12,
                width: 40,
                height: 40
              }} />}
        </Box>
      </Box>
      <Box style={{
        flex: 1,
        display: 'flex',
        // flexDirection: 'row',
        justifyContent: 'center',
      }}>
        {LEFT.CV > 0 ? <Image
          alt={'ATR.png'}
          src={`/images/astigmatismAxis/${LEFT_AXIS_IMAGE['CORNEA']}.svg`}
          width={62}
          height={62}
          style={{
            position: 'absolute',
            marginTop: 19,
            marginLeft: -18,
            width: 62,
            height: 62,
            transform: `rotate(${180 - LEFT.AXI}deg)`
          }} /> : null}
        <VRImage name={'axisLeftEye'} style={{
          position: 'absolute',
          width: 134,
          height: 89,
        }} />
        {(LEFT.CV > 0 && LEFT.AXI > 0) ? <Image
          alt={'AXIS.png'}
          src={`/images/astigmatismAxis/axisSimulation/AXIS.svg`}
          width={62}
          height={62}
          style={{
            position: 'absolute',
            marginTop: 19,
            marginLeft: -16,
            width: 62,
            height: 62,
            transform: `rotate(${180 - LEFT.AXI}deg)`
          }} /> : null}
        {LEFT.AXI > 0?<VRImage name={'indicator/LD'} style={{
          position: 'absolute',
          // left: 608,.
          marginLeft: -132,
          marginTop: 4,
          width: 20,
          height: 21
        }} />:null}
      </Box>

    </Box>
  </Box>
}

export const AstigmatismAxis = ({
  userData,
  style = {}
}: {
  // name: string,
  // date: string
  userData: any
  style?: any
}) => {
  const { EYES: { LEFT, RIGHT }, AGE_INFO } = userData
  return (
    <Box style={{
      // display: 'flex', 
      // backgroundColor: "#00ff0033",
      width: CONTENT_WIDTH,
      paddingTop: 2,
      ...style
    }}>
      <Box style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
      }}>
        <VRImage name={'astigmatismAxisScript'} style={{
          width: 549,
          height: 28
        }} />
        <Box style={{
          marginLeft: 8,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'row',
          borderColor: "#E2E6F6",
          alignItems: 'center',
          justifyContent: 'center',
        }}
          sx={{
            borderTop: 1,
            borderBottom: 1
          }}
        >
          <VRImage name={'eyeParts2'} style={{
            width: 128,
            height: 15,
            objectFit: 'contain'
          }} />
        </Box>
      </Box>
      <Box style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        // backgroundColor: "#00ff0033",

        // paddingLeft:4,
        // paddingRight:4
      }}>
        <EYE_AXIS RIGHT={RIGHT} LEFT={LEFT} />
      </Box>
      <AstigmatismAxiseverity
        RIGHT={RIGHT} LEFT={LEFT}
        AGE_INFO={AGE_INFO} style={{
          marginLeft: -16,
          width: ASTIGMATISM_AXIS_SIZE_WIDTH,
          marginTop: 16,
          marginBottom: 12
        }} />
      <Box style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
        <VRImage name={'caution/caution1'} style={{
          width: 323,
          height: 48
        }} />
        <VRImage name={'caution/notice1'} style={{
          width: 392,
          height: 48
        }} />
      </Box>
    </Box>
  )
}

export function AstigmatismAxiseverity({
  LEFT,
  RIGHT,
  AGE_INFO = 0,
  style = {}
}: {
  LEFT: any,
  RIGHT: any,
  AGE_INFO?: any
  style: any,
},
) {
  const { AXI: RAXI } = RIGHT
  const { AXI: LAXI } = LEFT
  const { fileNameKey } = AGE_INFO

  const startX = 15
  const endX = 736

  let RAXI_POS = GetIndicatorPosition({
    startX,
    endX,
    startValue: (RAXI > 90) ? 180 : 0,
    endValue: 90,
    value: RAXI
  })
  let LAXI_POS = GetIndicatorPosition({
    startX,
    endX,
    startValue: (LAXI > 90) ? 180 : 0,
    endValue: 90,
    value: LAXI
  })

  return (
    <Box style={{
      display: 'flex',
      marginLeft: 6,
      ...style,
    }}>
      <VRImage name={`astigmatismAxis/${fileNameKey}`} style={{
        width: ASTIGMATISM_AXIS_SIZE_WIDTH,
        height: ASTIGMATISM_AXIS_SIZE_HEIGHT
      }} />
      {RIGHT.CV === 0 || RAXI === 0 ? null : <VRIndicator type={'RIGHT'} position={RAXI_POS} top={45} />}
      {LEFT.CV === 0 || LAXI === 0 ? null : <VRIndicator type={'LEFT'} position={LAXI_POS} top={-1} />}
    </Box>
  )
}
