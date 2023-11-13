import moment from 'moment'
import 'moment/locale/ko';
import { getValidObject, isValidObject, isValidString, Sprintf } from "../utils"

export const APP_COLOR = {
    titleColor: "#113287",
    white: "#ffffff",
    orange: "#FFB341",
    red: "#ff0000"
}

export const MARGIN_VERTICAL = 8

export const PAGE_WIDTH = 723 //(793 * 0.94)
export const PAGE_HEIGHT = 1064 //(1122 * 0.94)
export const PAD_PAGE_WIDTH = 834 
export const PAD_PAGE_HEIGHT = 1194  - 100 // (상단 타이틀 영역)
export const PAGE_BUTTON_HEIGHT = 80
export const PAGE_BUTTON_PADDING = 16
export const CONTENT_WIDTH = PAGE_WIDTH
// export const CONTENT_WIDTH = 723
export const CONTENT_HEIGHT = PAGE_HEIGHT

export const ASTIGMATISM_SIZE_WIDTH = 727
export const ASTIGMATISM_SIZE_HEIGHT = 90
export const ASTIGMATISM_AXIS_SIZE_WIDTH = 744
export const ASTIGMATISM_AXIS_SIZE_HEIGHT = 78

const VALUE_RANGE = {
    SPH: {
        MIN_VALUE: -20.0,
        MAX_VALUE: 8.0,
        LEVEL: 0.25
    },
    CYL: {
        MIN_VALUE: -6.0,
        MAX_VALUE: 0.0,
        LEVEL: 0.25
    },
    AXI: {
        MIN_VALUE: 1,
        MAX_VALUE: 180,
        LEVEL: 1
    },
    CV: {   
        MIN_VALUE: 0.0,
        MAX_VALUE: 1.0,
        LEVEL: 0.1  // 1.0초과, 1.0(디폴트) / 0.9 / 0.8 / 0.7 / 0.6 / 0.5 / 0.4 / 0.3 / 0.2 / 0.1 / NA
    },
    ADD: {
        MIN_VALUE: 0.0,
        MAX_VALUE: 3.0,
        LEVEL: 0.25
    },
}

export const GetUserData = (input: InputData): any => {
    const ADD = GetADDObject({
        ADD: Math.max(parseFloat(input.full.left.add), parseFloat(input.full.right.add))
    })

    // 시력검사일
    const nowDate = moment(new Date())
    const birthDate = moment(getValidObject(input, 'birthday'))
    const userAge = Math.floor(nowDate.diff(birthDate, 'year', true))
    // 다음 시력검사 권장 날짜
    const nextDate = userAge > 18 ? moment(new Date()).add(1, 'y') : moment(new Date()).add(6, 'M')

    const AGE_INFO = {
        AGE:userAge,
        ...GetAgeInfo(userAge)
    }
    const userData = {
        NAME: getValidObject(input, 'name'),
        DATE: nowDate.format('LL'),
        NEXT_DATE: nextDate.format('LL'),
        AGE_INFO,
        STAFF: getValidObject(input, 'staff'),
        STORE: GetStoreName(getValidObject(input, 'store')),
        EYES: {
            LEFT: GetReportObject({
                ...input.full.left,
                add:ADD.ADD.value,
                AGE_INFO,
            }),
            RIGHT: GetReportObject({
                ...input.full.right,
                add:ADD.ADD.value,
                AGE_INFO,
            })
        },
        ...ADD
    }
    return userData
}

const GetLevelValue = ({
    value,
    type
}: {
    value: number | string,
    type: "SPH" | 'CYL' | 'AXI' | 'CV' | 'ADD'
}): any => {
    const valueRange = VALUE_RANGE[type]
    if (isValidObject(valueRange) && isValidObject(value)) {
        const parsedValue: number = isValidString(value) ? parseFloat(value as string) : value as number
        const level = Math.round(parsedValue * (1 / valueRange.LEVEL))
        const modifiedValue = Math.min(Math.max(level * valueRange.LEVEL, valueRange.MIN_VALUE), valueRange.MAX_VALUE)
        return {
            level,
            value: modifiedValue
        }
    }
    return {
        level: 0,
        value: 0
    }
}


