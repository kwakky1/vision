"use client"
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams} from 'next/navigation'
import { useResizeDetector } from 'react-resize-detector';
import { Container, Box, Button } from '@mui/material';
import { PAD_PAGE_WIDTH, PAD_PAGE_HEIGHT, PAGE_BUTTON_HEIGHT, PAGE_BUTTON_PADDING, GetUserData } from '../../components/components'
import { getValidObject, useWindowDimensions } from '../../components/utils'
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import ArrowForwardSharpIcon from '@mui/icons-material/ArrowForwardSharp';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import { Page1, Page2, Page3, Page4 } from './subpages'

export default function Page() {
  // 리포트  
  const searchParams = useSearchParams()
  const inputString: any = searchParams.get("input") || ''
  const input: InputData = JSON.parse(inputString)
  const userData = GetUserData(input)
  console.log('Page userData = ', userData)

  const router = useRouter()
  const { width, height, ref } = useResizeDetector();
  const [currentSlide, setCurrentSlide] = useState(2);

  console.log('ReportForIPad size = ', width, height)

  const pageButtonHeight = PAGE_BUTTON_HEIGHT + PAGE_BUTTON_PADDING * 2
  const pageArray = [Page1, Page2, Page3]
  if (getValidObject(userData, "ADD", 'value') >= 0.75) {
      pageArray.push(Page4)
  }
  const totalPageNum = pageArray.length
  return (
      <Container
          ref={ref}
          style={{
              width: PAD_PAGE_WIDTH,
              height: PAD_PAGE_HEIGHT,
              padding: 0,
              paddingTop:40
            //   marginTop:40,
              // background: "#0000ff11",
          }}
      >
          {width && height ?
              <CarouselProvider
                  naturalSlideWidth={PAD_PAGE_WIDTH}
                  naturalSlideHeight={PAD_PAGE_HEIGHT - pageButtonHeight - 40}
                  currentSlide={currentSlide}
                  totalSlides={totalPageNum}
              >
                  <Slider style={{
                  }}>
                      {pageArray.map((PageComponent: any, index: number) => {
                          // const PageComponent = page
                          return <Slide key={`Page_${index}`} index={index}>
                              <PageComponent
                                  userData={userData}
                                  style={{
                                      marginLeft: 34,
                                      marginRight: 34,
                                      // backgroundColor: "#00ff0033"
                                  }}
                              />
                          </Slide>
                      })}
                  </Slider>
                  <Box
                      style={{
                          display: 'flex',
                          flexDirection: 'row',
                        //   backgroundColor: "#00009933",
                          height: pageButtonHeight,
                          padding: PAGE_BUTTON_PADDING,
                          justifyContent: 'space-between',
                      }}>
                      <Button
                          // disabled={currentSlide <= 0}
                          style={{
                              // opacity: currentSlide <= 0 ? 0.5 : 1,
                              width: PAGE_BUTTON_HEIGHT,
                              height: PAGE_BUTTON_HEIGHT,
                              background: '#020F50',
                              borderRadius: 100
                          }}
                          onClick={() => {
                              if (currentSlide === 0) {
                                router.push(`/?input=${inputString}`)
                                //   router.back()
                              }   else {
                                  setCurrentSlide(currentSlide - 1)
                              }
                          }}><ArrowBackSharpIcon style={{
                              fontSize: 40,
                              color: "#FFFFFF"
                          }} /></Button>
                      <Box style={{
                          flexGrow: 1,
                          // backgroundColor: "#00ff0033"
                      }} />
                      <Button
                          // disabled={currentSlide >= 3}
                          style={{
                              // opacity: currentSlide >= 3 ? 0.5 : 1,
                              width: PAGE_BUTTON_HEIGHT,
                              height: PAGE_BUTTON_HEIGHT,
                              background: '#020F50',
                              borderRadius: 100
                          }}
                          onClick={() => {
                              // 맨 마지막 페이지라면...
                              if (currentSlide >= totalPageNum - 1) {
                                router.push(`print?input=${inputString}`)
                              }   else {
                                  setCurrentSlide(currentSlide + 1)}
                              }
                          }><ArrowForwardSharpIcon
                              style={{
                                  fontSize: 40,
                                  color: "#FFFFFF"
                              }}
                          /></Button>
                  </Box>
              </CarouselProvider> : null}
      </Container>
  );
};

// export default Page;
