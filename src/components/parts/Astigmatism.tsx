import { Box } from '@mui/material';
import { ASTIGMATISM_SIZE_WIDTH, ASTIGMATISM_SIZE_HEIGHT, VRIndicator, VRImage, VRText, GetIndicatorPosition } from '../components'
import { Sprintf } from '../utils'


export const Astigmatism = ({
  showScript = true,
  userData,
  style = {}
}: {
  // name: string,
  // date: string
  showScript?: boolean
  userData: any
  style?: any
}) => {
  const { EYES: { LEFT, RIGHT }, AGE_INFO } = userData
  return (
    <Box style={{
      width: ASTIGMATISM_SIZE_WIDTH,
      ...style
    }}>
      {showScript?
      <Box style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
      }}>
        <VRImage name={'astigmatismAmountScript'} style={{
          width: 549,
          height: 28
        }} />
        <Box style={{
          marginLeft: 8,
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
            }}>{LEFT.refractiveError.C_08}</VRText>
        </Box>
      </Box>:null}
      <Box style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        marginTop: 16,
        // paddingLeft:4,
        // paddingRight:4
      }}>
        <Box style={{
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
            }}>{RIGHT.refractiveError.C_09}</VRText>
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
              minWidth: 100,
            }}>{RIGHT.refractiveError.C_10}</VRText>
        </Box>
        <Box style={{
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
            }}>{LEFT.refractiveError.C_09}</VRText>
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
              minWidth: 100,
            }}>{LEFT.refractiveError.C_10}</VRText>
        </Box>
      </Box>
      <AstigmatismSeverity
        LEFT={LEFT} RIGHT={RIGHT} 
        AGE_INFO={AGE_INFO}
        style={{
          width: ASTIGMATISM_SIZE_WIDTH,
          overflow:'visible',
          marginTop: 16
        }} />
    </Box>
  )
}

export function AstigmatismSeverity({
  LEFT,
  RIGHT,
  AGE_INFO,
  style = {},
}: {
  LEFT: any,
  RIGHT: any,
  AGE_INFO: any
  style: any,
}) {
  const RCYL = 60 - RIGHT.CYL
  const LCYL = 60 - LEFT.CYL
  const { fileNameKey } = AGE_INFO

  // 이미지 배치에 따른 좌우 패딩을 고려해서 startX, endX 를 결정한다
  const startX = 6
  const endX = ASTIGMATISM_SIZE_WIDTH
  let   startValue = 60 
  let   endValue = 64

  let RCYL_POS = GetIndicatorPosition({
    startX,
    endX,
    startValue,
    endValue,
    value:RCYL
  })
  let LCYL_POS = GetIndicatorPosition({
    startX,
    endX,
    startValue,
    endValue,
    value:LCYL
  })
  return (
    <Box style={{
      display: 'flex',
      marginLeft:-6,
      ...style,
    }}>
      <VRImage name={`astigmatism/${fileNameKey}`} style={{
        width: ASTIGMATISM_SIZE_WIDTH,
        height: ASTIGMATISM_SIZE_HEIGHT,
      }} />
      {RIGHT.CV===0?null:<VRIndicator type={'RIGHT'} position={RCYL_POS} top={46}/>}
      {LEFT.CV===0?null:<VRIndicator type={'LEFT'} position={LCYL_POS} top={0}/>}
    </Box>
  )
}
