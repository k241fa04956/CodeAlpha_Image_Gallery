/* ==========================================
   VISION GALLERY
   CODEALPHA TASK 1
========================================== */


/* ==========================================
   ELEMENTS
========================================== */

const galleryGrid =
    document.getElementById("galleryGrid");

const galleryCards =
    Array.from(
        document.querySelectorAll(".gallery-card")
    );

const filterButtons =
    document.querySelectorAll(".filter-btn");

const searchInput =
    document.getElementById("searchInput");

const sortSelect =
    document.getElementById("sortSelect");

const totalCount =
    document.getElementById("totalCount");

const noResults =
    document.getElementById("noResults");


const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxTitle =
    document.getElementById("lightboxTitle");

const lightboxCategory =
    document.getElementById("lightboxCategory");

const lightboxCounter =
    document.getElementById("lightboxCounter");

const closeLightbox =
    document.getElementById("closeLightbox");

const previousBtn =
    document.getElementById("previousBtn");

const nextBtn =
    document.getElementById("nextBtn");

const lightboxBackdrop =
    document.getElementById("lightboxBackdrop");

const lightboxFavorite =
    document.getElementById("lightboxFavorite");

const downloadBtn =
    document.getElementById("downloadBtn");

const themeBtn =
    document.getElementById("themeBtn");



/* ==========================================
   VARIABLES
========================================== */

let activeFilter = "all";

let currentImages = [];

let currentIndex = 0;

let favorites = [];


/* ==========================================
   LOAD FAVORITES
========================================== */

try {

    favorites =
        JSON.parse(
            localStorage.getItem(
                "visionGalleryFavorites"
            )
        ) || [];

} catch (error) {

    favorites = [];

}


/* ==========================================
   INITIALIZE
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadFavorites();

        updateGallery();

    }
);



/* ==========================================
   FILTER BUTTONS
========================================== */

filterButtons.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function() {

                filterButtons.forEach(
                    function(item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                activeFilter =
                    button.getAttribute(
                        "data-filter"
                    );


                updateGallery();

            }
        );

    }
);



/* ==========================================
   SEARCH
========================================== */

searchInput.addEventListener(
    "input",
    function() {

        updateGallery();

    }
);



/* ==========================================
   SORT
========================================== */

sortSelect.addEventListener(
    "change",
    function() {

        const sortType =
            sortSelect.value;


        if (sortType === "az") {

            galleryCards.sort(
                function(a, b) {

                    const titleA =
                        a.getAttribute(
                            "data-title"
                        );

                    const titleB =
                        b.getAttribute(
                            "data-title"
                        );

                    return titleA.localeCompare(
                        titleB
                    );

                }
            );

        }


        if (sortType === "za") {

            galleryCards.sort(
                function(a, b) {

                    const titleA =
                        a.getAttribute(
                            "data-title"
                        );

                    const titleB =
                        b.getAttribute(
                            "data-title"
                        );

                    return titleB.localeCompare(
                        titleA
                    );

                }
            );

        }


        if (sortType === "default") {

            galleryCards.sort(
                function(a, b) {

                    const numberA =
                        Number(
                            a.querySelector(
                                ".image-number"
                            ).textContent
                        );

                    const numberB =
                        Number(
                            b.querySelector(
                                ".image-number"
                            ).textContent
                        );

                    return numberA - numberB;

                }
            );

        }


        galleryCards.forEach(
            function(card) {

                galleryGrid.appendChild(
                    card
                );

            }
        );


        updateGallery();

    }
);



/* ==========================================
   UPDATE GALLERY
========================================== */

function updateGallery() {

    const searchTerm =
        searchInput.value
            .trim()
            .toLowerCase();


    currentImages = [];


    galleryCards.forEach(
        function(card) {

            const category =
                card.getAttribute(
                    "data-category"
                );


            const title =
                card.getAttribute(
                    "data-title"
                ).toLowerCase();


            const imageId =
                getImageId(card);


            const isFavorite =
                favorites.includes(
                    imageId
                );


            let matchesCategory =
                false;


            let matchesSearch =
                false;


            if (
                activeFilter === "all"
            ) {

                matchesCategory = true;

            } else if (
                activeFilter === "favorites"
            ) {

                matchesCategory =
                    isFavorite;

            } else {

                matchesCategory =
                    category === activeFilter;

            }


            matchesSearch =
                title.includes(
                    searchTerm
                ) ||
                category.includes(
                    searchTerm
                );


            if (
                matchesCategory &&
                matchesSearch
            ) {

                card.style.display = "";

                currentImages.push(
                    card
                );

            } else {

                card.style.display =
                    "none";

            }

        }
    );


    totalCount.textContent =
        String(
            currentImages.length
        ).padStart(
            2,
            "0"
        );


    if (
        currentImages.length === 0
    ) {

        noResults.style.display =
            "block";

    } else {

        noResults.style.display =
            "none";

    }

}



