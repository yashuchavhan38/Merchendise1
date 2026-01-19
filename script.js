// --- DATABASE (Edit your products here) ---
const products = [
    {
        id: 1,
        name: "Noqs Signature Tee - Dream Place",
        price: 899,
        image: "2.png", // Back of shirt
        desc: "Premium cotton oversized tee with 'Dream Place to Start' typography. The flagship Noqs apparel."
    },
    {
        id: 2,
        name: "Noqs Minimal Logo Tee",
        price: 799,
        image: "1.png", // Front Logo
        desc: "Subtle, minimal, classic. The official developer uniform."
    },
    {
        id: 3,
        name: "Noqs Digital White Edition",
        price: 799,
        image: "5.png",
        desc: "Clean white edition for the daylight creators."
    },
    {
        id: 4,
        name: "Dev Coffee Mug - Man",
        price: 399,
        image: "9.png",
        desc: "Fuel your code. Ceramic mug with 'A cup of calm' print."
    },
    {
        id: 5,
        name: "Dev Coffee Mug - Woman",
        price: 399,
        image: "8.png",
        desc: "For the coding queens. High durability ceramic."
    },
    {
        id: 6,
        name: "Noqs Official Pen",
        price: 149,
        image: "10.png",
        desc: "Smooth flow ink for sketching your next big startup idea."
    },
    {
        id: 7,
        name: "Noqs Hardbound Notebook",
        price: 299,
        image: "11.jpg.png",
        desc: "180 GSM paper, perfect for wireframing and notes."
    }
];

// --- APP STATE ---
let cart = [];
const appContainer = document.getElementById('app-container');

// --- CONTROLLER (The Navigation Logic) ---
const app = {
    // 1. SHOW HOME (Grid)
    showHome: () => {
        let html = `
            <div class="hero-section">
                <h1 class="hero-title">Wear Your Code.</h1>
                <p style="color:var(--text-muted)">Premium Merchandise for the Noqs Community</p>
            </div>
            <h2 class="section-title">Latest Drops</h2>
            <div class="product-grid">
        `;
        
        products.forEach(p => {
            html += `
                <div class="product-card" onclick="app.showProduct(${p.id})">
                    <div class="card-img-container">
                        <img src="${p.image}" class="card-img" alt="${p.name}">
                    </div>
                    <div class="card-info">
                        <h3 class="card-title">${p.name}</h3>
                        <div class="card-price">₹${p.price}</div>
                    </div>
                </div>
            `;
        });
        
        html += `</div>`;
        appContainer.innerHTML = html;
        window.scrollTo(0,0);
    },

    // 2. SHOW PRODUCT DETAIL
    showProduct: (id) => {
        const p = products.find(x => x.id === id);
        if(!p) return;

        appContainer.innerHTML = `
            <div class="detail-view">
                <button onclick="app.showHome()" style="position:absolute; margin-top:-40px; background:none; border:none; color:white; cursor:pointer;"><i class="fa-solid fa-arrow-left"></i> Back</button>
                
                <div class="detail-gallery">
                    <div class="main-img-box">
                        <img src="${p.image}" class="detail-main-img">
                    </div>
                </div>
                
                <div class="detail-info">
                    <h1 class="detail-title">${p.name}</h1>
                    <div class="detail-price">₹${p.price}</div>
                    <p style="line-height:1.6; color:var(--text-muted);">${p.desc}</p>
                    
                    <div class="btn-container">
                        <button class="btn btn-secondary" onclick="app.addToCart(${p.id})">ADD TO CART</button>
                        <button class="btn btn-primary" onclick="app.addToCart(${p.id}); app.showCart()">BUY NOW</button>
                    </div>

                    <div style="margin-top:30px; font-size:14px; color:#666;">
                        <p><i class="fa-solid fa-check"></i> 100% Original Noqs Merch</p>
                        <p><i class="fa-solid fa-truck"></i> Free Shipping on Prepaid</p>
                    </div>
                </div>
            </div>
        `;
        window.scrollTo(0,0);
    },

    // 3. SHOW CART
    showCart: () => {
        if(cart.length === 0) {
            appContainer.innerHTML = `<div style="text-align:center; padding:50px;"><h2>Your cart is empty</h2><button class="btn btn-primary" onclick="app.showHome()" style="margin-top:20px;">Shop Now</button></div>`;
            return;
        }

        let total = 0;
        let html = `<div class="cart-view"><h2 style="margin-bottom:20px;">Your Cart</h2>`;
        
        cart.forEach((item, index) => {
            total += item.price;
            html += `
                <div class="cart-item">
                    <img src="${item.image}" class="cart-thumb">
                    <div class="cart-details">
                        <h4>${item.name}</h4>
                        <div>₹${item.price}</div>
                        <button class="remove-btn" onclick="app.removeFromCart(${index})">Remove</button>
                    </div>
                </div>
            `;
        });

        html += `
            <div class="cart-summary">
                <p>Total Amount</p>
                <div class="total-price">₹${total}</div>
                <button class="btn btn-primary" style="width:100%; margin-top:20px;" onclick="app.showCheckout(${total})">PROCEED TO PAY</button>
            </div>
        </div>`;

        appContainer.innerHTML = html;
        window.scrollTo(0,0);
    },

    // 4. SHOW CHECKOUT (QR CODE)
    showCheckout: (amount) => {
        appContainer.innerHTML = `
            <div class="checkout-view">
                <h2>Scan to Pay</h2>
                <p style="color:var(--text-muted); margin-bottom:20px;">Complete your purchase securely via UPI</p>
                
                <img src="payment-qr.png" class="qr-code" alt="Scan QR">
                
                <div class="total-price" style="margin-bottom:20px;">₹${amount}</div>
                
                <div class="input-group">
                    <label>Transaction ID (UTR)</label>
                    <input type="text" placeholder="Enter 12-digit UTR number">
                </div>
                
                <button class="btn btn-primary" onclick="alert('Order Placed Successfully! We will contact you shortly.')" style="width:100%;">CONFIRM PAYMENT</button>
            </div>
        `;
        window.scrollTo(0,0);
    },

    // LOGIC
    addToCart: (id) => {
        const product = products.find(x => x.id === id);
        cart.push(product);
        document.getElementById('cart-count').innerText = cart.length;
        alert("Added to cart!");
    },

    removeFromCart: (index) => {
        cart.splice(index, 1);
        document.getElementById('cart-count').innerText = cart.length;
        app.showCart(); // Refresh cart view
    }
};

// Initialize App
app.showHome();
