// CMS API Configuration
const CMS_BASE_URL = 'http://localhost:1337/api';
const CMS_TOKEN = '39c0b4435050c6315b841b829ffd48b3f0993983bd60e7e62c696b8f1e951f27994cad8ffc3b29c15d86d4b5640710654022d4d7c55e385875f4d1335995fa3a8cbc8afee08211f86cf64a3c7a6c16a59605fcdbde077925f070f8810f006efb4eb5f344f38fd33f0a292619fbd76317f31727f452d940876c4cd3047c55945c';

// Fallback data for when CMS is not available
const FALLBACK_DATA = {
  siteSettings: {
    site_name: "Palmalife Hotel",
    footer_color: "#416040",
    contact_email: "info@palmalifehotel.com",
    contact_phone: "+90 (252) 396 70 02",
    address: "Dirmil Mahallesi, Şendoğan Caddesi No:52, Yalıkavak – Bodrum / Muğla Türkiye",
    social_links: {
      instagram: "#",
      whatsapp: "#",
      facebook: "#",
      twitter: "#"
    },
    working_hours: "24/7 Open"
  },
  menuItems: [
    { name: "Ana Sayfa", url: "index.html", order: 1, is_active: true },
    { name: "Odalar & Suitler", url: "room-list.html", order: 2, is_active: true },
    { name: "Restoran & Bar", url: "restaurant.html", order: 3, is_active: true },
    { name: "Havuz & Plaj", url: "pool-beach.html", order: 4, is_active: true },
    { name: "Spa & Wellness", url: "spa-wellness.html", order: 5, is_active: true },
    { name: "Kutlamalar", url: "celebrations.html", order: 6, is_active: true },
    { name: "Galeri", url: "gallery.html", order: 7, is_active: true },
    { name: "Hakkımızda", url: "about.html", order: 8, is_active: true },
    { name: "İletişim", url: "contacts.html", order: 9, is_active: true }
  ]
};

// API Headers
const headers = {
  'Authorization': `Bearer ${CMS_TOKEN}`,
  'Content-Type': 'application/json'
};