export const GetReportObject = ({
    sph,
    cyl,
    axi,
    cv,
    add,
    AGE_INFO
}: {
    sph: string
    cyl: string
    axi: string
    cv: string
    add: string
    AGE_INFO: any
}): any => {

    const { level: sphLevel, value: SPH } = GetLevelValue({
        value: sph,
        type: 'SPH'
    })
    const { level: cylLevel, value: CYL } = GetLevelValue({
        value: cyl,
        type: 'CYL'
    })
    let { level: axiLevel, value: AXI } = GetLevelValue({
        value: axi,
        type: 'AXI'
    })
    const { level: cvLevel, value: CV } = GetLevelValue({
        value: cv,
        type: 'CV'
    })

    const { level: addLevel, value: ADD } = GetLevelValue({
        value: add,
        type: 'ADD'
    })

    AXI = (CYL === 0)?0:AXI

    return {
        SPH,
        CYL,
        AXI,
        CV,
        refractiveError: getRefractiveError({
            SPH,
            CYL,
            CV,
            AXI,
            ADD,
            AGE_INFO,
        })
    }
}

// 4, 3, 2, 1, 0, -1, -2, -3, -4 단계로 점을 찍는다
const getRefractiveError = ({
    SPH,
    CYL,
    CV,
    AXI,
    ADD,
    AGE_INFO
}: {
    SPH: number,
    CYL: number,
    CV: any,
    AXI: number,
    ADD: number,
    AGE_INFO: any
}) => {
    let C_04_SPH = Sprintf(`%.2fD`, 60 - SPH)
    let C_04_SPH_POS = undefined
    let C_04_CYL = Sprintf(`%.2fD`, 60 - SPH - CYL)
    let C_04_CYL_POS = undefined
    let C_05 = `정 시`
    let C_06 = Sprintf(`굴절력  %.2fD`, 60 - SPH)
    let C_07 = ``
    let C_08 = Sprintf('고객님 연령대의 %.2f%%가 난시', AGE_INFO.AM_RatioForAge)
    let C_09 = '난시 없음'
    let C_10 = Sprintf(`난시량  %.2fD`, -CYL)
    let C_11 = '직난시'
    let C_12 = Sprintf(`난시방향  %dº`, AXI)
    let C_21_1 = Sprintf(`가입도 %.2fD`, ADD)
    let C_21_2 = Sprintf(`조절반응 %.2fD`, 2.5-ADD)
    let C_22 = '가입도 동년배 평균'
    if (ADD - AGE_INFO.ADD_AgeForAverage > 0.1) {
        C_22 = '가입도 동년배 평균이상'
    }  else if (ADD - AGE_INFO.ADD_AgeForAverage < -0.1) {
        C_22 = '가입도 동년배 평균이하'
    }
    const ADD_LEVEL = Math.round(ADD / 0.25) + 1
    let C_23 = ADD_LEVEL >= 6?`${ADD_LEVEL}단계 근거리 불편안`:`${ADD_LEVEL}단계 근거리 피로안`
    let AXIS_IMAGE = {
        CORNEA:'axisSimulation/AC',
        SIMULATION:'axisSimulation/NM'
    }
    if (CYL === 0) {
        C_04_CYL = ''
        C_11 = '난시없음'
        C_12 = '난시방향 없음'
        AXIS_IMAGE['CORNEA'] = 'axisSimulation/NC'

        if (SPH === 0) {        // B-03
            C_04_SPH_POS = 0
        } else if (SPH > 0) {
            C_05 = '원 시'
            C_07 = Sprintf('고객님 연령대의 %.2f%%가 원시', AGE_INFO.HP_RatioForAge)
            if (SPH <= 4) {     // B-04
                C_04_SPH_POS = 1
            } else {            // B-05
                C_04_SPH_POS = 2
            }
        } else {
            C_05 = '근 시'
            C_07 = Sprintf('고객님 연령대의 %.2f%%가 근시', AGE_INFO.MP_RatioForAge)
            if (SPH >= -6) {    // B-06
                C_04_SPH_POS = -1
            }   else {          // B-07
                C_04_SPH_POS = -2
            }
        }
    }   else if (SPH === 0) {
        if (CYL < 0) {
            C_05 = '정(난)시'
            C_07 = Sprintf('고객님 연령대의 %.2f%%가 근시', AGE_INFO.MP_RatioForAge)
            C_09 = '단순 근시성 난시'
            if (CYL >= -2) {    // B-09
                C_04_SPH_POS = 0
                C_04_CYL_POS = -2
            }   else {          // B-10
                C_04_SPH_POS = 0
                C_04_CYL_POS = -3
            }
        }
    }   else if (SPH > 0) {
        C_05 = '원 시'
        C_07 = Sprintf('고객님 연령대의 %.2f%%가 원시', AGE_INFO.HP_RatioForAge)
        if (SPH === Math.abs(CYL)) {
            C_09 = '단순 원시성 난시'
            if (SPH <= 4) {     // B-11
                C_04_SPH_POS = 2
                C_04_CYL_POS = 0
            } else {            // B-12
                C_04_SPH_POS = 3
                C_04_CYL_POS = 0
            }
        }   else if (SPH > Math.abs(CYL)) {
            C_09 = '복합 원시성 난시'
            if (SPH <= 4) {     // B-13
                C_04_SPH_POS = 3
                C_04_CYL_POS = 1
            } else {            // B-14
                C_04_SPH_POS = 4
                C_04_CYL_POS = 2
            }
        }   else {  // B-17
            C_09 = '혼합 난시'
            C_04_SPH_POS = 1
            C_04_CYL_POS = -1
        }
    }   else {  // SPH < 0
        C_05 = '근 시'
        C_07 = Sprintf('고객님 연령대의 %.2f%%가 근시', AGE_INFO.MP_RatioForAge)
        C_09 = '복합 근시성 난시'
        if (SPH >= -6) {    // B-15
            C_04_SPH_POS = -1
            C_04_CYL_POS = -3
        }   else {          // B-16
            C_04_SPH_POS = -2
            C_04_CYL_POS = -4
        }
    }

    if (CYL !== 0) {
        if ((AXI >= 0 && AXI < 30) || (AXI > 150 && AXI <= 180)) {
            AXIS_IMAGE['SIMULATION'] = 'axisSimulation/WTR'
            C_11 = '직난시'
        }   else if((AXI > 60 && AXI < 120)) {
            AXIS_IMAGE['SIMULATION'] = 'axisSimulation/ATR'
            C_11 = '도난시'
        }   else if ((AXI >= 30 && AXI <= 60)) {
            AXIS_IMAGE['SIMULATION'] = 'axisSimulation/OS45'
            C_11 = '사난시'
        }   else if ((AXI >= 120 && AXI <= 150)) {
            AXIS_IMAGE['SIMULATION'] = 'axisSimulation/OS135'
            C_11 = '사난시'
        }
    }
    if (CV === 0) {
        C_09 = '측정 불가'
        C_10 = ''
    }
    return {
        C_04_SPH,
        C_04_SPH_POS,
        C_04_CYL,
        C_04_CYL_POS,
        C_05,
        C_06,
        C_07,
        C_08,
        C_09,
        C_10,
        C_11,
        C_12,
        AXIS_IMAGE,
        C_20:`${ADD / 2.5 * 100}%`,
        C_21_1,
        C_21_2,
        C_22,
        C_23
    }
}


