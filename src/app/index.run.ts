/** @ngInject */
export function runBlock($log: angular.ILogService, $http) {
  $http.defaults.headers.common.Authorization = 'token 1a383ce2109c6698e7f97dd50ff253ab776501b7';
}
