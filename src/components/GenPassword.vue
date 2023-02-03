<template>
  <div class="pass-block">
    <div class="pass-form">
      <form @submit.prevent="genPass">
        <div class="pass-form__block block-form">
          <div class="block-form__text">
            Количество символов в пароле:
          </div>
          <div class="block-form__input">
            <input type="number" :value=this.count class="numbers" name="count" placeholder="От 8 до 30">
            <button @click="addCount" type="button">+</button>
            <button @click="subCount" type="button">-</button>
          </div>
        </div>
        <div class="pass-form__block block-form">
          <input type="checkbox" class="custom-checkbox" id="setting1" name="lowerCase" checked>
          <label for="setting1">Прописные буквы</label>
        </div>
        <div class="pass-form__block block-form">
          <input type="checkbox" class="custom-checkbox" id="setting2" name="upperCase" checked>
          <label for="setting2">Строчные буквы</label>
        </div>
        <div class="pass-form__block block-form">
          <input type="checkbox" class="custom-checkbox" id="setting3" name="numbers" checked>
          <label for="setting3">Цифры</label>
        </div>
        <div class="pass-form__block block-form">
          <input type="checkbox" class="custom-checkbox" id="setting4" name="special">
          <label for="setting4">Специальные символы (! " # $ % &...)</label>
        </div>
        <div class="pass-form__block block-form">
          <button>Генерировать</button>
        </div>
      </form>
    </div>
    <div class="pass-error" :class="{
      'open': error
    }">
      Слишком мало параметров, попробуйте выбрать больше.
    </div>
    <div class="pass-error" :class="{
      'open': copyCheck
    }">
      Скопировано.
    </div>
    <div class="pass-list" :class="{
      'open': password.length
    }">
      <div class="pass-list__item item-list" v-for="pass in password">
        <div class="item-list__text">{{ pass }}</div>
        <button class="item-list__copy" @click="copy(pass)"><img src="@/images/copy.png" alt="copy"></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "gen-password",
  data() {
    return {
      password: [],
      count: 10,
      error: false,
      copyCheck: false,
      numbersSymbols: [0,1,2,3,4,5,6,7,8,9],
      lowerCaseSymbols: ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
      upperCaseSymbols: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
      specialSymbols: ["!","\"","#","$","%","&","\'","(",")","*","+",",","-",".","/",":",";","<","=",">","?","@","[","\\","]","^","_","`","{","|","}","~"],
    }
  },
  methods: {
    copy(text) {
      this.copyCheck = true
      navigator.clipboard.writeText(text)
      setTimeout(() => {
        this.copyCheck = false
      }, 1000)
    },
    addCount() {
      if (this.count < 30)
        this.count++
    },
    subCount() {
      if (this.count > 8)
        this.count--
    },
    choiceSymbol(arr) {
      return arr[Math.floor(Math.random() * arr.length)]
    },
    genPass(e) {
      const count = e.target.querySelector('.numbers')
      if (count) {
        this.count = count.value
      }
      const settings = e.target.querySelectorAll('input')
      if (settings.length) {
        let countCheck = 0
        let error = 0
        settings.forEach(i => {
          i.classList.remove('error')
        })
        let settingNumbersSymbols = false
        let settingLowerCaseSymbols = false
        let settingUpperCaseSymbols = false
        let settingSpecialSymbols = false
        settings.forEach(i => {
          if (i.checked) {
            countCheck++
          }
          if (i.name === 'lowerCase' && i.checked) {
            settingLowerCaseSymbols = true
          }
          if (i.name === 'upperCase' && i.checked) {
            settingUpperCaseSymbols = true
          }
          if (i.name === 'numbers' && i.checked) {
            settingNumbersSymbols = true
          }
          if (i.name === 'special' && i.checked) {
            settingSpecialSymbols = true
          }
          if (i.name === 'count' && (i.value < 8 || i.value > 30)) {
            error++
            i.classList.add('error')
          }
        })
        if (countCheck >= 3 && !error) {
          this.password = []
          let arr = []
          if (settingLowerCaseSymbols) arr.push(this.lowerCaseSymbols)
          if (settingUpperCaseSymbols) arr.push(this.upperCaseSymbols)
          if (settingNumbersSymbols) arr.push(this.numbersSymbols)
          if (settingSpecialSymbols) arr.push(this.specialSymbols)
          for (let j = 0; j < 10; j++) {
            let password = ''
            let i = 0
            while (i < this.count) {
              let rand = Math.floor(Math.random() * arr.length)
              password += this.choiceSymbol(arr[rand])
              i++
            }
            this.password.push(password)
          }
        } else {
          this.error = true
          setTimeout(() => {
            this.error = false
          }, 2000)
        }
      }
    },
  },
  mounted() {
    console.clear()
  }
}
</script>

