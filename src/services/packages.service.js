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

    checkIfObjectExistByKey(array, key, value) {
        let found = false;
        for (let i = 0; i < array.length; i++) {
            if (array[i][key] === value) {
                found = true;
                break;
            }
        }

        return found;
    }

    findArrayPositionWithData(array, attr, value) {
        for (let i = 0; i < array.length; i += 1) {
            if (array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    }
}
