import { Box } from '@mui/material';
import { Svg, Circle, Text, Rect, Line } from 'react-svg-path';
import { ASTIGMATISM_SIZE_WIDTH, APP_COLOR, VRImage, VRText } from '../components'
import { isValidObject } from '../utils'
import { Severity } from './RefractiveError';
import { Astigmatism } from './Astigmatism'


export const RefractiveErrorForPad = ({
  userData,
  useCYL = true,
  style = {}
}: {
  // name: string,
  userData: any
  useCYL?: boolean
  style?: any
}) => {
  if (!isValidObject(userData)) return null;

  const { EYES: { LEFT, RIGHT }, AGE_INFO } = userData
  const titleColor = '#020F50'
  const eyeOffset = useCYL ? {
    marginTop: -10,
    marginBottom: 10
  } : {

  }
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
          <Box style={{
            ...eyeOffset
          }}>
            <Box style={{
              position: 'absolute',
            }}>
              <SPH_CYL EYE={RIGHT} useCYL={useCYL} />
            </Box>
            <VRImage name={'RETINA'} style={{
              width: RETINA_SIZE_WIDTH,
              height: RETINA_SIZE_HEIGHT,
            }} />
          </Box>
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
          <Box style={{
            ...eyeOffset
          }}>
            <Box style={{
              position: 'absolute',
            }}>
              <SPH_CYL EYE={LEFT} useCYL={useCYL} />
            </Box>
            <VRImage name={'RETINA'} style={{
              width: RETINA_SIZE_WIDTH,
              height: RETINA_SIZE_HEIGHT,
            }} />
          </Box>
        </Box>
      </Box>
      <Box style={{
        display: 'flex',
        marginTop: -6,
        height: 1,
        background: titleColor,
        marginBottom: 24
      }} />
      {useCYL ? <Box style={{
        display: 'flex',
        // flex:1,
        position: 'absolute',
        marginTop: -80,
        left: 0,
        right: 0,
        // backgroundColor:"#ff000033",
        flexDirection: 'row',
        justifyContent: 'center',
      }}> <Box style={{
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
        }}>{RIGHT.refractiveError.C_08 || LEFT.refractiveError.C_08}</VRText></Box></Box> :
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
          {SPH_CYL_TEXT(RIGHT)}
          {SPH_CYL_TEXT(LEFT)}
        </Box>
      }
      {useCYL ? <Astigmatism
        showScript={false}
        userData={userData}
        style={{
          marginLeft: 21,
          width: ASTIGMATISM_SIZE_WIDTH,
          marginTop: 16,
          marginBottom: 10,
          // backgroundColor:"#ff000033"
        }} />
        : <Severity LEFT={LEFT} RIGHT={RIGHT} AGE_INFO={AGE_INFO} style={{
          marginLeft: 21,
          width: 723,
          // backgroundColor:"#0000ff33"
        }} />}
    </Box>
  )
}


const RETINA_SIZE_WIDTH = 378
const RETINA_SIZE_HEIGHT = 302
const RETINA_LINE_START_X = 325
const RETINA_LINE_START_Y = 101
const RETINA_LINE_SPH_INIT_X = 136
const RETINA_LINE_SPH_INIT_Y = 151
const RETINA_LINE_END_X = 325
const RETINA_LINE_END_Y = 201

