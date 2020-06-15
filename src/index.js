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
                error: JSON.stringify(err, null, 2),
                vue: JSON.stringify(vm, null, 2),
                source: JSON.stringify(info, null, 2)
            }
        })
    }

    window.onerror = (msg, url, line, col, error) => {

        appInsights.trackEvent({
            name: 'Client Side error, Window handler.',
            properties: {
                error: JSON.stringify(error, null, 2),
                msg: JSON.stringify(msg, null, 2),
                url: JSON.stringify(url, null, 2),
                line: JSON.stringify(line, null, 2),
                col: JSON.stringify(col, null, 2)
            }
        })

    }
}

export const notifyAppInsightsOfUserLogin = (userid) => {
    appInsights.setAuthenticatedUserContext(userid)
}
