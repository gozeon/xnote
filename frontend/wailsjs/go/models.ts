export namespace entity {
	
	export class Password {
	    id: string;
	    name: string;
	    password: string;
	
	    static createFrom(source: any = {}) {
	        return new Password(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.password = source["password"];
	    }
	}

}

