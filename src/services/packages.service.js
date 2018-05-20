export default class PackagesService {
    constructor($http) {
        this.httpService = $http;
    }

    getPackagesList() {
        return this.httpService.get('assets/data/by-page.json');
    }
}
