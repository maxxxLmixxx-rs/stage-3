import jsonData from './_API.json'

interface WeatherData {
    temperatureLimit: number
    description: string
    imageUrl: string
    chanceTo: {
        probability: number
        type: string
        iconUrl: string
    } | null
}

export const getWeatherData = (): [string, WeatherData][] => {
    return jsonData.weatherAPI.map(Object.entries).flat()
}
