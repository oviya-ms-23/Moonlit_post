/**
 * Amazon.com Clone — Main JavaScript
 * Handles cart state, navigation search, deals timer, product catalog, search filters, detail page, and checkout wizard.
 */

(function () {
  'use strict';

  const CART_KEY = 'amz_cart';
  const USER_KEY = 'amz_user';

  // =========================================================================
  // State: Cart & Storage
  // =========================================================================
  function getCart() {
    try {
      const stored = localStorage.getItem(CART_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Error reading cart:', e);
      return [];
    }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      updateCartBadge();
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  }

  function addToCart(productId, quantity = 1) {
    const qty = parseInt(quantity, 10) || 1;
    const cart = getCart();
    const product = (window.PRODUCTS || []).find(p => p.id === Number(productId));

    if (!product) return;

    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += qty;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        prime: product.prime,
        quantity: qty
      });
    }

    saveCart(cart);
    showCartToast(product, qty);
  }

  function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== Number(productId));
    saveCart(cart);
    if (typeof renderCartPage === 'function') {
      renderCartPage();
    }
  }

  function updateCartQuantity(productId, quantity) {
    let cart = getCart();
    const qty = parseInt(quantity, 10);
    if (qty <= 0) {
      cart = cart.filter(item => item.id !== Number(productId));
    } else {
      const item = cart.find(i => i.id === Number(productId));
      if (item) item.quantity = qty;
    }
    saveCart(cart);
    if (typeof renderCartPage === 'function') {
      renderCartPage();
    }
  }

  function getCartSummary() {
    const cart = getCart();
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = subtotal > 35 || subtotal === 0 ? 0 : 5.99;
    const tax = subtotal * 0.0825; // 8.25% standard tax
    const total = subtotal + shipping + tax;
    return { count, subtotal, shipping, tax, total };
  }

  function updateCartBadge() {
    const { count } = getCartSummary();
    const badges = document.querySelectorAll('.cart-count');
    badges.forEach(b => {
      b.textContent = count;
    });
  }

  // =========================================================================
  // Toast Notification
  // =========================================================================
  function showCartToast(product, qty = 1) {
    const existing = document.querySelector('.amz-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'amz-toast';
    toast.innerHTML = `
      <span style="color: var(--amz-green); font-size: 20px;">✓</span>
      <div>
        <div style="font-weight: 700; font-size: 14px;">Added to Cart</div>
        <div style="font-size: 12px; color: var(--amz-text-muted); max-width: 280px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
          ${qty}x ${product.name}
        </div>
      </div>
      <a href="cart.html" class="btn-amz btn-amz-primary btn-amz-sm" style="margin-left: 10px;">Cart</a>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
      if (toast && toast.parentNode) {
        toast.style.transition = 'opacity 0.3s ease';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
      }
    }, 3500);
  }

  // =========================================================================
  // Global Header: Search Execution
  // =========================================================================
  function initHeaderSearch() {
    const searchForm = document.getElementById('nav-search-form');
    const searchInput = document.getElementById('nav-search-input');
    const searchCategory = document.getElementById('nav-search-category');

    if (searchForm && searchInput) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const q = encodeURIComponent(searchInput.value.trim());
        const cat = searchCategory ? encodeURIComponent(searchCategory.value) : 'All';
        window.location.href = `search.html?q=${q}&category=${cat}`;
      });
    }

    // Back to top button
    const backToTop = document.getElementById('footer-back-to-top');
    if (backToTop) {
      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Delivery zip code mock prompt
    const deliverBox = document.getElementById('nav-deliver-box');
    if (deliverBox) {
      deliverBox.addEventListener('click', () => {
        const zip = prompt('Enter your US ZIP code for delivery estimates:', '10001');
        if (zip) {
          const zipEl = document.getElementById('deliver-zip-text');
          if (zipEl) zipEl.textContent = `New York ${zip.trim()}`;
        }
      });
    }

    // Update greeting if user is logged in
    const user = localStorage.getItem(USER_KEY);
    const greetingEl = document.getElementById('nav-user-greeting');
    if (greetingEl && user) {
      greetingEl.textContent = `Hello, ${user}`;
    }
  }

  // =========================================================================
  // Page: Home (index.html)
  // =========================================================================
  function initHomePage() {
    const heroSlider = document.querySelector('.hero-slider');
    if (!heroSlider) return;

    // Carousel logic
    const slides = document.querySelectorAll('.hero-slide');
    const prevBtn = document.querySelector('.hero-nav-prev');
    const nextBtn = document.querySelector('.hero-nav-next');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
      slides.forEach((s, i) => {
        s.classList.toggle('active', i === index);
      });
      currentSlide = index;
    }

    function nextSlide() {
      let next = (currentSlide + 1) % slides.length;
      showSlide(next);
    }

    function prevSlide() {
      let prev = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(prev);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });

    function resetInterval() {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 5000);
    }
    resetInterval();

    // Deals countdown timer (hours:min:sec)
    const timerEl = document.getElementById('deals-countdown-timer');
    if (timerEl) {
      let totalSeconds = 14 * 3600 + 42 * 60 + 19;
      setInterval(() => {
        if (totalSeconds > 0) totalSeconds--;
        const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const s = String(totalSeconds % 60).padStart(2, '0');
        timerEl.textContent = `${h}:${m}:${s}`;
      }, 1000);
    }

    // Render Deals of the Day row (6 products)
    const dealsRow = document.getElementById('home-deals-row');
    if (dealsRow && window.PRODUCTS) {
      const dealProducts = window.PRODUCTS.filter(p => p.isDealOfDay).slice(0, 6);
      dealsRow.innerHTML = dealProducts.map(p => `
        <a href="product.html?id=${p.id}" class="h-product-item">
          <div class="h-product-img-box">
            <img src="${p.image}" alt="${p.name}" loading="lazy" />
          </div>
          <span class="deal-pill">Up to ${p.discountPercent}% off</span>
          <div>
            <span class="h-product-price">$${p.price.toFixed(2)}</span>
            <span class="h-product-old-price">$${p.typicalPrice.toFixed(2)}</span>
          </div>
          <div class="h-product-name">${p.name}</div>
        </a>
      `).join('');
    }

    // Render "Based on your browsing" row (8 products)
    const browsingRow = document.getElementById('home-browsing-row');
    if (browsingRow && window.PRODUCTS) {
      const browseProducts = window.PRODUCTS.slice(6, 14);
      browsingRow.innerHTML = browseProducts.map(p => `
        <a href="product.html?id=${p.id}" class="h-product-item">
          <div class="h-product-img-box">
            <img src="${p.image}" alt="${p.name}" loading="lazy" />
          </div>
          <div>
            <span class="h-product-price">$${p.price.toFixed(2)}</span>
            ${p.discountPercent > 0 ? `<span class="h-product-old-price">$${p.typicalPrice.toFixed(2)}</span>` : ''}
          </div>
          <div class="h-product-name">${p.name}</div>
        </a>
      `).join('');
    }
  }

  // =========================================================================
  // Page: Search Results (search.html)
  // =========================================================================
  function initSearchPage() {
    const listContainer = document.getElementById('search-products-list');
    if (!listContainer || !window.PRODUCTS) return;

    const urlParams = new URLSearchParams(window.location.search);
    const query = (urlParams.get('q') || '').trim();
    const categoryParam = urlParams.get('category') || 'All';

    // Populate search keyword in header and title
    const searchHeaderTitle = document.getElementById('search-query-header');
    if (searchHeaderTitle) {
      searchHeaderTitle.textContent = query ? `"${query}"` : 'All Products';
    }

    // Search bar input sync
    const searchInput = document.getElementById('nav-search-input');
    if (searchInput && query) {
      searchInput.value = query;
    }

    // Checkbox elements
    const primeFilterCb = document.getElementById('filter-prime-cb');
    const ratingFilters = document.querySelectorAll('input[name="filter-rating"]');
    const brandCheckboxes = document.querySelectorAll('.filter-brand-cb');
    const priceMinInput = document.getElementById('filter-price-min');
    const priceMaxInput = document.getElementById('filter-price-max');
    const priceGoBtn = document.getElementById('filter-price-go');
    const sortSelect = document.getElementById('search-sort-select');

    function renderFilteredProducts() {
      let filtered = [...window.PRODUCTS];

      // Filter by category
      if (categoryParam && categoryParam !== 'All') {
        filtered = filtered.filter(p => p.category.toLowerCase() === categoryParam.toLowerCase());
      }

      // Filter by search query
      if (query) {
        const qLower = query.toLowerCase();
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(qLower) || 
          p.description.toLowerCase().includes(qLower) ||
          p.category.toLowerCase().includes(qLower) ||
          p.brand.toLowerCase().includes(qLower)
        );
      }

      // Filter by Prime
      if (primeFilterCb && primeFilterCb.checked) {
        filtered = filtered.filter(p => p.prime);
      }

      // Filter by Rating
      const selectedRating = Array.from(ratingFilters).find(r => r.checked);
      if (selectedRating && selectedRating.value) {
        const minRating = parseFloat(selectedRating.value);
        filtered = filtered.filter(p => p.rating >= minRating);
      }

      // Filter by Brands
      const selectedBrands = Array.from(brandCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value.toLowerCase());
      if (selectedBrands.length > 0) {
        filtered = filtered.filter(p => selectedBrands.includes(p.brand.toLowerCase()));
      }

      // Filter by Price range
      const minPrice = parseFloat(priceMinInput ? priceMinInput.value : 0) || 0;
      const maxPrice = parseFloat(priceMaxInput ? priceMaxInput.value : 999999) || 999999;
      filtered = filtered.filter(p => p.price >= minPrice && p.price <= maxPrice);

      // Sorting
      const sortVal = sortSelect ? sortSelect.value : 'featured';
      if (sortVal === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortVal === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
      } else if (sortVal === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
      } else if (sortVal === 'newest') {
        filtered.sort((a, b) => b.id - a.id);
      }

      // Results count text
      const countEl = document.getElementById('search-results-count');
      if (countEl) {
        countEl.textContent = `1-${filtered.length} of over ${filtered.length * 40} results`;
      }

      // Render cards
      if (filtered.length === 0) {
        listContainer.innerHTML = `
          <div style="background:#fff; padding: 40px; text-align: center; border-radius: 4px; border: 1px solid var(--amz-border);">
            <h2 style="font-size: 20px; margin-bottom: 10px;">No results found for "${query}"</h2>
            <p style="color: var(--amz-text-muted);">Try checking your spelling or use more general terms.</p>
          </div>
        `;
        return;
      }

      listContainer.innerHTML = filtered.map(p => {
        const dollars = Math.floor(p.price);
        const cents = String(Math.round((p.price - dollars) * 100)).padStart(2, '0');
        const badgeHTML = p.badge 
          ? `<span class="search-badge-best">${p.badge}</span>` 
          : '';

        return `
          <div class="search-product-card" data-product-id="${p.id}">
            <div class="search-product-img-box">
              <a href="product.html?id=${p.id}">
                <img src="${p.image}" alt="${p.name}" loading="lazy" />
              </a>
            </div>
            <div class="search-product-info">
              <div>
                ${badgeHTML}
                <h2 class="search-product-title">
                  <a href="product.html?id=${p.id}">${p.name}</a>
                </h2>
                <div class="stars-wrap" style="margin-bottom: 6px;">
                  <span class="stars-gold">${'★'.repeat(Math.round(p.rating))}</span>
                  <span class="rating-count">${p.rating.toFixed(1)} (${p.reviewCount.toLocaleString()})</span>
                </div>
                <div class="search-price-block">
                  <span style="font-size: 14px; vertical-align: super; font-weight: 700;">$</span>
                  <span class="search-price-main">${dollars}</span>
                  <span class="search-price-sup">${cents}</span>
                  ${p.typicalPrice > p.price ? `<span style="font-size: 13px; color: var(--amz-text-muted); text-decoration: line-through; margin-left: 6px;">List: $${p.typicalPrice.toFixed(2)}</span>` : ''}
                </div>
                ${p.prime ? `
                  <div style="margin-bottom: 4px;">
                    <span class="prime-badge">prime<span class="prime-check">✓</span></span>
                  </div>
                ` : ''}
                <div class="search-delivery-date">
                  FREE delivery <strong>Tomorrow, 2 PM - 6 PM</strong>
                </div>
                ${p.stock < 10 ? `<div class="search-stock-warning">Only ${p.stock} left in stock - order soon.</div>` : ''}
              </div>
              <div style="margin-top: 10px;">
                <button class="btn-amz btn-amz-cart btn-amz-sm add-cart-btn" data-id="${p.id}">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('');

      // Wire Add to Cart buttons
      listContainer.querySelectorAll('.add-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const id = btn.getAttribute('data-id');
          addToCart(id, 1);
        });
      });
    }

    // Attach listeners
    if (primeFilterCb) primeFilterCb.addEventListener('change', renderFilteredProducts);
    ratingFilters.forEach(r => r.addEventListener('change', renderFilteredProducts));
    brandCheckboxes.forEach(cb => cb.addEventListener('change', renderFilteredProducts));
    if (priceGoBtn) priceGoBtn.addEventListener('click', renderFilteredProducts);
    if (sortSelect) sortSelect.addEventListener('change', renderFilteredProducts);

    renderFilteredProducts();
  }

  // =========================================================================
  // Page: Product Detail (product.html)
  // =========================================================================
  function initProductPage() {
    const detailContainer = document.querySelector('.product-detail-layout');
    if (!detailContainer || !window.PRODUCTS) return;

    const urlParams = new URLSearchParams(window.location.search);
    const productId = Number(urlParams.get('id')) || 1;
    const product = window.PRODUCTS.find(p => p.id === productId) || window.PRODUCTS[0];

    document.title = `${product.name} : Amazon.com`;

    // Populate Breadcrumbs
    const bcCat = document.getElementById('bc-category');
    const bcTitle = document.getElementById('bc-title');
    if (bcCat) {
      bcCat.textContent = product.category;
      bcCat.href = `search.html?category=${encodeURIComponent(product.category)}`;
    }
    if (bcTitle) bcTitle.textContent = product.name;

    // Populate Main Information
    const mainImg = document.getElementById('detail-main-img');
    const brandLink = document.getElementById('detail-brand-link');
    const titleEl = document.getElementById('detail-title');
    const ratingStarsEl = document.getElementById('detail-stars');
    const reviewCountEl = document.getElementById('detail-review-count');
    const discountEl = document.getElementById('detail-discount');
    const priceMainEl = document.getElementById('detail-price');
    const typicalPriceEl = document.getElementById('detail-typical-price');
    const featuresListEl = document.getElementById('detail-features');
    const descEl = document.getElementById('detail-desc-text');

    if (mainImg) mainImg.src = product.image;
    if (brandLink) {
      brandLink.textContent = `Brand: ${product.brand}`;
      brandLink.href = `search.html?q=${encodeURIComponent(product.brand)}`;
    }
    if (titleEl) titleEl.textContent = product.name;
    if (ratingStarsEl) ratingStarsEl.textContent = '★'.repeat(Math.round(product.rating));
    if (reviewCountEl) reviewCountEl.textContent = `${product.rating.toFixed(1)} (${product.reviewCount.toLocaleString()} ratings)`;

    if (discountEl) {
      if (product.discountPercent > 0) {
        discountEl.textContent = `-${product.discountPercent}%`;
        discountEl.style.display = 'inline-block';
      } else {
        discountEl.style.display = 'none';
      }
    }

    if (priceMainEl) {
      const dollars = Math.floor(product.price);
      const cents = String(Math.round((product.price - dollars) * 100)).padStart(2, '0');
      priceMainEl.innerHTML = `<span style="font-size: 16px; vertical-align: super;">$</span>${dollars}<span style="font-size: 16px; vertical-align: super;">${cents}</span>`;
    }

    if (typicalPriceEl) {
      if (product.typicalPrice > product.price) {
        typicalPriceEl.innerHTML = `Typical price: <span>$${product.typicalPrice.toFixed(2)}</span>`;
      } else {
        typicalPriceEl.textContent = '';
      }
    }

    if (featuresListEl && product.features) {
      featuresListEl.innerHTML = product.features.map(f => `<li>${f}</li>`).join('');
    }

    if (descEl) descEl.textContent = product.description;

    // Buy Box
    const buyBoxPrice = document.getElementById('buy-box-price-val');
    const buyBoxStock = document.getElementById('buy-box-stock-status');
    const qtySelect = document.getElementById('buy-box-qty-select');
    const addCartBtn = document.getElementById('buy-box-add-cart');
    const buyNowBtn = document.getElementById('buy-box-buy-now');

    if (buyBoxPrice) buyBoxPrice.textContent = `$${product.price.toFixed(2)}`;
    if (buyBoxStock) {
      if (product.stock > 0) {
        buyBoxStock.textContent = 'In Stock';
        buyBoxStock.style.color = 'var(--amz-green)';
      } else {
        buyBoxStock.textContent = 'Currently Unavailable';
        buyBoxStock.style.color = 'var(--amz-red)';
      }
    }

    if (addCartBtn) {
      addCartBtn.addEventListener('click', () => {
        const qty = qtySelect ? parseInt(qtySelect.value, 10) : 1;
        addToCart(product.id, qty);
      });
    }

    if (buyNowBtn) {
      buyNowBtn.addEventListener('click', () => {
        const qty = qtySelect ? parseInt(qtySelect.value, 10) : 1;
        addToCart(product.id, qty);
        window.location.href = 'checkout.html';
      });
    }

    // Thumbnail switching
    const thumbs = document.querySelectorAll('.thumb-item');
    thumbs.forEach(t => {
      t.addEventListener('click', () => {
        thumbs.forEach(other => other.classList.remove('active'));
        t.classList.add('active');
        const img = t.querySelector('img');
        if (img && mainImg) {
          mainImg.src = img.src;
        }
      });
    });

    // Color Variant chips
    const variantChips = document.querySelectorAll('.variant-chip');
    variantChips.forEach(chip => {
      chip.addEventListener('click', () => {
        variantChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
      });
    });

    // Frequently bought together
    const fbtAddBtn = document.getElementById('fbt-add-all-btn');
    if (fbtAddBtn) {
      fbtAddBtn.addEventListener('click', () => {
        addToCart(product.id, 1);
        // Add 2 random bundle items
        const others = window.PRODUCTS.filter(p => p.id !== product.id).slice(0, 2);
        others.forEach(o => addToCart(o.id, 1));
      });
    }
  }

  // =========================================================================
  // Page: Shopping Cart (cart.html)
  // =========================================================================
  function renderCartPage() {
    const cartContainer = document.getElementById('cart-items-container');
    const emptyState = document.getElementById('cart-empty-state');
    const cartLayout = document.getElementById('cart-layout-grid');
    const subtotalTextEl = document.getElementById('cart-subtotal-header');
    const sidebarSubtotalEl = document.getElementById('sidebar-subtotal-text');

    if (!cartContainer) return;

    const cart = getCart();
    const summary = getCartSummary();

    if (cart.length === 0) {
      if (cartLayout) cartLayout.style.display = 'none';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (cartLayout) cartLayout.style.display = 'grid';
    if (emptyState) emptyState.style.display = 'none';

    if (subtotalTextEl) {
      subtotalTextEl.innerHTML = `Subtotal (${summary.count} item${summary.count > 1 ? 's' : ''}): <strong>$${summary.subtotal.toFixed(2)}</strong>`;
    }

    if (sidebarSubtotalEl) {
      sidebarSubtotalEl.innerHTML = `Subtotal (${summary.count} item${summary.count > 1 ? 's' : ''}): <strong>$${summary.subtotal.toFixed(2)}</strong>`;
    }

    cartContainer.innerHTML = cart.map(item => `
      <div class="cart-item-row" data-id="${item.id}">
        <div class="cart-item-img-box">
          <a href="product.html?id=${item.id}">
            <img src="${item.image}" alt="${item.name}" />
          </a>
        </div>
        <div>
          <h3 class="cart-item-title">
            <a href="product.html?id=${item.id}">${item.name}</a>
          </h3>
          <div style="color: var(--amz-green); font-size: 12px; font-weight: 700; margin-bottom: 2px;">In Stock</div>
          <div style="font-size: 12px; color: var(--amz-text-muted); margin-bottom: 6px;">
            Eligible for FREE Shipping & FREE Returns
          </div>
          ${item.prime ? '<span class="prime-badge" style="margin-bottom: 6px;">prime<span class="prime-check">✓</span></span>' : ''}
          <div class="cart-item-actions">
            <div class="qty-select-wrap">
              <label style="font-size: 12px; color: var(--amz-text-muted);">Qty:</label>
              <select class="qty-select cart-qty-dropdown" data-id="${item.id}">
                ${[1,2,3,4,5,6,7,8,9,10].map(n => `<option value="${n}" ${n === item.quantity ? 'selected' : ''}>${n}</option>`).join('')}
              </select>
            </div>
            <span style="color: #ccc;">|</span>
            <a href="#" class="cart-delete-link" data-id="${item.id}">Delete</a>
            <span style="color: #ccc;">|</span>
            <a href="#" class="cart-save-link">Save for later</a>
            <span style="color: #ccc;">|</span>
            <a href="#" class="cart-share-link">Share</a>
          </div>
        </div>
        <div style="text-align: right; font-size: 18px; font-weight: 700;">
          $${(item.price * item.quantity).toFixed(2)}
        </div>
      </div>
    `).join('');

    // Attach listeners
    cartContainer.querySelectorAll('.cart-qty-dropdown').forEach(sel => {
      sel.addEventListener('change', () => {
        const id = sel.getAttribute('data-id');
        updateCartQuantity(id, sel.value);
      });
    });

    cartContainer.querySelectorAll('.cart-delete-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const id = link.getAttribute('data-id');
        removeFromCart(id);
      });
    });
  }

  // =========================================================================
  // Page: Checkout (checkout.html)
  // =========================================================================
  function initCheckoutPage() {
    const checkoutContainer = document.getElementById('checkout-wizard-container');
    if (!checkoutContainer) return;

    const cart = getCart();
    const summary = getCartSummary();

    if (cart.length === 0) {
      checkoutContainer.innerHTML = `
        <div style="background:#fff; border: 1px solid var(--amz-border); padding: 40px; text-align: center; border-radius: 4px; max-width: 600px; margin: 30px auto;">
          <h2>Your Amazon Cart is empty.</h2>
          <p style="margin: 15px 0 20px; color: var(--amz-text-muted);">Shop today's deals, electronics, books, and more.</p>
          <a href="index.html" class="btn-amz btn-amz-primary">Continue shopping</a>
        </div>
      `;
      return;
    }

    // Populate Sidebar Summary
    const itemsCountEl = document.getElementById('summary-items-count');
    const subtotalEl = document.getElementById('summary-subtotal-val');
    const shippingEl = document.getElementById('summary-shipping-val');
    const taxEl = document.getElementById('summary-tax-val');
    const totalEl = document.getElementById('summary-total-val');

    if (itemsCountEl) itemsCountEl.textContent = `Items (${summary.count}):`;
    if (subtotalEl) subtotalEl.textContent = `$${summary.subtotal.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = summary.shipping === 0 ? 'FREE' : `$${summary.shipping.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `$${summary.tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${summary.total.toFixed(2)}`;

    // Wizard Step Navigation
    let currentStep = 1;
    function setStep(step) {
      currentStep = step;
      document.querySelectorAll('.checkout-step-card').forEach(card => {
        const cardStep = Number(card.getAttribute('data-step'));
        const content = card.querySelector('.step-body');
        if (content) {
          content.style.display = cardStep === currentStep ? 'block' : 'none';
        }
      });
      window.scrollTo({ top: 50, behavior: 'smooth' });
    }

    // Step 1: Sign in / Guest Next
    const step1Btn = document.getElementById('checkout-step1-btn');
    if (step1Btn) {
      step1Btn.addEventListener('click', (e) => {
        e.preventDefault();
        const email = document.getElementById('checkout-email-input');
        if (email && email.value) {
          localStorage.setItem(USER_KEY, email.value.split('@')[0]);
        }
        setStep(2);
      });
    }

    // Step 2: Address Form Next
    const step2Form = document.getElementById('checkout-address-form');
    if (step2Form) {
      step2Form.addEventListener('submit', (e) => {
        e.preventDefault();
        setStep(3);
      });
    }

    // Step 3: Payment Next
    const step3Form = document.getElementById('checkout-payment-form');
    if (step3Form) {
      step3Form.addEventListener('submit', (e) => {
        e.preventDefault();
        setStep(4);
      });
    }

    // Step 4: Review and Place Order
    const placeOrderBtn = document.getElementById('checkout-place-order-btn');
    const sidebarPlaceBtn = document.getElementById('sidebar-place-order-btn');

    function executePlaceOrder() {
      // Clear cart
      localStorage.removeItem(CART_KEY);
      updateCartBadge();

      // Show Confirmation Step
      setStep(5);
    }

    if (placeOrderBtn) placeOrderBtn.addEventListener('click', executePlaceOrder);
    if (sidebarPlaceBtn) sidebarPlaceBtn.addEventListener('click', executePlaceOrder);

    // Initial step setup
    setStep(1);
  }

  // =========================================================================
  // Page: Login & Register (login.html, register.html)
  // =========================================================================
  function initAuthPages() {
    // Login form
    const loginForm = document.getElementById('amz-login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('login-email-input');
        const username = emailInput && emailInput.value ? emailInput.value.split('@')[0] : 'Customer';
        localStorage.setItem(USER_KEY, username);
        window.location.href = 'index.html';
      });
    }

    // Register form
    const registerForm = document.getElementById('amz-register-form');
    if (registerForm) {
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('register-name-input');
        const username = nameInput && nameInput.value ? nameInput.value : 'Customer';
        localStorage.setItem(USER_KEY, username);

        // Show OTP simulation step
        const otpModal = document.getElementById('otp-verify-modal');
        if (otpModal) {
          otpModal.style.display = 'block';
        } else {
          window.location.href = 'index.html';
        }
      });
    }

    const otpSubmitBtn = document.getElementById('otp-submit-btn');
    if (otpSubmitBtn) {
      otpSubmitBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
      });
    }
  }

  // =========================================================================
  // Initialize App on DOM Ready
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    initHeaderSearch();
    initHomePage();
    initSearchPage();
    initProductPage();
    renderCartPage();
    initCheckoutPage();
    initAuthPages();
  });

  // Global helper API
  window.AmazonApp = {
    addToCart,
    removeFromCart,
    updateCartQuantity,
    getCart,
    getCartSummary
  };
})();