const SPH_CYL = ({
  EYE,
  useCYL = true,
}: {
  EYE: any,
  useCYL: boolean
}) => {
  const {
    SPH,
    CYL,
    AXI,
    CV,
    refractiveError
  } = EYE
  const {
    C_04_SPH,
    C_04_SPH_POS,
    C_04_CYL,
    C_04_CYL_POS,
    C_05,
    C_06,
    C_07,
    C_09
  } = refractiveError

  const SPHCircleX = (RETINA_LINE_SPH_INIT_X - C_04_SPH_POS * 20)
  const SPHCircleY = RETINA_LINE_SPH_INIT_Y
  const CYLCircleX = (RETINA_LINE_SPH_INIT_X - C_04_CYL_POS * 20)
  const CYLCircleY = RETINA_LINE_SPH_INIT_Y

  if (CV === 0) {
    return <Svg
      width={RETINA_SIZE_WIDTH}
      height={RETINA_SIZE_HEIGHT}
    >
      <Rect
        cx={(RETINA_LINE_SPH_INIT_X + RETINA_LINE_START_X) / 2 + 4}
        cy={(RETINA_LINE_SPH_INIT_Y)}
        width={40}
        height={20}
        fill={'#FFFFFF'}
      >
        <Text
          fontSize={20}
          dominantBaseline='middle'
          textAnchor='middle'
          fontWeight='500'
          // dx={SPHCircleX}
          dy={1}
          fill={APP_COLOR.titleColor}
        >
          {C_09}
        </Text>
      </Rect>
    </Svg>
  }
  let CYKCircle
  if (useCYL && CYL !== 0) {
    CYKCircle = <>
      <Line
        sx={RETINA_LINE_START_X}
        sy={RETINA_LINE_START_Y}
        ex={CYLCircleX}
        ey={RETINA_LINE_SPH_INIT_Y}
        stroke={APP_COLOR.titleColor}
        strokeWidth={0.5}
      />
      <Line
        sx={CYLCircleX}
        sy={RETINA_LINE_SPH_INIT_Y}
        ex={RETINA_LINE_END_X}
        ey={RETINA_LINE_END_Y}
        stroke={APP_COLOR.titleColor}
        strokeWidth={0.5}
      />
      <Line
        sx={CYLCircleX}
        sy={RETINA_LINE_SPH_INIT_Y}
        ex={CYLCircleX}
        ey={RETINA_LINE_SPH_INIT_Y + 40}
        stroke={APP_COLOR.titleColor}
        strokeWidth={1.0}
        strokeDasharray={[2, 2]}
      />
      <Rect
        cx={CYLCircleX}
        cy={(RETINA_LINE_SPH_INIT_Y + 47.25)}
        width={40}
        height={14}
        fill={'#FFFFFF'}
      >
        <Text
          fontSize={10}
          dominantBaseline='middle'
          textAnchor='middle'
          fontWeight='500'
          // dx={CYLCircleX}
          dy={1}
          fill={APP_COLOR.titleColor}
        >{C_04_CYL}</Text>
      </Rect>
      <Circle
        size={14}
        cx={CYLCircleX}
        cy={CYLCircleY}
        fill={'#FFFFFF'}
        stroke={'#FF8A00'}
      /></>
  }
  return <>
    <Svg
      width={RETINA_SIZE_WIDTH}
      height={RETINA_SIZE_HEIGHT}
    >
      <Line
        sx={RETINA_LINE_START_X}
        sy={RETINA_LINE_START_Y}
        ex={SPHCircleX}
        ey={RETINA_LINE_SPH_INIT_Y}
        stroke={APP_COLOR.titleColor}
        strokeWidth={0.5}
      />
      <Line
        sx={SPHCircleX}
        sy={RETINA_LINE_SPH_INIT_Y}
        ex={RETINA_LINE_END_X}
        ey={RETINA_LINE_END_Y}
        stroke={APP_COLOR.titleColor}
        strokeWidth={0.5}
      />
      <Line
        sx={SPHCircleX}
        sy={RETINA_LINE_SPH_INIT_Y}
        ex={SPHCircleX}
        ey={RETINA_LINE_SPH_INIT_Y + 24}
        stroke={APP_COLOR.titleColor}
        strokeWidth={1.0}
        strokeDasharray={[2, 2]}
      />
      <Rect
        cx={SPHCircleX}
        cy={(RETINA_LINE_SPH_INIT_Y + 31.25)}
        width={40}
        height={14}
        fill={'#FFFFFF'}
      >
        <Text
          fontSize={10}
          dominantBaseline='middle'
          textAnchor='middle'
          fontWeight='500'
          // dx={SPHCircleX}
          dy={1}
          fill={APP_COLOR.titleColor}
        >
          {C_04_SPH}
        </Text>
      </Rect>
      <Circle
        size={14}
        cx={SPHCircleX}
        cy={SPHCircleY}
        fill={'#FF8A00'}
      />
      {CYKCircle}
    </Svg>
  </>
};


const SPH_CYL_TEXT = (EYE: any) => {
  const {
    SPH,
    CYL,
    AXI,
    CV,
    refractiveError
  } = EYE
  const {
    C_04_SPH,
    C_04_SPH_POS,
    C_04_CYL,
    C_04_CYL_POS,
    C_05,
    C_06,
    C_07,
    C_09
  } = refractiveError
  return <Box style={{
    // width: '100%',
    flex: 1,
    display: 'flex',
    // marginTop: 48,
    height: 26,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginRight: -28
    // marginHorizontal: -24
  }}>
    <VRText
      weight="600"
      style={{
        // flexGrow: 1,
        backgroundColor: "#113287",
        padding: 4,
        borderRadius: 4,
        color: "#ffffff",
        fontSize: 12,
        textAlign: 'center',
        marginRight: 8,
        paddingLeft: 24,
        paddingRight: 24,
        minWidth:88
      }}>{CV > 0?C_05:C_09}</VRText>
    <VRText
      weight="500"
      style={{
        // flexGrow: 1,
        backgroundColor: "#F3F6FF",
        padding: 6,
        borderRadius: 4,
        color: "#113287",
        fontSize: 10,
        textAlign: 'center',
        marginRight: 8,
        paddingLeft: 24,
        paddingRight: 24,
        minWidth:88
      }}>{CV > 0?C_06:''}</VRText>
    <Box style={{
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderColor: "#E2E6F6",
    }}
      sx={{
        borderTop: 1,
        borderBottom: 1
      }}
    >
      <VRText
        weight="500"
        style={{
          flexGrow: 1,
          padding: 6,
          color: "#113287",
          fontSize: 10,
          textAlign: 'center',
          borderColor: "#E2E6F6",
          borderTop: 1,
          borderBottom: 1
        }}>{CV > 0?C_07:''}</VRText>
    </Box>
  </Box>
}