/* ==========================================
   GET IMAGE ID
========================================== */

function getImageId(card) {

    const image =
        card.querySelector("img");

    return image.getAttribute(
        "src"
    );

}



/* ==========================================
   LOAD FAVORITES
========================================== */

function loadFavorites() {

    galleryCards.forEach(
        function(card) {

            const button =
                card.querySelector(
                    ".favorite-btn"
                );


            const imageId =
                getImageId(card);


            if (
                favorites.includes(
                    imageId
                )
            ) {

                button.classList.add(
                    "favorite"
                );

                button.textContent =
                    "♥";

            } else {

                button.classList.remove(
                    "favorite"
                );

                button.textContent =
                    "♡";

            }


            button.addEventListener(
                "click",
                function(event) {

                    event.stopPropagation();

                    toggleFavorite(
                        card
                    );

                }
            );

        }
    );

}



/* ==========================================
   TOGGLE FAVORITE
========================================== */

function toggleFavorite(card) {

    const imageId =
        getImageId(card);


    const button =
        card.querySelector(
            ".favorite-btn"
        );


    if (
        favorites.includes(
            imageId
        )
    ) {

        favorites =
            favorites.filter(
                function(id) {

                    return id !== imageId;

                }
            );


        button.classList.remove(
            "favorite"
        );

        button.textContent =
            "♡";

    } else {

        favorites.push(
            imageId
        );


        button.classList.add(
            "favorite"
        );

        button.textContent =
            "♥";

    }


    localStorage.setItem(
        "visionGalleryFavorites",
        JSON.stringify(
            favorites
        )
    );


    updateGallery();

    updateLightboxFavorite();

}



/* ==========================================
   OPEN LIGHTBOX
========================================== */

galleryCards.forEach(
    function(card) {

        const viewButton =
            card.querySelector(
                ".view-btn"
            );


        const image =
            card.querySelector(
                "img"
            );


        viewButton.addEventListener(
            "click",
            function(event) {

                event.stopPropagation();

                openLightbox(
                    card
                );

            }
        );


        image.addEventListener(
            "click",
            function() {

                openLightbox(
                    card
                );

            }
        );

    }
);



/* ==========================================
   OPEN LIGHTBOX
========================================== */

function openLightbox(card) {

    updateGallery();


    const index =
        currentImages.indexOf(
            card
        );


    if (index === -1) {

        return;

    }


    currentIndex =
        index;


    showLightboxImage();


    lightbox.classList.add(
        "show"
    );


    document.body.style.overflow =
        "hidden";

}



/* ==========================================
   SHOW LIGHTBOX IMAGE
========================================== */

function showLightboxImage() {

    if (
        currentImages.length === 0
    ) {

        return;

    }


    const card =
        currentImages[
            currentIndex
        ];


    const image =
        card.querySelector(
            "img"
        );


    const title =
        card.getAttribute(
            "data-title"
        );


    const category =
        card.getAttribute(
            "data-category"
        );


    lightboxImage.src =
        image.src;


    lightboxImage.alt =
        image.alt;


    lightboxTitle.textContent =
        title;


    lightboxCategory.textContent =
        category;


    lightboxCounter.textContent =

        String(
            currentIndex + 1
        ).padStart(
            2,
            "0"
        )

        +

        " / "

        +

        String(
            currentImages.length
        ).padStart(
            2,
            "0"
        );


    updateLightboxFavorite();

}



/* ==========================================
   NEXT IMAGE
========================================== */

nextBtn.addEventListener(
    "click",
    function() {

        if (
            currentImages.length === 0
        ) {

            return;

        }


        currentIndex++;


        if (
            currentIndex >=
            currentImages.length
        ) {

            currentIndex = 0;

        }


        showLightboxImage();

    }
);



/* ==========================================
   PREVIOUS IMAGE
========================================== */

