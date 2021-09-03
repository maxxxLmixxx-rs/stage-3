import React from 'react'
import s from './WeatherCard.module.scss'

type WeatherCardProps = {
    imageUrl: string
    day: string
    temperatureLimit: number
    additionalInfo: React.ReactNode
}

const WeatherCard: React.FC<WeatherCardProps> = (props) => {
    const { imageUrl, day, temperatureLimit, additionalInfo } = props
    const { children: description } = props
    const bgImage: React.CSSProperties = { backgroundImage: `url(${imageUrl})` }

    return (
        <div className={s.WeatherCard} style={{ ...bgImage }}>
            <div className={s.weatherData}>
                <div className={s.heading}>
                    <span className={s.day}>{day}</span>
                    <span className={s.temperatureLimit}>
                        {temperatureLimit} °C
                    </span>
                </div>
                <div className={s.description}>
                    {description && <span>{description}</span>}
                </div>
                <div className={s.additionalInfo}>
                    {additionalInfo && <span>{additionalInfo}</span>}
                </div>
            </div>
        </div>
    )
}

export default WeatherCard