export const GetADDObject = ({ ADD = 1.5 }: { ADD: number }): any => {
    const { level, value } = GetLevelValue({
        value: ADD,
        type: 'ADD'
    })
    const scaleBlockArray = [
        {   // 1
            color: '#E2E6F6',
            textColor: '#113287'
        },
        {   // 2
            color: '#E2E6F6',
            textColor: '#113287'
        },
        {   // 3
            color: '#5B6EB4',
            textColor: '#FFFFFF'
        },
        {   // 4
            color: '#5B6EB4',
            textColor: '#FFFFFF'
        },
        {   // 5
            color: '#5B6EB4',
            textColor: '#FFFFFF'
        },
        {   // 6
            color: '#113287',
            textColor: '#FFFFFF'
        },
        {   // 7
            color: '#113287',
            textColor: '#FFFFFF'
        },
        {   // 8
            color: '#113287',
            textColor: '#FFFFFF'
        },
        {   // 9
            color: '#113287',
            textColor: '#FFFFFF'
        },
        {   // 10
            color: '#113287',
            textColor: '#FFFFFF'
        },
        {   // 11
            color: '#001A5B',
            textColor: '#FFFFFF'
        },
        {   // 12
            color: '#001A5B',
            textColor: '#FFFFFF'
        },
    ]

    scaleBlockArray[level] = {
        color: APP_COLOR.orange,
        textColor: '#FFFFFF'
    }
    return {
        ADD: {
            value,
            level,
            scaleBlockArray
        }
    }
}

const GetStoreName = (store: string) => {
    switch (store.toLocaleUpperCase()) {
        case 'YK':
            return '역삼점'
        case 'YD':
            return '여의도점'
        case 'SC':
            return '서울시청점'
        case 'SS':
            return '삼성점'
        case 'PG':
            return '판교점'
        case 'JL':
            return '잠실롯데월드점'
        case 'MK':
            return '마곡점'
        case 'SI':
            return '신사점'
        case 'EJ':
            return '을지로점'
        default:
            return '역삼점'

    }
}

// 근시 (myopia)
// 원시 (hyperopia)
// 난시 (astigmatism)