previousBtn.addEventListener(
    "click",
    function() {

        if (
            currentImages.length === 0
        ) {

            return;

        }


        currentIndex--;


        if (
            currentIndex < 0
        ) {

            currentIndex =
                currentImages.length - 1;

        }


        showLightboxImage();

    }
);



/* ==========================================
   CLOSE LIGHTBOX
========================================== */

function closeGalleryLightbox() {

    lightbox.classList.remove(
        "show"
    );


    document.body.style.overflow =
        "";

}


closeLightbox.addEventListener(
    "click",
    closeGalleryLightbox
);


lightboxBackdrop.addEventListener(
    "click",
    closeGalleryLightbox
);



/* ==========================================
   KEYBOARD CONTROLS
========================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            !lightbox.classList.contains(
                "show"
            )
        ) {

            return;

        }


        if (
            event.key === "Escape"
        ) {

            closeGalleryLightbox();

        }


        if (
            event.key === "ArrowRight"
        ) {

            nextBtn.click();

        }


        if (
            event.key === "ArrowLeft"
        ) {

            previousBtn.click();

        }

    }
);



/* ==========================================
   LIGHTBOX FAVORITE
========================================== */

lightboxFavorite.addEventListener(
    "click",
    function() {

        if (
            currentImages.length === 0
        ) {

            return;

        }


        const card =
            currentImages[
                currentIndex
            ];


        toggleFavorite(
            card
        );

    }
);



/* ==========================================
   UPDATE LIGHTBOX FAVORITE
========================================== */

function updateLightboxFavorite() {

    if (
        currentImages.length === 0
    ) {

        return;

    }


    const card =
        currentImages[
            currentIndex
        ];


    const imageId =
        getImageId(
            card
        );


    if (
        favorites.includes(
            imageId
        )
    ) {

        lightboxFavorite.textContent =
            "♥ Favorited";

    } else {

        lightboxFavorite.textContent =
            "♡ Favorite";

    }

}



/* ==========================================
   DOWNLOAD
========================================== */

downloadBtn.addEventListener(
    "click",
    function() {

        if (
            currentImages.length === 0
        ) {

            return;

        }


        const card =
            currentImages[
                currentIndex
            ];


        const image =
            card.querySelector(
                "img"
            );


        const title =
            card.getAttribute(
                "data-title"
            );


        const link =
            document.createElement(
                "a"
            );


        link.href =
            image.src;


        link.download =
            title
                .replace(
                    /\s+/g,
                    "-"
                )
                .toLowerCase() +
            ".jpg";


        document.body.appendChild(
            link
        );


        link.click();


        document.body.removeChild(
            link
        );

    }
);



/* ==========================================
   DARK / LIGHT MODE
========================================== */

let lightMode =
    localStorage.getItem(
        "visionGalleryTheme"
    ) === "light";


function applyTheme() {

    if (lightMode) {

        document.body.classList.add(
            "light-mode"
        );

    } else {

        document.body.classList.remove(
            "light-mode"
        );

    }

}


applyTheme();


themeBtn.addEventListener(
    "click",
    function() {

        lightMode =
            !lightMode;


        localStorage.setItem(
            "visionGalleryTheme",
            lightMode
                ? "light"
                : "dark"
        );


        applyTheme();

    }
);



/* ==========================================
   TOUCH SWIPE
========================================== */

let touchStartX = 0;

let touchEndX = 0;


lightbox.addEventListener(
    "touchstart",
    function(event) {

        touchStartX =
            event.changedTouches[
                0
            ].screenX;

    },
    {
        passive: true
    }
);


lightbox.addEventListener(
    "touchend",
    function(event) {

        touchEndX =
            event.changedTouches[
                0
            ].screenX;


        handleSwipe();

    },
    {
        passive: true
    }
);


function handleSwipe() {

    const distance =
        touchEndX -
        touchStartX;


    if (
        Math.abs(distance) < 50
    ) {

        return;

    }


    if (
        distance < 0
    ) {

        nextBtn.click();

    } else {

        previousBtn.click();

    }

}



/* ==========================================
   NAVBAR SCROLL
========================================== */

window.addEventListener(
    "scroll",
    function() {

        const navbar =
            document.querySelector(
                ".navbar"
            );


        if (
            window.scrollY > 40
        ) {

            navbar.style.background =
                "rgba(7, 10, 18, 0.94)";

        } else {

            navbar.style.background =
                "rgba(7, 10, 18, 0.78)";

        }

    }
);