import { Box } from '@mui/material';
import { Svg, Circle, Text, Rect, Line } from 'react-svg-path';
import { MARGIN_VERTICAL, CONTENT_WIDTH, APP_COLOR, VRImage, VRText, GetIndicatorPosition } from '../components'
import { Sprintf } from '../utils'


export const RefractiveError = ({
  userData,
  useCYL = true,
  style = {}
}: {
  // name: string,
  userData: any
  useCYL?: boolean
  style?: any
}) => {
  const { EYES: { LEFT, RIGHT }, AGE_INFO } = userData
  return (
    <Box style={{
      // display: 'flex', 
      // backgroundColor:"#00ff0033",
      width: CONTENT_WIDTH,
      paddingTop: 2,
      ...style
    }}>
      <VRImage name={'refractiveErrorScript'} style={{
        width: CONTENT_WIDTH,
        height: 58
      }} />
      <VRImage name={'refractivePowerScript'} style={{
        width: CONTENT_WIDTH,
        height: 28,
        marginTop: MARGIN_VERTICAL
      }} />
      <Box style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        // alignItems: 'flex-end',
        // height:300,
        marginTop: 8,
        marginBottom: 60
        // backgroundColor: "#00ff0033"
      }}>
        <Box style={{
          display: 'flex',
        }}>
          <Box style={{
            position: 'absolute',
          }}>
            <SPH_CYL EYE={RIGHT} useCYL={useCYL}  />
          </Box>
          <VRImage name={'RETINA_R'} style={{
            width: RETINA_SIZE_WIDTH,
            height: RETINA_SIZE_HEIGHT,
          }} />
        </Box>
        <Box style={{
          display: 'flex',
        }}>
          <Box style={{
            position: 'absolute',
          }}>
            <SPH_CYL EYE={LEFT} useCYL={useCYL} />
          </Box>
          <VRImage name={'RETINA_L'} style={{
            width: RETINA_SIZE_WIDTH,
            height: RETINA_SIZE_HEIGHT,
          }} />
        </Box>
      </Box>
      <Severity LEFT={LEFT} RIGHT={RIGHT} AGE_INFO={AGE_INFO} />
    </Box>
  )
}


const RETINA_SIZE_WIDTH = 320
const RETINA_SIZE_HEIGHT = 180
const RETINA_LINE_START_X = 255
const RETINA_LINE_START_Y = 53
const RETINA_LINE_SPH_INIT_X = 113
const RETINA_LINE_SPH_INIT_Y = 91
const RETINA_LINE_END_X = 255
const RETINA_LINE_END_Y = 127

const SPH_CYL = ({
  EYE,
  useCYL = true
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
    C_07
  } = refractiveError
  const SPHCircleX = RETINA_LINE_SPH_INIT_X - C_04_SPH_POS * 20
  const SPHCircleY = RETINA_LINE_SPH_INIT_Y
  const CYLCircleX = RETINA_LINE_SPH_INIT_X - C_04_CYL_POS * 20
  const CYLCircleY = RETINA_LINE_SPH_INIT_Y

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
        cy={RETINA_LINE_SPH_INIT_Y + 47.25}
        width={40}
        height={14}
        fill={'#FFFFFF'}
      />
      <Text
        fontSize={10}
        dominantBaseline='middle'
        textAnchor='middle'
        fontWeight='500'
        dx={CYLCircleX}
        dy={RETINA_LINE_SPH_INIT_Y + 48}
        fill={APP_COLOR.titleColor}
      >{C_04_CYL}</Text>
      <Circle
        size={10}
        cx={CYLCircleX}
        cy={CYLCircleY}
        fill={'#FFFFFF'}
        stroke={'#FFB341'}
      /></>
  }
  return <>
    <Svg
      width={'100%'}
      height={'100%'}
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
        cy={RETINA_LINE_SPH_INIT_Y + 31.25}
        width={40}
        height={14}
        fill={'#FFFFFF'}
      />
      <Text
        fontSize={10}
        dominantBaseline='middle'
        textAnchor='middle'
        fontWeight='500'
        dx={SPHCircleX}
        dy={RETINA_LINE_SPH_INIT_Y + 32}
        fill={APP_COLOR.titleColor}
      >{C_04_SPH}</Text>
      <Circle
        size={10}
        cx={SPHCircleX}
        cy={SPHCircleY}
        fill={'#FFB341'}
      />
      {CYKCircle}
    </Svg>
    <Box style={{
      // width: '100%',
      display: 'flex',
      marginTop: 48,
      height: 26,
      flexDirection: 'row',
      justifyContent: 'space-between',
      // backgroundColor: "#ff000033",
      marginLeft: -16,
      marginRight: -28
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
          paddingRight: 24
        }}>{C_05}</VRText>
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
          paddingRight: 24
        }}>{C_06}</VRText>
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
          }}>{C_07}</VRText>
      </Box>

    </Box>
  </>
};

export function Severity({
  style = {},
  LEFT,
  RIGHT,
  AGE_INFO
}: {
  style?: any,
  LEFT: any,
  RIGHT: any,
  AGE_INFO: any
}) {
  const RSPH = 60 - RIGHT.SPH
  const LSPH = 60 - LEFT.SPH
  const { fileNameKey } = AGE_INFO
  const startX = -7
  const endX = 704 + 7
  const centerX = (endX + startX) / 2 // 352
  let   startValue = 52 
  let   endValue = 60
  
  let RSPH_POS = GetIndicatorPosition({
    startX,
    endX:centerX,
    startValue,
    endValue,
    value:RSPH
  })
  if (RSPH > 60) {
    RSPH_POS = GetIndicatorPosition({
      startX:centerX,
      endX,
      startValue:60,
      endValue:72,
      value:RSPH
    })
  } 
  let LSPH_POS = GetIndicatorPosition({
    startX,
    endX:centerX,
    startValue,
    endValue,
    value:LSPH
  })
  if (LSPH > 60) {
    LSPH_POS = GetIndicatorPosition({
      startX:centerX,
      endX,
      startValue:60,
      endValue:72,
      value:LSPH
    })
  }
  return (
    <Box style={{
      display: 'flex',
      ...style
      // flex:1,
      // flexDirection: 'row',
      // justifyContent: 'space-between',
      // alignItems: 'flex-end',
      // marginVertical: MARGIN_VERTICAL,
      // backgroundColor: "#00ff0033",
      // height: 88
    }}>
      <VRImage name={`severity/${fileNameKey}`} style={{
        // width: 824,
        // height: 107
      }} />
      <VRImage name={'indicator/RU'} style={{
        position: 'absolute',
        marginLeft: RSPH_POS,
        marginTop: 55,
        width: 20,
        height: 21
      }} />
      <VRImage name={'indicator/LD'} style={{
        position: 'absolute',
        // left: 608,.
        marginLeft: LSPH_POS,
        marginTop: 9,
        width: 20,
        height: 21
      }} />
    </Box>
  )
}
