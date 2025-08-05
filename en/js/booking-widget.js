// Booking Widget JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Bugünün tarihini al ve minimum tarih olarak ayarla
    const today = new Date().toISOString().split('T')[0];
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    
    if (checkinInput && checkoutInput) {
        checkinInput.min = today;
        checkoutInput.min = today;

        // Giriş tarihi değiştiğinde çıkış tarihini güncelle
        checkinInput.addEventListener('change', function() {
            const checkinDate = new Date(this.value);
            checkinDate.setDate(checkinDate.getDate() + 1);
            checkoutInput.min = checkinDate.toISOString().split('T')[0];
            
            // Eğer çıkış tarihi giriş tarihinden önce ise, çıkış tarihini temizle
            if (checkoutInput.value && checkoutInput.value <= this.value) {
                checkoutInput.value = '';
            }
        });

        // Sayfa yüklendiğinde varsayılan tarihleri ayarla
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const dayAfterTomorrow = new Date();
        dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
        
        checkinInput.value = tomorrow.toISOString().split('T')[0];
        checkoutInput.value = dayAfterTomorrow.toISOString().split('T')[0];
    }
});

// Rezervasyon fonksiyonu - Gerçek rezervasyon sistemine yönlendir
function makeReservation() {
    const hotel = document.getElementById('hotel').value;
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const adults = document.getElementById('adults').value;
    const children = document.getElementById('children').value;

    // Form validasyonu
    if (!checkin || !checkout) {
        // Dil kontrolü - sayfa URL'sinden dil tespit et
        const currentLang = window.location.pathname.includes('/en/') ? 'en' : 'tr';
        const errorMessage = currentLang === 'en' ? 
            'Please select check-in and check-out dates.' : 
            'Lütfen giriş ve çıkış tarihlerini seçiniz.';
        alert(errorMessage);
        return;
    }

    if (new Date(checkout) <= new Date(checkin)) {
        const currentLang = window.location.pathname.includes('/en/') ? 'en' : 'tr';
        const errorMessage = currentLang === 'en' ? 
            'Check-out date must be after check-in date.' : 
            'Çıkış tarihi giriş tarihinden sonra olmalıdır.';
        alert(errorMessage);
        return;
    }

    // Mevcut dil tespit et
    const currentLang = window.location.pathname.includes('/en/') ? 'en' : 'tr';

    // Rezervasyon bilgilerini URL parametreleri olarak hazırla (EN versiyonu)
    const params = new URLSearchParams({
        currency: 'USD',
        language: 'en',
        Checkin: checkin,
        Checkout: checkout,
        Adult: adults,
        Hotel: 'Palmalife',
        child: children,
        ChildAges: ''
    });

    // Gerçek rezervasyon sistemine yönlendir
    const bookingUrl = `https://palmalifehotel.rezervasyonal.com/en/?${params.toString()}`;
    window.open(bookingUrl, '_blank');
} 