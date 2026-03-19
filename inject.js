        const fs = require('fs');

        const hero = fs.readFileSync('assets/hero.png');
        const denim = fs.readFileSync('assets/denim.png');
        const essentials = fs.readFileSync('assets/essentials.png');
        const accessories = fs.readFileSync('assets/accessories.png');

        const hero64 = `data:image/png;base64,${hero.toString('base64')}`;
        const denim64 = `data:image/png;base64,${denim.toString('base64')}`;
        const essentials64 = `data:image/png;base64,${essentials.toString('base64')}`;
        const accessories64 = `data:image/png;base64,${accessories.toString('base64')}`;

        let html = fs.readFileSync('index.html', 'utf8');

        // Replace Unsplash images in carousel with hero.png
        html = html.replace('src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop"', `src="${hero64}"`);
        
        // Remove the other 2 Unsplash images since the user only has 1 local hero image
        const imgRegex = /<img src="https:\/\/images.unsplash.com[^>]+>\s*<img src="https:\/\/images.unsplash.com[^>]+>\s*/g;
        html = html.replace(imgRegex, '');

        // Insert categories grid 
        const catGrid = `
    <!-- Categorías Originales (Base64) -->
    <section class="categories container fade-in" style="padding-top: 48px; padding-bottom: 24px;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
            <div class="category-card" style="position: relative; height: 350px; border-radius: var(--radius); overflow: hidden; cursor: pointer;" onclick="document.querySelector('[data-category=\\'Lo Nuevo\\']').click()">
                <img src="${denim64}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" alt="Denim">
                <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; pointer-events: none;">
                    <h3 style="color: #fff; font-size: 2.5rem; text-shadow: 0 4px 12px rgba(0,0,0,0.2);">Denim</h3>
                </div>
            </div>
            <div class="category-card" style="position: relative; height: 350px; border-radius: var(--radius); overflow: hidden; cursor: pointer;" onclick="document.querySelector('[data-category=\\'Best Sellers\\']').click()">
                <img src="${essentials64}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" alt="Essentials">
                <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; pointer-events: none;">
                    <h3 style="color: #fff; font-size: 2.5rem; text-shadow: 0 4px 12px rgba(0,0,0,0.2);">Essentials</h3>
                </div>
            </div>
            <div class="category-card" style="position: relative; height: 350px; border-radius: var(--radius); overflow: hidden; cursor: pointer;" onclick="document.querySelector('[data-category=\\'Ofertas\\']').click()">
                <img src="${accessories64}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" alt="Accesorios">
                <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; pointer-events: none;">
                    <h3 style="color: #fff; font-size: 2.5rem; text-shadow: 0 4px 12px rgba(0,0,0,0.2);">Accesorios</h3>
                </div>
            </div>
        </div>
    </section>

    <!-- Inventario -->`;

        html = html.replace('<!-- Categories -->', catGrid);

        fs.writeFileSync('index.html', html);
        console.log('Success - Base64 images injected securely.');
