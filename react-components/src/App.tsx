import { Fragment, useMemo } from 'react'
import s from './App.scss'
import SearchBar from './components/SearchBar/SearchBar'
import WeatherCard from './components/WeatherCard/WeatherCard'
import { getWeatherData } from './API/weatherAPI'

const WeatherCards: React.FC = () => {
    const weatherData = useMemo(getWeatherData, [])

    return (
        <Fragment>
            {weatherData.map(([name, data]) => {
                const { temperatureLimit, description, imageUrl } = data
                const { probability = -1, type, iconUrl } = data.chanceTo || {}

                const additionalInfo = data.chanceTo && (
                    <div
                        style={{
                            alignItems: 'center',
                            display: 'flex',
                            gap: '20px',
                        }}
                    >
                        <img src={iconUrl} alt={type} />
                        {probability * 100}% Chance of {type}
                    </div>
                )

                return (
                    <WeatherCard
                        key={name}
                        day={name}
                        temperatureLimit={temperatureLimit}
                        imageUrl={imageUrl}
                        additionalInfo={additionalInfo}
                    >
                        {description}
                    </WeatherCard>
                )
            })}
        </Fragment>
    )
}

const App: React.FC = () => {
    return (
        <div className={s.App}>
            <div className={s.wrapper}>
                <div className={s.top}>
                    <SearchBar />
                </div>
                <div className={s.bottom}>
                    <WeatherCards />
                </div>
            </div>
        </div>
    )
}

export default App
