import { Image, Platform, boundsType, registerUI } from 'leafer-ui'
import { init as initEChart } from 'echarts'
import type { EChartsOption } from 'echarts'

export type LeaferEChartOptions = {
    option?: EChartsOption
    width?: number
    height?: number
    draggable?: boolean
    editable?: boolean
}

@registerUI()
class LeaferECharts extends Image {
    public get __tag() {
        return 'LeaferECharts'
    }

    @boundsType({})
    declare public option: EChartsOption

    constructor(options: LeaferEChartOptions = {}) {
        const {
            option = {},
            width = 400,
            height = 400,
            draggable = true,
            editable = false,
        } = options

        const svgString = LeaferECharts.renderSVG(option, width, height)
        const url = Platform.toURL(svgString, 'svg')

        super({
            width,
            height,
            draggable,
            editable,
            url,
        })
        this.option = option
    }

    static renderSVG(option: EChartsOption, width: number, height: number) {
        const chart = initEChart(null, null, {
            renderer: 'svg',
            ssr: true,
            width,
            height,
        })

        chart.setOption({
            animation: false,
            animationDuration: 0,
            animationDurationUpdate: 0,
            animationEasing: 'linear',
            ...option,
        })

        const svg = chart.renderToSVGString()
        chart.dispose()

        return svg
    }

    public updateOption(newOption: EChartsOption) {
        this.option = newOption

        const w = this.width ?? 400
        const h = this.height ?? 400
        const svgString = LeaferECharts.renderSVG(newOption, w, h)

        this.url = Platform.toURL(svgString, 'svg')
        this.forceRender()
    }
}

export default LeaferECharts
