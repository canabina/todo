import 'should';

import 'datejs';
import moment from 'moment';

import {getDateTypeForItem, ItemDateType} from '../public/js/components/Items/Item.jsx';

describe('date test', function() {

  it('simple datejs test', () => {
    // console.log(Date.parse("tomorrow"));
  });

  it('expired date', () => {
    const d1 = moment().add(-2, 'day');
    const d2 = moment().add(-1, 'day');
    getDateTypeForItem(d1, d2).should.equal(ItemDateType.EXPIRED);

    /*const today = moment();
    console.log(today.toString(), d2.toString());
    console.log(moment(d2).isAfter(today));*/
  });

  it('today', () => {
    const d1 = moment().startOf('today');
    const d2 = moment().endOf('today');
    getDateTypeForItem(d1, d2).should.equal(ItemDateType.TODAY);
  });

  it('in progress', () => {
    const d1 = moment().add(-1, 'day');
    const d2 = moment().add(1, 'day');
    const today = moment();
    getDateTypeForItem(d1, d2).should.equal(ItemDateType.IN_PROGRESS);
  });

});
