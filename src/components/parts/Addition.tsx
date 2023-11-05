
import { Box } from '@mui/material';
import { Svg, Circle, Line } from 'react-svg-path';
import { CONTENT_WIDTH, VRImage, VRText, GetIndicatorPosition } from '../components'
import { getValidObject } from '../utils'


export const Addition = ({
  userData,
  style = {},
  showScript = true
}: {
  userData: any,
  style?: any
  showScript?: boolean
}) => {
  const { EYES: { LEFT }, AGE_INFO, ADD } = userData
  const {
    C_20,
    C_21_1,
    C_21_2,
    C_22,
    C_23,
    AXIS_IMAGE: RIGHT_AXIS_IMAGE
  } = getValidObject(LEFT, 'refractiveError')
  const { AGE, ADD_AgeForAverage } = AGE_INFO


  let ADD_POS_X = GetIndicatorPosition({
    startX: 0,
    endX: 310,
    startValue: 35,
    endValue: 80,
    value: AGE
  })
  let ADD_POS_Y = GetIndicatorPosition({
    startX: 0,
    endX: 175,
    startValue: 0,
    endValue: 3.5,
    value: ADD.value
  })

  return (
    <Box style={{
      // display: 'flex', 
      // backgroundColor: "#0000ff33",
      width: CONTENT_WIDTH,
      ...style
    }}>
      <Box style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
      }}>
        <VRImage name={'addition/additionScript'} style={{
          width: 357,
          height: 30,
          marginRight: 10
        }} />
        <VRText
          weight="500"
          style={{
            position: 'absolute',
            fontSize: 10,
            marginLeft: 152,
            marginTop: 9,
            color: "#113287",
          }}>{C_22}</VRText>
        <VRImage name={'nearVisionUncomfort/nearVisionUncomfortScript'} style={{
          width: 357,
          height: 30
        }} />
        <VRText
          weight="500"
          style={{
            position: 'absolute',
            fontSize: 10,
            marginLeft: 558,
            marginTop: 9,
            color: "#113287",
          }}>{C_23}</VRText>
      </Box>
      <Box style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        marginTop: 24,
        // paddingLeft:4,
        // paddingRight:4
      }}>
        <Box style={{
          position: 'absolute',
          marginTop: 4,
          marginLeft: 40,
          width: 310,
          height: 175,
          // backgroundColor: "#ff000033"
        }}>
          <Svg
            width={'100%'}
            height={'100%'}
            style={{
            }}
          // backgroundColor={"#ff000033"}
          >
            <Line
              sx={ADD_POS_X}
              sy={175}
              ex={ADD_POS_X}
              ey={175 - ADD_POS_Y}
              stroke={'#FFB341'}
              strokeWidth={1}
              strokeDasharray={[2, 2]}
            />
            <Line
              sx={0}
              sy={175 - ADD_POS_Y}
              ex={ADD_POS_X}
              ey={175 - ADD_POS_Y}
              stroke={'#FFB341'}
              strokeWidth={1}
              strokeDasharray={[2, 2]}
            />
            <Circle
              size={11}
              cx={ADD_POS_X}
              cy={175 - ADD_POS_Y}
              fill={'#FFB341'}
            />
          </Svg>
        </Box>
        <VRImage name={'addition/additionGraph'} style={{
          // position:'absolute',
          width: 355,
          height: 216,
          marginRight: 10
        }} />
        <Box style={{
          display: 'flex',
          flex: 1,
          // backgroundColor: "#ff000033",
          flexDirection: 'column',
        }}>
          <Box style={{
            marginTop: showScript?4:62,
            // flex:1,
            display: 'flex',
            flexDirection: 'row',
            height: 40,
            // backgroundColor: "#00ff0033",
            paddingLeft: 2.5,
            // paddingRight:4
          }}>
            {(getValidObject(userData, "ADD", 'scaleBlockArray') || []).map((scaleBlock: any, index: number) => {
              return <Box
                key={`scaleBlock_${index}`}
                style={{
                  display: 'flex',
                  width: 27.5,
                  // height:40,
                  marginRight: 2,
                  backgroundColor: getValidObject(scaleBlock, 'color'),
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <VRText
                  size={10}
                  weight='500'
                  style={{
                    color: getValidObject(scaleBlock, 'textColor'),
                    // backgroundColor:"#0000ff33"
                  }}
                >{`${index + 1}`}</VRText>
              </Box>
            })
            }
          </Box>

          <Box style={{
            marginTop: 12,
          }}>
            <VRImage name={'nearVisionUncomfort/nearVisionUncomfortScale'} style={{
              width: 358,
              height: 48,
              objectFit:'contain'
            }} />
            {showScript ?
              <VRImage name={'notice2'} style={{
                marginTop: 6,
                width: 355,
                height: 101,
              }} /> : null}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
