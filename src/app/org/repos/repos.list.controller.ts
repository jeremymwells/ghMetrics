import { OrgService } from '../org.service';

export class OrgReposListController {
  public sortFields = [
    { field: 'name', desc: 'name', abbv: 'name', flex: 10 },
    { field: 'forks_count', desc: 'forks', abbv: 'forks', flex: 10 },
    { field: 'stargazers_count', desc: 'stargazers', abbv: 'strgzrs', flex: 15 },
    { field: 'open_issues_count', desc: 'open issues', abbv: 'issues', flex: 15 },
    { field: 'size', desc: 'kb (size)', abbv: 'kb-size', flex: 15 }
  ]
  public statFields = this.sortFields.filter(sf => sf.field !== 'name');
  public currentSort = this.sortFields[0].field;
  public sortDirection:string;

  /* @ngInject */
	constructor(private $state, public orgService: OrgService, public $mdMedia) { }

  public toggleSort(field){
    this.sortDirection = !this.sortDirection && field ? '-' : '';
    this.currentSort = `${this.sortDirection}${field}`;
  }

  public isSortField(field){
    return this.currentSort.indexOf(field) > -1;
  }

}