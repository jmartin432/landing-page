function changeFont () {
  const fonts = [
    "'Odibee Sans', cursive",
    "'Slabo 27px', serif",
    "'Fjalla One', sans-serif",
    "'Arvo', serif",
    "'Indie Flower', cursive"
  ]
  const font = Math.floor(Math.random() * Math.floor(fonts.length))

  const fontFamily = fonts[font]
  console.log(fontFamily)

  const jobBullets = document.querySelectorAll('.job_bullets')
  for (let x = 0; x < jobBullets.length; x++) {
    jobBullets[x].style.setProperty('--font-name', fontFamily)
  }
}

function loadFileToBuffer (buffer, url) {
  const request = new XMLHttpRequest()
  request.open('GET', url, true)
  request.responseType = 'arraybuffer'

  // Decode asynchronously
  request.onload = function () {
    audioContext.decodeAudioData(request.response, function (b) {
      buffer.buffer = b
    }, function (e) {
      console.log('Error decoding audio data from source:', e.err)
    })
  }
  request.send()
}

function play (buffer, source) {
  source.buffer = buffer.buffer
  source.connect(gainNode)
  gainNode.gain.linearRampToValueAtTime(1.0, audioContext.currentTime + 0.2)
  source.start(0)
}

function stop (source) {
  gainNode.gain.linearRampToValueAtTime(0.0, audioContext.currentTime + 0.2)
  source.stop(0.2)
}

const AudioContext = window.AudioContext || window.webkitAudioContext
let noAudioButton
let yesAudioButton
let modalContainer
let navButton1, navButton2, navButton3
let audioContext
const audioBuffer1 = {}
const audioBuffer2 = {}
const audioBuffer3 = {}
let audioSource1, audioSource2, audioSource3
let gainNode
let audio = false

window.onload = (event) => {
  changeFont()
  noAudioButton = document.getElementById('no-audio-button')
  yesAudioButton = document.getElementById('yes-audio-button')
  modalContainer = document.getElementById('modal-container')
  navButton1 = document.getElementById('nav-b1')
  navButton2 = document.getElementById('nav-b2')
  navButton3 = document.getElementById('nav-b3')

  noAudioButton.addEventListener('click', function () {
    modalContainer.style.display = 'none'
    audio = false
  })
  yesAudioButton.addEventListener('click', function () {
    modalContainer.style.display = 'none'
    audio = true
    audioContext = new AudioContext()
    console.log(audioContext)
    gainNode = audioContext.createGain()
    gainNode.connect(audioContext.destination)
    loadFileToBuffer(audioBuffer1, 'audio/baleines1.mp3')
    loadFileToBuffer(audioBuffer2, 'audio/baleines2.mp3')
    loadFileToBuffer(audioBuffer3, 'audio/baleines3.mp3')
  })
  navButton1.addEventListener('mouseenter', function (event) {
    if (audio) {
      audioSource1 = audioContext.createBufferSource()
      play(audioBuffer1, audioSource1)
    }
  })
  navButton1.addEventListener('mouseout', function (event) {
    if (audio) {
      stop(audioSource1)
    }
  })
  navButton2.addEventListener('mouseenter', function (event) {
    if (audio) {
      audioSource2 = audioContext.createBufferSource()
      play(audioBuffer2, audioSource2)
    }
  })
  navButton2.addEventListener('mouseout', function (event) {
    if (audio) {
      stop(audioSource2)
    }
  })
  navButton3.addEventListener('mouseenter', function (event) {
    if (audio) {
      audioSource3 = audioContext.createBufferSource()
      play(audioBuffer3, audioSource3)
    }
  })
  navButton3.addEventListener('mouseout', function (event) {
    if (audio) {
      stop(audioSource3)
    }
  })
}
