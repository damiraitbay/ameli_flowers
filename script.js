// Products Data
const products = [{
        id: 1,
        name: 'Розовый букет',
        description: 'Нежный букет из розовых роз',
        price: 5000,
        category: 'bouquet'
    },
    {
        id: 2,
        name: 'Свадебный букет',
        description: 'Элегантный белый букет для невесты',
        price: 15000,
        category: 'wedding'
    },
    {
        id: 3,
        name: 'Красные розы',
        description: 'Классический букет из красных роз',
        price: 6000,
        category: 'bouquet'
    },
    {
        id: 4,
        name: 'Корпоративный букет',
        description: 'Солидный букет для деловых подарков',
        price: 8000,
        category: 'corporate'
    },
    {
        id: 5,
        name: 'Букет тюльпанов',
        description: 'Яркий весенний букет',
        price: 4000,
        category: 'bouquet'
    },
    {
        id: 6,
        name: 'Свадебная композиция',
        description: 'Роскошная композиция для свадьбы',
        price: 20000,
        category: 'wedding'
    },
    {
        id: 7,
        name: 'Одиночная роза',
        description: 'Одна прекрасная роза в упаковке',
        price: 1500,
        category: 'single'
    },
    {
        id: 8,
        name: 'Букет хризантем',
        description: 'Яркий осенний букет',
        price: 4500,
        category: 'bouquet'
    },
    {
        id: 9,
        name: 'Корпоративная композиция',
        description: 'Большая композиция для офиса',
        price: 12000,
        category: 'corporate'
    },
    {
        id: 10,
        name: 'Букет пионов',
        description: 'Пышный букет из пионов',
        price: 7000,
        category: 'bouquet'
    },
    {
        id: 11,
        name: 'Свадебный венок',
        description: 'Элегантный венок для невесты',
        price: 18000,
        category: 'wedding'
    },
    {
        id: 12,
        name: 'Одиночная орхидея',
        description: 'Экзотическая орхидея в горшке',
        price: 3000,
        category: 'single'
    }
];

// Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const navMenu = document.getElementById('navMenu');
const menuToggle = document.getElementById('menuToggle');
const productsGrid = document.getElementById('productsGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const orderModal = document.getElementById('orderModal');
const closeOrder = document.getElementById('closeOrder');
const orderForm = document.getElementById('orderForm');
const contactForm = document.getElementById('contactForm');

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Filter Products
let currentFilter = 'all';

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderProducts();
    });
});

// Flower SVG Icons
const flowerIcons = {
    bouquet: `<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2L15.09 8.26L22 9L15.09 9.74L12 16L8.91 9.74L2 9L8.91 8.26L12 2Z"/>
        <circle cx="12" cy="12" r="2"/>
    </svg>`,
    wedding: `<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
        <path d="M2 17L12 22L22 17"/>
        <path d="M2 12L12 17L22 12"/>
        <circle cx="12" cy="12" r="1"/>
    </svg>`,
    corporate: `<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2L3.09 8.26L12 14L20.91 8.26L12 2Z"/>
        <path d="M3.09 8.26L12 14L20.91 8.26"/>
        <path d="M3.09 15.74L12 22L20.91 15.74"/>
        <path d="M12 14V22"/>
    </svg>`,
    single: `<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2L15.09 8.26L22 9L15.09 9.74L12 16L8.91 9.74L2 9L8.91 8.26L12 2Z"/>
    </svg>`
};

// Render Products
function renderProducts() {
    const filteredProducts = currentFilter === 'all' ?
        products :
        products.filter(p => p.category === currentFilter);

    productsGrid.innerHTML = filteredProducts.map(product => {
        return `
        <div class="product-card">
            <div class="product-image">
                <img src="images/flower1.png" alt="${product.name}" class="product-img">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">${product.price.toLocaleString()} ₸</span>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        В корзину
                    </button>
                </div>
            </div>
        </div>
    `;
    }).join('');
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...product, quantity: 1 });
    }

    updateCart();
    showNotification('Товар добавлен в корзину!');
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Update Cart
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    renderCartItems();
}

