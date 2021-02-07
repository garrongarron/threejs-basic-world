let content = `
[SPRINT] => SHIFT <br/>
[STEALTH] => SPACE <br/>
[ATTACK] => E <br/>
[BLOCK] => Q 
`

let bottomBarBackground = document.createElement('div')
bottomBarBackground.classList.add('bottom-bar-background')
bottomBarBackground.innerHTML = content
document.body.appendChild(bottomBarBackground)


let bottomBar = document.createElement('div')
bottomBar.classList.add('bottom-bar')
bottomBar.innerHTML = content
document.body.appendChild(bottomBar)