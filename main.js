let all_color= []
let stop = false
let grid_size = 5

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function delay() {
    stop = true
    setTimeout(() => {
        stop = false
    }, 500)
}

function render_board(size) {
    $(".grid-container").html("")
    all_color = []
    $(".hide_btn").html("開")

    for (let i = 0; i < size; i++) {
        $(".line-container").append(`
            <div class="line-item" data-line-y=${i}></div>
            <div class="line-item" data-line-x=${i}></div>
        `)

        for (let j = 0; j < size; j++) {
            all_color.push(i)
            $(".grid-container").append(`
                <div class="grid-item" data-y=${i} data-x=${j}></div>
            `)
        }
    }

    shuffle(all_color)
    $(".grid-container").children(".grid-item").each(function (index) {
        $(this).attr("data-color", all_color[index])
    })

    $("body").get(0).style.setProperty("--grid-size", size);
}

render_board(grid_size)

$("body").on("swipeup", ".grid-container [data-x]", function(e) {
    if (stop) {
        return false
    }
    delay()

    let x = e.currentTarget.getAttribute("data-x")

    let color_set = []
    $(`[data-x=${x}]`).each(function () {
        color_set.push($(this).attr("data-color"))
    })
    color_set.push(color_set.shift())

    $(`[data-x=${x}]`).animate({top: '-=100%'}, { duration: 400, queue: false });
    $(`[data-x=${x}][data-y="0"]`).animate({opacity: 0});

    setTimeout(() => {
    $(`[data-x=${x}]`).animate({top: '+=100%'}, { duration: 0 })

    $(`[data-x=${x}]`).each(function (i) {
        $(this).attr("data-color", color_set[i])
    })

    $(`[data-x=${x}][data-y=${grid_size - 1}]`).css("opacity", "0")
    $(`[data-x=${x}][data-y=${grid_size - 1}]`).animate({opacity: 1}, { duration: 400 })

    $(`[data-x=${x}][data-y="0"]`).animate({opacity: 1}, { duration: 0 })
}, 400);
})

$("body").on("swipedown", ".grid-container [data-x]", function(e) {
    if (stop) {
        return false
    }
    delay()

    let x = e.currentTarget.getAttribute("data-x")

    let color_set = []
    $(`[data-x=${x}]`).each(function () {
        color_set.push($(this).attr("data-color"))
    })

    color_set.unshift(color_set.pop())  

    $(`[data-x=${x}]`).animate({top: '+=100%'}, { duration: 400, queue: false });
    $(`[data-x=${x}][data-y=${grid_size - 1}]`).animate({opacity: 0});

    setTimeout(() => {
    $(`[data-x=${x}]`).animate({top: '-=100%'}, { duration: 0 })

    $(`[data-x=${x}]`).each(function (i) {
        $(this).attr("data-color", color_set[i])
    })

    $(`[data-x=${x}][data-y="0"]`).css("opacity", "0")
    $(`[data-x=${x}][data-y="0"]`).animate({opacity: 1}, { duration: 400 })

    $(`[data-x=${x}][data-y=${grid_size - 1}]`).animate({opacity: 1}, { duration: 0 })
}, 400);
})

$("body").on("swipeleft", ".grid-container [data-y]", function(e) {
    if (stop) {
        return false
    }
    delay()

    let y = e.currentTarget.getAttribute("data-y")

    let color_set = []
    $(`[data-y=${y}]`).each(function () {
        color_set.push($(this).attr("data-color"))
    })

    color_set.push(color_set.shift())  

    $(`[data-y=${y}]`).animate({left: '-=100%'}, { duration: 400, queue: false });
    $(`[data-y=${y}][data-x="0"]`).animate({opacity: 0});

    setTimeout(() => {
    $(`[data-y=${y}]`).animate({left: '+=100%'}, { duration: 0 })

    $(`[data-y=${y}]`).each(function (i) {
        $(this).attr("data-color", color_set[i])
    })

    $(`[data-y=${y}][data-x=${grid_size - 1}]`).css("opacity", 0)
    $(`[data-y=${y}][data-x=${grid_size - 1}]`).animate({opacity: 1}, { duration: 400 })

    $(`[data-y=${y}][data-x="0"]`).animate({opacity: 1}, { duration: 0 })
}, 400);
})

$("body").on("swiperight", ".grid-container [data-y]", function(e) {
    if (stop) {
        return false
    }
    delay()

    let y = e.currentTarget.getAttribute("data-y")

    let color_set = []
    $(`[data-y=${y}]`).each(function () {
        color_set.push($(this).attr("data-color"))
    })

    color_set.unshift(color_set.pop())   

    $(`[data-y=${y}]`).animate({left: '+=100%'}, { duration: 400, queue: false });
    $(`[data-y=${y}][data-x=${grid_size - 1}]`).animate({opacity: 0});

    setTimeout(() => {
    $(`[data-y=${y}]`).animate({left: '-=100%'}, { duration: 0 })

    $(`[data-y=${y}]`).each(function (i) {
        $(this).attr("data-color", color_set[i])
    })

    $(`[data-y=${y}][data-x="0"]`).css("opacity", 0)
    $(`[data-y=${y}][data-x="0"]`).animate({opacity: 1}, { duration: 400 })

    $(`[data-y=${y}][data-x=${grid_size - 1}]`).animate({opacity: 1}, { duration: 0 })
}, 400);
})

$(".setting_heading").on("click", function () {
    $(".setting_container").slideToggle()
})

$(".hide_btn").on("click", function () {
    $(this).html() === "開" ? $(this).html("關") : $(this).html("開")
    $(".grid-item").toggleClass("hide")
})

$("select[name='board_size']").on("change", function () {
    grid_size = this.value
    render_board(grid_size)
})

