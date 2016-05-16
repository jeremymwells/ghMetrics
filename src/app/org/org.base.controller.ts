import { OrgService } from './org.service';

export class OrgBaseController {
  public org = { login: ''};
  public linksAreVisible: boolean = true;
  public currentPromise;
  public searchTerm;

  /* @ngInject */
  constructor(
    public $state, 
    public orgService: OrgService, 
    private $timeout, 
    private $q, 
    private $mdMedia
  ) { 
    this.orgService.loadOrganization(this.$state.params.orgLogin);
  }

  public toggleLinks(){
    this.linksAreVisible = !this.linksAreVisible;
  }

  public redirectToNewOrganization(orgLogin){
    //hack because angular material sucks-->
    return this.$q((resolve) => {
      this.$timeout(() => {
        resolve(this.$state.go('org.home', { orgLogin: orgLogin }));
      }, 50);
    });
  }

  public findOrganization(){
    if (this.currentPromise) { this.$timeout.cancel(this.currentPromise); }
    return this.$q((resolve) => {
      this.currentPromise = this.$timeout(() => {
        resolve(this.orgService.findOrganization(this.searchTerm));
      }, 500);
    });
  }
  
}
