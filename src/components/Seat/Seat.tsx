import './Seat.scss'

const Seat = (props: any) => {
  const { value, disableSeat, specialMeal, selected, onClick } = props

    const getSeatColor = ()=>{
       return specialMeal ? "orange" : disableSeat ? "blue" : selected ? 'green' : 'gray'; 
    }

  return (
    <>
      <i className={`fa-solid fa-couch seat ${disableSeat ? 'disabled-seat' : ''}`} onClick={onClick} style={{color: `${getSeatColor()}`}}></i>
      <div>{value}</div>
    </>
  )
}

export default Seat
