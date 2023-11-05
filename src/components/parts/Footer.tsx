import Image from 'next/image';
import { Box} from '@mui/material';
import { CONTENT_WIDTH, APP_COLOR, VRImage, VRText } from '../components'


export const Footer = ({
  store,
  staff,
  date,
  style = {}
}: {
  store: string,
  staff: string,
  date: string
  style?: any
}) => {
  return (
    <Box style={{
      // display: 'flex', 
      width: CONTENT_WIDTH,
      ...style
    }}>
      <Box style={{
        display: 'flex',
        marginTop: 8,
        marginBottom: 16,
        height: 1.25,
        background: APP_COLOR.titleColor
      }} />
      <Box style={{ display: 'flex', flexDirection: 'row' }}>
        <VRImage name={'logo'} style={{
          width: 96,
          height: 35
        }} />
        <Box style={{
          display: 'flex',
          flexDirection: 'column',
          marginLeft: 24,
          marginRight: 12,
          justifyContent: 'flex-start',
          alignItems: 'flex-start'
        }}>
          <VRText
            size={12}
            weight={'500'}
          >{`브리즘 ${store}`}</VRText>
          <VRText
            size={12}
            weight={'500'}
          >{`시력 검사 담당`}</VRText>
        </Box>
        <Image 
          alt={'staff'}
          src={`/images/staff/${staff.toLocaleLowerCase()}.png`}
          // src={'/images/staff/ian.png'}
          // src={'/images/staff/joshua.png'}
          // src={'/images/staff/kepi.png'}
          // src={'/images/staff/kylie.png'}
          // src={'/images/staff/luke.png'}
          // src={'/images/staff/maddy.png'}
          // src={'/images/staff/nick.png'}
          // src={'/images/staff/noah.png'}
          // width={90}
          // height={56}
          width={84}
          height={52}
          style={{
            marginTop:-14,
            backgroundColor:"#ff000033"
            // width: 100,
            // height: 58
          }} />
      <Box style={{
        display: 'flex',
        flexGrow:1,
        flexDirection: 'column',
        marginBottom: 4,
        // justifyContent: 'flex-end',
        alignItems: 'flex-end'

      }}>
        <VRText size={13}
          weight={'700'}
          style={{
            // marginRight: 8
          }}
        >다음 시력 검사 권장 날짜</VRText>
        <VRText size={13}>{date}</VRText>
      </Box>
      </Box>
    </Box>
  )
}
