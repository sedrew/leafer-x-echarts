import type { IPlugin, IPluginHost } from '../../core/interfaces'
import type { LeaferEditor } from '../../core/editor'

import './LeaferECharts'

export const LeaferEChartsPluginName = 'LeaferECharts'

/**
 * Registers the LeaferECharts custom UI (side-effect import of LeaferECharts).
 */
export class LeaferEChartsPlugin implements IPlugin<LeaferEditor> {
    name = LeaferEChartsPluginName

    install(_host: IPluginHost<LeaferEditor>) {}
}
