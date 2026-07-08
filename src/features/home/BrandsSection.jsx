import React from 'react';
import './BrandSecction.css';

import teslaLogo from '../../assets/tesla.png';
import amazonLogo from '../../assets/amazon.png';
import nvidiaLogo from '../../assets/nvidia.png';
import googleLogo from '../../assets/google.png';
import microsoftLogo from '../../assets/microsoft.png';
import metaLogo from '../../assets/meta.png';
import minutosLogo from '../../assets/31minutos.png';
import apertureLogo from '../../assets/aperture.png';
import blackMesaLogo from '../../assets/black_mesa.svg';
import valveLogo from '../../assets/valve.png';
import umbrellaLogo from '../../assets/umbrella.png';
import capsuleLogo from '../../assets/capsule.png';


function BrandsSection() {
    const brands = [
        { id: 1, name: "Brand 1", image: teslaLogo },
        { id: 2, name: "Brand 2", image: amazonLogo },
        { id: 3, name: "Brand 3", image: nvidiaLogo },
        { id: 4, name: "Brand 4", image: googleLogo },
        { id: 5, name: "Brand 5", image: microsoftLogo },
        { id: 6, name: "Brand 6", image: metaLogo },
        { id: 7, name: "Brand 7", image: minutosLogo },
        { id: 8, name: "Brand 8", image: apertureLogo },
        { id: 9, name: "Brand 9", image: blackMesaLogo },
        { id: 10, name: "Brand 10", image: valveLogo },
        { id: 11, name: "Brand 11", image: umbrellaLogo },
        { id: 12, name: "Brand 12", image: capsuleLogo },
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