const toggleButton = document.querySelector(".toggle");
const lightMode = document.querySelector(".light-mode");
const darkMode = document.querySelector(".dark-mode");
const timeZoneContainer = document.querySelector(".time-zone");
const place = document.querySelector(".place");
const time = document.querySelector(".time");
const dayMonthYear = document.querySelector(".day-month-year");

const modalContainer = document.querySelector(".modal__container");
const modalHeader = document.getElementById("modal-1-title");
const closeButton = document.querySelector(".close-button");
const paths = closeButton.querySelectorAll("path");

const timeZoneSelection = document.getElementById("timezone-selection");
const timeZoneOption = document.querySelectorAll(".option-element");

    MicroModal.init({
        openClass: 'is-open',
    });

    let selectedTimeZone = localStorage.getItem("selectedZone");
  
    async function timeZoneList() {
        const response = await fetch('https://raw.githubusercontent.com/dmfilipenko/timezones.json/master/timezones.json');
        const data = await response.json();

        const timeZoneData = data.flatMap(item => item.utc);
            
            timeZoneData.forEach(zone => {
                const tzOption = document.createElement("option");
                tzOption.className = "option-element";
                tzOption.value = zone;
                tzOption.textContent = zone;
                timeZoneSelection.appendChild(tzOption);
            });
    }
            
    timeZoneList();

    timeZoneSelection.addEventListener("change", function(){
        selectedTimeZone = timeZoneSelection.value;
        localStorage.setItem("selectedZone", selectedTimeZone);
    });

        function updateTime(){
            let now;

            if(selectedTimeZone) {
                now = dayjs().tz(selectedTimeZone);
            } else {
                now = dayjs();
            }

            place.textContent = selectedTimeZone || "Local Time";
            time.textContent = now.format("LT");
            dayMonthYear.textContent = now.format("LL")
        }
        
        dayjs.extend(window.dayjs_plugin_utc);
        dayjs.extend(window.dayjs_plugin_timezone);
        dayjs.extend(window.dayjs_plugin_localizedFormat);

        timeZoneList();
        updateTime();
        setInterval(updateTime, 1000);

toggleButton.addEventListener("click", function(){
    if(lightMode.style.visibility === "visible"){
        lightMode.style.visibility = "hidden";
        darkMode.style.visibility = "visible";
        toggleButton.style.backgroundColor = "black";
        toggleButton.style.border = "1px solid #FEFEFE"
        timeZoneContainer.style.color = "#FEFEFE";
        document.body.style.backgroundColor = "black";

        modalContainer.style.backgroundColor = "black";
        modalContainer.style.border = "1px solid white";
        modalHeader.style.color = "white";
            paths.forEach(path => {
                path.setAttribute("stroke", "white");
            });

        timeZoneSelection.style.backgroundColor = "black";
        timeZoneSelection.style.color = "white";
        const timeZoneOptions = document.querySelectorAll(".option-element");
        timeZoneOptions.forEach(option => {
        option.style.color = "white";
        });

    }   else {
            lightMode.style.visibility = "visible";
            darkMode.style.visibility = "hidden";
            toggleButton.style.backgroundColor = "#FEFEFE";
            toggleButton.style.border = "1px solid black"
            timeZoneContainer.style.color = "black";
            document.body.style.backgroundColor = "#FEFEFE";

            modalContainer.style.backgroundColor = "white";
            modalContainer.style.border = "none";
            modalHeader.style.color = "black";
                paths.forEach(path => {
                    path.setAttribute("stroke", "black");
                });

            timeZoneSelection.style.backgroundColor = "white";
            timeZoneSelection.style.color = "black";
            const timeZoneOptions = document.querySelectorAll(".option-element");
            timeZoneOptions.forEach(option => {
            option.style.color = "black";
            });
        }
});
