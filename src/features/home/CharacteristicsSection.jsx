import React from 'react';
import './CharacteristicsSection.css';

function CharacteristicsSection() {
    const features = [
        "Incentiva el reciclaje con puntos y recompensas",
        "Reconocimiento de residuos para clasificación automática",
        "Lorem Ipsum dolor sit amet consectetur",
        "Lorem Ipsum dolor sit amet consectetur",
    ];

    return (
        <section className="characteristics-section">
            <h2 className="characteristics-title">Sobre Oscar</h2>
            <div className="characteristics-content">
                
                <div className="characteristics-image-wrapper">
                    <img
                        src={"src/assets/mainOscar.svg"}
                        alt="Características"
                        className="characteristics-image"
                    />
                </div>
                <ul className="characteristics-list">
                    {features.map((feature, index) => (
                        <li key={index} className="characteristics-item">
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default CharacteristicsSection;