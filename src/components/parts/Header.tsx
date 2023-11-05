import { Box } from '@mui/material';
import { VRText } from '../components'

export const Header = ({
  name,
  date,
  page = '',
  part = '',
  style = {},
  titleSize = 27,
  titleColor = '#113287'
}: {
  name: string,
  date?: string,
  page?: string,
  part?: string,
  style?: any,
  titleSize?: number
  titleColor?: string  
}) => {
  console.log('name = ', name, ' date = ', date)
  return (
    <Box style={{
      // flex:1,
      // display: 'flex', 
        // width: PAD_PAGE_WIDTH,
        // width:'100%',
        // marginLeft:-24,
        // marginRight:-24,
      ...style
    }}>
      <Box style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        // background: "#0000ff33",
        // my:16
      }}>
        <Box style={{ display: 'flex', flexDirection: 'row' }}>
          <VRText
            size={titleSize}
            weight={part?'500':'700'}
            color={titleColor}
          >{`${name} 고객님`}</VRText>
          <VRText 
            size={titleSize}
            color={titleColor}
            weight={part?'100':'500'}
          >
            {`을 위한 퍼스널 비전 리포트 ${page}`}
          </VRText>
        </Box>
        <Box style={{ 
          display: 'flex', 
          flexDirection: 'row',
          marginBottom:4
        }}>
          {date?
          <><VRText size={13}
            weight={'700'}
            style={{
              marginRight: 8
            }}
          >시력 검사일</VRText>
          <VRText size={13}>{date}</VRText></>:null}
          {part?
          <><VRText size={24}
            weight={'500'}
            color={titleColor}
            style={{
            }}
          >{part}</VRText></>:null}
        </Box>
      </Box>
      <Box style={{
        display: 'flex',
        marginTop: 6,
        marginBottom: 12,
        height: 1.25,
        background: titleColor
      }} />
    </Box>
  )
}
