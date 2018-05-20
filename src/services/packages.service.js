export default class PackagesService {
    constructor($http) {
        this.httpService = $http;
    }

    async getPackagesList() {
        return await this.httpService.get('assets/data/by-page.json');
    }
}
