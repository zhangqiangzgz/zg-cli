var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
const organization = 'zg-cli';
export function fetchOrganizationRepos() {
    return __awaiter(this, void 0, void 0, function* () {
        const { data = [] } = yield axios.get(`https://api.github.com/orgs/${organization}/repos`);
        return data.map((project) => ({
            name: project.name,
            value: project.name
        })) || [];
    });
}
export function fetchOrganizationRepoTags(repo) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data = [] } = yield axios.get(`https://api.github.com/orgs/${organization}/${repo}/tags`);
        return data.map((tag) => ({
            name: tag.name,
            value: tag.name
        })) || [];
    });
}
