import React from 'react';
import './BrandSecction.css';


function BrandsSection() {
    const brands = [
        { id: 1, name: "Brand 1", image: "src/assets/tesla.png" },
        { id: 2, name: "Brand 2", image: "src/assets/amazon.png" },
        { id: 3, name: "Brand 3", image: "src/assets/nvidia.png" },
        { id: 4, name: "Brand 4", image: "src/assets/google.png" },
        { id: 5, name: "Brand 5", image: "src/assets/microsoft.png" },
        { id: 6, name: "Brand 6", image: "src/assets/meta.png" },
    ];

    return (
        <section className="brands-section">
            <p className="brands-title">Empresas que confían en nosotros</p>
            <div className="brands-grid">
                <div className="group">
                    {brands.map((brand) => (
                    <div className="brand-circle" key={brand.id}>
                        {brand.image ? (
                            <img
                                src={brand.image}
                                alt={brand.name}
                                className="brand-image"
                            />
                        ) : (
                            
                            <span className="brand-placeholder">{brand.id}</span>
                        )}
                    </div>
                ))}
                </div>
                <div aria-hidden className="group">
                    {brands.map((brand) => (
                    <div className="brand-circle" key={brand.id}>
                        {brand.image ? (
                            <img
                                src={brand.image}
                                alt={brand.name}
                                className="brand-image"
                            />
                        ) : (
                            
                            <span className="brand-placeholder">{brand.id}</span>
                        )}
                    </div>
                ))}
                </div>                 
            </div>
        </section>
    );
}

export default BrandsSection;