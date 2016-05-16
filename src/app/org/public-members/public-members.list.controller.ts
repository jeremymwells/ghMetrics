import { OrgService } from '../org.service';

export class OrgPublicMembersListController {
  public sortFields = [
    { field: 'name', desc: 'name', abbv: 'name', flex: 10 },
    { field: 'public_repos', desc: 'public repos', abbv: 'repos', flex: 15 },
    { field: 'followers', desc: 'followers', abbv: 'folwrs', flex: 15 },
    { field: 'public_gists', desc: 'public gists', abbv: 'gists', flex: 15 },
    { field: 'following', desc: 'following', abbv: 'folwg', flex: 15 }
  ]
  public statFields = this.sortFields.filter(sf => sf.field !== 'name');
  public currentSort = this.sortFields[0].field;
  public sortDirection: string;

  /* @ngInject */
  constructor(private $state, public orgService: OrgService) {
    
  }

  public toggleSort(field) {
    this.sortDirection = !this.sortDirection && field ? '-' : '';
    this.currentSort = `${this.sortDirection}${field}`;
  }

  public isSortField(field) {
    return this.currentSort.indexOf(field) > -1;
  }

}