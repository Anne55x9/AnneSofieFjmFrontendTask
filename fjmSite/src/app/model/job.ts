//Interface for a Job object with attributtes 
//that match the specs from the provided backend server 
//The attributes include javascript types.

export interface Job {
    ID: string;
    dir: string;
    name: string;
    numRetried: number;
    projectName: string;
    state: string; //Enum
    submitterName: string;
    stateReason: string;
    timestamps: string;
    URI:string;

}