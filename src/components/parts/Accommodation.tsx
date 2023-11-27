
import { Box } from '@mui/material';
import { Svg, Circle, MarkerArrow, Line } from 'react-svg-path';
import { CONTENT_WIDTH, VRImage, VRText } from '../components'
import { getValidObject } from '../utils'


export const Accommodation = ({
    userData,
    style = {}
}: {
    // name: string,
    // date: string
    userData: any
    style?: any
}) => {
    const { EYES: { LEFT, RIGHT }, AGE_INFO } = userData
    const LEFT_ADD = getValidObject(LEFT, 'ADD')
    const RIGHT_ADD = getValidObject(RIGHT, 'ADD')
    const {
        C_20,
        C_21_1,
        C_21_2,
        C_22,
        C_23,
        AXIS_IMAGE: RIGHT_AXIS_IMAGE
    } = getValidObject(LEFT_ADD > RIGHT_ADD ? LEFT : RIGHT, 'refractiveError')
    const { AGE, ADD_AgeForAverage } = AGE_INFO
    return (
        <Box style={{
            // display: 'flex', 
            // backgroundColor: "#00ff0033",
            width: CONTENT_WIDTH,
            ...style
        }}>
            <Box style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'row',
                marginLeft: -6
            }}>
                <Box style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <VRImage name={'accommodation/background1'} style={{
                        width: 734,
                        height: 300
                    }} />
                    <VRImage name={'accommodation/background2'} style={{
                        width: 734,
                        height: 344
                    }} />
                </Box>
                <Box style={{
                    // flex: 1,
                    // display: 'flex',
                    flexDirection: 'column',
                    position: 'absolute',
                    marginTop: 469,
                    marginLeft: 6,
                    // backgroundColor: "#ff000033",

                    // marginTop:100
                    // top: 512,
                    // height:200,

                    // paddingLeft:4,
                    // paddingRight:4
                }}>
                    <Box style={{
                        //   display: 'flex',
                        //   flex: 1,
                        backgroundColor: "#FFE1C5",
                        width: 357,
                        height: 28,
                        marginBottom: 44
                    }} />
                    <Box style={{
                        position: 'absolute',
                        display: 'flex',
                        flex: 1,
                        backgroundColor: "#FFB341",
                        width: C_20,
                        height: 28,
                        top: 0
                    }}>
                    </Box>
                    <Box style={{
                        display: 'flex',
                        //   flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <VRText
                            weight="500"
                            style={{
                                backgroundColor: '#FFB341',
                                color: "#113287",
                                padding: 5,
                                borderRadius: 4,
                                fontSize: 10,
                                textAlign: 'center',
                                paddingLeft: 12,
                                paddingRight: 12,
                            }}>{C_21_1}</VRText>
                        <VRText
                            weight="500"
                            style={{
                                backgroundColor: "#FFE1C5",
                                padding: 5,
                                borderRadius: 4,
                                color: "#113287",
                                fontSize: 10,
                                textAlign: 'center',
                                paddingLeft: 12,
                                paddingRight: 12,
                            }}>{C_21_2}</VRText>
                    </Box>
                    <VRImage name={'addition/additionScale'} style={{
                        width: 372,
                        height: 95,
                        position: 'absolute',
                        top: -47,
                        left: -6
                    }} />
                    {/* </Box> */}
                </Box>
                <Box style={{
                    position: 'absolute',
                    // backgroundColor:"#ff000033",
                    marginLeft: 405.5,
                    marginTop: 418.25,
                    width: 300,
                    height: 100
                }}>
                    <ADD_Arrow add={getValidObject(userData, "ADD", 'value')} />
                </Box>
            </Box>
        </Box>
    )
}


const ACCOMMODATE_LINE_START_X = 37
const ACCOMMODATE_LINE_START_Y = 1
const ACCOMMODATE_LINE_ADD_INIT_Y = 50
const ACCOMMODATE_LINE_END_X = 37
const ACCOMMODATE_LINE_END_Y = 99
const ACCOMMODATE_STROKE_COLOR = '#9FABDB'
const ACCOMMODATE_STROKE_WIDTH = 1.25

const ACCOMMODATE_ADD_MIN_POSITION = 119 // 0
const ACCOMMODATE_ADD_MAX_POSITION = 290 // 3.0
const ACCOMMODATE_ADD_MIN_VALUE = 0
const ACCOMMODATE_ADD_MAX_VALUE = 3.0
const ACCOMMODATE_ADD_LEVEL = 0.25

const ADD_Arrow = ({
    add = 1.50,
} = {}) => {
    const offset = (ACCOMMODATE_ADD_MAX_POSITION - ACCOMMODATE_ADD_MIN_POSITION) * add / (ACCOMMODATE_ADD_MAX_VALUE - ACCOMMODATE_ADD_MIN_VALUE)
    const ADDCircleX = ACCOMMODATE_ADD_MIN_POSITION + offset
    const ADDCircleY = ACCOMMODATE_LINE_ADD_INIT_Y
    const arrowPositionRatio = 4.0
    const cx = (ADDCircleX - ACCOMMODATE_LINE_START_X)
    const cy = (ADDCircleY - ACCOMMODATE_LINE_START_Y)
    const slope = cy / cx
    const centerCircleX = ACCOMMODATE_LINE_START_X + ADDCircleX / arrowPositionRatio
    const centerCircleY1 = (ACCOMMODATE_LINE_START_Y + slope * (ADDCircleX / arrowPositionRatio))
    const centerCircleY2 = (ACCOMMODATE_LINE_END_Y - slope * (ADDCircleX / arrowPositionRatio))

    return <>
        <Svg
            width={'100%'}
            height={'100%'}
        >
            <Line
                sx={ACCOMMODATE_LINE_START_X}
                sy={ACCOMMODATE_LINE_START_Y}
                ex={ACCOMMODATE_ADD_MIN_POSITION + offset}
                ey={ACCOMMODATE_LINE_ADD_INIT_Y}
                stroke={ACCOMMODATE_STROKE_COLOR}
                strokeWidth={ACCOMMODATE_STROKE_WIDTH}
            />
            <Line
                sx={ACCOMMODATE_LINE_END_X}
                sy={ACCOMMODATE_LINE_END_Y}
                ex={ACCOMMODATE_ADD_MIN_POSITION + offset}
                ey={ACCOMMODATE_LINE_ADD_INIT_Y}
                stroke={ACCOMMODATE_STROKE_COLOR}
                strokeWidth={ACCOMMODATE_STROKE_WIDTH}
            />
            <MarkerArrow id="my-marker-id" color={ACCOMMODATE_STROKE_COLOR} />
            <Line
                sx={ACCOMMODATE_LINE_START_X}
                sy={ACCOMMODATE_LINE_START_Y}
                ex={centerCircleX}
                ey={centerCircleY1}
                markerEnd="url(#my-marker-id)"
            />
            <Line
                sx={ACCOMMODATE_LINE_START_X}
                sy={ACCOMMODATE_LINE_END_Y}
                ex={centerCircleX}
                ey={centerCircleY2}
                markerEnd="url(#my-marker-id)"
            />
            <Circle
                size={11}
                cx={ADDCircleX}
                cy={ADDCircleY}
                fill={'#FFB341'}
            />
        </Svg>
    </>
};

