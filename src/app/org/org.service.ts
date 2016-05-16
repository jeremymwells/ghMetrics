

export class OrgService {

  public currentOrganization;
  public defaultLogin = 'Netflix';
  public baseOrgUrl: string = 'https://api.github.com/orgs';
  public baseReposUrl: string = 'https://api.github.com/repos';
  public baseUserUrl: string = 'https://api.github.com/users';
  public baseUserSearchUrl: string = 'https://api.github.com/search/users'
  public baseFacets = ['repos', 'events', 'members', 'public_members']

  /** @ngInject **/
  constructor(private $state, private $http, private $q){
    this.currentOrganization = this.loadOrganization(this.$state.params.orgLogin);
  }

  private safeGet(url, safeSeed:any = []){
    var d = this.$q.defer();
    this.$http.get(url)
      .then((result) => {
        d.resolve(result.data);
      }, (error) => {
        d.resolve(safeSeed);
      });
    return d.promise;
  }

  private getCommitsForRepo(org,repoName){    
    return this.safeGet(`${this.baseReposUrl}/${org.login}/${repoName}`)
      .then((repo)=>{
        return this.safeGet(repo.commits_url.replace(/\{.*\}/,''))
          .then((commits)=>{
            repo.commits= commits.map((commit)=>{
              commit.author = commit.author || {};
              commit.commit = commit.commit || {};
              commit.commit.author = commit.commit.author || {};
              angular.extend(commit.author, commit.commit.author);
              commit.author.login = commit.author.login || commit.author.name;
              return commit;
            });
            return repo;
          });
      })
  }
  private getRepo(repoName){
    
    if (this.currentOrganization.then){
      return this.currentOrganization.then((org)=>{
        return this.getCommitsForRepo(org,repoName);
      })
    }

    return this.getCommitsForRepo(this.currentOrganization,repoName);
  }

  //this would be better as observables -->
  public loadOrganization(orgLogin){
    if (!orgLogin) { return; }
    const url = `${this.baseOrgUrl}/${orgLogin}`;

    return this.$http.get(url).then((resp)=>{
      this.currentOrganization = resp.data;
      return this.$q.all(
        this.baseFacets.map((facet) => {
          return this.safeGet(`${url}/${facet}`);
        })
      ).then((values) => {
        this.currentOrganization.repos = values[0];
        this.currentOrganization.events = values[1];
        this.currentOrganization.members = values[2];
        this.currentOrganization.public_members = values[3];
        return this.currentOrganization;
      }).then((organization) => {
        return this.$q.all(
          organization.members.map((member) => {
            return this.safeGet(`${this.baseUserUrl}/${member.login}`, false);
          })
        ).then((values) => {
          for (var i = 0; i < values.length; i++) {
            for (var j = 0; j < organization.members.length; j++) {
              if (organization.members[j].login === values[i].login) {
                organization.members[j] = values[i];
              }
            }
          }
          this.currentOrganization = organization;
          this.defaultLogin = this.currentOrganization.login;
          return this.currentOrganization;
        });
      });
    });
  }

  public findOrganization(searchTerm){
    if (!searchTerm) { return this.$q(resolve => { resolve([]); }); }
    return this.$http.get(
      this.baseUserSearchUrl + '?q=' +
      searchTerm + ' in:login type:org OR ' +
      searchTerm + ' in:name type:org OR ' +
      searchTerm + ' in:fullname type:org OR ' +
      searchTerm + ' in:description type:org OR ' +
      searchTerm + ' in:location type:org'
    ).then(res=>res.data.items);
  }

  public getRepository(repoName){
    return this.getRepo(repoName).then((repo) => {
      for(var i =0; i < this.currentOrganization.repos.length; i++){
        if (repo.name === this.currentOrganization.repos[i].name){ //<--should this key off of id?
          this.currentOrganization.repos[i] = repo;
        }
      }
      return repo;
    });
  }








}
