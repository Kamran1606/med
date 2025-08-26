document.addEventListener("DOMContentLoaded", () => {
    const restaurantGrid = document.querySelector(".restaurant-grid");

    // Function to generate one skeleton card
    const createSkeletonCard = () => `
        <div class="skeleton-card">
            <div class="skeleton-img"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
        </div>
    `;

    // Show skeleton cards initially
    let skeletons = '';
    const skeletonCount = 12;
    for (let i = 0; i < skeletonCount; i++) {
        skeletons += createSkeletonCard();
    }
    restaurantGrid.innerHTML = skeletons;

    // Simulate fetching data from a server
    setTimeout(() => {
        renderActualCards();
    }, 1500); // 1.5-second delay to show the loader

    function renderActualCards() {
        // In a real app, you would fetch this data.
        const actualContent = `
            <div class="restaurant-card"><img src="store/1.jpeg"><h3>Ramkrishna Stores</h3><p>4★ · 15–20 mins · Chandannagar</p></div>
            <div class="restaurant-card"><img src="store/2.jpeg"><h3>Kanailal Seth Grocery Shop</h3><p>4.5★ · 20–25 mins · Chandannagar</p></div>
            <div class="restaurant-card"><img src="store/3.jpeg"><h3>Maa Annapurna Bhandar</h3><p>4★ · 15–20 mins · Chandannagar</p></div>
            <div class="restaurant-card"><img src="store/4.jpeg"><h3>Dutta Stores</h3><p>4.3★ · 15–20 mins · Chandannagar</p></div>
            <div class="restaurant-card"><img src="store/5.jpeg"><h3>New Town Supermarket</h3><p>4.5★ · 15–20 mins · Chandannagar</p></div>
            <div class="restaurant-card"><img src="store/6.jpeg"><h3>Kalpataru Grocery</h3><p>4.3★ · 15–20 mins · Chandannagar</p></div>
            <div class="restaurant-card"><img src="store/7.jpeg"><h3>Shyam Bhandar</h3><p>4.3★ · 20–25 mins · Chandannagar</p></div>
            <div class="restaurant-card"><img src="store/8.jpeg"><h3>Subham Stores</h3><p>4.5★ · 15–20 mins · Chandannagar</p></div>
            <div class="restaurant-card"><img src="store/9.jpeg"><h3>Gariahat Grocery Hub</h3><p>4.2★ · 20–25 mins · Chandannagar</p></div>
            <div class="restaurant-card"><img src="store/10.jpeg"><h3>Krishna Bazar</h3><p>4.4★ · 10–15 mins · Chandannagar</p></div>
            <div class="restaurant-card"><img src="store/11.jpeg"><h3>Mohan Grocery</h3><p>4.4★ · 20–25 mins · Chandannagar</p></div>
            <div class="restaurant-card"><img src="store/12.jpeg"><h3>Annapurna Daily Needs</h3><p>4.3★ · 15–20 mins · Chandannagar</p></div>
            <div class="restaurant-card"><img src="store/13.jpeg"><h3>Chandannagar Local Bazaar</h3><p>4★ · 15–20 mins · Chandannagar</p></div>
            <div class="restaurant-card"><img src="store/14.jpeg"><h3>Bhattacharya Provisions</h3><p>4.3★ · 20–25 mins ·Chandannagar</p></div>
            <div class="restaurant-card"><img src="store/15.jpeg"><h3>Nandi Stores</h3><p>4.3★ · 15–20 mins · Chandannagar</p></div>
            <div class="restaurant-card"><img src="store/16.jpeg"><h3>Kundu Grocery Shop</h3><p>4.5★ · 20–25 mins · Chandannagar</p></div>
            <div class="restaurant-card"><img src="store/17.jpeg"><h3>Daily Fresh Mart</h3><p>4.2★ · 15–20 mins · Chandannagar</p></div>
            <div class="restaurant-card"><img src="store/18.jpeg"><h3>Saha Bhandar</h3><p>4★ · 20–25 mins · Chandannagar</p></div>
            <div class="restaurant-card"><img src="store/19.jpeg"><h3>Haldiram Bhanda</h3><p>4.1★ · 15–20 mins · Chandannagar</p></div>
            <div class="restaurant-card"><img src="store/20.jpeg"><h3>Roy Brothers Grocery</h3><p>4.4★ · 20–25 mins . Chandannagar</p></div>
        `;
        restaurantGrid.innerHTML = actualContent;

        // Add click functionality to the real cards
        addCardFunctionality();
    }

    function addCardFunctionality() {
        document.querySelectorAll('.restaurant-card').forEach(card => {
            card.addEventListener('click', () => {
                const storeName = card.querySelector('h3').textContent;
                
                // Create an object with the store's name
                const storeData = { name: storeName };

                // Save it to localStorage to be used on the next page
                localStorage.setItem('selectedStore', JSON.stringify(storeData));

                // Redirect the user to the products page
                window.location.href = 'store.html';
            });
        });
    }
});