<style lang="scss" scoped>
@mixin adaptiv-value($property, $startSize, $minSize, $type) {
  $addSize: $startSize - $minSize;
  @if $type==1 {
    #{$property}: $startSize + px;
    @media (max-width: #{1200 + px}) {
      #{$property}: calc(#{$minSize + px} + #{$addSize} * ((100vw - 320px) / #{1200 - 320}));
    }
  }
  @if $type==2 {
    #{$property}: $startSize + px;
    @media (min-width: #{1200 + px}) {
      #{$property}: calc(#{$minSize + px} + #{$addSize} * ((100vw - 320px) / #{1200 - 320}));
    }
  }
  @if $type==3 {
    #{$property}: calc(#{$minSize + px} + #{$addSize} * ((100vw - 320px) / #{1200 - 320}));
  }
}
* {
  padding: 0;
  margin: 0;
  border: 0;
}
*,
*:before,
*:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
:focus,
:active {
  outline: none;
}
a:focus,
a:active {
  outline: none;
}

nav,
footer,
header,
aside {
  display: block;
}

html,
body {
  height: 100%;
  width: 100%;
  line-height: 1;
  @include adaptiv-value('font-size', 22, 14, 3);
  -ms-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}
input,
button,
textarea {
  font-family: inherit;
}

input::-ms-clear {
  display: none;
}
button {
  cursor: pointer;
}
button::-moz-focus-inner {
  padding: 0;
  border: 0;
}
a,
a:visited {
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
ul li {
  list-style: none;
}
img {
  vertical-align: top;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: 400;
}
/*--------------------*/
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}
input, button {
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  background: white;
}
input {
  &.error {
    border: 1px solid red;
  }
}
button {
  margin: 0 auto;
}
.block-form {
  display: flex;
  gap: 10px;
  align-items: center;

  .block-form__text {
  }
  .block-form__input {
    display: flex;
    gap: 5px;
    button {
      width: 40px;
      @include adaptiv-value('font-size', 30, 20, 1);
      padding: 0;
    }
  }
}
.pass-error {
  position: fixed;
  left: 50%;
  bottom: 20px;
  transition: all 0.3s;
  padding: 5px;
  border-radius: 5px;
  font-weight: 600;
  background: white;
  border: 1px solid black;
  opacity: 0;
  transform: translate(-50%, 100%);
  &.open {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}
.custom-checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
}
.custom-checkbox+label {
  display: inline-flex;
  align-items: center;
  user-select: none;
}
.custom-checkbox+label::before {
  content: '';
  display: inline-block;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid #adb5bd;
  border-radius: 0.25em;
  margin-right: 0.5em;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
}
.custom-checkbox:checked+label::before {
  border-color: #0b76ef;
  background-color: #0b76ef;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
}
label {
  cursor: pointer;
 }
 input {
   @include adaptiv-value('max-width', 100, 40, 1);
 }
 .pass-form__block {
   &:not(:last-child) {
     margin: 0 0 10px 0;
   }
 }
 .pass-block {
   display: flex;
   max-width: 600px;
   margin: 0 auto;
   justify-content: center;
   flex-direction: column;
   @include adaptiv-value('font-size', 22, 14, 1);
   * {
     font-size: inherit;
   }
   gap: 15px;
 }
 .pass-list {
   height: 0;
   overflow: hidden;
   transition: all 0.3s;
   &.open {
     height: 100%;
     overflow: visible;
   }
   .pass-list__item{
     &:not(:last-child) {
       margin: 0 0 5px 0;
     }
   }
   .item-list {
     display: flex;
     align-items: center;
     gap: 10px;
     .item-list__text, .item-list__copy {
       flex: 0 1 max-content;
     }
     .item-list__copy {
         margin: 0 auto 0 0;
       img {
         max-width: 100%;
       }
     }
   }
 }
</style>