// Render Cart Items
function renderCartItems() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: var(--text-light); padding: 2rem;">Корзина пуста</p>';
        cartTotal.textContent = '0';
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toLocaleString();

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${item.price.toLocaleString()} ₸ × ${item.quantity}</div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">×</button>
        </div>
    `).join('');
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        box-shadow: var(--shadow-hover);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Cart Modal
cartBtn.addEventListener('click', () => {
    cartModal.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartModal.classList.remove('active');
});

cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.classList.remove('active');
    }
});

// Checkout
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        showNotification('Корзина пуста!');
        return;
    }
    cartModal.classList.remove('active');
    orderModal.classList.add('active');
});

// Order Modal
closeOrder.addEventListener('click', () => {
    orderModal.classList.remove('active');
});

orderModal.addEventListener('click', (e) => {
    if (e.target === orderModal) {
        orderModal.classList.remove('active');
    }
});

// Configuration - настройте здесь куда отправлять заказы
const ORDER_CONFIG = {
    // Вариант 1: Отправка на сервер (раскомментируйте и укажите URL вашего API)
    // apiUrl: 'https://your-api.com/api/orders',

    // Вариант 2: WhatsApp (укажите номер телефона)
    whatsappNumber: '77064284624', // Замените на ваш номер в формате: 77001234567 (без +)
    sendToWhatsApp: true, // true - автоматически открывать WhatsApp, false - только показывать ссылку

    // Вариант 3: Email через mailto (укажите email)
    // email: 'orders@ameliflowers.kz',

    // Вариант 4: Telegram Bot (укажите bot token и chat_id)
    // telegramBotToken: 'YOUR_BOT_TOKEN',
    // telegramChatId: 'YOUR_CHAT_ID',
};

// Order Form Submit
orderForm.addEventListener('submit', async(e) => {
            e.preventDefault();

            const formData = new FormData(e.target);
            const orderData = {
                items: cart,
                total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
                customer: {
                    name: e.target[0].value,
                    phone: e.target[1].value,
                    email: e.target[2].value,
                    address: e.target[3].value,
                    comment: e.target[4].value
                },
                date: new Date().toISOString()
            };

            // Вывод в консоль для отладки
            console.log('Order JSON:', JSON.stringify(orderData, null, 2));

            try {
                // Вариант 1: Отправка на сервер (если настроен)
                if (ORDER_CONFIG.apiUrl) {
                    const response = await fetch(ORDER_CONFIG.apiUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(orderData)
                    });

                    if (response.ok) {
                        const result = await response.json();
                        console.log('Order sent to server:', result);
                    } else {
                        console.error('Server error:', response.status);
                    }
                }

                // Вариант 2: Отправка в WhatsApp
                if (ORDER_CONFIG.whatsappNumber) {
                    const message = `🌸 *Новый заказ Ameli Flowers*\n\n` +
                        `👤 *Имя:* ${orderData.customer.name}\n` +
                        `📱 *Телефон:* ${orderData.customer.phone}\n` +
                        (orderData.customer.email ? `📧 *Email:* ${orderData.customer.email}\n` : '') +
                        `📍 *Адрес:* ${orderData.customer.address}\n` +
                        (orderData.customer.comment ? `💬 *Комментарий:* ${orderData.customer.comment}\n` : '') +
                        `\n🛍️ *Товары:*\n` +
                        orderData.items.map(item =>
                            `• ${item.name} × ${item.quantity} = ${(item.price * item.quantity).toLocaleString()} ₸`
                        ).join('\n') +
                        `\n\n💰 *Итого: ${orderData.total.toLocaleString()} ₸*`;

                    const whatsappLink = `https://wa.me/${ORDER_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;

                    if (ORDER_CONFIG.sendToWhatsApp) {
                        window.open(whatsappLink, '_blank');
                    } else {
                        console.log('WhatsApp link:', whatsappLink);
                        // Можно скопировать в буфер обмена
                        navigator.clipboard.writeText(whatsappLink).then(() => {
                            showNotification('Ссылка на WhatsApp скопирована в буфер обмена!');
                        });
                    }
                }

                // Вариант 3: Email через mailto
                if (ORDER_CONFIG.email) {
                    const emailSubject = encodeURIComponent('Новый заказ с сайта Ameli Flowers');
                    const emailBody = encodeURIComponent(
                            `Новый заказ!\n\n` +
                            `Имя: ${orderData.customer.name}\n` +
                            `Телефон: ${orderData.customer.phone}\n` +
                            `Email: ${orderData.customer.email || 'не указан'}\n` +
                            `Адрес: ${orderData.customer.address}\n` +
                            `Комментарий: ${orderData.customer.comment || 'нет'}\n\n` +
                            `Товары:\n${orderData.items.map(item => 
                    `- ${item.name} × ${item.quantity} = ${(item.price * item.quantity).toLocaleString()} ₸`
                ).join('\n')}\n\n` +
                `Итого: ${orderData.total.toLocaleString()} ₸`
            );
            window.location.href = `mailto:${ORDER_CONFIG.email}?subject=${emailSubject}&body=${emailBody}`;
        }

        // Вариант 4: Telegram Bot (требует настройки бота)
        if (ORDER_CONFIG.telegramBotToken && ORDER_CONFIG.telegramChatId) {
            const telegramMessage = `🌸 *Новый заказ Ameli Flowers*\n\n` +
                `👤 Имя: ${orderData.customer.name}\n` +
                `📱 Телефон: ${orderData.customer.phone}\n` +
                `📍 Адрес: ${orderData.customer.address}\n\n` +
                `Товары:\n${orderData.items.map(item => 
                    `• ${item.name} × ${item.quantity} = ${(item.price * item.quantity).toLocaleString()} ₸`
                ).join('\n')}\n\n` +
                `Итого: ${orderData.total.toLocaleString()} ₸`;
            
            try {
                await fetch(`https://api.telegram.org/bot${ORDER_CONFIG.telegramBotToken}/sendMessage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chat_id: ORDER_CONFIG.telegramChatId,
                        text: telegramMessage,
                        parse_mode: 'Markdown'
                    })
                });
                console.log('Order sent to Telegram');
            } catch (error) {
                console.error('Telegram error:', error);
            }
        }

        // Сохранение заказа в localStorage для истории
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push(orderData);
        localStorage.setItem('orders', JSON.stringify(orders));

        // Show success message
        showNotification('Заказ оформлен! Мы свяжемся с вами в ближайшее время.');

        // Clear cart
        cart = [];
        updateCart();

        // Close modal and reset form
        orderModal.classList.remove('active');
        orderForm.reset();

    } catch (error) {
        console.error('Error processing order:', error);
        showNotification('Произошла ошибка. Попробуйте позже или свяжитесь с нами напрямую.');
    }
});

// Contact Form Submit
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: e.target[0].value,
        phone: e.target[1].value,
        message: e.target[2].value
    };
    
    // In a real app, this would send to a backend
    console.log('Contact form:', formData);
    
    showNotification('Спасибо! Мы свяжемся с вами в ближайшее время.');
    contactForm.reset();
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll Animations with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections for animation
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section, .feature, .delivery-item, .contact-item');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(section);
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Parallax effect for hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - scrolled / window.innerHeight;
    }
});

// Smooth reveal animations for products
function animateProducts() {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

// Enhanced renderProducts with animations
const originalRenderProducts = renderProducts;
renderProducts = function() {
    originalRenderProducts();
    setTimeout(animateProducts, 50);
};

// Initialize
renderProducts();
updateCart();

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    /* Smooth transitions for all interactive elements */
    a, button {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* Loading animation */
    @keyframes shimmer {
        0% {
            background-position: -1000px 0;
        }
        100% {
            background-position: 1000px 0;
        }
    }
`;
document.head.appendChild(style);