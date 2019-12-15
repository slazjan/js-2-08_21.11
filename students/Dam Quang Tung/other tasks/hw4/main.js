class Validator {
    constructor(container, items = []) {
        this.element = document.querySelector(container)
        this.items = items
        this._init()
    }
    _init() {
        this.element.addEventListener('submit', (evt) => {
            if (!this.validate()) {
                console.log('invalid')
                evt.preventDefault()
            } else {
                console.log('valid')
            }
        })
    }
    validate() {
        let validity = true
        this.items.forEach(elem => {
            if (!elem.validate()) {
                validity = false
            }
        })
        return validity
    }
}

class Input {
    constructor(container, errContainer, regExp) {
        this.element = document.querySelector(container)
        this.errorEl = document.querySelector(errContainer)
        this.regExp = regExp
        this._init()
    }
    _init() {
        this.element.addEventListener('input', (evt) => {
            this.validate()
        })
    }
    validate() {
        let valid = this.element.value.search(this.regExp) != -1
        this.element.classList.toggle('invalid', !valid)
        this.element.classList.toggle('valid', valid)
        this.errorEl.classList.toggle('hidden', valid)
        return valid
    }
}

let validator = new Validator('#validForm', [
    new Input('#name', '.name', /[a-zа-я]+/i),
    new Input('#phone', '.phone', /\+\d\(\d{3}\)\d{3}-\d{4}/i),
    new Input('#mail', '.mail', /^([a-z.-]+)@([a-z]+).([a-z]+)$/i),
    new Input('#text', '.text', /\w+/)
])


//1. Дан большой текст, в котором для оформления прямой речи используются одинарные кавычки. 
//   Придумать шаблон, который заменяет одинарные кавычки на двойные.
// 2. Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на двойную.
let str = "Albert Einstein once said: 'If you can’t explain it simply, you don’t understand it well enough'"
let str2 = /('(?![a-zа-я]))|((?<![а-яa-z])')/gmi
console.log(str.replace(str2, '"'))