export default class PackagesService {
    constructor($http) {
        this.httpService = $http;
    }

    async getPackagesList() {
        return await this.httpService.get('assets/data/by-page.json');
    }

    async getPagesName() {
        return await this.httpService.get('assets/data/pages-name.json');
    }

    returnPageTitle(props) {
        const title = _.find(props, {'-name': 'title'});
        return title['value']['#text'];
    }
}
