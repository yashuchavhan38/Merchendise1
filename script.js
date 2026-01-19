// Image Switcher
function changeImage(element) {
    // Swap main image
    document.getElementById("mainImg").src = element.src;
    
    // Update active border
    document.querySelectorAll(".thumb").forEach(thumb => {
        thumb.classList.remove("active");
    });
    element.classList.add("active");
}

// Size Selector
function selectSize(element) {
    document.querySelectorAll(".size-option").forEach(size => {
        size.classList.remove("selected");
    });
    element.classList.add("selected");
}

// Add to Cart Logic
document.querySelector(".btn-cart").addEventListener("click", function() {
    let btn = this;
    // Save original content
    let originalContent = btn.innerHTML;
    
    // Change to loading
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> ADDING...';
    
    // Simulate API delay
    setTimeout(() => {
        btn.innerHTML = '<i class="fa-solid fa-check"></i> ADDED';
        btn.style.backgroundColor = "#388e3c"; // Success Green
        
        // Revert after 2 seconds
        setTimeout(() => {
            btn.innerHTML = originalContent;
            btn.style.backgroundColor = "#ff9f00"; // Back to yellow
        }, 2000);
    }, 800);
});

// Buy Now Logic
document.querySelector(".btn-buy").addEventListener("click", function() {
    alert("Proceeding to checkout for Noqs Merchandise!");
});
