import * as fs from "fs"

export function fileToString(path: string) : string {
	return fs.readFileSync(path, 'utf-8')
}

