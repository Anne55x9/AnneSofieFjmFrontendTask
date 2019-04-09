export interface Stats{

    count: {
        submitted:number;
        unknown:number;
        running: number;
        failed: number;
        terminated: number;
        successful: number;
    }; 
};