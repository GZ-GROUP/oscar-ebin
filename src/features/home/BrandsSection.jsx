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
        { id: 7, name: "Brand 7", image: "src/assets/31minutos.png" },
        { id: 8, name: "Brand 8", image: "src/assets/aperture.png" },
        { id: 9, name: "Brand 9", image: "src/assets/black_mesa.svg" },
        { id: 10, name: "Brand 10", image: "src/assets/valve.png" },
        { id: 11, name: "Brand 11", image: "src/assets/umbrella.png" },
        { id: 12, name: "Brand 12", image: "src/assets/capsule.png" },
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