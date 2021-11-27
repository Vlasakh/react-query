import Passengers from './Passenger';
import PassengerID from './PassengerID';
import AddPassenger from './AddPassenger';

import '../../App.css';

function PassengersPage() {
  return (
    <div className={'layout1'}>
      <div>
        <Passengers />
      </div>
      <div>
        <PassengerID />
      </div>
      <div>
        <AddPassenger />
      </div>
    </div>
  );
}

export default PassengersPage;
