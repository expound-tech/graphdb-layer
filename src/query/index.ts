import db from '../storage';

export function getProjectsByName (keywords: string)  {
  db.query(`select "Search projects name match ${keywords}";`);
}

export function getNodes (knowId: string)  {
	db.query(`select "Search for ${knowId}";`);
}