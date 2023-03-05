import './styles.scss'

export const App = () => {
  const hello = "Hello"
  return (
    <h1>
      Airline {process.env.NODE_ENV} {process.env.name}
    </h1>
  )
}
