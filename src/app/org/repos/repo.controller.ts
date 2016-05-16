import { OrgService } from '../org.service';

export class OrgRepoController {
	public sortFields = [
    { field: 'author.name', desc: 'author', abbv: 'author', flex: 10 },
    { field: 'commit.message', desc: 'message', abbv: 'message', flex: 15 },
    { field: 'author.date', desc: 'date', abbv: 'date', flex: 15 },
    { field: 'sha', desc: 'sha', abbv: 'sha', flex: 10 }
  ]
  public statFields = this.sortFields.filter(sf => sf.field !== 'name');
  public currentSort = this.sortFields[0].field;
  public sortDirection: string;
	public currentRepo:any;
	
  /* @ngInject */
  constructor(private $state, public orgService: OrgService) {
  	this.orgService.getRepository(this.$state.params.repo).then((repo)=>{ 
  		this.currentRepo = repo;
  	});
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