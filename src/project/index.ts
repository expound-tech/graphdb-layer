import { getProjectsByName } from '../query';

export function searchKnowledge(name: string) {
	getProjectsByName(name);
}