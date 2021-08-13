import { useState } from 'react'
import s from './App.scss'
import Card, { ICard } from './components/Card/Card'
import RegForm from './components/RegForm/RegForm'
import TabManager, { Tab } from './components/TabManager/TabManager'
import classnames from './utils/classnames'

const cx = classnames.bind(s)

const App: React.FC = () => {
    const [tabindex, setTabindex] = useState(0)
    const [cards, setCards] = useState<ICard[]>([
        {
            name: 'Example',
            surname: 'Card',
            date: '2006-01-01',
            country: 'Belarus',
            male: false,
        },
    ])

    const Cards = (): JSX.Element => {
        return (
            <div className={cx('Cards')}>
                {cards.map((data, ix) => (
                    <Card key={ix} {...data} />
                ))}
            </div>
        )
    }

    const Form = (): JSX.Element => {
        return (
            <RegForm
                onFinalSubmit={(e, values) => {
                    console.log(values)
                    setTabindex(1)
                    setCards((cardsArray) => [...cardsArray, values])
                }}
            />
        )
    }

    return (
        <div className={cx('App')}>
            <TabManager index={tabindex} onTabClick={setTabindex}>
                <Tab title="Register Form">{Form()}</Tab>
                <Tab noPadding title="Cards">
                    {Cards()}
                </Tab>
            </TabManager>
        </div>
    )
}

export default App
