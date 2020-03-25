//websync
if(isLocal()){
    const websync = document.createElement('script')
    websync.async=true
    websync.src='./src/scripts/websync.js'
    document.body.appendChild(websync)
}

//import svg
require.context('./../svg')

//import images
require.context('./../images')

//import videos
require.context('./../videos')

//import style
require("./../sass/main.scss")

//Fonts
//require('./../fonts')

//Local
function isLocal(){
    const urlProject = location.hostname
    const urlEnd = urlProject.substr(-5)
    let isLocal = false
    
    if(urlEnd === 'local'){
        isLocal = true
    }
    return isLocal
}

//IMPORTS
import "./components/map.js";