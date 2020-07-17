import { EventDispatcher } from 'three';

class Car extends EventDispatcher{
  start () {
    this.dispatchEvent({
      type: 'start',
      message: 'vroom! vroom!',
    });
  }
}

const car = new Car();
car.addEventListener('start', (event) => {
  console.log(event);
});
car.start();
