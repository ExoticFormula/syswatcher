//select stuff

const labelRam = document.querySelector('.ram-label')
const progRam = document.querySelector('.ram-bar')
const labelCpu = document.querySelector('.cpu-label')
const progCpu = document.querySelector('.cpu-bar')
const user = document.querySelector('.user')
const os = document.querySelector('.os')

const socket = io();

socket.on('connect',()=>{
    console.log('connected ');
})

socket.on('ram-usage',({ram,cpu,username,osInfo})=>{
    ram = ram.toFixed(2)
    user.innerHTML = `<span>Hello ${username}</span>`
    os.innerHTML = `<span>OS Type: ${os}</span>`
    os.innerHTML = `<span>OS Type: ${osInfo==="Windows_NT"?'Microsoft Windows':osInfo}</span>`
    labelRam.innerHTML = `<span>RAM ${ram} %</span>`
    progRam.value = ram
    labelCpu.innerHTML = `<span>CPU ${cpu} %</span>`
    progCpu.value = cpu;
    if(cpu>90){

    }

})
