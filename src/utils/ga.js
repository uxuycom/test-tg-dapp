// const isDev = process.env.ENVIRONMENT === 'dev'

const isDev = false


/*track({
  event: 'action',
  page: 'tg-wallet',
  target: '',
  params: {
    query: '',
  },
})*/

/*export interface GAEvent {
  event: 'click' | 'input' | 'action'
  page: 'tg-wallet' | 'all'
  target: string
  params?: object
}*/

export function track(e) {
  if(typeof window == "undefined" || !window.gtag) return

  const { event = 'action', page = 'tg-dapp', target = '', params = {} } = e || {}

  // TODO intercept

  window.gtag('event', event, {
    page,
    target,
    ...params,
  })
}







/*export interface trackCallEvent {
  event: any
  parameters?: any
}*/

export function trackCall(eventName, parameters) {
  if(isDev) return 
  if(typeof window == "undefined" || !window.gtag) return

  window.gtag('event', eventName, {
      ...parameters
  })
}

export function trackSetCall(eventName, parameters) {
  if(isDev) return 
  if(typeof window == "undefined" || !window.gtag) return
  window.gtag('set', eventName, {
      ...parameters
  })
}