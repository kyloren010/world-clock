    async function getUser(place) {
        const api_url = `https://timezone.abstractapi.com/v1/current_time/?api_key=53cd84c4335e40bfaaea7be63c8b8f04&location=${place}`

        const response = await fetch(api_url);

        const data = await response.json();

        time = await data.datetime
        // arr = Array.from(time)
        // arr.splice(0, 11)
        // arr.toString()
        // timezone = (arr.splice(0, 5)).join("");
        document.getElementById("time").innerText = `${place}'s time = ${time} ${data.timezone_abbreviation}`
    }

    // define function

    document.querySelectorAll(".allPaths").forEach(e => {
        e.addEventListener("mouseover", function () {
            window.onmousemove = function (j) {
                x = j.clientX
                y = j.clientY
                document.getElementById('name').style.top = y - 60 + 'px'
                document.getElementById('name').style.left = x + 10 + 'px'
            }
            // document.querySelectorAll(".allPaths").forEach(i => {
            //     i.style.fill = "#ececec"
            // })
            e.style.fill = "pink"
            document.getElementById("name").style.opacity = 1

            document.getElementById("namep").innerText = e.id
        })
        e.addEventListener("mouseleave", function () {
            e.style.fill = "#ececec"
            document.getElementById("name").style.opacity = 0
        })

        e.addEventListener("click", function () {
            getUser(e.id)
        })

        // double click
        // event listener
        // function call
        e.addEventListener("dblclick", function () {
            console.log("Double Click!")
            window.open(`https://kyloren010.github.io/world-clock/Options.html?country=${e.id}`)
            window.close();
        })
    })

    // document.getElementById("searchBtn").addEventListener("click", function () {
    //     country = document.getElementById("search").value
    //     document.querySelectorAll(`.allPaths`).forEach(e => {
    //         e.style.fill = "#ececec"
    //     })
    //     document.querySelectorAll(`#${country}`).forEach(e => {
    //         e.style.fill = "red"
    //     })
    // })