// CMS API Functions
class CMSApi {
  // Get site settings
  static async getSiteSettings() {
    try {
      const response = await fetch(`${CMS_BASE_URL}/site-setting?populate=*`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching site settings:', error);
      return FALLBACK_DATA.siteSettings;
    }
  }

  // Get menu items
  static async getMenuItems() {
    try {
      const response = await fetch(`${CMS_BASE_URL}/menu-items?populate=*&sort=order:asc`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching menu items:', error);
      return FALLBACK_DATA.menuItems;
    }
  }

  // Get pages
  static async getPages() {
    try {
      const response = await fetch(`${CMS_BASE_URL}/pages?populate=*&filters[is_published][$eq]=true`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching pages:', error);
      return [];
    }
  }

  // Get page by slug
  static async getPageBySlug(slug) {
    try {
      const response = await fetch(`${CMS_BASE_URL}/pages?filters[slug][$eq]=${slug}&populate=*`);
      const data = await response.json();
      return data.data[0];
    } catch (error) {
      console.error('Error fetching page:', error);
      return null;
    }
  }

  // Get rooms
  static async getRooms() {
    try {
      const response = await fetch(`${CMS_BASE_URL}/rooms?populate=*&filters[is_available][$eq]=true`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching rooms:', error);
      return [];
    }
  }

  // Get galleries
  static async getGalleries() {
    try {
      const response = await fetch(`${CMS_BASE_URL}/galleries?populate=*`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching galleries:', error);
      return [];
    }
  }

  // Get blog posts
  static async getBlogPosts() {
    try {
      const response = await fetch(`${CMS_BASE_URL}/blog-posts?populate=*&filters[is_published][$eq]=true&sort=publish_date:desc`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  }

  // Update site settings
  static async updateSiteSettings(settings) {
    try {
      const response = await fetch(`${CMS_BASE_URL}/site-setting`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ data: settings })
      });
      return response.ok;
    } catch (error) {
      console.error('Error updating site settings:', error);
      return false;
    }
  }

  // Create new page
  static async createPage(pageData) {
    try {
      const response = await fetch(`${CMS_BASE_URL}/pages`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ data: pageData })
      });
      return response.ok;
    } catch (error) {
      console.error('Error creating page:', error);
      return false;
    }
  }

  // Update page
  static async updatePage(id, pageData) {
    try {
      const response = await fetch(`${CMS_BASE_URL}/pages/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ data: pageData })
      });
      return response.ok;
    } catch (error) {
      console.error('Error updating page:', error);
      return false;
    }
  }
}

// Utility functions for DOM manipulation
class CMSUtils {
  // Update page title and meta
  static updatePageMeta(page) {
    if (page) {
      document.title = page.attributes.seo_title || page.attributes.title;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', page.attributes.meta_description || '');
      }
    }
  }

  // Update navigation menu
  static async updateNavigation() {
    const menuItems = await CMSApi.getMenuItems();
    const navContainer = document.querySelector('.main-menu');
    
    if (navContainer && menuItems.length > 0) {
      let menuHtml = '';
      menuItems.forEach(item => {
        const isActive = item.attributes ? item.attributes.is_active : item.is_active;
        const name = item.attributes ? item.attributes.name : item.name;
        const url = item.attributes ? item.attributes.url : item.url;
        const target = item.attributes ? item.attributes.target : item.target;
        const icon = item.attributes ? item.attributes.icon : item.icon;
        
        if (isActive) {
          menuHtml += `
            <li>
              <a href="${url}" target="${target || '_self'}">
                ${icon ? `<i class="${icon}"></i>` : ''}
                ${name}
              </a>
            </li>
          `;
        }
      });
      navContainer.innerHTML = menuHtml;
    }
  }

  // Update footer with site settings
  static async updateFooter() {
    const siteSettings = await CMSApi.getSiteSettings();
    
    if (siteSettings) {
      const settings = siteSettings.attributes || siteSettings;
      
      // Update footer color
      const footer = document.querySelector('footer');
      if (footer && settings.footer_color) {
        footer.style.backgroundColor = settings.footer_color;
      }

      // Update contact information
      const contactEmail = document.querySelector('.contact-email');
      if (contactEmail && settings.contact_email) {
        contactEmail.textContent = settings.contact_email;
      }

      const contactPhone = document.querySelector('.contact-phone');
      if (contactPhone && settings.contact_phone) {
        contactPhone.textContent = settings.contact_phone;
      }

      const address = document.querySelector('.contact-address');
      if (address && settings.address) {
        address.textContent = settings.address;
      }

      // Update site name
      const siteName = document.querySelector('.site-name');
      if (siteName && settings.site_name) {
        siteName.textContent = settings.site_name;
      }

      // Update logo
      const logo = document.querySelector('.logo img');
      if (logo && settings.logo_url) {
        logo.src = settings.logo_url;
      }

      const logoWhite = document.querySelector('.logo-white img');
      if (logoWhite && settings.logo_white_url) {
        logoWhite.src = settings.logo_white_url;
      }
    }
  }

  // Load page content dynamically
  static async loadPageContent(pageSlug) {
    const page = await CMSApi.getPageBySlug(pageSlug);
    
    if (page) {
      CMSUtils.updatePageMeta(page);
      
      const contentContainer = document.querySelector('.page-content');
      if (contentContainer && page.attributes.content) {
        contentContainer.innerHTML = page.attributes.content;
      }
    }
  }

  // Initialize CMS on page load
  static async init() {
    try {
      // Update navigation
      await CMSUtils.updateNavigation();
      
      // Update footer
      await CMSUtils.updateFooter();
      
      // Load page content if on a dynamic page
      const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
      if (currentPage && currentPage !== 'index') {
        await CMSUtils.loadPageContent(currentPage);
      }
      
    } catch (error) {
      console.error('Error initializing CMS:', error);
    }
  }
}

// Initialize CMS when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  CMSUtils.init();
});

// Export for use in other scripts
window.CMSApi = CMSApi;
window.CMSUtils = CMSUtils; 