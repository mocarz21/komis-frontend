import './Main.scss'
import { Banner } from '../../Modules/Banner/Banner'
import { useCars } from '../../hooks/useCars'

export const Main = () =>{

  const { payload, loading } = useCars()

  return(
    <div className='main'>
      <Banner/>
      <div>
        <h3>O NAS</h3>
      </div>
      <div class="container text">
        <div class="row justify-content-md-center ">
          <div class="col-8 center text-frame">
            <p className='main-text'> 
              Zapraszamy do świata motoryzacji, gdzie każdy znajdzie coś dla siebie. 
              Niezależnie od tego, czy szukasz niezawodnego auta na co dzień, sportowego wozu na 
              weekendowe wypady, czy po prostu chcesz dowiedzieć się więcej o rynku samochodowym – 
              jesteś we właściwym miejscu.Tworzymy ten projekt z pasją i zaangażowaniem, 
              łącząc nowoczesne podejście z tradycją motoryzacyjną. Naszym celem jest zapewnienie przejrzystości,
              łatwości obsługi i dostarczenie Wam wartościowych rozwiązań.Zachęcamy do 
              odkrywania naszej strony, zapoznania się z ofertą i poznania naszej wizji. 
              To dopiero początek naszej wspólnej przygody – jedźmy razem w kierunku nowych 
              możliwości! 
            </p>
            <p>
              🚗 Dziękujemy, że jesteście z nami! 
            </p>
          </div>
        </div>
      </div>
      <div className='row justify-content-md-center column-gap-1 info-container '> 
        {!loading ?payload.slice(-3).map((item, index) => (
          <div key={index} className='col-2 info-box'>
            <img alt='sajkadslja' src={`/images/${item.id}/a.webp`} />
            <div className='info'>
              <p>{item.description}</p>
            </div>
          </div>
        )):<p>loading</p>}
      </div>
    </div>
  )  

}