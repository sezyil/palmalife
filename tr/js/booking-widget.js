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
        alert('Lütfen giriş ve çıkış tarihlerini seçiniz.');
        return;
    }

    if (new Date(checkout) <= new Date(checkin)) {
        alert('Çıkış tarihi giriş tarihinden sonra olmalıdır.');
        return;
    }

    // Rezervasyon bilgilerini URL parametreleri olarak hazırla (TR versiyonu için TRY para birimi)
    const params = new URLSearchParams({
        currency: 'TRY',
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