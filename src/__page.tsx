import Image from 'next/image';
import { useRouter } from 'next/router'
import { Box, Container, Stack, Typography, Button } from '@mui/material';

export default function Home() {
  // 입력화면 react-hook-form 사용
  const router = useRouter()
  const onClick = () => {
    const query = {
      name:'김태진',
      birthday:19750131,
      full:{
        right:{
          sph: '10',
          cyl: '9',
          axi: '9',
          cv: '7',
          add: '6',          
        },
        left:{
          sph: '5',
          cyl: '6',
          axi: '7',
          cv: '8',
          add: '9',
        }
      },
      staff:'김태진',
      store:'양천'
    }
    const queryJSON = JSON.stringify(query)
    router.push({
      pathname: 'report',
      query:queryJSON,
    }, 'report')
  }
  return (
    // <Box sx={{ py: { xs: 7.5, sm: 15 } }}>
      <Container style={{
        backgroundColor:"#ff000033",
        width:768
      }}>
        <Button onClick={onClick}>Test</Button>
        <Stack spacing={{ xs: 3, sm: 7.5 }}>
          <Typography
            fontSize={{ xs: 31, sm: 36 }}
            fontWeight={700}
            textAlign={'center'}
          >
            Art Unboxed; Beyond Color <br /> 색의 한계를 넘어 예술을 만나다
          </Typography>
          <Stack spacing={3}>
            <Typography
              fontSize={{ xs: 15, sm: 20 }}
              textAlign={{ xs: 'left', sm: 'center' }}
            >
              대부분의 사람들에게 예술은 ‘시간 내기 힘들어서’ 가까이하기 힘든
              대상이었습니다. <br /> 하지만 어떤 이들에게는 ‘즐기고 싶어도
              즐기기 어려운’ 대상이기도 합니다.
            </Typography>
            <Typography
              fontSize={{ xs: 15, sm: 20 }}
              textAlign={{ xs: 'left', sm: 'center' }}
            >
              선천적 이유로, 대부분의 사람들이 공통적으로 느끼는 색감을 전혀
              다르게 받아들이는 사람들이 있습니다. 우리나라에만 165만 명이
              있다고 알려진 <strong>색약자</strong>입니다.
            </Typography>
            <Typography
              fontSize={{ xs: 15, sm: 20 }}
              textAlign={{ xs: 'left', sm: 'center' }}
            >
              그들에게는 우리가 보는 예술 작품이 조금 다른 색감과 느낌으로
              보여진다고 합니다. 물론 그들 중에는 빈센트 반 고흐처럼 색약의
              불리함을 독특한 색감의 표현으로 승화시켜 위대한 성취를 이룬
              예술가가 있기도 합니다
            </Typography>
            <Typography
              fontSize={{ xs: 15, sm: 20 }}
              textAlign={{ xs: 'left', sm: 'center' }}
            >
              하지만 대부분의 색약자는 작가의 의도를 인식하지 못해서, 일반
              대중이 느끼는 예술의 감동에 대해 공감하기 어려워 답답함을 느끼는
              관객으로 남게 됩니다
            </Typography>
            <Typography
              fontSize={{ xs: 15, sm: 20 }}
              textAlign={{ xs: 'left', sm: 'center' }}
            >
              다행히 최근 첨단 광학 기술로 만든 특수 렌즈가 출시되어 안경 하나로
              이 불편함을 크게 개선할 수 있게 되었습니다.
            </Typography>
            <Typography
              fontSize={{ xs: 15, sm: 20 }}
              textAlign={{ xs: 'left', sm: 'center' }}
            >
              예술은 만인이 함께 즐길 수 있는 사회적 권리라고 생각하는 세 곳의
              단체가 손을 모았습니다.
            </Typography>
            <Typography
              fontSize={{ xs: 15, sm: 20 }}
              textAlign={{ xs: 'left', sm: 'center' }}
            >
              우선 전체 색약 인구의 70%를 차지하는 적록색약자들의 불편함을
              개선하는 것을 시작으로, 앞으로 점차 다양한 색약 문제를 개선하는
              방향으로 넓혀 나가고자 합니다.
            </Typography>
          </Stack>
        </Stack>
      </Container>
    // </Box>
  );
}

export async function getServerSideProps() {
  console.log('getServerSideProps !!!')
}