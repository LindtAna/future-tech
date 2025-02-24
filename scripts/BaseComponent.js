class BaseComponent {
    constructor() {
      if (this.constructor === BaseComponent) {
        throw new Error('Cannot instantiate abstract class BaseComponent!')
      }
    }
  
    getProxyState(initialState) {
      return new Proxy(initialState, {
        get: (target, prop) => {
          return target[prop]
        },
        set: (target, prop, newValue) => {
          const oldValue = target[prop]
  
          target[prop] = newValue
  
          if (newValue !== oldValue) {
            this.updateUI()
          }
  
          return true
        },
      })
    }
  
    
     //UI Redraw in Response to State Updates
     
    updateUI() {
      throw new Error('Need to implement the updateUI method!')
    }
  }
  
  export default BaseComponent