import { ApplicationInsights } from '@microsoft/applicationinsights-web'

const config = {
    instrumentationKey: '',
    loggingLevelTelemetry: 2,
    enableAutoRouteTracking: true,
    enableAjaxErrorStatusText: true,
    enableAjaxPerfTracking: true,
    enableUnhandledPromiseRejectionTracking: true
}

const appInsights = new ApplicationInsights({ config: config })

export const initAppInsights = (vue, key) => {

    appInsights.config.instrumentationKey = key
    appInsights.loadAppInsights()
    appInsights.trackPageView()

    vue.prototype.$appInsights = appInsights

    vue.config.errorHandler = (err, vm, info) => {

        appInsights.trackEvent({
            name: 'Client Side error.',
            properties: {
                error: err|| 'No value provided',
                vue: 'No value provided',
                source: info || 'No value provided'
            }
        })
    }

    window.onerror = (msg, url, line, col, error) => {

        appInsights.trackEvent({
            name: 'Client Side error, Window handler.',
            properties: {
                error: error || 'No value provided',
                msg: msg || 'No value provided',
                url: url || 'No value provided',
                line: line || 'No value provided',
                col: col || 'No value provided'
            }
        })

    }
}

export const notifyAppInsightsOfUserLogin = (userid) => {
    appInsights.setAuthenticatedUserContext(userid)
}
