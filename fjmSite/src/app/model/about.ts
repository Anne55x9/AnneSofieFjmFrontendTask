//The interface that models the '/about' URI method attributes.

export interface About{

    contact: string;
    description: string;
    name: string;
    specsURI: string;
    timezone: string;
    version: {
        
            name: string;
            isRelease: boolean;
            major:  number;
            minor: number;
            patch: number;
       
    };
};



