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
  public chartConfig: any;

  /* @ngInject */
	constructor(private $state, public orgService: OrgService, public $mdMedia, private $filter) { }

  public toggleSort(field){
    this.sortDirection = !this.sortDirection && field ? '-' : '';
    this.currentSort = `${this.sortDirection}${field}`;
  }

  public isSortField(field){
    return this.currentSort.indexOf(field) > -1;
  }

  public getChartConfig(organization) {
    if (!organization || !organization.repos) { return; }
    if (this.chartConfig) { return this.chartConfig; }

    var repos = this.$filter('orderBy')(organization.repos, this.currentSort);
    var categories = repos.map(repo => repo.name);
    var seriesData = this.statFields.map((stat) => {
      return {
        name: stat.desc,
        data: repos.map(repo=>repo[stat.field])
      }
    });

    this.chartConfig = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Github Repo Stats'
      },
      xAxis: {
        categories: categories,
        crosshair: true
      },
      yAxis: {
        title: {
          text: 'Totals'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      exporting: { enabled: false },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: seriesData
    };
    return this.chartConfig;
  }
}