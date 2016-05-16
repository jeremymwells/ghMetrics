import { OrgService } from '../org.service';

export class OrgEventsListController {
  public sortFields = [
    { field: 'actor.login', desc: 'user', abbv: 'user', flex: 10 },
    { field: 'type', desc: 'event type', abbv: 'type', flex: 15 },
    { field: 'created_at', desc: 'created', abbv: 'created', flex: 15 },
    { field: 'payload', desc: 'payload', abbv: 'issues', flex: 15 }
  ]
  public statFields = this.sortFields.filter(sf => sf.field !== 'name');
  public currentSort = this.sortFields[0].field;
  public sortDirection: string;

  /* @ngInject */
  constructor(private $state, private moment, public orgService: OrgService) {
    //TODO: re-fetch organization events when route is activated -->
  }

  public toggleSort(field) {
    this.sortDirection = !this.sortDirection && field ? '-' : '';
    this.currentSort = `${this.sortDirection}${field}`;
  }

  public isSortField(field) {
    return this.currentSort.indexOf(field) > -1;
  }

  public formatDate(date){
    return moment(date).format('MMMM Do YYYY, h:mm:ss a').toString();
  }

  public getEventSummary(event){
    return JSON.stringify(event.payload);
  }

}