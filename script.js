//TODO Event change after level difficulty choose
const Nodelist = document.querySelectorAll(".difficulty")

let level = 0
let level2 = 0
let points = 0

Nodelist.forEach(event => {
    addEventListener("click", event => {
        if (event.target.classList.contains("Easy")) {
            change()
            level = 4000
            level2 = 16000
            console.log(level,level2)
        } else if (event.target.classList.contains("Normal")) {
            change()
            level = 2000
            level2 = 10000
        } else if (event.target.classList.contains("Hamster")) {
            change()
            level = 1000
            level2 = 6000
        }
    })
})


//Event after hamster hit
document.querySelector('.holes-container').addEventListener('click', event => {
    console.log(event)
    smashed(event)
})


const hamsters = [
    {
        status: "normal",
        next: normal(level),
        source: document.querySelector("#hole-0")
    },
    {
        status: "normal",
        next: normal(level),
        source: document.querySelector("#hole-1")
    },
    {
        status: "normal",
        next: normal(level),
        source: document.querySelector("#hole-2")
    },
    {
        status: "normal",
        next: normal(level),
        source: document.querySelector("#hole-3")
    },
    {
        status: "normal",
        next: normal(level),
        source: document.querySelector("#hole-4")
    },
    {
        status: "normal",
        next: normal(level),
        source: document.querySelector("#hole-5")
    }
]

function change() {
    document.querySelector(".background").classList.add("hide")
    document.querySelector(".wrapper-background").classList.remove("hide")
}


//Time events
function normal(level) {
    return Date.now() + level
}

function gone(level,level2) {
    console.log(level,level2)
    return Date.now() + Math.floor(Math.random() * level2) + level
}


function smashed(event) {
    if(event.target.tagName !== "IMG") {
        return ""
    }

    //Take data
    const hamster = hamsters[parseInt(event.target.dataset.index)]
    
    hamster.source.style.cursor = "url(./hammer.png),default" 
    hamster.status = "smashed"
    hamster.next = normal(level);
    hamster.source.children[0].src = './hamster-smashed2.png'


    points++    

    // document.querySelector('.worm-container').style.width = `${10 * score}%`
    
    // if (score >= 10) {
    //     win()
    // }
}

//change hamster
function nextFrame () {
        hamsters.map(event => {
            if (event.next <= Date.now()) {
                nextStatus(event);
            }
        })
    requestAnimationFrame(nextFrame) 
}

nextFrame()

function nextStatus(hamsters) {
    if(hamsters.status === "normal") {
        hamsters.source.children[0].src = './hamster2.png'
        hamsters.source.classList.add("hide")
        hamsters.status = "gone"
        hamsters.next = gone(level,level2)

    } else if(hamsters.status === "gone") {
        hamsters.source.classList.remove("hide")
        hamsters.source.style.cursor = "url(./hammer-smash.png),pointer" 
        hamsters.status = "normal"
        hamsters.next = normal(level)
       
        
    } else if(hamsters.status === "smashed") {
        hamsters.status = "normal"
    }
}