const GetAgeInfo = (AGE: number) => {
    let fileNameKey = ''
    let MP_RatioForAge = 0  // 근시 합계 비율
    let HP_RatioForAge = 0  // 원시 합계 비율
    let AM_RatioForAge = 0  // 난시 합계 비율
    let AMA_RatioForAge = 0 // 난시 방향 합계 비율
    let ADD_AgeForAverage = GetADDForAge(AGE) // 동년배 평균

    if (AGE <= 6) {
        fileNameKey = 'AGE_00_06'
        MP_RatioForAge = 28.2
        HP_RatioForAge = 57.3
        AM_RatioForAge = 80.3
        AMA_RatioForAge = 80.3
    }
    if (AGE > 6) {
        fileNameKey = 'AGE_07_12'
        MP_RatioForAge = 68.3
        HP_RatioForAge = 22.3
        AM_RatioForAge = 81
        AMA_RatioForAge = 81
    }
    if (AGE > 12) {
        fileNameKey = 'AGE_13_18'
        MP_RatioForAge = 82.6
        HP_RatioForAge = 12.5
        AM_RatioForAge = 86.4
        AMA_RatioForAge = 86.4
    }
    if (AGE > 18) {
        fileNameKey = 'AGE_19_29'
        MP_RatioForAge = 79.7
        HP_RatioForAge = 13.3
        AM_RatioForAge = 83.8
        AMA_RatioForAge = 83.8
    }
    if (AGE > 29) {
        fileNameKey = 'AGE_30_39'
        MP_RatioForAge = 75.2
        HP_RatioForAge = 15.8
        AM_RatioForAge = 80.9
        AMA_RatioForAge = 80.9
    }
    if (AGE > 39) {
        fileNameKey = 'AGE_40_49'
        MP_RatioForAge = 62.7
        HP_RatioForAge = 25.1
        AM_RatioForAge = 82.7
        AMA_RatioForAge = 82.6
    }
    if (AGE > 49) {
        fileNameKey = 'AGE_50_59'
        MP_RatioForAge = 32.0
        HP_RatioForAge = 58.2
        AM_RatioForAge = 88.8
        AMA_RatioForAge = 88.8
    }
    if (AGE > 59) {
        fileNameKey = 'AGE_60_69'
        MP_RatioForAge = 15.9
        HP_RatioForAge = 79.1
        AM_RatioForAge = 93.5
        AMA_RatioForAge = 93.5
    }
    if (AGE > 69) {
        fileNameKey = 'AGE_70_79'
        MP_RatioForAge = 18.1
        HP_RatioForAge = 76.7
        AM_RatioForAge = 97.4
        AMA_RatioForAge = 97.4
    }
    if (AGE > 79) {
        fileNameKey = 'AGE_80_89'
        MP_RatioForAge = 24.4
        HP_RatioForAge = 68.3
        AM_RatioForAge = 97.3
        AMA_RatioForAge = 97.3
    }

    return {
        fileNameKey,
        MP_RatioForAge,
        HP_RatioForAge,
        AM_RatioForAge,
        AMA_RatioForAge,
        ADD_AgeForAverage
    }
}

const GetADDForAge = (AGE: number) => {
    const addForAges = [
        {
            age: 35,
            add: 0.5,
        },
        {
            age: 40,
            add: 0.75,
        },
        {
            age: 44,
            add: 1,
        },
        {
            age: 47,
            add: 1.2,
        },
        {
            age: 49,
            add: 1.5,
        },
        {
            age: 51,
            add: 1.75,
        },
        {
            age: 54,
            add: 2,
        },
        {
            age: 58,
            add: 2.25,
        },
        {
            age: 63,
            add: 2.5,
        },
        {
            age: 67,
            add: 2.75,
        },
        {
            age: 70,
            add: 3,
        },
        {
            age: 75,
            add: 3.25,
        },
        {
            age: 80,
            add: 3.5,
        },
    ]

    let manipulatedAddForAge = 0

    if (AGE < 35) manipulatedAddForAge = 0
    else if (AGE >= 80) manipulatedAddForAge = 3.5
    else {
        addForAges.some((addForAge: any, index: number, array: any) => {
            if (addForAge.age >= AGE && index > 0) {
                const prevAddForAge = array[index - 1]
                const startX = prevAddForAge.age;
                const startY = prevAddForAge.add;
                const endX = addForAge.age;
                const endY = addForAge.add;

                const slope = (endY - startY) / (endX - startX)
                manipulatedAddForAge = startY + slope * (AGE - startX)

                return true
            }
            return false
        })
    }

    return manipulatedAddForAge
}

export const GetIndicatorPosition = ({
    startX,
    endX,
    startValue,
    endValue,
    value,
}:{
    startX:number,
    endX:number,
    startValue:number,
    endValue:number,
    value: number
}) => {
    let pixelPerOneGrade = (endX - startX) / (endValue - startValue)
    let offset = (value - startValue)
    return Math.min(endX, Math.max(startX, startX + pixelPerOneGrade * offset))
  
}