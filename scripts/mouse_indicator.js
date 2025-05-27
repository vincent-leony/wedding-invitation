document.addEventListener("DOMContentLoaded", function () {
    var button = document.getElementById("openInvitation");
    var scrollContainer = document.querySelector(".mouse-scroll-container");
    if (button && scrollContainer) {
        button.addEventListener("click", function () {
            setTimeout(function () {
                scrollContainer.classList.remove("inactive");
                scrollContainer.classList.add("active");
            }, 1000);

            setTimeout(function () {
                scrollContainer.classList.remove("active");
                scrollContainer.classList.add("inactive");

                setTimeout(function () {
                    scrollContainer.remove();
                }, 1000);
            }, 3000);
        });
    }
});
